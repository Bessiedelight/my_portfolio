import styles from '@/styles/modules/ChatInputBar.module.scss';
import { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'assistant';
    isTyping?: boolean;
}

interface ChatInputBarProps {
    onSubmit?: (message: string) => void;
    onFocus?: () => void;
}

export default function ChatInputBar({ onSubmit, onFocus }: ChatInputBarProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const expand = () => {
        if (!isExpanded) {
            setIsExpanded(true);
            onFocus?.();
            setTimeout(() => inputRef.current?.focus(), 80);
        }
    };

    const collapse = () => {
        setIsExpanded(false);
        inputRef.current?.blur();
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (isExpanded) {
            scrollToBottom();
        }
    }, [messages, isExpanded]);

    const handleSubmit = async (e?: React.FormEvent) => {
        e?.preventDefault();
        const text = message.trim();
        if (!text) {
            expand();
            return;
        }

        expand();

        // Add user message
        const newUserMsg: Message = { id: Date.now().toString(), text, sender: 'user' };
        setMessages(prev => [...prev, newUserMsg]);
        setMessage('');
        onSubmit?.(text);

        // Show typing indicator
        const typingId = (Date.now() + 1).toString();
        setMessages(prev => [...prev, { id: typingId, text: '', sender: 'assistant', isTyping: true }]);

        try {
            const history = messages.map(m => ({ role: m.sender, content: m.text }));
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: text, history }),
            });
            const data = await res.json();

            setMessages(prev => {
                const filtered = prev.filter(m => m.id !== typingId);
                return [...filtered, {
                    id: (Date.now() + 2).toString(),
                    text: data.reply || "Sorry, I couldn't process that.",
                    sender: 'assistant'
                }];
            });
        } catch {
            setMessages(prev => {
                const filtered = prev.filter(m => m.id !== typingId);
                return [...filtered, {
                    id: (Date.now() + 2).toString(),
                    text: "I'm having trouble connecting. Please try again.",
                    sender: 'assistant'
                }];
            });
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
        if (e.key === 'Escape') {
            collapse();
        }
    };

    return (
        <>
            <div 
                className={classNames(styles['c-chatInputBar__scrim'], {
                    [styles['is-active']]: isExpanded
                })} 
                onClick={collapse}
            />

            <div className={styles['c-chatInputBar']}>
                <div
                    className={classNames(styles['c-chatInputBar__composer'], {
                        [styles['is-expanded']]: isExpanded
                    })}
                    onClick={() => {
                        if (!isExpanded) expand();
                    }}
                >
                    <div className={styles['c-chatInputBar__thread']}>
                        <div className={styles['c-chatInputBar__threadHeader']}>
                            <span>Assistant</span>
                            <button 
                                className={styles['c-chatInputBar__collapseBtn']}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    collapse();
                                }}
                                aria-label="Collapse"
                                title="Collapse"
                            >
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="18 15 12 9 6 15"></polyline>
                                </svg>
                            </button>
                        </div>
                        <div className={styles['c-chatInputBar__messages']}>
                            {messages.map((msg) => (
                                <div 
                                    key={msg.id} 
                                    className={classNames(styles['c-chatInputBar__bubble'], styles[`c-chatInputBar__bubble--${msg.sender}`], {
                                        [styles['c-chatInputBar__bubble--typing']]: msg.isTyping
                                    })}
                                >
                                    {msg.isTyping ? (
                                        <>
                                            <span className={styles['c-chatInputBar__typingDot']}></span>
                                            <span className={styles['c-chatInputBar__typingDot']}></span>
                                            <span className={styles['c-chatInputBar__typingDot']}></span>
                                        </>
                                    ) : (
                                        msg.text
                                    )}
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>
                    </div>

                    <div className={styles['c-chatInputBar__dock']}>
                        <div className={styles['c-chatInputBar__sparkle']}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 3v1m0 16v1m-8-9H3m18 0h-1m-2.636-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m11.314 11.314l.707.707" />
                                <circle cx="12" cy="12" r="3" />
                            </svg>
                        </div>

                        <input
                            ref={inputRef}
                            type="text"
                            className={styles['c-chatInputBar__input']}
                            placeholder="Message…"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={handleKeyDown}
                            onFocus={expand}
                            autoComplete="off"
                        />

                        <button
                            className={styles['c-chatInputBar__send']}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleSubmit();
                            }}
                            type="button"
                            aria-label="Send message"
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="12" y1="19" x2="12" y2="5" />
                                <polyline points="5 12 12 5 19 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
