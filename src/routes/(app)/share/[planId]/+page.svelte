<!-- <script lang="ts">
  import { Card } from '$lib/components/ui/card';
  import { Progress } from '$lib/components/ui/progress';
  import { Calendar } from '$lib/components/ui/calendar';
  import { localizeDate } from '$lib/utils/dates';
  
  let { data } = $props();

  $: completedDates = data.plan.entries
    .filter(e => e.completedAt)
    .map(e => localizeDate(e.scheduledDate, data.timezone));

  $: progress = Math.round(
    (completedDates.length / data.plan.entries.length) * 100
  );
</script>

<div class="max-w-2xl mx-auto space-y-6">
  <Card class="p-6">
    <h1 class="text-2xl font-bold mb-2">{data.plan.name}</h1>
    <p class="text-muted-foreground mb-4">{data.plan.description}</p>

    <div class="space-y-2 mb-6">
      <div class="flex justify-between text-sm">
        <span>Progress</span>
        <span>{progress}%</span>
      </div>
      <Progress value={progress} />
    </div>

    <Calendar
      value={completedDates}
      mode="multiple"
      disabled
      class="w-full"
    />
  </Card>
</div> -->
<div>Share</div>
