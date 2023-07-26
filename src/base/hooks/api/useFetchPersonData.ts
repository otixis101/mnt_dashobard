import useSWR from "swr";

interface PersonResponse {
  data: DbPerson;
}
const useFetchPerson = (personId: string) => {
  const { data, error, mutate } = useSWR<PersonResponse, Error>(
    personId ? `person?personId=${personId}` : null
  );

  return {
    data: data?.data,
    isLoading: !error && !data,
    isError: !!error,
    mutate,
  };
};

export default useFetchPerson;
