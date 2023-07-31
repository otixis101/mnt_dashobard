import useSWR from "swr";

interface PersonSetting {
  data: DbPerson;
}

const useFetchPersonSetting = (personId: string) => {
  const { data, error, mutate } = useSWR<PersonSetting, Error>(
    personId ? `person?personId=${personId}` : null
  );
  return {
    data: data?.data,
    isLoading: !error && !data,
    isError: !!error,
    mutate,
  };
};

export default useFetchPersonSetting;
