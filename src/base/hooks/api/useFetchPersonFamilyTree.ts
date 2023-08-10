import useSWR from "swr";

interface FetchPersonFamilyTreeResponse {
  data: {
    readonly relationship?: DbRelationship;
    readonly user: DbPerson;
  };
  message: string;
  success: boolean;
}
const useFetchPersonFamilyTree = (personId?: string) => {
  const { data, error } = useSWR<FetchPersonFamilyTreeResponse, Error>(
    personId ? `person/family/all?personId=${personId}` : "person/family/all"
  );

  return {
    data: data?.data ?? undefined,
    isLoading: !error && !data,
    isError: !!error,
  };
};

export default useFetchPersonFamilyTree;
