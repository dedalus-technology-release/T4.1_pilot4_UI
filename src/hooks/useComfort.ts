import { useQuery } from "@tanstack/react-query"

import { TSV } from "../api/models"

import { getSPMV, getTsv } from "../api/comfort"

export const useTsv = () => {
  const query = useQuery<TSV[]>({
    queryKey: ["tsv"],
    queryFn: getTsv,
    placeholderData: [],
    staleTime: 1000 * 60 * 15, //keep data fresh for 15 min
    gcTime: 1000 * 60 * 15, //cache is kept for 15 minutes
    refetchOnMount: false,
    retry: false,
  })
  return query
}

export const useSPMV = () => {
  const query = useQuery<TSV[]>({
    queryKey: ["spmv"],
    queryFn: getSPMV,
    placeholderData: [],
    staleTime: 1000 * 60 * 15, //keep data fresh for 15 min
    gcTime: 1000 * 60 * 15, //cache is kept for 15 minutes
    refetchOnMount: false,
    retry: false,
  })
  return query
}