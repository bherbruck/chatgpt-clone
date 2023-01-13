import { createPortal } from 'react-dom'
import { type HTMLProps, useState, useEffect, forwardRef } from 'react'
import { useModal } from '../hooks/use-modal'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

export type ModalProps = HTMLProps<HTMLDivElement> & {
  modal?: Partial<ReturnType<typeof useModal>>
}

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({ children, modal = useModal(false), className, ...props }, ref) => {
    const [isLoaded, setLoaded] = useState(false)

    useEffect(() => setLoaded(true), [])

    return isLoaded
      ? createPortal(
          <div
            className={twMerge(
              className,
              clsx('modal modal-bottom sm:modal-middle', {
                'modal-open': modal.isOpen,
              })
            )}
            {...props}
          >
            {modal.isOpen ? (
              <div ref={ref} className="modal-box">
                {children}
              </div>
            ) : null}
          </div>,
          document.body
        )
      : null
  }
)
