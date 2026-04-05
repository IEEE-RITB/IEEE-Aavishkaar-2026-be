import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from './components/layout/AppShell'
import { Landing } from './pages/Landing'
import { Events } from './pages/Events'
import { EventDetail } from './pages/EventDetail'
import { Register } from './pages/Register'
import { Confirmation } from './pages/Confirmation'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<Landing />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:slug" element={<EventDetail />} />
          <Route path="/events/:slug/register" element={<Register />} />
          <Route path="/events/:slug/confirmation" element={<Confirmation />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
