import "./globals.css";
import { Inter } from "next/font/google";
import "react-toastify/dist/ReactToastify.css";
import ToastProvider from "@/components/toastProvider";
import Providers from "./(main)/providers";
import { ReduxProvider } from "./(main)/reduxProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "My App",
  description: "Demo App",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <ReduxProvider>
            {children}
            <ToastProvider />
          </ReduxProvider>
        </Providers>
      </body>
    </html>
  );
}
