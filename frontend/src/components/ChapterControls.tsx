import React, { useState } from 'react';
import axios from 'axios';

const IS_GITHUB_PAGES = window.location.hostname.includes('github.io');
const BACKEND_URL = IS_GITHUB_PAGES
    ? 'https://hackathon-physical-ai-textbook-6dvry7jh-hanzalajahangir7s-projects.vercel.app'
    : 'http://localhost:8000';

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
            // Preserve the structure but replace text content
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
            const response = await axios.post(`${BACKEND_URL}/api/personalize/personalize`, {
                content: content,
                user_background: {
                    software_exp: 'intermediate',
                    hardware_exp: 'beginner'
                }
            });

            replacePageContent(response.data.personalized_content);
            setMode('personalized');
        } catch (error) {
            alert('Error personalizing content. Please try again.');
        }
        setLoading(false);
    };

    const handleTranslate = async () => {
        setLoading(true);
        const content = getPageContent();

        try {
            const response = await axios.post(`${BACKEND_URL}/api/personalize/translate-urdu`, {
                content: content
            });

            replacePageContent(response.data.translated_content);
            setMode('urdu');
        } catch (error) {
            alert('Error translating content. Please try again.');
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
