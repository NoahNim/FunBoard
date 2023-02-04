import React, { ReactNode } from "react";
import './modal.css'
import useModal from "./useModal";

interface ModalType {
    children?: ReactNode;
    buttonValue: string;
    isOpen: boolean;
    toggle: () => void
}

export const Modal = ({ children, buttonValue, isOpen, toggle }: ModalType) => {
    return (
        <>
            <button onClick={toggle}>{buttonValue}</button>
            {isOpen && (
                <div className="modal-overlay">
                    <div className="modal-box" onClick={(e) => e.stopPropagation}>
                        {children}
                        <button onClick={toggle}>Cancel</button>
                    </div>
                </div>
            )
            }
        </>
    )
}