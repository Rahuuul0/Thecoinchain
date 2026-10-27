import PredictionDashboard from "@/views/PredictionDashboard";

export const metadata = {
  title: "Crypto Markets",
  description: "Live crypto market dashboard with prices, charts and trends.",
  alternates: { canonical: "/prediction-dashboard" },
};

export default function Page() {
  return <PredictionDashboard />;
}
