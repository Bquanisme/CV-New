import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Detail Room App",
  description: "Demo App",
};

export default function DetailRoomLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
        {children}
    </>
  );
}
