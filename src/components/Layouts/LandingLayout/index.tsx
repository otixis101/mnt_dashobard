import Footer from "@/components/molecules/Footer";
import NavBar from "@/components/molecules/NavBar";
import React from "react";
import SEO from "./SEO";

interface RootLayoutProps {
  children: React.ReactNode;
  seo?: Partial<SEOobject>;
  type: TemplateType;
}

const LandingLayout = ({ children, seo, type }: RootLayoutProps) => (
  <div className="bg-white text-black">
    <SEO {...seo} ogType={type} />

    <NavBar />

    <main>{children}</main>

    <Footer />
  </div>
);

export default LandingLayout;
