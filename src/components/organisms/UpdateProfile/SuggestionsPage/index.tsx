import SuggestionCard from "@/components/molecules/SuggestionCard";

const SuggestionsPage = () => (
  <div className="mx-auto w-full max-w-xs py-20 max-sm:mx-auto sm:max-w-lg">
    <SuggestionCard
      addedBy={{
        name: "Ugona Miller",
        image: "/assets/hero_bg.jpg",
      }}
      profileImage="/assets/family-legacy.png"
      name="Added By"
      state="Kogi"
    />
  </div>
);

export default SuggestionsPage;
