import { DashbaordLayout } from "@/components/layout/DashbaordLayout";
import { VoicingDashboard } from "@/features/voicing/components/Voicing";

export default function VoicingPage() {
  return (
    <DashbaordLayout>
      <VoicingDashboard />
    </DashbaordLayout>
  );
}