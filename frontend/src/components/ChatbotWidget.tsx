import React, { useState } from 'react';
import axios from 'axios';

// Always use Railway backend in production
const BACKEND_URL = 'https://hackathon-ai-backend-production.up.railway.app';

interface Message {
    role: string;
    content: string;
}

export default function ChatbotWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(false);

    const handleQuery = async () => {
        if (!query.trim()) return;

        setLoading(true);
        setMessages(prev => [...prev, { role: 'user', content: query }]);

        try {
            console.log('Sending request to:', `${BACKEND_URL}/api/rag/query`);
            console.log('Request data:', { query: query, top_k: 5 });

            const response = await axios.post(`${BACKEND_URL}/api/rag/query`, {
                query: query,
                top_k: 5
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
                timeout: 30000 // 30 second timeout
            });

            console.log('Response received:', response.data);
            setMessages(prev => [...prev, { role: 'assistant', content: response.data.answer }]);
        } catch (error: any) {
            console.error('Error details:', error);
            console.error('Error response:', error.response?.data);
            console.error('Error status:', error.response?.status);

            let errorMessage = 'Error occurred. Please try again.';
            if (error.response?.data?.detail) {
                errorMessage = `Error: ${error.response.data.detail}`;
            } else if (error.message) {
                errorMessage = `Error: ${error.message}`;
            }

            setMessages(prev => [...prev, { role: 'assistant', content: errorMessage }]);
        }

        setLoading(false);
        setQuery('');
    };

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '60px',
                    height: '60px',
                    fontSize: '24px',
                    cursor: 'pointer',
                    zIndex: 1000,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                }}
                aria-label="Open AI Chat"
            >
                💬
            </button>
        );
    }

    return (
        <div style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            width: '350px',
            height: '500px',
            backgroundColor: 'white',
            border: '1px solid #ddd',
            borderRadius: '10px',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 1000,
            boxShadow: '0 8px 24px rgba(0,0,0,0.2)'
        }}>
            <div style={{
                backgroundColor: '#007bff',
                color: 'white',
                padding: '15px',
                borderTopLeftRadius: '10px',
                borderTopRightRadius: '10px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <span style={{ fontWeight: 'bold' }}>Ask AI Assistant</span>
                <button onClick={() => setIsOpen(false)} style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'white',
                    fontSize: '24px',
                    cursor: 'pointer',
                    padding: '0',
                    lineHeight: '1'
                }} aria-label="Close chat">×</button>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '15px', backgroundColor: '#f8f9fa' }}>
                {messages.length === 0 && (
                    <div style={{ textAlign: 'center', color: '#666', marginTop: '20px' }}>
                        <p>👋 Hi! I'm your AI assistant for Physical AI & Humanoid Robotics.</p>
                        <p>Ask me anything about the textbook!</p>
                    </div>
                )}
                {messages.map((msg, i) => (
                    <div key={i} style={{
                        marginBottom: '10px',
                        padding: '10px',
                        borderRadius: '8px',
                        backgroundColor: msg.role === 'user' ? '#007bff' : '#e9ecef',
                        color: msg.role === 'user' ? 'white' : 'black',
                        maxWidth: '85%',
                        marginLeft: msg.role === 'user' ? 'auto' : '0',
                        marginRight: msg.role === 'user' ? '0' : 'auto'
                    }}>
                        {msg.content}
                    </div>
                ))}
                {loading && (
                    <div style={{ textAlign: 'center', color: '#666' }}>
                        <span>Thinking...</span>
                    </div>
                )}
            </div>

            <div style={{ padding: '15px', display: 'flex', gap: '10px', borderTop: '1px solid #ddd' }}>
                <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleQuery()}
                    placeholder="Ask a question..."
                    style={{
                        flex: 1,
                        padding: '10px',
                        borderRadius: '5px',
                        border: '1px solid #ddd',
                        fontSize: '14px'
                    }}
                />
                <button onClick={handleQuery} disabled={loading} style={{
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    padding: '10px 15px',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    opacity: loading ? 0.6 : 1
                }}>Send</button>
            </div>
        </div>
    );
}
