import { useQuery } from "@tanstack/react-query";

import { SPMV } from "../api/models";

import { getRecommendation, getSPMV } from "../api/comfort";

export const useSPMV = (building: string, apartment: string) => {
  const query = useQuery<SPMV[]>({
    enabled: !!apartment,
    queryKey: ["spmv", building, apartment],
    queryFn: () => getSPMV(building, apartment),
    placeholderData: [],
    // staleTime: 1000 * 60 * 15, //keep data fresh for 15 min
    // gcTime: 1000 * 60 * 15, //cache is kept for 15 minutes
    refetchOnMount: false,
    retry: false,
  });
  return query;
};

export const useRecommendation = (building: string, apartment: string) => {
  const query = useQuery<any>({
    enabled: !!apartment,
    queryKey: ["recommendation", building, apartment],
    queryFn: () => getRecommendation(building, apartment),
    placeholderData: [],
  });

  return query;
};

// export const useTsv = () => {
//   const query = useQuery<TSV[]>({
//     queryKey: ["tsv"],
//     queryFn: getTsv,
//     placeholderData: [],
//     staleTime: 1000 * 60 * 15, //keep data fresh for 15 min
//     gcTime: 1000 * 60 * 15, //cache is kept for 15 minutes
//     refetchOnMount: false,
//     retry: false,
//   });
//   return query;
// };