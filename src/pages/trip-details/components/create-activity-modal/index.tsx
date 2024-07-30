import { Calendar, Tag } from "lucide-react";
import ModalComponent from "../../../../components/modal-component";
import ButtonComponent from "../../../../components/button-component";
import { FormEvent } from "react";

interface CreateActivityModalProps {
  closeCreateActivityModal: (close: boolean) => void;
  createActivity: (event: FormEvent<HTMLFormElement>) => void;
 }

const CreateActivityModal = ({
  closeCreateActivityModal,
  createActivity
}: CreateActivityModalProps) => {
  return (
    <ModalComponent closeModal={() => closeCreateActivityModal(false)}>
      <h2 className="font-lg font-semibold">Cadastrar atividade</h2>
      <p className="text-sm text-zinc-400">
        Todos convidados podem visualizar as atividades.
      </p>
      <form className="space-y-3" onSubmit={createActivity}>
        <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
          <Tag className="text-zinc-400 size-5" />
          <input
            name="title"
            placeholder="Qual a atividade?"
            className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
          />
        </div>

        <div className="h-14 flex-1 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
          <Calendar className="text-zinc-400 size-5" />
          <input
            type="datetime-local"
            name="occurs_at"
            placeholder="Data e horário da atividade"
            className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
          />
        </div>

        <ButtonComponent size="full">
          Salvar atividade
        </ButtonComponent>
      </form>
    </ModalComponent>
  )
}

export default CreateActivityModal;