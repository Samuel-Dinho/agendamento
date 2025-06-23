import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/Button';
import React from 'react';

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault(); // Impede o recarregamento da página
    login(); // Define nosso estado de autenticação para 'true'
    navigate('/'); // Redireciona para o Dashboard
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-lg">

        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Bem-vindo de volta!</h1>
          <p className="mt-2 text-gray-600">Faça login para gerenciar seus agendamentos.</p>
        </div>

        <form className="space-y-6" onSubmit={handleLogin}>
          {/* Seus inputs de email e senha... */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              E-mail
            </label>
            <input id="email" name="email" type="email" required className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm" />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Senha
            </label>
            <input id="password" name="password" type="password" required className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm" />
          </div>

          <div className="pt-4">
            <Button type="submit">
              Entrar
            </Button>
          </div>

        </form>
      </div>
    </div>
  );
}