import { MapPin, Calendar, Settings2 } from "lucide-react";
import ButtonComponent from "../../../../components/button-component";
import { TripProps } from "../../../../types/trip.d";
import { format } from "date-fns";

type DestinationAndDateHeaderProps = {
  infoTrip: TripProps | null;
  openModal: (open: boolean) => void;
}

const DestinationAndDateHeader = ({
  infoTrip,
  openModal
}: DestinationAndDateHeaderProps) => {

  const displayedDate = infoTrip
    ? format(infoTrip.starts_at, "d' de 'LLL").concat(' até ').concat(format(infoTrip.ends_at, "d' de 'LLL"))
    : null

  return (
    <div className="px-4 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin className="size-5 text-zinc-400" />
          <span className="text-zinc-100">{infoTrip?.destination}</span>
        </div>

        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <Calendar className="size-5 text-zinc-400" />
            <span className="text-zinc-100">{displayedDate}</span>
          </div>

          <div className="w-px h-6 bg-zinc-800" />

        <ButtonComponent
          variant="secondary"
          onClick={() => openModal(true)}
        >
            Alterar local/data
            <Settings2 className="size-5" />
          </ButtonComponent>
        </div>
      </div>
  )
}

export default DestinationAndDateHeader;