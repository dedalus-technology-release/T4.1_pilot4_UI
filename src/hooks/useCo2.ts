import { useQuery } from "@tanstack/react-query";

import { Co2 } from "../api/models";

import { getCo2 } from "../api/co2";

export const useCo2 = (building: string, apartment: string) => {
  const query = useQuery<Co2[]>({
    enabled: !!apartment,
    queryKey: ["co2", building, apartment],
    queryFn: () => getCo2(building, apartment),
    placeholderData: [],
    // staleTime: 1000 * 60 * 15, //keep data fresh for 15 min
    // gcTime: 1000 * 60 * 15, //cache is kept for 15 minutes
    refetchOnMount: false,
    retry: false,
  });
  return query;
};