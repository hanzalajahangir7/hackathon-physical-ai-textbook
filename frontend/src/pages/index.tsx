import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

export default function Home(): JSX.Element {
    const { siteConfig } = useDocusaurusContext();

    return (
        <Layout
            title="Home"
            description="A Complete Technical Textbook for Embodied Intelligence">
            <main>
                {/* Hero Section */}
                <div style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    padding: '80px 20px',
                    textAlign: 'center'
                }}>
                    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                        <h1 style={{
                            fontSize: '3.5rem',
                            fontWeight: 'bold',
                            marginBottom: '20px',
                            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                        }}>
                            🤖 Physical AI & Humanoid Robotics
                        </h1>
                        <p style={{
                            fontSize: '1.5rem',
                            marginBottom: '40px',
                            opacity: 0.95
                        }}>
                            A Complete Technical Textbook for Embodied Intelligence
                        </p>
                        <p style={{
                            fontSize: '1.1rem',
                            marginBottom: '40px',
                            maxWidth: '800px',
                            margin: '0 auto 40px'
                        }}>
                            Master the intersection of AI and robotics. Learn how software meets hardware to create intelligent physical agents that interact with the real world.
                        </p>
                        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <Link
                                to="/docs/"
                                style={{
                                    backgroundColor: 'white',
                                    color: '#667eea',
                                    padding: '15px 40px',
                                    borderRadius: '8px',
                                    fontSize: '1.2rem',
                                    fontWeight: 'bold',
                                    textDecoration: 'none',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                                    transition: 'transform 0.2s'
                                }}
                                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                            >
                                📚 Read the Textbook
                            </Link>
                            <Link
                                to="/docs/"
                                style={{
                                    backgroundColor: 'transparent',
                                    color: 'white',
                                    padding: '15px 40px',
                                    borderRadius: '8px',
                                    fontSize: '1.2rem',
                                    fontWeight: 'bold',
                                    textDecoration: 'none',
                                    border: '2px solid white',
                                    transition: 'all 0.2s'
                                }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.backgroundColor = 'white';
                                    e.currentTarget.style.color = '#667eea';
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                    e.currentTarget.style.color = 'white';
                                }}
                            >
                                🚀 Get Started
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <div style={{ padding: '80px 20px', backgroundColor: '#f8f9fa' }}>
                    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                        <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '50px', color: '#333' }}>
                            🎯 What You'll Learn
                        </h2>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                            gap: '30px'
                        }}>
                            {[
                                {
                                    icon: '🧠',
                                    title: 'Embodied Intelligence',
                                    description: 'How software meets hardware to create intelligent physical agents'
                                },
                                {
                                    icon: '👁️',
                                    title: 'Robot Perception',
                                    description: 'Seeing and understanding the world through advanced sensors'
                                },
                                {
                                    icon: '🎮',
                                    title: 'Sim-to-Real Transfer',
                                    description: 'Training in digital twins before deploying to reality'
                                },
                                {
                                    icon: '🤝',
                                    title: 'The AI Robot Brain',
                                    description: 'NVIDIA Isaac™ and cutting-edge AI architectures'
                                },
                                {
                                    icon: '🌐',
                                    title: 'Digital Twins',
                                    description: 'Gazebo & Unity for realistic robot simulation'
                                },
                                {
                                    icon: '🎓',
                                    title: 'Vision-Language-Action',
                                    description: 'Modern VLA models for robotic control'
                                }
                            ].map((feature, i) => (
                                <div key={i} style={{
                                    backgroundColor: 'white',
                                    padding: '30px',
                                    borderRadius: '12px',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                    transition: 'transform 0.2s, box-shadow 0.2s',
                                    cursor: 'pointer'
                                }}
                                    onMouseOver={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-5px)';
                                        e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)';
                                    }}
                                    onMouseOut={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                                    }}>
                                    <div style={{ fontSize: '3rem', marginBottom: '15px' }}>{feature.icon}</div>
                                    <h3 style={{ fontSize: '1.3rem', marginBottom: '10px', color: '#667eea' }}>{feature.title}</h3>
                                    <p style={{ color: '#666', lineHeight: '1.6' }}>{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* AI Features Section */}
                <div style={{ padding: '80px 20px', backgroundColor: 'white' }}>
                    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                        <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '20px', color: '#333' }}>
                            ✨ AI-Powered Learning Features
                        </h2>
                        <p style={{ textAlign: 'center', fontSize: '1.2rem', color: '#666', marginBottom: '50px', maxWidth: '800px', margin: '0 auto 50px' }}>
                            Experience interactive learning with our AI assistant that understands the textbook content
                        </p>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                            gap: '25px'
                        }}>
                            {[
                                {
                                    icon: '💬',
                                    title: 'AI Chatbot',
                                    description: 'Ask questions and get instant answers about any topic in the book'
                                },
                                {
                                    icon: '🌐',
                                    title: 'Urdu Translation',
                                    description: 'Translate any chapter to Urdu for better accessibility'
                                },
                                {
                                    icon: '👤',
                                    title: 'Personalization',
                                    description: 'Content adapts to your skill level and background'
                                },
                                {
                                    icon: '🤖',
                                    title: 'Ask AI on Selection',
                                    description: 'Highlight any text and ask the AI to explain it'
                                }
                            ].map((feature, i) => (
                                <div key={i} style={{
                                    backgroundColor: '#f8f9fa',
                                    padding: '25px',
                                    borderRadius: '10px',
                                    textAlign: 'center',
                                    border: '2px solid #e9ecef',
                                    transition: 'border-color 0.2s'
                                }}
                                    onMouseOver={(e) => e.currentTarget.style.borderColor = '#667eea'}
                                    onMouseOut={(e) => e.currentTarget.style.borderColor = '#e9ecef'}>
                                    <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>{feature.icon}</div>
                                    <h3 style={{ fontSize: '1.2rem', marginBottom: '10px', color: '#333' }}>{feature.title}</h3>
                                    <p style={{ color: '#666', fontSize: '0.95rem' }}>{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    padding: '60px 20px',
                    textAlign: 'center'
                }}>
                    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>
                            Ready to Master Physical AI?
                        </h2>
                        <p style={{ fontSize: '1.2rem', marginBottom: '30px', opacity: 0.95 }}>
                            Start your journey into the future of robotics and embodied intelligence
                        </p>
                        <Link
                            to="/docs/"
                            style={{
                                backgroundColor: 'white',
                                color: '#667eea',
                                padding: '15px 50px',
                                borderRadius: '8px',
                                fontSize: '1.3rem',
                                fontWeight: 'bold',
                                textDecoration: 'none',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                                display: 'inline-block',
                                transition: 'transform 0.2s'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            📖 Start Reading Now
                        </Link>
                    </div>
                </div>

                {/* Footer Info */}
                <div style={{ padding: '40px 20px', backgroundColor: '#2d3748', color: 'white', textAlign: 'center' }}>
                    <p style={{ fontSize: '1.1rem', marginBottom: '10px' }}>
                        Made with ❤️ by <strong>HANZALA KNOX</strong>
                    </p>
                    <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                        A comprehensive guide to Physical AI & Humanoid Robotics
                    </p>
                </div>
            </main>
        </Layout>
    );
}
