import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// pages
import HomePage from '../pages/HomePage';
import CreatePage from '../pages/CreatePage';
import NotFoundPage from '../pages/NotFoundPage';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/create' element={<CreatePage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
