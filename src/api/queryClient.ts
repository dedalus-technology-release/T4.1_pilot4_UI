import { QueryCache, QueryClient } from "@tanstack/react-query";
import useAlertToast from "../hooks/useAlertToast";

const { notifyError } = useAlertToast();

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
  queryCache: new QueryCache({
    onError: (error: any) => {
      if (error.status === 401) {
        window.location.href = "/login";
      }

      notifyError(error.message);
    },
  }),
});
