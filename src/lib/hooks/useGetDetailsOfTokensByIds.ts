import { fetcher, QueryKeys } from '@lib/queryClient';
import { useQueries } from 'react-query';

const fetchTokenById = async (id: string) => {
  return await fetcher({
    method: 'GET',
    params: { vs_currencies: 'USD', ids: id },
  });
};

const useGetDetailsOfTokensByIds = (...ids: string[]) => {
  return useQueries(ids.map((id: string) => ({ queryKey: [QueryKeys, id], queryFn: () => fetchTokenById(id) })));
};

export default useGetDetailsOfTokensByIds;
