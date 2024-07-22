import { ArrowRight, Calendar, MapPin, Settings2, X } from "lucide-react";
import ButtonComponent from "../../../../components/button-component";
import { DateRange, DayPicker } from "react-day-picker";
import { useState } from "react";
import { format } from "date-fns";
import ModalComponent from "../../../../components/modal-component";
import 'react-day-picker/dist/style.css'

type DestinationAndDateStepProps = {
  isGuestsInputOpen: boolean;
  eventStartAndEndDates: DateRange | undefined;
  closeGuestsInput: () => void;
  openGuestsInput: () => void;
  setDestination: (destination: string) => void;
  setEventStartAndEndDates: (dates: DateRange | undefined) => void;
}

const DestinationAndDateStep = ({
  isGuestsInputOpen,
  closeGuestsInput,
  openGuestsInput,
  eventStartAndEndDates,
  setDestination,
  setEventStartAndEndDates
}: DestinationAndDateStepProps) => {

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
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
      <div className="flex items-center gap-2 flex-1">
        <MapPin className="size-5 text-zinc-400" />
        <input
          disabled={isGuestsInputOpen}
          type="text"
          placeholder="Para onde você vai?"
          className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
          onChange={event => setDestination(event.target.value)}
        />
      </div>

      <button disabled={isGuestsInputOpen} onClick={openDatePicker} className="flex items-center gap-2 text-left w-[240px]">
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

      <div className="w-px h-6 bg-zinc-800" />

      {isGuestsInputOpen ? (
        <ButtonComponent onClick={closeGuestsInput} variant="secondary">
          Alterar local/data
          <Settings2 className="size-5" />
        </ButtonComponent>
      ) : (
        <ButtonComponent onClick={openGuestsInput}>
          Continuar
          <ArrowRight className="size-5" />
        </ButtonComponent>
      )}
    </div>
  )
}

export default DestinationAndDateStep;