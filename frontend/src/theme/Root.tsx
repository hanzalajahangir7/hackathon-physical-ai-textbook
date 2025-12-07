import React from 'react';
import ChatbotWidget from '../components/ChatbotWidget';
import AskAIButton from '../components/AskAIButton';
import ChapterControls from '../components/ChapterControls';

export default function Root({ children }) {
    return (
        <>
            {children}
            <ChatbotWidget />
            <AskAIButton />
        </>
    );
}
