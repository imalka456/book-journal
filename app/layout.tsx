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
        <div className="flex h-full flex-col sm:flex-row">
          <div className="h-full max-sm:w-full"><LeftNavigation/></div>
          <div className="flex-grow flex-col sm:flex-row p-6 overflow-y-auto">{children}</div>
          {/* <div className="flex-grow p-6  md:p-12">{children}</div> */}
        </div>
      </body>
    </html>
  );
}