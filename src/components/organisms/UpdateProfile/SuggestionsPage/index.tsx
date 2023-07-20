import SuggestionCard from "@/components/molecules/SuggestionCard";
import useStore from "@/base/store";

const SuggestionsPage = () => {
  const { suggestions } = useStore();

  console.log(suggestions);

  return (
    <div className="mx-auto w-full max-w-xs py-20 max-sm:mx-auto sm:max-w-lg">
      <SuggestionCard
        addedBy={{
          name: `hello`,
          image: "/assets/hero_bg.jpg",
        }}
        profileImage="/assets/family-legacy.png"
        name="hello"
        state="Hi"
      />
    </div>
  );
};

export default SuggestionsPage;
