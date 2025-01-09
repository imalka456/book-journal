import type { Metadata } from "next";
import LeftNavigation from './ui/left-navigation';
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
      <body className="h-full">
        <div className="flex h-full">
          <div className="h-full"><LeftNavigation/></div>
          <div className="flex-grow p-6 overflow-y-auto md:p-12">{children}</div>
          {/* <div className="flex-grow p-6  md:p-12">{children}</div> */}
        </div>
      </body>
    </html>
  );
}