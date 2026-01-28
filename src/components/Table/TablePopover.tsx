import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

export interface TablePopoverProps {
    anchor: HTMLElement | null;
    children: React.ReactNode;
    onClose: () => void;
}

export const TablePopover: React.FC<TablePopoverProps> = ({ anchor, children, onClose }) => {
    const popoverRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (
                popoverRef.current &&
                !popoverRef.current.contains(e.target as Node) &&
                anchor &&
                !anchor.contains(e.target as Node)
            ) {
                onClose();
            }
        }
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, [anchor, onClose]);

    if (!anchor) return null;

    const rect = anchor.getBoundingClientRect();
    const style: React.CSSProperties = {
        position: 'fixed',
        top: rect.bottom + 8,
        left: rect.left,
        zIndex: 9999,
        background: 'white',
        border: '1px solid #e5e7eb',
        borderRadius: 12,
        boxShadow: '0 8px 32px 0 rgba(60,60,60,0.18)',
        padding: 0,
        minWidth: 200,
        animation: 'fadeIn 0.18s',
    };

    return ReactDOM.createPortal(
        <div ref={popoverRef} style={style}>
            <div className="absolute -top-2 left-4 w-4 h-4">
                <div className="w-4 h-4 bg-white border-l border-t border-gray-200 rotate-45"></div>
            </div>
            {children}
            <button
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 transition"
                onClick={onClose}
                aria-label="Close"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>,
        document.body
    );
};