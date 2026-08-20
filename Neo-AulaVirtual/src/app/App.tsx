import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import LoginPage from '../features/auth/pages/LoginPage'
import HomePage from '../features/home/pages/HomePage'
import SubjectsPage from '../features/subjects/pages/SubjectsPage'
import NotificationsPage from '../features/notifications/pages/NotificationsPage'
import ProfilePage from '../features/profile/pages/ProfilePage'
import AvancePage from '../features/avance/pages/AvancePage'
import CareerPage from '../features/career/pages/CareerPage'
import PesoAcademico from '../features/profile/pages/PesoAcademicoPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Pantallas públicas (sin menú) */}
        <Route path="/login" element={<LoginPage />} />

        {/* Pantallas dentro del layout (con menú inferior) */}
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/materias" element={<SubjectsPage />} />
          <Route path="/notificaciones" element={<NotificationsPage />} />
          <Route path="/perfil" element={<ProfilePage />} />
          <Route path="/peso" element={<PesoAcademico/>} />
          <Route path="/avance" element={<AvancePage />} />
          <Route path="/carrera" element={<CareerPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
