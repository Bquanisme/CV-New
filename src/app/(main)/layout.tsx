import AppFooter from "@/components/app.footer";
import AppHeader from "@/components/headerMain/app.header";


export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppHeader />
      {children}
      <AppFooter />
    </>
  );
}
