import React, { useState, useEffect } from 'react';
import axios from 'axios';

const IS_GITHUB_PAGES = window.location.hostname.includes('github.io');
const BACKEND_URL = IS_GITHUB_PAGES
    ? 'https://hackathon-physical-ai-textbook-6dvry7jh-hanzalajahangir7s-projects.vercel.app'
    : 'http://localhost:8000';

export default function AskAIButton() {
    const [selectedText, setSelectedText] = useState('');
    const [showButton, setShowButton] = useState(false);
    const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
    const [showModal, setShowModal] = useState(false);
    const [query, setQuery] = useState('');
    const [answer, setAnswer] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const handleSelection = () => {
            const selection = window.getSelection();
            const text = selection?.toString().trim();

            if (text && text.length > 10) {
                const range = selection?.getRangeAt(0);
                const rect = range?.getBoundingClientRect();

                if (rect) {
                    setSelectedText(text);
                    setButtonPosition({ x: rect.right, y: rect.top });
                    setShowButton(true);
                }
            } else {
                setShowButton(false);
            }
        };

        document.addEventListener('mouseup', handleSelection);
        return () => document.removeEventListener('mouseup', handleSelection);
    }, []);

    const handleAskAI = async () => {
        if (!query.trim()) return;

        setLoading(true);
        try {
            const response = await axios.post(`${BACKEND_URL}/api/rag/query`, {
                query: query,
                selected_text: selectedText,
                top_k: 3
            });

            setAnswer(response.data.answer);
        } catch (error) {
            setAnswer('Error occurred. Please try again.');
        }
        setLoading(false);
    };

    return (
        <>
            {showButton && (
                <button
                    onClick={() => {
                        setShowModal(true);
                        setShowButton(false);
                    }}
                    style={{
                        position: 'fixed',
                        left: `${buttonPosition.x + 10}px`,
                        top: `${buttonPosition.y}px`,
                        backgroundColor: '#28a745',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        padding: '5px 10px',
                        cursor: 'pointer',
                        zIndex: 1001,
                        fontSize: '12px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                    }}
                >
                    🤖 Ask AI about this
                </button>
            )}

            {showModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1002
                }} onClick={() => setShowModal(false)}>
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '10px',
                        padding: '20px',
                        maxWidth: '600px',
                        width: '90%',
                        maxHeight: '80vh',
                        overflow: 'auto'
                    }} onClick={(e) => e.stopPropagation()}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                            <h3 style={{ margin: 0 }}>Ask AI about Selected Text</h3>
                            <button onClick={() => setShowModal(false)} style={{
                                background: 'transparent',
                                border: 'none',
                                fontSize: '24px',
                                cursor: 'pointer'
                            }}>×</button>
                        </div>

                        <div style={{
                            backgroundColor: '#f8f9fa',
                            padding: '10px',
                            borderRadius: '5px',
                            marginBottom: '15px',
                            maxHeight: '100px',
                            overflow: 'auto',
                            fontSize: '14px'
                        }}>
                            <strong>Selected text:</strong>
                            <p style={{ margin: '5px 0 0 0' }}>{selectedText}</p>
                        </div>

                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleAskAI()}
                            placeholder="What would you like to know about this text?"
                            style={{
                                width: '100%',
                                padding: '10px',
                                borderRadius: '5px',
                                border: '1px solid #ddd',
                                marginBottom: '10px',
                                fontSize: '14px'
                            }}
                        />

                        <button onClick={handleAskAI} disabled={loading} style={{
                            backgroundColor: '#28a745',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            padding: '10px 20px',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            width: '100%',
                            marginBottom: '15px',
                            opacity: loading ? 0.6 : 1
                        }}>
                            {loading ? 'Thinking...' : 'Ask AI'}
                        </button>

                        {answer && (
                            <div style={{
                                backgroundColor: '#e9ecef',
                                padding: '15px',
                                borderRadius: '5px',
                                fontSize: '14px',
                                lineHeight: '1.6'
                            }}>
                                <strong>Answer:</strong>
                                <p style={{ margin: '10px 0 0 0' }}>{answer}</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
