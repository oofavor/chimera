import { globalCss, NextUIProvider } from '@nextui-org/react';
import { UserProvider } from './contexts/user';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import { CreateRelation } from './components/CreateRelation';
import Testi from './components/test';
import { Layout } from './components/Layout';

const App = () => {
  globalCss({
    body: { height: '100%' },
    html: { height: '100%' },
    '#root': { height: '100%' },
    '#root > div[data-overlay-container="true"]': { height: '100%' },
  })();
  const MainLayout = (
    <Layout>
      <Outlet />
    </Layout>
  );
  return (
    <BrowserRouter>
      <NextUIProvider>
        <UserProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={MainLayout}>
              <Route path="create" element={<CreateRelation />} />
              <Route path="test" element={<Testi />} />
            </Route>
          </Routes>
        </UserProvider>
      </NextUIProvider>
    </BrowserRouter>
  );
};

export default App;
