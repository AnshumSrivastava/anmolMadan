import Timeline from "@/components/timeline/Timeline";
import { getTimeline } from "@/services/timeline/timeline.service";

export default async function TimelinePage() {

  const timeline = await getTimeline();

  return (

    <Timeline
      timeline={timeline}
    />

  );
}