import useSWR from "swr";

const useFetchUserSubscription = () => {
  const { data, error, mutate } =
    useSWR<APIResponse<DbPrice>>("stripe-payment"); // DbPrice is not really the type for the response

  return {
    data: data?.data,
    isLoading: !error && !data,
    isError: !!error,
    mutate,
  };
};

export default useFetchUserSubscription;
