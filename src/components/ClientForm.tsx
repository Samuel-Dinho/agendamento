import { useState, useEffect } from 'react'; // 1. Importe o useEffect
import type { FormEvent } from 'react';
import { Button } from './Button';

interface ClientFormData {
  name: string;
  email: string;
  phone: string;
}

interface ClientFormProps {
  onSave: (data: ClientFormData) => void;
  onCancel: () => void;
  initialData?: ClientFormData | null; // 2. Adicione a prop opcional para dados iniciais
}

export function ClientForm({ onSave, onCancel, initialData }: ClientFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // 3. Este useEffect sincroniza o formulário com os dados de edição
  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setEmail(initialData.email);
      setPhone(initialData.phone);
    } else {
      // Limpa o formulário se não houver dados iniciais (modo de adição)
      setName('');
      setEmail('');
      setPhone('');
    }
  }, [initialData]); // Roda sempre que initialData mudar

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSave({ name, email, phone });
  };

  // O JSX do formulário continua o mesmo
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome</label>
        <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Telefone</label>
        <input type="tel" id="phone" value={phone} onChange={e => setPhone(e.target.value)} required className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
      </div>
      <div className="flex justify-end gap-4 pt-4">
        <Button type="button" variant="secondary" onClick={onCancel}>Cancelar</Button>
        <Button type="submit">Salvar Cliente</Button>
      </div>
    </form>
  )
}