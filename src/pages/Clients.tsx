import { useState } from 'react';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { ClientForm } from '../components/ClientForm';
import { PlusCircle, FilePenLine, Trash2 } from 'lucide-react';

interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
}

type NewClientData = Omit<Client, 'id'>;

export function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([
    { id: 1, name: 'João da Silva', email: 'joao@exemplo.com', phone: '(47) 99999-1111' },
    { id: 2, name: 'Maria Oliveira', email: 'maria@exemplo.com', phone: '(47) 99999-2222' },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // NOVO: Estado para guardar o cliente que está sendo editado
  const [editingClient, setEditingClient] = useState<Client | null>(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingClient(null); // Limpa o cliente em edição ao fechar
  };

  // NOVO: Abre o modal para adicionar um novo cliente
  const handleAddNewClient = () => {
    setEditingClient(null); // Garante que não estamos em modo de edição
    openModal();
  };
  
  // NOVO: Abre o modal para editar um cliente existente
  const handleEditClient = (client: Client) => {
    setEditingClient(client);
    openModal();
  };

  // NOVO: Deleta um cliente após confirmação
  const handleDeleteClient = (clientId: number) => {
    if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
      setClients(clients.filter(client => client.id !== clientId));
    }
  };

  // ALTERADO: Função de salvar agora lida com Adicionar e Editar
  const handleSaveClient = (clientData: NewClientData) => {
    if (editingClient) {
      // Modo Edição
      setClients(clients.map(client => 
        client.id === editingClient.id ? { ...client, ...clientData } : client
      ));
    } else {
      // Modo Adição
      const newClient: Client = {
        id: Date.now(),
        ...clientData
      };
      setClients([...clients, newClient]);
    }
    closeModal();
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Clientes</h1>
        <Button onClick={handleAddNewClient}> {/* ALTERADO */}
          <PlusCircle className="w-5 h-5 mr-2" />
          Adicionar Cliente
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Telefone</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {clients.map(client => (
              <tr key={client.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{client.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{client.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{client.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right space-x-2">
                  {/* ALTERADO: Botões agora chamam as novas funções */}
                  <button onClick={() => handleEditClient(client)} className="text-blue-600 hover:text-blue-800 p-1"><FilePenLine size={18} /></button>
                  <button onClick={() => handleDeleteClient(client.id)} className="text-red-600 hover:text-red-800 p-1"><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* ALTERADO: Título do modal é dinâmico e passamos os dados iniciais */}
      <Modal isOpen={isModalOpen} onClose={closeModal} title={editingClient ? 'Editar Cliente' : 'Adicionar Novo Cliente'}>
        <ClientForm 
          onSave={handleSaveClient}
          onCancel={closeModal}
          initialData={editingClient}
        />
      </Modal>
    </>
  );
}