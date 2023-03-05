import { fetcher, QueryKeys } from '@lib/queryClient';
import { useQueries } from 'react-query';

const fetchTokenDetailById = async (id: string) => {
  return await fetcher({
    method: 'GET',
    params: { vs_currencies: 'USD', ids: id },
  });
};

const useGetDetailsOfTokensByIds = (...ids: string[]) => {
  return useQueries(
    ids.map((id: string) => ({ queryKey: [QueryKeys.TOKEN_INFO, id], queryFn: () => fetchTokenDetailById(id) }))
  );
};

export default useGetDetailsOfTokensByIds;
