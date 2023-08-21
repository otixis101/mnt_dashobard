import React from "react";
import Image, { StaticImageData } from "next/image";
import { cn } from "@/base/utils";
import Avatar from "@/components/atoms/Avatar";
import useFetchImmediateFamily from "@/base/hooks/api/useFetchImmediateFamily";
import PhotoFlowLoader from "../../PhotoFlow/PhotoFlowLoader";

interface CardProps {
  name: string;
  img?: string | StaticImageData;
  label?: string;
  className?: string;
}

interface TRenderFamily extends DbContributor {
  relationShip?: string;
}

const CardBox = ({ label, img, name, className }: CardProps) => (
  <div
    className={cn(
      "my-2 flex items-center rounded-lg bg-midpup p-2 text-gray-800 md:p-3",
      label && "bg-primary text-gray-200",
      className
    )}
  >
    <div className="relative mr-2 h-12 w-12 overflow-hidden rounded-md">
      {img ? (
        <Image src={img} alt="user" fill className="" />
      ) : (
        <Avatar name={name} className="text-3xl" />
      )}
    </div>
    <h2 className="mr-2 text-[1rem] font-medium capitalize md:text-lg">
      {name}
    </h2>
    {label && (
      <span className="ml-auto rounded-3xl bg-midpup p-1 text-[.7rem] text-gray-800 md:text-[1rem]">
        {label}
      </span>
    )}
  </div>
);

const renderFamilyCard = (data: TRenderFamily[]) => {
  if (data.length > 0)
    return data.map(
      ({ firstName, lastName, relationShip, profilePhotoUrl }) => (
        <CardBox
          key={firstName + lastName}
          name={`${firstName} ${lastName}`}
          img={profilePhotoUrl}
          label={relationShip}
        />
      )
    );

  return <div className="py-4">No available data found</div>;
};

interface IFamilyCard {
  title: string;
  children: React.ReactNode;
}

const FamilyCard = ({ children, title }: IFamilyCard) => (
  <div>
    <h4 className="mb-1 text-lg font-medium text-gray-600">{title}</h4>
    {children}
  </div>
);

const FamilyMembers = ({ personId }: { personId: string }) => {
  const { data, isLoading } = useFetchImmediateFamily(personId);

  const addRelationShip = (
    arg: DbContributor[],
    relationShip?: string
  ): TRenderFamily[] => {
    if (!relationShip) return arg;

    return arg.map((family) => ({
      ...family,
      relationShip,
    }));
  };

  return (
    <div className="flex w-full flex-col space-y-4 md:mx-8 md:w-7/12 md:p-4">
      {isLoading ? (
        <PhotoFlowLoader className="h-auto" />
      ) : (
        <React.Fragment>
          <h2 className="text-2xl font-extrabold capitalize text-primary md:text-[2rem]">
            Family Members
          </h2>
          {data ? (
            <React.Fragment>
              <FamilyCard title="Parents">
                {renderFamilyCard(data.parents)}
              </FamilyCard>
              <FamilyCard title="Spouse & Children">
                {renderFamilyCard([
                  ...addRelationShip(data.spouse, "spouse"),
                  ...data.children,
                ])}
              </FamilyCard>
              <FamilyCard title="Siblings">
                {renderFamilyCard(data.siblings)}
              </FamilyCard>
            </React.Fragment>
          ) : (
            <div className="pt-10 text-left">
              No family member data to display
            </div>
          )}
        </React.Fragment>
      )}
    </div>
  );
};

export default FamilyMembers;
