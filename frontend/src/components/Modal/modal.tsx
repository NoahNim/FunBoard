import React, { ReactNode } from "react";
import './modal.css'
import useModal from "./useModal";

interface ModalType {
    children?: ReactNode,
    buttonValue: string
}

export const Modal = ({ children, buttonValue }: ModalType) => {
    const { isOpen, toggle } = useModal();

    return (
        <>
            <button onClick={toggle}>{buttonValue}</button>
            {isOpen && (
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