export function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Cards de resumo virão aqui */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Agendamentos Hoje</h2>
          <p className="text-4xl font-bold mt-2 text-blue-600">12</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Próximos Atendimentos</h2>
          <p className="text-gray-600 mt-2">Lista de próximos...</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Aniversariantes do Mês</h2>
          <p className="text-gray-600 mt-2">Lista de clientes...</p>
        </div>
      </div>
    </div>
  );
}