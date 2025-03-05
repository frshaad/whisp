import ExploreSidebar from '@/components/explore-sidebar';
import MenuSidebar from '@/components/menu-sidebar';

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen w-full justify-between gap-2 md:container">
      <MenuSidebar className="hidden max-w-sm flex-1 flex-col justify-between px-6 py-10 md:flex" />
      <main className="w-full flex-[2.5] overflow-y-auto pb-20 pt-6 md:px-4">
        {children}
      </main>
      <ExploreSidebar />
    </div>
  );
}
