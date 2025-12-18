import * as React from "react";
import {
  LayoutDashboard,
  Star,
  Settings,
  Package,
  ScrollText,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { useIsMobile } from "@/hooks/useIsMobile";
import Link from "next/link";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/seller/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Products",
      url: "/seller/products",
      icon: Package,
    },
    {
      title: "Order List",
      url: "/seller/order-list",
      icon: ScrollText,
    },
    {
      title: "Reviews",
      url: "/seller/reviews",
      icon: Star,
    },
    {
      title: "Settings",
      url: "/seller/settings",
      icon: Settings,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const isMobile = useIsMobile();
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div>
                  <Image
                    src="/icons/Logo.svg"
                    alt="logo"
                    width={30}
                    height={30}
                  />
                </div>
                {!isMobile && (
                  <div className="flex flex-col">
                    <div className="font-medium">
                      <div>Shirt</div>
                      <div>Seller</div>
                    </div>
                  </div>
                )}
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link href={item.url} passHref className="font-medium">
                    <item.icon />
                    {item.title}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
