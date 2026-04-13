import { HeroSection } from '@/features/landing/sections/HeroSection';
import { BenefitsSection } from '@/features/landing/sections/BenefitsSection';
import { PreviewSection } from '@/features/landing/sections/PreviewSection';
import { HowItWorksSection } from '@/features/landing/sections/HowItWorksSection';
import { FooterSection } from '@/features/landing/sections/FooterSection';

export function LandingPage() {
  return (
    <main className="landing">
      <HeroSection />
      <BenefitsSection />
      <PreviewSection />
      <HowItWorksSection />
      <FooterSection />
    </main>
  );
}
