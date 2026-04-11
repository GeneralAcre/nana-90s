import "./globals.css";
import ClientWrapper from "./component/ClientWrapper";

export const metadata = {
  title: "Nana Plaza Sim",
  description: "A retro-styled 3D experience",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black overflow-hidden font-mono text-white antialiased">
        <ClientWrapper>
          {children}
        </ClientWrapper>
      </body>
    </html>
  );
}