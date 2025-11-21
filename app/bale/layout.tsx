import type { Metadata } from "next";
import "../globals.css";
import localFont from "next/font/local";

// ----- Local font setup -----
const yekanBakh = localFont({
  src: [
    {
      path: "../../public/fonts/YekanBakhFaNum-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/YekanBakhFaNum-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/YekanBakhFaNum-Thin.woff2",
      weight: "100",
      style: "normal",
    },
  ],
  variable: "--font-yekan",
  display: "swap",
});

export const metadata: Metadata = {
  title: "My App",
  description: "Main Layout with local fonts",
};

// ----- Main Layout -----
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${yekanBakh.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
