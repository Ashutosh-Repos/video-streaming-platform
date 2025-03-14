export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-screen h-screen --font-roboto flex items-center justify-center p-4">
      {children}
    </div>
  );
}
