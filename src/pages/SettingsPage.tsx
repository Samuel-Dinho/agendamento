import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { Button } from '../components/Button';

// Tipo para representar o horário de um dia
interface DayHours {
  dayOfWeek: string;
  enabled: boolean;
  open: string;
  close: string;
}

// Tipo para todas as configurações
interface AppSettings {
  businessHours: DayHours[];
  reminderMessageTemplate: string;
}

const weekDays = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];

export function SettingsPage() {
  // Estado inicial para todas as configurações
  const [settings, setSettings] = useState<AppSettings>({
    businessHours: weekDays.map((day, index) => ({
      dayOfWeek: day,
      // Desabilita Sábado e Domingo por padrão
      enabled: index > 0 && index < 6,
      open: '09:00',
      close: '18:00',
    })),
    reminderMessageTemplate: 'Olá {cliente}! Lembrete do seu agendamento de {servico} para o dia {data} às {hora}. Esperamos por você!'
  });

  // Função para atualizar os horários
  const handleHoursChange = (index: number, field: keyof DayHours, value: string | boolean) => {
    const updatedHours = [...settings.businessHours];
    (updatedHours[index] as any)[field] = value;
    setSettings({ ...settings, businessHours: updatedHours });
  };

  // Função para atualizar o template da mensagem
  const handleMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setSettings({ ...settings, reminderMessageTemplate: e.target.value });
  };

  // Função para "salvar" as configurações
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('Salvando configurações:', settings);
    alert('Configurações salvas! (Verifique o console do navegador)');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Configurações</h1>

      <div className="space-y-10">
        {/* Seção de Horários de Funcionamento */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Horários de Funcionamento</h2>
          <div className="space-y-4">
            {settings.businessHours.map((day, index) => (
              <div key={day.dayOfWeek} className="grid grid-cols-3 items-center gap-4 p-3 border rounded-md">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id={`enabled-${day.dayOfWeek}`}
                    checked={day.enabled}
                    onChange={(e) => handleHoursChange(index, 'enabled', e.target.checked)}
                    className="h-5 w-5 rounded text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor={`enabled-${day.dayOfWeek}`} className="ml-3 block text-sm font-medium text-gray-900">{day.dayOfWeek}</label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="time" value={day.open} disabled={!day.enabled} onChange={(e) => handleHoursChange(index, 'open', e.target.value)} className="w-full border-gray-300 rounded-md shadow-sm disabled:bg-gray-100" />
                  <span>às</span>
                  <input type="time" value={day.close} disabled={!day.enabled} onChange={(e) => handleHoursChange(index, 'close', e.target.value)} className="w-full border-gray-300 rounded-md shadow-sm disabled:bg-gray-100" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Seção de Mensagens de Lembrete */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Mensagem de Lembrete (WhatsApp)</h2>
          <textarea
            rows={5}
            className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={settings.reminderMessageTemplate}
            onChange={handleMessageChange}
          />
          <p className="mt-2 text-sm text-gray-500">
            Use as variáveis: <code className="bg-gray-200 px-1 rounded">{'{cliente}'}</code>, <code className="bg-gray-200 px-1 rounded">{'{servico}'}</code>, <code className="bg-gray-200 px-1 rounded">{'{data}'}</code>, <code className="bg-gray-200 px-1 rounded">{'{hora}'}</code>.
          </p>
        </div>

        {/* Botão Salvar */}
        <div className="flex justify-end">
            <Button type="submit" className="w-auto">Salvar Alterações</Button>
        </div>
      </div>
    </form>
  );
}