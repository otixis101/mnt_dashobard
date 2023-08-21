import AppLayout from "@/components/Layouts/AppLayout";
import SearchCard from "@/components/atoms/Searchcard";
import PhotoFlowLoader from "@/components/molecules/PhotoFlow/PhotoFlowLoader";
import SearchBar from "@/components/molecules/SearchBar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const SearchResultPage = () => {
  const router = useRouter();
  const { query } = router;
  const { data: session } = useSession();

  const { q } = query;
  const [searchValue, setSearchValue] = useState(q as string);
  const [data, setData] = useState<DbPerson[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (value: string) => {
    setIsLoading(true);
    setData(null);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/person/search?q=${value}`,
        {
          headers: {
            Authorization: `Bearer ${session?.user?.accessToken}`,
          },
        }
      );
      if (res && res.ok) {
        const { data: person } = await res.json();
        setData(person);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (q && session) {
      handleSearch(q as string);
    }
  }, []);

  console.log(data);

  return (
    <AppLayout hideSpirals showUser name="" image="" type="website">
      <div className="mx-auto mt-5 w-full md:w-2/4">
        <SearchBar
          value={searchValue}
          onChange={(value) => setSearchValue(value)}
          placeholder="hello"
          onSearch={() => handleSearch(searchValue)}
        />

        <div className="mt-10 flex flex-wrap gap-6">
          {isLoading && (
            <div className="mx-auto text-center">
              <PhotoFlowLoader />
            </div>
          )}
          {data &&
            data.length > 0 &&
            data.map(({ _id, profilePhotoUrl, firstName, lastName }) => (
              <SearchCard
                key={_id}
                title={`${firstName} ${lastName}`}
                image={profilePhotoUrl}
                userId={_id}
              />
            ))}

          {data && data.length === 0 && (
            <p className="w-full text-center">No results found</p>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default SearchResultPage;
