import NavBar from "@/components/molecules/NavBar";
import React from "react";
import SEO from "./SEO";

interface RootLayoutProps {
  children: React.ReactNode;
  seo?: Partial<SEOobject>;
  type: TemplateType;
}

const LandingLayout = ({ children, seo, type }: RootLayoutProps) => (
  <div>
    <SEO {...seo} ogType={type} />

    <NavBar />

    <main className="bg-white">{children}</main>

    {/* Footer shoould be here */}
  </div>
);

export default LandingLayout;
