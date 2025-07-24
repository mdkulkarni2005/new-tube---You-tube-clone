import { StudioLayout } from "@/modules/studio/ui/layout/studio-layout";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const layout = ({ children }: LayoutProps) => {
  return (
    <StudioLayout>
        {children}
    </StudioLayout>
)
};

export default layout;
