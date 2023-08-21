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
        "absolute bottom-0 flex h-full w-full items-center justify-center bg-primary/40 text-8xl uppercase tracking-wider text-white",
        className
      )}
    >
      {getUserInitials(name)}
    </div>
  );
};

export default Avatar;
