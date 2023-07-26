import useSWR from "swr";

interface PersonResponse {
  data: DbPerson;
}
const useSearchPerson = (keyword: string) => {
  const { data, error, mutate } = useSWR<PersonResponse, Error>(
    keyword ? `person?search?q=${keyword}` : null
  );

  return {
    data: data?.data,
    isLoading: !error && !data,
    isError: !!error,
    mutate,
  };
};

export default useSearchPerson;
