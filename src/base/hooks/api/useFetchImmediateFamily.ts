import useSWR from "swr";

interface FetchImmediateFamily {
  data: {
    readonly personId: string;
    readonly parents: DbContributor[];
    readonly spouse: DbContributor[];
    readonly children: DbContributor[];
    readonly siblings: DbContributor[];
  };
  message: string;
  success: boolean;
}
const useFetchImmediateFamily = (personId?: string) => {
  const { data, error } = useSWR<FetchImmediateFamily, Error>(
    personId
      ? `person/family/immediate?personId=${personId}`
      : "person/family/immediate"
  );

  return {
    data: data?.data ?? undefined,
    isLoading: !error && !data,
    isError: !!error,
  };
};

export default useFetchImmediateFamily;
