import "./globals.css";
import { Inter } from "next/font/google";
import AppHeader from "@/components/app.header";
import AppFooter from "@/components/app.footer";
import Providers from "./providers"; // tách QueryClientProvider ra đây

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "My App",
  description: "Demo App",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppHeader />
        <Providers>
          {children}
        </Providers>
        <AppFooter />
      </body>
    </html>
  );
}
