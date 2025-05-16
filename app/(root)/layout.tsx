import { AppSidebar } from '@/components/layout/app-sidebar';
import BackgroundImage from '@/components/layout/background-image';
import Header from '@/components/layout/header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="relative flex flex-col py-3">
			<BackgroundImage />
			<SidebarProvider className="px-3">
				<AppSidebar />
				<SidebarInset className="h-svh bg-transparent lg:h-[calc(100svh-1.5rem)]">
					<Header />
					{children}
				</SidebarInset>
			</SidebarProvider>
		</div>
	);
}

export default Layout;
