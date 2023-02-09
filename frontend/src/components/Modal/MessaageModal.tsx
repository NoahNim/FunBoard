import React, { ReactNode } from "react";
import './modal.css'

interface ModalType {
    children?: ReactNode;
    buttonValue: string;
    isOpen: boolean;
    toggle: () => void
}

export const MessageModal = ({ children, buttonValue, isOpen, toggle }: ModalType) => {
    return (
        <>
            <button style={isOpen ? { backgroundColor: "#e69797" } : { background: "#fff", width: "5%%", marginTop: "-3%", border: "0px" }} onClick={toggle}>{buttonValue}</button>
            {isOpen && (
                <div className="modal-overlay">
                    <div className="message-modal-box" onClick={(e) => e.stopPropagation}>
                        <button style={{ backgroundColor: "inherit", justifyContent: "flex-start", width: "5%", border: "0px" }} onClick={toggle}>X</button>
                        {children}
                    </div>
                </div>
            )
            }
        </>
    )
}