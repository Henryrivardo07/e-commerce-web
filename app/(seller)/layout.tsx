"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Image from "next/image";
import { getValidImage } from "@/lib/getValidImage";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="private-layout">
      <SidebarProvider>
        <AppSidebar collapsible="icon" />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b">
            <div className="flex items-center justify-between gap-2 px-6 w-full">
              <SidebarTrigger />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center gap-2 cursor-pointer rounded-xl hover:bg-neutral-50">
                    <Image
                      src={getValidImage(user?.avatarUrl)}
                      alt="close"
                      width={40}
                      height={40}
                      className="rounded-full"
                      unoptimized
                    />
                    <span>{user?.name}</span>
                    <ChevronDown width={15} />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>
                    <div className="flex items-center">
                      <Image
                        src={getValidImage(user?.avatarUrl)}
                        alt="user"
                        width={50}
                        height={550}
                        className="object-cover rounded"
                        unoptimized
                      />
                      <div>
                        <h3>{user?.name}</h3>
                        <h3 className="flex items-center gap-2">
                          <Image
                            src="/icons/Store.svg"
                            alt="store"
                            width={15}
                            height={15}
                            className="object-cover rounded"
                            unoptimized
                          />
                          {user?.shop?.name}
                        </h3>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href="/" passHref>
                      <Button variant={"outline"} size={"sm"}>
                        Back to Buyer Account
                      </Button>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          <main className="p-6 bg-neutral-50 h-full">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
