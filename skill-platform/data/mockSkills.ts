import { Skill } from '@/types/skill';

export const mockSkills: Skill[] = [
  {
    id: 'code-reviewer',
    slug: 'code-reviewer',
    name: 'code_reviewer',
    description: 'AI-powered code review assistant for PRs',
    category: 'code_review',
    author: '@sarah_dev',
    stars: 342,
    color: '#1F3A2A',
    tags: ['code_review', 'ai', 'quality'],
  },
  {
    id: 'test-generator',
    slug: 'test-generator',
    name: 'test_generator',
    description: 'Auto-generate unit tests from source code',
    category: 'testing',
    author: '@mike_eng',
    stars: 218,
    color: '#1A2A3F',
    tags: ['testing', 'ai', 'automation'],
  },
  {
    id: 'deploy-helper',
    slug: 'deploy-helper',
    name: 'deploy_helper',
    description: 'Streamline CI/CD pipeline configurations',
    category: 'devops',
    author: '@lisa_ops',
    stars: 156,
    color: '#3A2A1A',
    tags: ['devops', 'ci_cd', 'deployment'],
  },
  {
    id: 'sql-optimizer',
    slug: 'sql-optimizer',
    name: 'sql_optimizer',
    description: 'Optimize SQL queries for better performance',
    category: 'database',
    author: '@db_master',
    stars: 89,
    color: '#2A1A3A',
    tags: ['sql', 'database', 'performance'],
  },
  {
    id: 'doc-writer',
    slug: 'doc-writer',
    name: 'doc_writer',
    description: 'Generate technical documentation from code',
    category: 'documentation',
    author: '@tech_writer',
    stars: 67,
    color: '#1A2A2A',
    tags: ['docs', 'documentation'],
  },
  {
    id: 'vuln-scanner',
    slug: 'vuln-scanner',
    name: 'vuln_scanner',
    description: 'Scan code for security vulnerabilities',
    category: 'security',
    author: '@sec_expert',
    stars: 134,
    color: '#3A1A1A',
    tags: ['security', 'scanning'],
  },
];

export const featuredSkills = mockSkills.slice(0, 3);

export const metrics = [
  { label: 'total_skills', value: '1,284', change: '+12.5%', trend: 'up' as const },
  { label: 'published', value: '847', change: '+8.3%', trend: 'up' as const },
  { label: 'total_downloads', value: '24.6k', change: '+23.1%', trend: 'up' as const },
  { label: 'stars_received', value: '5,892', change: '+15.7%', trend: 'up' as const },
];
