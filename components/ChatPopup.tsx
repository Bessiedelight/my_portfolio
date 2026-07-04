import styles from '@/styles/modules/ChatPopup.module.scss';
import { useState } from 'react';
import classNames from 'classnames';

interface ChatPopupProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ChatPopup({ isOpen, onClose }: ChatPopupProps) {
    const [message, setMessage] = useState('');

    if (!isOpen) return null;

    return (
        <div className={styles['c-chatPopup__overlay']} onClick={onClose}>
            <div 
                className={styles['c-chatPopup']} 
                onClick={(e) => e.stopPropagation()}
            >
                <div className={styles['c-chatPopup__header']}>
                    <div className={styles['c-chatPopup__icon']}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                            <polyline points="2 17 12 22 22 17"></polyline>
                            <polyline points="2 12 12 17 22 12"></polyline>
                        </svg>
                    </div>
                    <h2>Hi there <span className={styles['wave']}>👋</span></h2>
                    <h3>Ask me anything, contact me, request my CV. My agent will handle it!</h3>
                </div>

                <div className={styles['c-chatPopup__body']}>
                    <div className={styles['c-chatPopup__message']}>
                        <div className={styles['c-chatPopup__message--bot']}>
                            Hello! I'm Bessie's AI assistant. How can I help you today?
                        </div>
                    </div>
                </div>

                <div className={styles['c-chatPopup__footer']}>
                    <div className={styles['c-chatPopup__inputBox']}>
                        <input 
                            type="text" 
                            placeholder="Type a message..." 
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <button className={styles['c-chatPopup__send']}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="22" y1="2" x2="11" y2="13"></line>
                                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
