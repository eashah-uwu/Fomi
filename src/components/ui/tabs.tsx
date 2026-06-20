"use client";

import * as React from "react";
import { Tabs as TabsPrimitive } from "radix-ui";
import { cn } from "@/lib/utils";

type TabsProps = React.ComponentProps<typeof TabsPrimitive.Root> & {
  children?: React.ReactNode;
  className?: string;
};

type TabsListProps = React.ComponentProps<typeof TabsPrimitive.List> & {
  children?: React.ReactNode;
  className?: string;
};

type TabsTriggerProps = React.ComponentProps<typeof TabsPrimitive.Trigger> & {
  children?: React.ReactNode;
  className?: string;
};

const TabsRootPrimitive = TabsPrimitive.Root as React.ComponentType<TabsProps>;
const TabsListPrimitive = TabsPrimitive.List as React.ComponentType<TabsListProps>;
const TabsTriggerPrimitive = TabsPrimitive.Trigger as React.ComponentType<TabsTriggerProps>;

function Tabs({ className, ...props }: TabsProps) {
  return <TabsRootPrimitive data-slot="tabs" className={cn("flex flex-col", className)} {...props} />;
}

function TabsList({ className, ...props }: TabsListProps) {
  return (
    <TabsListPrimitive
      data-slot="tabs-list"
      className={cn("inline-flex items-center", className)}
      {...props}
    />
  );
}

function TabsTrigger({ className, ...props }: TabsTriggerProps) {
  return (
    <TabsTriggerPrimitive
      data-slot="tabs-trigger"
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap outline-none disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger };
