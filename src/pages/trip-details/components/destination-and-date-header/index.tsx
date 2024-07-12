import { MapPin, Calendar, Settings2 } from "lucide-react";
import ButtonComponent from "../../../../components/button-component";

const DestinationAndDateHeader = () => {
  return (
    <div className="px-4 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin className="size-5 text-zinc-400" />
          <span className="text-zinc-100">Florianópolis, Brasil</span>
        </div>

        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <Calendar className="size-5 text-zinc-400" />
            <span className="text-zinc-100">17 a 23 de Agosto</span>
          </div>

          <div className="w-px h-6 bg-zinc-800" />

          <ButtonComponent variant="secondary">
            Alterar local/data
            <Settings2 className="size-5" />
          </ButtonComponent>
        </div>
      </div>
  )
}

export default DestinationAndDateHeader;