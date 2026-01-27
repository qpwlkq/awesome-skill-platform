import { Sidebar } from '@/components/layout/Sidebar';
import { SkillCard } from '@/components/skill/SkillCard';
import { skillApi } from '@/lib/api';

async function getFavoriteSkills() {
  try {
    const apiSkills = await skillApi.getAll();
    // Map API response to frontend Skill type (showing starred skills)
    return apiSkills.slice(0, 4).map(skill => ({
      ...skill,
      id: String(skill.id),
      color: getColorForCategory(skill.category),
      tags: [skill.category],
    }));
  } catch (error) {
    console.error('Failed to fetch favorite skills:', error);
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

export default async function FavoritesPage() {
  const skills = await getFavoriteSkills();

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex flex-1 flex-col overflow-hidden">
        <div className="flex flex-1 flex-col gap-6 px-10 py-8 overflow-y-auto">
          {/* Header */}
          <div className="flex flex-col gap-2">
            <p className="text-xs text-text-tertiary">~/favorites</p>
            <h1 className="text-3xl font-semibold text-text-primary">my_favorites</h1>
            <p className="text-sm text-text-tertiary">// your starred skills collection</p>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-3 gap-4">
            {skills.map((skill) => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
