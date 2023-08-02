import AppNavBar, { AppNavBarProps } from "@/components/molecules/AppNavBar";
import SEO from "../LandingLayout/SEO";

type Props = AppNavBarProps & {
  children: React.ReactNode;
  seo?: Partial<SEOobject>;
  type?: TemplateType;
  hideSpirals?: boolean;
};

const AppLayout = (props: Props) => {
  const {
    children,
    type = "website",
    seo,
    hideSpirals,
    ...navbarProps
  } = props;

  return (
    <div id="for-dialog" className="relative bg-white">
      <SEO {...seo} ogType={type} />
      <AppNavBar {...navbarProps} />
      <main className="relative z-[1] snap-y snap-start scroll-py-20 px-3 max-lg:overflow-y-scroll max-lg:min-h-app">
        {children}
      </main>
      {!hideSpirals && (
        <div className="absolute bottom-0 left-0 right-0 hidden h-[180px] w-full bg-white bg-[url(/assets/footer-spirals.svg)] bg-cover bg-center bg-no-repeat md:block" />
      )}
    </div>
  );
};

export default AppLayout;
