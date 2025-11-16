import { lazy, Suspense } from 'react';
const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard'));
import './App.css';
import Loader from './components/common/Loader/Loader';

function App() {
  return (
    <Suspense fallback={<Loader text="Loading..." />}>
      <Dashboard />
    </Suspense>
  );
}

export default App;




