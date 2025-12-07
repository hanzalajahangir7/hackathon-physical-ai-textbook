import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
    title: 'Physical AI & Humanoid Robotics',
    tagline: 'A Complete Technical Textbook for Embodied Intelligence',
    favicon: 'img/favicon.ico',

    url: 'https://hanzalajahangir7.github.io',
    baseUrl: '/hackathon-physical-ai-textbook/',

    organizationName: 'hanzalajahangir7',
    projectName: 'hackathon-physical-ai-textbook',

    onBrokenLinks: 'warn',

    i18n: {
        defaultLocale: 'en',
        locales: ['en'],
    },

    presets: [
        [
            'classic',
            {
                docs: {
                    routeBasePath: '/',
                    sidebarPath: './sidebars.ts',
                    editUrl: 'https://github.com/hanzalajahangir7/Hackathon-Project/tree/main/frontend/',
                },
                blog: false,
                theme: {
                    customCss: './src/css/custom.css',
                },
            } satisfies Preset.Options,
        ],
    ],

    themeConfig: {
        image: 'img/docusaurus-social-card.jpg',
        navbar: {
            title: 'Physical AI & Humanoid Robotics',
            logo: {
                alt: 'Physical AI Logo',
                src: 'img/logo.svg',
            },
            items: [
                {
                    type: 'docSidebar',
                    sidebarId: 'tutorialSidebar',
                    position: 'left',
                    label: 'Textbook',
                },
                {
                    href: 'https://github.com/hanzalajahangir7/Hackathon-Project',
                    label: 'GitHub',
                    position: 'right',
                },
            ],
        },
        footer: {
            style: 'dark',
            links: [
                {
                    title: 'Learn',
                    items: [
                        {
                            label: 'Introduction',
                            to: '/introduction',
                        },
                        {
                            label: 'ROS 2 Fundamentals',
                            to: '/weekly-breakdown/week-03-05-ros2',
                        },
                    ],
                },
                {
                    title: 'Community',
                    items: [
                        {
                            label: 'Panaversity',
                            href: 'https://panaversity.org',
                        },
                        {
                            label: 'GitHub',
                            href: 'https://github.com/hanzalajahangir7/hackathon-physical-ai-textbook',
                        },
                    ],
                },
            ],
            copyright: `Copyright © ${new Date().getFullYear()} Physical AI Textbook. Built with Docusaurus. Made by HANZALA KNOX.`,
        },
        prism: {
            theme: prismThemes.github,
            darkTheme: prismThemes.dracula,
            additionalLanguages: ['python', 'bash', 'yaml'],
        },
    } satisfies Preset.ThemeConfig,
};

export default config;
