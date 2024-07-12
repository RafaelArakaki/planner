import { FormEvent } from "react";
import { AtSign, Plus, X } from "lucide-react";
import ModalComponent from "../../../../components/modal-component";
import ButtonComponent from "../../../../components/button-component";

type ConfirmTripModalProps = {
  closeModal: () => void,
  onSubmit: (email: FormEvent<HTMLFormElement>) => void,
  emailsToInvite: Array<string>;
  removeEmailFromInvites: (email: string) => void;
}

const GuestModal = ({
  closeModal,
  onSubmit,
  emailsToInvite,
  removeEmailFromInvites,
}: ConfirmTripModalProps) => {
  return (
    <ModalComponent 
      size="default"
      closeModal={closeModal}
    >
      <h2 className="font-lg font-semibold">Selecionar convidados</h2>
      <div className="flex flex-wrap gap-2">
        {emailsToInvite.map(email => {
          return (
            <div key={email} className="py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2">
              <span className="text-zinc-300">{email}</span>
              <button type="button">
                <X onClick={() => removeEmailFromInvites(email)} className="size-4 text-zinc-400" />
              </button>
            </div>
            )
          }
        )}
      </div>
      
      <div className="w-full h-px bg-zinc-800" />

      <form onSubmit={onSubmit} className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
        <div className="px-2 flex items-center flex-1 gap-2">
          <AtSign className="text-zinc-400 size-5" />
          <input
            type="email"
            name="email"
            placeholder="Digite o email do convidado"
            className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
          />
        </div>

        <ButtonComponent type="submit">
          Convidar
          <Plus className="size-5" />
        </ButtonComponent>
      </form>
    </ModalComponent>
  )
}

export default GuestModal;