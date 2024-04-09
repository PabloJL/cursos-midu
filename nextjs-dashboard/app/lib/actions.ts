'use server';
//⬆️TODAS LAS FUNCIONES QUE SE EXPORTAN EN ESTE ARCHIVO SON DE SERVIDOR. NO ACABARA EN EL BUNDLE DEL CLIENTE.
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

//Cada vez que creamos un objeto lo validamos
const CreateInvoiceSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(['pending', 'paid']),
  date: z.string(),
});

const CreateInvoiceFormSchema = CreateInvoiceSchema.omit({
  id: true,
  date: true,
});

export async function createInvoice(formData: FormData) {
  const { customerId, amount, status } = CreateInvoiceFormSchema.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  //Se transforma para evitar errores de redondeo
  const amountInCents = amount * 100;

  //Fecha actual YYYY-MM-DD
  const [date] = new Date().toISOString().split('T');

  await sql`
  INSERT INTO invoices (customer_id, amount, status, date)
  VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
  `;

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');

  // Test it out:
  //   console.log(rawFormData);
}
