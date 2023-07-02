import AuthNavBar from "@/components/molecules/AuthNavBar";
import SEO from "../LandingLayout/SEO";

interface Props {
  children: React.ReactNode;
  seo?: Partial<SEOobject>;
  type: TemplateType;
  hideLogo?: boolean;
}

const AuthLayout = (props: Props) => {
  const { children, type, seo, hideLogo } = props;

  return (
    <div className="bg-white text-black">
      <SEO {...seo} ogType={type} />
      <AuthNavBar hideLogo={hideLogo} />
      <main>{children}</main>
    </div>
  );
};

export default AuthLayout;
