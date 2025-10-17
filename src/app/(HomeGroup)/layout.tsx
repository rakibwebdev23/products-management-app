


export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <h1>Nav for home</h1>
    {children}
    </>
  );
}
