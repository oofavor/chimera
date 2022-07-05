import { styled } from '@nextui-org/react';
import axios from 'axios';
import { useEffect } from 'react';
import { useQuery } from 'react-query';

export const Sidebar = () => {
  const {data, isError, isFetching} = useQuery('sidebar', async () => {
    return await axios.get('/api/relations/relations');
  })
  console.log(data)
  return <Wrapper></Wrapper>;
};

const Wrapper = styled('div', {
  height: '100%',
  width: 300,
  backgroundColor: '#ccc'
});
