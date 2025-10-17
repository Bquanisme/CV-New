import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Tourism App",
  description: "Demo App",
};

export default function TourismLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
        {children}
    </>
  );
}
