import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "News App",
    description: "Demo App",
};

export default function NewLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}
        </>
    );
}
