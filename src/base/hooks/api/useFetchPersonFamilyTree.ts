import useSWR from "swr";

const useFetchPersonFamilyTree = (personId?: string) => {
  const { data, error } = useSWR(
    personId ? `person/family/all?personId=${personId}` : "person/family/all"
  );

  return {
    data: data ?? [],
    isLoading: !error && !data,
    isError: !!error,
  };
};

export default useFetchPersonFamilyTree;
