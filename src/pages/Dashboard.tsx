import { useSPMV, useTsv } from "../hooks/useComfort";
import { useConsumption } from "../hooks/useConsumption";

export const Dashboard = () => {
  const {
    data: tsvData,
    isPending: tsvPending,
    isFetching: tsvFetching,
  } = useTsv();

  const {
    data: spmvData,
    isPending: spmvPending,
    isFetching: spmvFetching,
  } = useSPMV();

  const {
    data: consumptionData,
    isPending: consumptionPending,
    isFetching: consumptionFetching,
  } = useConsumption();

  const loadingTsv = tsvPending || tsvFetching;
  const loadingSpmv = spmvPending || spmvFetching;
  const loadingConsumption = consumptionPending || consumptionFetching;
  console.log("spmv", spmvData);
  const loading = loadingTsv || loadingSpmv || loadingConsumption;
  console.log("tsv", tsvData);
  console.log("consumptionData", consumptionData);
  console.log("loading", loading);

  return <div>Dashboard</div>;
};
