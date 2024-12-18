import { Routes, Route } from 'react-router-dom'
// pages
import HomePage from '../pages/HomePage'
import CreatePage from '../pages/CreatePage'
import GamePage from '../pages/GamePage'
import NotFoundPage from '../pages/NotFoundPage'

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/create' element={<CreatePage />} />
      <Route path='/game/:id' element={<GamePage />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  )
}

export default AppRouter
