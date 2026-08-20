import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from '../features/auth/pages/LoginPage'
import HomePage from '../features/home/pages/HomePage'
import SubjectsPage from '../features/subjects/pages/SubjectsPage'
import CareerPage from '../features/career/pages/CareerPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/materias" element={<SubjectsPage />} />
        <Route path="/carrera" element={<CareerPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
