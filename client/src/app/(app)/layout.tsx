import ExploreSidebar from '@/components/explolre-sidebar';
import MenuSidebar from '@/components/menu-sidebar';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen w-full justify-between gap-2">
      <MenuSidebar className="flex flex-1 flex-col justify-between px-6 py-10 pl-14" />
      <ScrollArea
        type="scroll"
        className="min-h-screen w-full flex-[2.5] rounded-md border px-8 py-10"
      >
        <main>{children}</main>
      </ScrollArea>
      <ExploreSidebar className="flex-1 px-6 py-10" />
    </div>
  );
}
