import { DashbaordLayout } from "@/components/layout/DashbaordLayout";
import { VocDashboard } from "@/features/voc/components/Voc";

export default function VocPage() {
  return (
    <DashbaordLayout>
      <VocDashboard />
    </DashbaordLayout>
  );
}
