import React, {ReactNode} from "react";
import './modal.css'

interface ModalType {
    children?: ReactNode,
    isOpen: boolean,
    toggle: () => void
}

export const Modal = ({children, isOpen, toggle}: ModalType) => {
    return (
        <>
 {isOpen &&  (
            <div className="modal-overlay" onClick={toggle}>
                <div className="modal-box" onClick={(e) => e.stopPropagation}>
                    {children}
                </div>
            </div>
            )
        }
        </>
    )
}