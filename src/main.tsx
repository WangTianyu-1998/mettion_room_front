import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import { ErrorPage } from './pages/error-page';
import { Login } from './pages/login';
import { Register } from './pages/register';
import { UpdatePassword } from './pages/update-password';
import { Index } from './pages/index';
import { UpdateInfo } from './pages/update-info';

const routes = [
  {
    path: '/',
    element: <Index></Index>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'update-info',
        element: <UpdateInfo />,
      },
      {
        path: 'bbb',
        element: <div>bbb</div>,
      },
    ],
  },
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: 'register',
    element: <Register />,
  },
  {
    path: 'update_password',
    element: <UpdatePassword />,
  },
];
// const router = createBrowserRouter(routes);

const Routes = () => {
  const routing = useRoutes(routes);
  return routing;
};

const Routers = () => {
  return (
    <BrowserRouter basename="mettion_room_front">
      <Routes />
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(<Routers />);
