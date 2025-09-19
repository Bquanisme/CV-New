import "./globals.css";
import AppHeader from "../components/app.header";

export const metadata = {
  title: "My App",
  description: "Demo App",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppHeader />
        {children}
      </body>
    </html>
  );
}
