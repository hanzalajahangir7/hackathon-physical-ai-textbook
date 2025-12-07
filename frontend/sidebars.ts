import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
    tutorialSidebar: [
        {
            type: 'doc',
            id: 'home',
            label: '🏠 Home',
        },
        {
            type: 'doc',
            id: 'introduction/index',
            label: 'Introduction',
        },
        {
            type: 'doc',
            id: 'quarter-overview/index',
            label: 'Quarter Overview',
        },
        {
            type: 'doc',
            id: 'why-physical-ai-matters/index',
            label: 'Why Physical AI Matters',
        },
        {
            type: 'doc',
            id: 'learning-outcomes/index',
            label: 'Learning Outcomes',
        },
        {
            type: 'category',
            label: 'Weekly Breakdown',
            items: [
                'weekly-breakdown/week-01-02-physical-ai',
                'weekly-breakdown/week-03-05-ros2',
                'weekly-breakdown/week-06-07-gazebo',
                'weekly-breakdown/week-08-10-isaac',
                'weekly-breakdown/week-11-12-humanoid',
                'weekly-breakdown/week-13-conversational-robotics',
            ],
        },
        {
            type: 'doc',
            id: 'assessments/index',
            label: 'Assessments',
        },
        {
            type: 'category',
            label: 'Hardware Requirements',
            items: [
                'hardware-requirements/digital-twin-workstation',
                'hardware-requirements/physical-ai-edge-kit',
                'hardware-requirements/robot-lab-options',
                'hardware-requirements/architecture-summary',
                'hardware-requirements/cloud-lab-setup',
                'hardware-requirements/economy-jetson-kit',
            ],
        },
    ],
};

export default sidebars;
