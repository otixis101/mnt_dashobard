import useSWR from "swr";

const useFetchSubscriptionPlans = () => {
  const { data, error, mutate } = useSWR<APIResponse<DbSubscriptionPlans[]>>(
    "stripe-payment/plans"
  );

  return {
    data: data?.data,
    isLoading: !error && !data,
    isError: !!error,
    mutate,
  };
};

export default useFetchSubscriptionPlans;
