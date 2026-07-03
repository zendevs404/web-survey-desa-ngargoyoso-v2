import Hero from "@/components/Hero";
import AboutProgram from "@/components/AboutProgram";
import DashboardSection from "@/components/dashboard/DashboardSection";
import AIOverview from "@/components/dashboard/AIOverview";
import { SurveyDataProvider } from "@/lib/SurveyDataProvider";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SurveyDataProvider>
        <DashboardSection />
        <AIOverview />
      </SurveyDataProvider>
      <AboutProgram />
    </>
  );
}
