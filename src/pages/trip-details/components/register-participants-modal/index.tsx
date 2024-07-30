import { FormEvent } from "react";
import ModalComponent from "../../../../components/modal-component";
import { Mail } from "lucide-react";
import ButtonComponent from "../../../../components/button-component";

interface RegisterParticipantsProps {
  closeModal: (close: boolean) => void;
  register: (event: FormEvent<HTMLFormElement>) => void;
 }

const RegisterParticipantsModal = ({
  closeModal,
  register
}: RegisterParticipantsProps) => {
  return (
    <ModalComponent closeModal={() => closeModal(false)}>
      <h2 className="font-lg font-semibold">Cadastrar participante</h2>
      <p className="text-sm text-zinc-400">
        Todos convidados podem visualizar os participantes.
      </p>
      <form className="space-y-3" onSubmit={register}>
        <div className="h-14 flex-1 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
          <Mail className="text-zinc-400 size-5" />
          <input
            type="text"
            name="mail"
            placeholder="E-mail"
            className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
          />
        </div>

        <ButtonComponent size="full">
          Salvar participante
        </ButtonComponent>
      </form>
    </ModalComponent>
  )
}

export default RegisterParticipantsModal;