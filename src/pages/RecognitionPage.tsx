import { BadgeCheck } from 'lucide-react';
import { PageIntro, PageSection } from '@/components/PageElements';
import RecognitionCard from '@/components/RecognitionCard';
import { recognitions } from '@/data/recognition';

export default function RecognitionPage() {
  return (
    <div>
      <PageIntro eyebrow="Institutional & community record" title="RECOGNITION" description="A showcase of recognition TEAM CHAKRA ROBOTICS has received from institutions, organisations and the wider technical community." />
      <PageSection className="pb-24">
        {recognitions.length ? (
          <div className="grid gap-5">
            {recognitions.map((entry) => <RecognitionCard key={entry.id} entry={entry} />)}
          </div>
        ) : (
          <div className="relative overflow-hidden border border-white/10 bg-[#0b0c10] px-6 py-16 text-center sm:py-24">
            <div className="absolute inset-0 grid-pattern opacity-25" />
            <div className="relative mx-auto flex h-16 w-16 items-center justify-center border border-chakra-electric/40 text-chakra-electric"><BadgeCheck size={28} strokeWidth={1.2} /></div>
            <p className="section-label relative mt-7 justify-center">Recognition archive / Ready for verified entries</p>
            <h2 className="heading-lg relative mt-4">Recognition will be added here.</h2>
            <p className="text-body-lg relative mx-auto mt-4 max-w-xl">Institutional acknowledgements, certificates, media coverage and other verified recognition can be featured here when authentic material is provided.</p>
          </div>
        )}
      </PageSection>
    </div>
  );
}
