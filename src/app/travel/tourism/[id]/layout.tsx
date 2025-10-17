import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Detail tourism App",
  description: "Demo App",
};

export default function DetailTourismLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
        {children}
    </>
  );
}
