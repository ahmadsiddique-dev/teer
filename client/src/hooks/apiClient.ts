import { useCallback, useState } from "react";

function useApi<T, P>(fetcher: (payload?: P) => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async (payload?: P) => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetcher(payload);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [fetcher]);

  return { data, loading, error, execute };
}

export default useApi;