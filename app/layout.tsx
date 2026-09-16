import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sweets Co. | Homemade Desserts",
  description: "Homemade desserts for your cravings, celebrations, and sweet moments.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
