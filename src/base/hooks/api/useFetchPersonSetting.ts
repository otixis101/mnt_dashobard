import useSWR from "swr";

interface PersonSetting extends DbPrivacySettings {
  person: DbPerson;
  email: string;
  membership: string;
  personId: string;
  cardLastNumber?: string;
  cardName?: string;
}

type TData = APIResponse<PersonSetting>;

const useFetchPersonSetting = (personId: string) => {
  const url = `settings/${personId}`;

  const { data, error, mutate } = useSWR<TData, Error>(url);

  return {
    data: data?.data,
    isLoading: !error && !data,
    isError: !!error,
    mutate,
  };
};

export default useFetchPersonSetting;
