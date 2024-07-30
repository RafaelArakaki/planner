import { FormEvent } from "react";
import ModalComponent from "../../../../components/modal-component";
import { Link2, Tag } from "lucide-react";
import ButtonComponent from "../../../../components/button-component";

interface RegisterNewLinkModalProps {
  closeRegisterNewLinkModal: (close: boolean) => void;
  registerNewLink: (event: FormEvent<HTMLFormElement>) => void;
 }

const RegisterNewLinkModal = ({
  closeRegisterNewLinkModal,
  registerNewLink
}: RegisterNewLinkModalProps) => {
  return (
    <ModalComponent closeModal={() => closeRegisterNewLinkModal(false)}>
      <h2 className="font-lg font-semibold">Cadastrar link</h2>
      <p className="text-sm text-zinc-400">
        Todos convidados podem visualizar os links importantes.
      </p>
      <form className="space-y-3" onSubmit={registerNewLink}>
        <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
          <Tag className="text-zinc-400 size-5" />
          <input
            name="title"
            placeholder="Título do link"
            className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
          />
        </div>

        <div className="h-14 flex-1 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
          <Link2 className="text-zinc-400 size-5" />
          <input
            type="text"
            name="url"
            placeholder="URL"
            className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
          />
        </div>

        <ButtonComponent size="full">
          Salvar link
        </ButtonComponent>
      </form>
    </ModalComponent>
  )
}

export default RegisterNewLinkModal;