import { useQuery } from "@tanstack/react-query"

import {  Energy, FlexibilityHeating } from "../api/models"

import { getFlexibilityHeating, getTodaysEnergy } from "../api/energy";

export const useFlexiblityHeatingForecast = (building: string, apartment: string) => {
  const query = useQuery<FlexibilityHeating[]>({
    enabled: !!apartment,
    queryKey: ["flexibilityHeating", building, apartment],
    queryFn: () => getFlexibilityHeating(building, apartment),
    placeholderData: [],
    // staleTime: 1000 * 60 * 15, //keep data fresh for 15 min
    // gcTime: 1000 * 60 * 15, //cache is kept for 15 minutes
    refetchOnMount: false,
    retry: false,
  });
  return query;
};
export const useTodaysEnergy = (building: string, apartment: string) => {
  const query = useQuery<Energy>({
    enabled: !!apartment,
    queryKey: ["energy", building, apartment],
    queryFn: () => getTodaysEnergy(building, apartment),
    // placeholderData: [],
    // staleTime: 1000 * 60 * 15, //keep data fresh for 15 min
    // gcTime: 1000 * 60 * 15, //cache is kept for 15 minutes
    refetchOnMount: false,
    retry: false,
  });
  return query;
};
