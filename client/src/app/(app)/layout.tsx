import ExploreSidebar from '@/components/explolre-sidebar';
import MenuSidebar from '@/components/menu-sidebar';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen w-full justify-between gap-2 md:container">
      <MenuSidebar className="hidden max-w-sm flex-1 flex-col justify-between px-6 py-10 md:flex" />
      <ScrollArea
        type="scroll"
        className="min-h-screen w-full flex-[2.5] md:px-4"
      >
        <main className="pb-32 pt-10">{children}</main>
      </ScrollArea>
      <ExploreSidebar className="hidden max-w-sm flex-1 space-y-8 px-6 py-10 xl:block" />
    </div>
  );
}
