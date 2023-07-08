import UserProfileBody from "@/components/molecules/UserProfileSetting/UserProfileBody";
import UserProfileHeader from "@/components/molecules/UserProfileSetting/UserProfileHeader";

const UserProfileSetting = () => (
  <section className="container h-[99vh] px-7">
    <UserProfileHeader />
    <UserProfileBody />
  </section>
);

export default UserProfileSetting;
