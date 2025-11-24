import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Hotel App",
  description: "Demo App",
};

export default function HotelLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
        {children}
    </>
  );
}
