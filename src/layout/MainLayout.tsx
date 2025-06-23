import { Outlet, Link } from 'react-router-dom';
import { LayoutDashboard, Calendar, Users, Settings } from 'lucide-react';

export function MainLayout() {
  // Mock de dados do usuário
  const businessName = "Barbearia do Dev";
  const userName = "Samuel Dinho";

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 bg-gray-800 text-white flex flex-col">
        <div className="h-16 flex items-center justify-center px-4 bg-gray-900">
          <h1 className="text-xl font-bold">{businessName}</h1>
        </div>
        <nav className="flex-1 px-2 py-4 space-y-2">
          <Link to="/" className="flex items-center px-4 py-2.5 rounded-lg hover:bg-gray-700 transition-colors">
            <LayoutDashboard className="w-5 h-5 mr-3" />
            Dashboard
          </Link>
          <Link to="/agendamentos" className="flex items-center px-4 py-2.5 rounded-lg hover:bg-gray-700 transition-colors">
            <Calendar className="w-5 h-5 mr-3" />
            Agendamentos
          </Link>
          <Link to="/clientes" className="flex items-center px-4 py-2.5 rounded-lg hover:bg-gray-700 transition-colors">
            <Users className="w-5 h-5 mr-3" />
            Clientes
          </Link>
          <Link to="/configuracoes" className="flex items-center px-4 py-2.5 rounded-lg hover:bg-gray-700 transition-colors">
            <Settings className="w-5 h-5 mr-3" />
            Configurações
          </Link>
        </nav>
        <div className="p-4 border-t border-gray-700">
          <p className="text-sm">{userName}</p>
          <button className="text-xs text-red-400 hover:underline mt-1">
            Sair
          </button>
        </div>
      </aside>

      {/* Conteúdo Principal */}
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet /> {/* As páginas filhas serão renderizadas aqui */}
      </main>
    </div>
  );
}