import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const Testi = dynamic(() => import('../components/test'), {
  ssr: false,
});

const Test = () => {
  const [SSR, setSSR] = useState(false);

  useEffect(() => {
    setSSR(true);
  }, []);

  return (
    <div>
      <h1>{SSR ? 'Loaded' : 'Loading...'}</h1>
      {SSR && <Testi />}
    </div>
  );
};

export default Test;
