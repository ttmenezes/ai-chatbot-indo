import { cookies } from "next/headers";
import { AppSidebar } from "@/components/app-sidebar";
import { ConsentProvider } from "@/components/consent-provider";
import { DataStreamProvider } from "@/components/data-stream-provider";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export const experimental_ppr = true;

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const isCollapsed = cookieStore.get("sidebar_state")?.value !== "true";

  return (
    <DataStreamProvider>
      <ConsentProvider>
        <SidebarProvider defaultOpen={!isCollapsed}>
          <AppSidebar />
          <SidebarInset>{children}</SidebarInset>
        </SidebarProvider>
      </ConsentProvider>
    </DataStreamProvider>
  );
}
