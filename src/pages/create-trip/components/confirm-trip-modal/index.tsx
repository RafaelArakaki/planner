import { FormEvent } from "react";
import { Mail, Plus, User } from "lucide-react";
import ModalComponent from "../../../../components/modal-component";
import ButtonComponent from "../../../../components/button-component";

type ConfirmTripModalProps = {
  closeModal: () => void,
  onSubmit: (event: FormEvent<HTMLFormElement>) => void,
}

const ConfirmTripModal = ({ closeModal, onSubmit }: ConfirmTripModalProps) => {
  return (
    <ModalComponent 
      size="default"
      closeModal={closeModal}
    >
      <h2 className="font-lg font-semibold">Confirmar criação da viagem</h2>
      <p className="text-sm text-zinc-400">
        Para concluir a criação da viagem para <span className="font-semibold text-zinc-100">Florianópolis, Brasil</span> nas datas de <span className="font-semibold text-zinc-100">16 a 27 de Agosto de 2024</span> preencha seus dados abaixo:
      </p>
      <form onSubmit={onSubmit} className="space-y-3">
        <div className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
          <User className="text-zinc-400 size-5" />
          <input
            type="text"
            name="name"
            placeholder="Seu nome completo"
            className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
          />
        </div>

        <div className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
          <Mail className="text-zinc-400 size-5" />
          <input
            type="email"
            name="email"
            placeholder="Seu e-mail pessoal"
            className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
          />
        </div>
        <ButtonComponent
          type="submit"
          size="full"
        >
          Confirmar criação da viagem
          <Plus className="size-5" />
        </ButtonComponent>
      </form>
    </ModalComponent>
  )
}

export default ConfirmTripModal;