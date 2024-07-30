import { CheckCircle2, CircleDashed, UserCog } from "lucide-react";
import ButtonComponent from "../../../../components/button-component";
import { ParticipantsProps } from "../../../../types/participants.d";

type GuestProps = {
  listParticipants: ParticipantsProps[];
  openModal: (open: boolean) => void
}

const Guests = ({
  listParticipants,
  openModal
}: GuestProps) => {
  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Convidados</h2>

      <div className="space-y-5">
        {listParticipants?.map((item, index) => (
          <div key={item.id} className="flex items-center justify-between gap-4">
            <div className="space-y-1.5">
              <span className="block font-medium text-zinc-100">{item.name ?? `Convidado ${index}` }</span>
              <span className="block text-sm text-zinc-400 truncate">
                {item.email}
              </span>
            </div>
            {item.is_confirmed
              ? <CheckCircle2 className="text-green-400 size-5 shrink-0" />
              : <CircleDashed className="text-zinc-400 size-5 shrink-0" />
            }
          </div>
        ))}
      </div>

      <ButtonComponent
        variant="secondary"
        size="full"
        onClick={() => openModal(true)}
      >
        <UserCog className="size-5" />
        Gerenciar convidados
      </ButtonComponent>
    </div>
  )
}

export default Guests