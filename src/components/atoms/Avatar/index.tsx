import { cn } from "@/base/utils";

interface Props {
  name: string | { firstName: string; lastName: string };
  className?: string;
}

const getUserInitials = (name: Props["name"]) => {
  if (typeof name === "string") {
    const [firstName, lastName] = name.split(" ");

    if (lastName) return firstName[0] + lastName[0];

    return firstName[0] + firstName[firstName.length - 1];
  }

  return name.firstName[0] + name.lastName[0];
};

const Avatar = (props: Props) => {
  const { name, className } = props;

  return (
    <div
      className={cn(
        "flex h-[40px] w-[40px] items-center justify-center rounded-full bg-[#435466] text-xl font-bold uppercase text-white md:h-[50px] md:w-[50px] md:text-2xl",
        className
      )}
    >
      {getUserInitials(name)}
    </div>
  );
};

export default Avatar;
