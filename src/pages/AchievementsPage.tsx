import { Trophy } from 'lucide-react';
import { PageIntro, PageSection } from '@/components/PageElements';
import AchievementCard from '@/components/AchievementCard';
import { achievements } from '@/data/achievements';

export default function AchievementsPage() {
  const orderedAchievements = [...achievements].sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
  return (
    <div>
      <PageIntro eyebrow="Competition record" title="ACHIEVEMENTS" description="A dedicated record of the competitive journey and verified accomplishments of TEAM CHAKRA ROBOTICS." />
      <PageSection className="pb-24">
        {orderedAchievements.length ? (
          <div className="grid gap-5 md:grid-cols-2">
            {orderedAchievements.map((entry) => <AchievementCard key={entry.id} entry={entry} />)}
          </div>
        ) : (
          <div className="relative overflow-hidden border border-chakra-crimson/25 bg-[#0b0c10] px-6 py-16 text-center sm:py-24">
            <div className="absolute inset-0 grid-pattern opacity-25" />
            <div className="relative mx-auto flex h-16 w-16 items-center justify-center border border-chakra-crimson/40 text-chakra-crimson"><Trophy size={28} strokeWidth={1.2} /></div>
            <p className="section-label relative mt-7 justify-center">Competition archive / Ready for verified results</p>
            <h2 className="heading-lg relative mt-4">Our competitive record starts here.</h2>
            <p className="text-body-lg relative mx-auto mt-4 max-w-xl">Competition placements, awards and recognitions will appear here once verified results and authentic supporting media are provided.</p>
          </div>
        )}
      </PageSection>
    </div>
  );
}
