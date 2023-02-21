import React, { ReactNode } from "react";
import './modal.css'

interface LoginModalType {
    children?: ReactNode;
    buttonValue: string;
    isOpen: boolean;
    toggle: () => void
}

export const LoginModal = ({ children, buttonValue, isOpen, toggle }: LoginModalType) => {
    return (
        <>
            <button style={isOpen ? { backgroundColor: "#e69797" } : { backgroundColor: "#CFD2CD" }} onClick={toggle}>{buttonValue}</button>
            {isOpen && (
                <div>
                    <div className="login-modal-box" onClick={(e) => e.stopPropagation}>
                        {children}
                        <button style={{ backgroundColor: "#e69797", }} onClick={toggle}>Cancel</button>
                    </div>
                </div>
            )
            }
        </>
    )
}