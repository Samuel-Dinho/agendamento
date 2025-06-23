import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // <-- Importação do VALOR
import type { DateClickArg, EventClickArg } from '@fullcalendar/interaction'; // <-- Importação dos TIPOS
import { useState } from 'react';
import { Modal } from '../components/Modal';
import { AppointmentForm } from '../components/AppointmentForm';
import type { AppointmentFormData } from '../components/AppointmentForm';
interface AppointmentEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  extendedProps: {
    clientId: number;
    clientName: string;
    service: string;
  }
}

const mockClients = [
  { id: 1, name: 'João da Silva' },
  { id: 2, name: 'Maria Oliveira' },
  { id: 3, name: 'Carlos Pereira' },
];

export function AppointmentsPage() {
  const [events, setEvents] = useState<AppointmentEvent[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDateInfo, setSelectedDateInfo] = useState<DateClickArg | null>(null);
  // NOVO: Estado para o evento que está sendo editado/visualizado
  const [selectedEvent, setSelectedEvent] = useState<AppointmentEvent | null>(null);

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDateInfo(null);
    setSelectedEvent(null); // Limpa o evento selecionado ao fechar
  };

  // Abre o modal para ADICIONAR um novo evento
  const handleDateClick = (arg: DateClickArg) => {
    setSelectedDateInfo(arg);
    setSelectedEvent(null); // Garante que não estamos em modo de edição
    setIsModalOpen(true);
  };

  // NOVO: Abre o modal para EDITAR um evento existente
  const handleEventClick = (clickInfo: EventClickArg) => {
    const event = events.find(e => e.id === clickInfo.event.id);
    if (event) {
      setSelectedEvent(event);
      setIsModalOpen(true);
    }
  };
  
  // NOVO: Deleta o agendamento selecionado
  const handleDelete = () => {
    if (!selectedEvent) return;
    if (window.confirm(`Tem certeza que deseja excluir o agendamento de "${selectedEvent.title}"?`)) {
      setEvents(events.filter(event => event.id !== selectedEvent.id));
      closeModal();
    }
  };

  // ALTERADO: Salva tanto novos agendamentos quanto edições
  const handleSaveAppointment = (formData: AppointmentFormData) => {
    const selectedClient = mockClients.find(c => c.id === parseInt(formData.clientId));
    if (!selectedClient) return;

    // Modo Edição
    if (selectedEvent) {
      const updatedEvent = {
        ...selectedEvent,
        title: `${formData.service} - ${selectedClient.name}`,
        extendedProps: {
          ...selectedEvent.extendedProps,
          clientId: selectedClient.id,
          clientName: selectedClient.name,
          service: formData.service,
        }
      };
      setEvents(events.map(event => event.id === selectedEvent.id ? updatedEvent : event));
    } 
    // Modo Adição
    else if (selectedDateInfo) {
      const newEvent: AppointmentEvent = {
        id: String(Date.now()),
        title: `${formData.service} - ${selectedClient.name}`,
        start: selectedDateInfo.date,
        end: new Date(selectedDateInfo.date.getTime() + 60 * 60 * 1000), 
        extendedProps: {
          clientId: selectedClient.id,
          clientName: selectedClient.name,
          service: formData.service,
        },
      };
      setEvents([...events, newEvent]);
    }
    closeModal();
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Agenda de Agendamentos</h1>
      <div className="bg-white p-4 rounded-lg shadow">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          headerToolbar={{ left: 'prev,next today', center: 'title', right: 'dayGridMonth,timeGridWeek,timeGridDay' }}
          events={events}
          locale="pt-br"
          buttonText={{ today: 'Hoje', month: 'Mês', week: 'Semana', day: 'Dia' }}
          allDaySlot={false}
          slotMinTime="08:00:00"
          slotMaxTime="20:00:00"
          height="auto"
          selectable={true}
          dateClick={handleDateClick}
          eventClick={handleEventClick} // <-- NOVO: Adiciona o handler de clique no evento
        />
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} title={selectedEvent ? 'Editar Agendamento' : 'Novo Agendamento'}>
        <AppointmentForm
          clients={mockClients}
          onSave={handleSaveAppointment}
          onCancel={closeModal}
          onDelete={selectedEvent ? handleDelete : undefined} // Passa a função de deletar
          initialData={selectedEvent ? { 
            clientId: String(selectedEvent.extendedProps.clientId), 
            service: selectedEvent.extendedProps.service 
          } : null}
        />
      </Modal>
    </div>
  );
}