import Footer from "@/components/molecules/Footer";
import NavBar from "@/components/molecules/NavBar";
import React, { useEffect, useState } from "react";
import Payment from "../../molecules/Payment";
import { Dialog, DialogContent } from "../../atoms/Popup/TestPopUp";
import SEO from "./SEO";

interface RootLayoutProps {
  children: React.ReactNode;
  seo?: Partial<SEOobject>;
  type: TemplateType;
}

const Trigger = () => {
  const [open, setOpen] = useState(true);
  return (
    <Dialog open={open} onOpenChange={setOpen} modal>
      <DialogContent>
        <Payment
          btnText="Continue with free account"
          subscribeText="Subscribe to premium"
        />
      </DialogContent>
    </Dialog>
  );
};

const LandingLayout = ({ children, seo, type }: RootLayoutProps) => {
  const [popUp, setPopUp] = useState(false);
  const subscriptionPopUp = () => {
    setTimeout(() => {
      setPopUp(true);
    }, 3000);
  };

  useEffect(() => {
    subscriptionPopUp();
  }, []);

  return (
    <div className="bg-white text-black">
      {popUp && <Trigger />}
      <SEO {...seo} ogType={type} />

      <NavBar />

      <main>{children}</main>

      <Footer />
    </div>
  );
};
export default LandingLayout;
