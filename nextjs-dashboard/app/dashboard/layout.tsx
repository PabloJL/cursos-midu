export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      Esto es el Layout del dashboard
      {children}
    </section>
  );
}
