import { X } from "lucide-react";
import { ComponentProps, ReactNode } from "react";
import { tv, VariantProps } from "tailwind-variants";

const modalVariants = tv({
  base: 'relative rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5',
  
  variants: {    
    size: {
      default: 'w-[640px]',
      small: 'w-[340px]'
    }
  },

  defaultVariants: {
    size: 'default',
  }
})

interface ButtonProps extends ComponentProps<'button'>, VariantProps<typeof modalVariants> {
  children: ReactNode,
  closeModal: () => void;
}

const ModalComponent = ({ children, closeModal, size }: ButtonProps) => {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className={modalVariants({ size })}>
        <button type="button" className="absolute right-4 top-4" onClick={closeModal}>
          <X className="size-5 text-zinc-400" />
        </button>        
        {children}
      </div>
    </div>
  )
}

export default ModalComponent;