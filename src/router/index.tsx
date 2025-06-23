import type { ReactNode } from 'react'; // Adicionamos 'type' aqui
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

import { LoginPage } from '../pages/Login';
import { DashboardPage } from '../pages/Dashboard';
import { MainLayout } from '../layout/MainLayout';
import { ClientsPage } from '../pages/Clients';
import { AppointmentsPage } from '../pages/AppointmentsPage';
import { SettingsPage } from '../pages/SettingsPage';
// Componente para proteger rotas
// CORREÇÃO: Trocamos JSX.Element por ReactNode para ser mais flexível
function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: <DashboardPage />,
      },
      {
        path: "/clientes", // 2. Adicione esta nova rota
        element: <ClientsPage />,
      },
      {
        path: "/agendamentos", // 2. Adicione a nova rota
        element: <AppointmentsPage />,
      },
      {
        path: "/configuracoes", // 2. Adicione a nova rota
        element: <SettingsPage />,
      },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}