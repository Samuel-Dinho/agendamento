import { useState } from 'react'; // 1. Importação dos VALORES
import type { FormEvent, ChangeEvent } from 'react'; // 2. Importação dos TIPOS

import { Button } from './Button';

interface ClientOption {
  id: number;
  name: string;
}

export interface AppointmentFormData {
  clientId: string;
  service: string;
}

interface AppointmentFormProps {
  clients: ClientOption[];
  onSave: (data: AppointmentFormData) => void;
  onCancel: () => void;
}

export function AppointmentForm({ clients, onSave, onCancel }: AppointmentFormProps) {
  const [clientId, setClientId] = useState<string>('');
  const [service, setService] = useState<string>('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!clientId) {
      alert('Por favor, selecione um cliente.');
      return;
    }
    onSave({ clientId, service });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="client" className="block text-sm font-medium text-gray-700">Cliente</label>
        <select
          id="client"
          value={clientId}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => setClientId(e.target.value)}
          required
          className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="" disabled>Selecione um cliente...</option>
          {clients.map(client => (
            <option key={client.id} value={client.id}>{client.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="service" className="block text-sm font-medium text-gray-700">Serviço</label>
        <input type="text" id="service" value={service} onChange={e => setService(e.target.value)} required placeholder="Ex: Corte e Barba" className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
      </div>
      <div className="flex justify-end gap-4 pt-4">
        <Button type="button" variant="secondary" onClick={onCancel}>Cancelar</Button>
        <Button type="submit">Salvar Agendamento</Button>
      </div>
    </form>
  )
}