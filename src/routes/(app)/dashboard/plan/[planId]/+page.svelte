<!-- <script lang="ts">
  import { Card } from '$lib/components/ui/card';
  import { Button } from '$lib/components/ui/button';
  import { Calendar } from '$lib/components/ui/calendar';
  import { localizeDate } from '$lib/utils/dates';
  
  let { data } = $props();

  $: groupedEntries = data.plan.entries.reduce((groups, entry) => {
    const localDate = localizeDate(entry.scheduledDate, data.timezone);
    const month = localDate.toLocaleString('default', { month: 'long', year: 'numeric' });
    
    if (!groups[month]) groups[month] = [];
    groups[month].push(entry);
    return groups;
  }, {});

  async function markComplete(entryId: string) {
    const form = new FormData();
    form.append('entryId', entryId);
    
    await fetch('?/markComplete', {
      method: 'POST',
      body: form
    });
  }
</script>

<div class="space-y-6">
  <div class="flex justify-between items-center">
    <div>
      <h1 class="text-3xl font-bold">{data.plan.name}</h1>
      <p class="text-muted-foreground">{data.plan.description}</p>
    </div>
    <Button 
      variant="outline"
      on:click={() => {
        const url = `${window.location.origin}/share/${data.plan.id}`;
        navigator.clipboard.writeText(url);
      }}
    >
      Share Progress
    </Button>
  </div>

  <div class="grid md:grid-cols-2 gap-6">
    <Card class="p-6">
      <Calendar
        value={data.plan.entries
          .filter(e => e.completedAt)
          .map(e => localizeDate(e.scheduledDate, data.timezone))}
        mode="multiple"
        disabled
        class="w-full"
      />
    </Card>

    <div class="space-y-6">
      {#each Object.entries(groupedEntries) as [month, entries]}
        <div>
          <h2 class="text-xl font-semibold mb-4">{month}</h2>
          <div class="space-y-4">
            {#each entries as entry}
              <Card class="p-4">
                <div class="flex justify-between items-center">
                  <div>
                    <p class="font-medium">
                      {localizeDate(entry.scheduledDate, data.timezone)
                        .toLocaleDateString()}
                    </p>
                    <div class="text-sm text-muted-foreground">
                      {entry.readings.map(r => 
                        `${r.book} ${r.chapter}`
                      ).join(', ')}
                    </div>
                  </div>
                  <Button
                    variant={entry.completedAt ? "secondary" : "default"}
                    disabled={entry.completedAt}
                    on:click={() => markComplete(entry.id)}
                  >
                    {entry.completedAt ? 'Completed' : 'Mark Complete'}
                  </Button>
                </div>
              </Card>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  </div>
</div> -->
<div>Plan Page</div>
