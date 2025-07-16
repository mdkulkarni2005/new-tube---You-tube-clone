import { HomeLayout } from "@/modules/home/ui/layout/home-layout";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const layout = ({ children }: LayoutProps) => {
  return (
    <HomeLayout>
        {children}
    </HomeLayout>
)
};

export default layout;
