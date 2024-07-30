import { Link2, Plus } from "lucide-react";
import ButtonComponent from "../../../../components/button-component";
import { LinkProps } from "../../../../types/links.d";

type ImportantLinksProps = {
  listLinks: LinkProps[];
  openModal: (open: boolean) => void;
}

const ImportantLinks = ({
  listLinks,
  openModal
}: ImportantLinksProps) => {
  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Links importantes</h2>

      <div className="space-y-5">
        {listLinks?.map((item) => (
          <div key={item.id} className="flex items-center justify-between gap-4">
            <div className="space-y-1.5">
              <span className="block font-medium text-zinc-100">{item.title}</span>
              <a href={item.url} className="block text-xs text-zinc-400 truncate hover:text-zinc-200">
                {item.url}
              </a>
            </div>

            <Link2 className="text-zinc-400 size-5 shrink-0" />
          </div>
        ))}
      </div>

      <ButtonComponent
        variant="secondary"
        size="full"
        onClick={() => openModal(true)}
      >
        <Plus className="size-5" />
        Cadastrar novo link
      </ButtonComponent>
    </div>
  )
}

export default ImportantLinks;