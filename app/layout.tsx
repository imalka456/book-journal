import type { Metadata } from "next";
import Navigation from './ui/Navigation';
import './globals.css';

export const metadata: Metadata = {
  title: "Book Journal",
  description: "My First App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="flex">
          <div className=""><Navigation/></div>
          <div className="pl-4 pt-4">{children}</div>
        </div>
      </body>
    </html>
  );
}