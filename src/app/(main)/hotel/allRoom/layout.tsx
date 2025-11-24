import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "All Room",
  description: "Demo App",
};

export default function AllRoomLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
        {children}
    </>
  );
}
