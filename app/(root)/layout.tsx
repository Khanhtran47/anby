import { AppSidebar } from '@/components/layout/app-sidebar';
import BackgroundImage from '@/components/layout/background-image';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

function Layout({ children }: { children: React.ReactNode }) {
	return (
		<SidebarProvider className="relative">
			<BackgroundImage />
			<AppSidebar />
			<SidebarInset className="bg-transparent">{children}</SidebarInset>
		</SidebarProvider>
	);
}

export default Layout;
