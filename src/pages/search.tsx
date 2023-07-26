import useSearchPerson from "@/base/hooks/api/useSearchPerson";
import AppLayout from "@/components/Layouts/AppLayout";
import SearchCard from "@/components/atoms/Searchcard";
import SearchBar from "@/components/molecules/SearchBar";
import { useRouter } from "next/router";

const SearchResultPage = () => {
  const router = useRouter();

  const { query } = router;

  const { q } = query;

  const { data } = useSearchPerson(q as string);
  console.log(data);

  return (
    <AppLayout hideSpirals type="website">
      <div className="mx-auto mt-5 w-full md:w-2/4">
        <SearchBar
          initialValue={q as string}
          placeholder="hello"
          onSearch={() => {}}
        />

        <div className="mt-10">
          {data && (
            <SearchCard
              title={`${data.firstName} ${data.lastName}`}
              image={data.images[0]}
              onClick={() => {}}
            />
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default SearchResultPage;
