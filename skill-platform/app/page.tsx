import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { MetricCard } from '@/components/skill/MetricCard';
import { SkillCard } from '@/components/skill/SkillCard';
import { metrics } from '@/data/mockSkills';
import { skillApi } from '@/lib/api';

async function getSkills() {
  try {
    const apiSkills = await skillApi.getAll();
    // Map API response to frontend Skill type
    return apiSkills.map(skill => ({
      ...skill,
      id: String(skill.id), // Convert number id to string
      color: getColorForCategory(skill.category),
      tags: [skill.category],
    }));
  } catch (error) {
    console.error('Failed to fetch skills:', error);
    return [];
  }
}

function getColorForCategory(category: string): string {
  const colors: Record<string, string> = {
    code_review: '#1F3A2A',
    testing: '#1A2A3A',
    devops: '#2A1A3A',
    database: '#3A2A1A',
    documentation: '#1A3A2A',
    security: '#3A1A1A',
  };
  return colors[category] || '#1A1A1A';
}

export default async function HomePage() {
  const skills = await getSkills();
  const featuredSkills = skills.slice(0, 3);
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex flex-1 flex-col overflow-hidden">
        <div className="flex flex-1 flex-col gap-8 px-10 py-8 overflow-y-auto">
          {/* Header */}
          <Header
            breadcrumb="~/skills"
            title="skill_hub"
            subtitle="// discover & share skills"
            searchPlaceholder="search..."
            primaryAction={{ label: '+ new_skill()' }}
          />

          {/* Metric Cards */}
          <div className="grid grid-cols-4 gap-4">
            {metrics.map((metric, index) => (
              <MetricCard key={index} metric={metric} />
            ))}
          </div>

          {/* Featured Skills */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <h2 className="text-base font-medium text-text-primary">featured_skills</h2>
                <p className="text-xs text-text-tertiary">// trending this week</p>
              </div>
              <button className="text-xs font-medium text-terminal-green hover:underline">
                view_all()
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {featuredSkills.map((skill) => (
                <SkillCard key={skill.id} skill={skill} />
              ))}
            </div>
          </div>

          {/* All Skills */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <h2 className="text-base font-medium text-text-primary">all_skills</h2>
                <p className="text-xs text-text-tertiary">// browse community contributions</p>
              </div>
              <p className="text-xs text-text-tertiary">1,284 results</p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {skills.map((skill) => (
                <SkillCard key={skill.id} skill={skill} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
