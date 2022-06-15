import {
  Input,
  keyframes,
  Loading,
  styled,
  Text,
  useInput,
  User as UserComponent,
} from '@nextui-org/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { User } from '../types/models';

export const PeerDropdown = () => {
  const [peers, setPeers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const { value, bindings } = useInput('');

  useEffect(() => {
    let timeout = setTimeout(async () => {
      if (!(value.length > 2)) return;
      setLoading(true);
      const req = await axios
        .get<User[]>(`/api/users/search/${value}`)
        .catch((err) => console.log(1234));
      setTimeout(() => setLoading(false), 200);
      if (!req) return;
      setPeers(req.data);
    }, 200);
    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <div style={{ position: 'relative', zIndex: 9999 }}>
      <Input
        labelLeft="@"
        bordered
        css={{ zIndex: 10000, background: '$background' }}
        color="primary"
        fullWidth
        {...bindings}
      />
      {value.length > 2 && (
        <Autocomplete>
          {loading ? (
            <Loading />
          ) : !peers.length ? (
            <Text>Nothing to show</Text>
          ) : (
            peers.map((item) => <ShortUserInfo key={item.id} item={item} />)
          )}
        </Autocomplete>
      )}
    </div>
  );
};

const ShortUserInfo = ({ item }: { item: User }) => {
  return <UserComponent name={item.name} />;
};

const slide = keyframes({
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
});

const Autocomplete = styled('div', {
  position: 'absolute',
  background: '$accents1',
  transform: 'translateY(-18px)',
  paddingTop: '20px',
  zIndex: 9999,
  left: -2,
  right: -2,
  borderBottomLeftRadius: '10px',
  borderBottomRightRadius: '10px',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  gap: '5px',
  minHeight: '60px',
  animation: `${slide} 300ms`,
  maxHeight: '250px',
  overflowY: 'scroll',
  '&::-webkit-scrollbar': {
    position: 'absolute',
    width: 6,
    background: '$accents4',
  },
  '&::-webkit-scrollbar-thumb': {
    background: '$accents5',
    borderRadius: '10px',
  },
  '&::-webkit-scrollbar-thumb:active': {
    background: '$accents6',
  },
});
