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
import HorarioPage from '../features/horario/pages/HorarioPage'
import MateriaPage from '../features/subjects/pages/MateriaPage'
import PendientesPage from '../features/pendientes/pages/PendientesPage'

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
          <Route path="/horario" element={<HorarioPage />} />
          <Route path="/materia/:id" element={<MateriaPage />} />
          <Route path="/pendientes" element={<PendientesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
