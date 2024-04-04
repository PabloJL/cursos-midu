import './ui/global.css';
import { montserrat } from './ui/fonts';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} antialiased`}>{children}</body>
      <footer className="flex items-center  justify-center  py-10">
        Hecho con 💖 por la gente de Vercel
      </footer>
    </html>
  );
}
