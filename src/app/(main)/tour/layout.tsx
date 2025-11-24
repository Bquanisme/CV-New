import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Tour App",
  description: "Demo App",
};

export default function TourLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
        {children}
    </>
  );
}
