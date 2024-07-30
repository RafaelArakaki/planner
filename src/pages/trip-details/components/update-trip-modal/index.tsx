import { ArrowRight, Calendar, MapPin, } from "lucide-react";
import ButtonComponent from "../../../../components/button-component";
import { DateRange, DayPicker } from "react-day-picker";
import { useState } from "react";
import { format } from "date-fns";
import ModalComponent from "../../../../components/modal-component";
import 'react-day-picker/dist/style.css'

type UpdateTripModalProps = {  
  closeModal: (close: boolean) => void;
  eventStartAndEndDates: DateRange | undefined;
  setDestination: (destination: string) => void;
  setEventStartAndEndDates: (dates: DateRange | undefined) => void;
  fetchUpdateTrip: () => void;
}

const UpdateTripModal = ({
  closeModal,
  eventStartAndEndDates,
  setDestination,
  setEventStartAndEndDates,
  fetchUpdateTrip
}: UpdateTripModalProps) => {

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)

  function openDatePicker() {
    setIsDatePickerOpen(true);
  }

  function closeDatePicker() {
    setIsDatePickerOpen(false);
  }

  const displayedDate = eventStartAndEndDates && eventStartAndEndDates.from && eventStartAndEndDates.to 
  ? format(eventStartAndEndDates.from, "d' de 'LLL").concat(' até ').concat(format(eventStartAndEndDates.to, "d' de 'LLL"))
  : null

  return (
    <ModalComponent closeModal={() => closeModal(false)}>
      <div className="flex items-center gap-2 flex-1">
        <MapPin className="size-5 text-zinc-400" />
        <input
          type="text"
          placeholder="Para onde você vai?"
          className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
          onChange={event => setDestination(event.target.value)}
        />
      </div>

      <button onClick={openDatePicker} className="flex items-center gap-2 text-left w-[240px]">
        <Calendar className="size-5 text-zinc-400" />
        <span
          className="text-lg text-zinc-400 w-40 flex-1"
        >
          {displayedDate || 'Quando'}
        </span>
      </button>

      {isDatePickerOpen && (
        <ModalComponent closeModal={closeDatePicker} size="small">
          <h2 className="font-lg font-semibold">Selecione a data</h2>
          <DayPicker mode="range" selected={eventStartAndEndDates} onSelect={setEventStartAndEndDates} />
        </ModalComponent>
      )}
      <ButtonComponent size="full" onClick={fetchUpdateTrip}>
        Alterar local e data
      </ButtonComponent>
    </ModalComponent>
  )
}

export default UpdateTripModal;