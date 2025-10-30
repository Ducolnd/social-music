"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePathname, useRouter } from "next/navigation";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  
  // Extract the current tab from pathname
  const parts = pathname.split('/');
  const currentTab = parts.length === 3 ? '/' : '/' + parts[parts.length - 1];

  const tabs = [
    { value: '/', label: 'Account' },
    { value: '/connections', label: 'Connections' },
    { value: '/context', label: 'Context' },
    { value: '/billing', label: 'Billing' },
  ];

  return (
    <div>
      <div className="flex justify-between items-end mb-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white hidden md:block">
          Settings
        </h1>
      </div>

      <Tabs 
        value={currentTab} 
        onValueChange={(value) => router.push(`/dashboard/settings${value}`)}
        className="mb-8"
      >
        <TabsList>
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {children}
    </div>
  );
}
