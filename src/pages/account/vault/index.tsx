/* eslint-disable import/no-named-as-default */

// import SearchBar from "@/components/molecules/SearchBar";
// import router from "next/router";
import UploadVault from "@/components/organisms/DocumentVault/UploadVault";
import VaultsRecentUpload from "@/components/organisms/DocumentVault/VaultsRecentUpload";
import AppLayout from "@/components/Layouts/AppLayout";
import VaultBackArrow from "@/components/organisms/DocumentVault/BackArrow";
// import DocPreView from "@/components/organisms/DocumentVault/DocPreView";





const Index = () => (

  <AppLayout hideSpirals showUser>
    <section className="container min-h-screen">
      {/* <div className="z-50 mx-auto mt-5 w-full md:w-2/4">
        <SearchBar
          value=""
          onChange={(value) => (value)}
          onSearch={(value) => router.push(`/search?q=${ value }`)}
          placeholder="Search for people "
        />
      </div> */}

      <VaultBackArrow />
      <main className="lg:grid grid-cols-12 my-10 gap-4 ">
        <UploadVault />
        <VaultsRecentUpload />
        {/* <DocPreView /> */}
      </main>

    </section >
  </AppLayout >
);

export default Index;
