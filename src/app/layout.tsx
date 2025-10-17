import "./globals.css";
import { Inter } from "next/font/google";
import AppFooter from "@/components/app.footer";
import Providers from "./providers"; // tách QueryClientProvider ra đây
import AppHeader from "@/components/app.header";
import { ReduxProvider } from "./reduxProvider";
import "react-toastify/dist/ReactToastify.css";
import ToastProvider from "@/components/toastProvider";

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
            <AppHeader />
              {children}
            <AppFooter />
            <ToastProvider />
          </ReduxProvider>
        </Providers>
      </body>
    </html>
  );
}
