import { RouterProvider } from 'react-router-dom';
import AppRouter from './routes/AppRouter';

const App = () => {
  return <RouterProvider router={AppRouter} />;
};

export default App;
