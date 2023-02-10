import React, { ReactNode } from "react";
import './modal.css'

interface DeleteModalType {
    children?: ReactNode;
    buttonValue: string;
    isOpen: boolean;
    toggle: () => void
}

export const DeleteModal = ({ children, buttonValue, isOpen, toggle }: DeleteModalType) => {
    return (
        <>
            <button style={isOpen ? { backgroundColor: "#e69797" } : { backgroundColor: "#e69797" }} onClick={toggle}>{buttonValue}</button>
            {isOpen && (
                <div className="modal-overlay">
                    <div className="modal-box" onClick={(e) => e.stopPropagation}>
                        {children}
                        <button style={{ backgroundColor: "#e69797" }} onClick={toggle}>Cancel</button>
                    </div>
                </div>
            )
            }
        </>
    )
}