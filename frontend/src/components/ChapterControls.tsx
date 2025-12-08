import React, { useState } from 'react';
import axios from 'axios';

// Always use Railway backend in production
const BACKEND_URL = 'https://hackathon-ai-backend-production.up.railway.app';

export default function ChapterControls() {
    const [loading, setLoading] = useState(false);
    const [mode, setMode] = useState<'original' | 'personalized' | 'urdu'>('original');

    const getPageContent = () => {
        const article = document.querySelector('article');
        return article?.innerText || '';
    };

    const replacePageContent = (newContent: string) => {
        const article = document.querySelector('article');
        if (article) {
            const contentDiv = article.querySelector('.markdown') || article;
            if (contentDiv) {
                contentDiv.innerHTML = `<div style="white-space: pre-wrap;">${newContent}</div>`;
            }
        }
    };

    const handlePersonalize = async () => {
        setLoading(true);
        const content = getPageContent();

        try {
            console.log('Sending personalization request to:', `${BACKEND_URL}/api/personalize/personalize`);

            const response = await axios.post(`${BACKEND_URL}/api/personalize/personalize`, {
                content: content,
                user_background: {
                    software_exp: 'intermediate',
                    hardware_exp: 'beginner'
                }
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
                timeout: 60000
            });

            console.log('Personalization response received');
            replacePageContent(response.data.personalized_content);
            setMode('personalized');
        } catch (error: any) {
            console.error('Personalization error:', error);
            console.error('Error response:', error.response?.data);

            let errorMsg = 'Error personalizing content. Please try again.';
            if (error.response?.data?.detail) {
                errorMsg = `Error: ${error.response.data.detail}`;
            } else if (error.message) {
                errorMsg = `Error: ${error.message}`;
            }
            alert(errorMsg);
        }
        setLoading(false);
    };

    const handleTranslate = async () => {
        setLoading(true);
        const content = getPageContent();

        try {
            console.log('Sending translation request to:', `${BACKEND_URL}/api/personalize/translate-urdu`);

            const response = await axios.post(`${BACKEND_URL}/api/personalize/translate-urdu`, {
                content: content
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
                timeout: 60000
            });

            console.log('Translation response received');
            replacePageContent(response.data.translated_content);
            setMode('urdu');
        } catch (error: any) {
            console.error('Translation error:', error);
            console.error('Error response:', error.response?.data);

            let errorMsg = 'Error translating content. Please try again.';
            if (error.response?.data?.detail) {
                errorMsg = `Error: ${error.response.data.detail}`;
            } else if (error.message) {
                errorMsg = `Error: ${error.message}`;
            }
            alert(errorMsg);
        }
        setLoading(false);
    };

    const handleReset = () => {
        window.location.reload();
    };

    return (
        <div style={{
            position: 'sticky',
            top: '60px',
            backgroundColor: '#f8f9fa',
            padding: '10px',
            borderRadius: '8px',
            marginBottom: '20px',
            display: 'flex',
            gap: '10px',
            flexWrap: 'wrap',
            zIndex: 100,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
            <button
                onClick={handlePersonalize}
                disabled={loading || mode === 'personalized'}
                style={{
                    backgroundColor: mode === 'personalized' ? '#6c757d' : '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    padding: '8px 15px',
                    cursor: loading || mode === 'personalized' ? 'not-allowed' : 'pointer',
                    fontSize: '14px',
                    opacity: loading || mode === 'personalized' ? 0.6 : 1
                }}
            >
                {mode === 'personalized' ? '✓ Personalized' : '👤 Personalize for Me'}
            </button>

            <button
                onClick={handleTranslate}
                disabled={loading || mode === 'urdu'}
                style={{
                    backgroundColor: mode === 'urdu' ? '#6c757d' : '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    padding: '8px 15px',
                    cursor: loading || mode === 'urdu' ? 'not-allowed' : 'pointer',
                    fontSize: '14px',
                    opacity: loading || mode === 'urdu' ? 0.6 : 1
                }}
            >
                {mode === 'urdu' ? '✓ اردو' : '🌐 Translate to Urdu'}
            </button>

            {mode !== 'original' && (
                <button
                    onClick={handleReset}
                    disabled={loading}
                    style={{
                        backgroundColor: '#6c757d',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        padding: '8px 15px',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        fontSize: '14px'
                    }}
                >
                    🔄 Reset to Original
                </button>
            )}

            {loading && (
                <span style={{
                    alignSelf: 'center',
                    color: '#666',
                    fontSize: '14px'
                }}>
                    Processing...
                </span>
            )}
        </div>
    );
}
