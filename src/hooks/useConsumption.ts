import { useQuery } from "@tanstack/react-query"

import { Consumption } from "../api/models"

import { getConsumption } from "../api/consumption"

export const useConsumption = () => {
  const query = useQuery<Consumption[]>({
    queryKey: ["consumption"],
    queryFn: getConsumption,
    placeholderData: [],
    staleTime: 1000 * 60 * 15, //keep data fresh for 15 min
    gcTime: 1000 * 60 * 15, //cache is kept for 15 minutes
    refetchOnMount: false,
    retry: false,
  })
  return query
}