import "./globals.css";
import Script from "next/script";
import ClientWrapper from "./component/ClientWrapper";

export const metadata = {
  title: "Girl or Ladyboy",
  description: "Can you tell the difference? A retro arcade game set in Bangkok.",
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
        <Script src="https://vibejam.cc/2026/widget.js" strategy="afterInteractive" />
        <ClientWrapper>
          {children}
        </ClientWrapper>
      </body>
    </html>
  );
}