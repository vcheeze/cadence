<script lang="ts">
  import { Plus, Share } from 'lucide-svelte';

  import { Button } from '$lib/components/ui/button';
  import { Card } from '$lib/components/ui/card';
  import { Progress } from '$lib/components/ui/progress';
  
  // export let data;

  let { data } = $props();

  function calculateProgress(plan) {
    const completed = plan.entries.filter(e => e.completedAt).length;
    return Math.round((completed / plan.entries.length) * 100);
  }
</script>

<div class="space-y-6">
  <div class="flex justify-between items-center">
    <h1 class="text-3xl font-bold">Your Reading Plans</h1>
    <div class="flex gap-4">
      <a href="/dashboard/import">
        <Button variant="outline">
          Import Plan
        </Button>
      </a>
      <a href="/dashboard/new">
        <Button>
          <Plus class="w-4 h-4 mr-2" />
          New Plan
        </Button>
      </a>
    </div>
  </div>

  {#if data.plans.length === 0}
    <Card class="p-6 text-center">
      <h2 class="text-xl font-semibold">No reading plans yet</h2>
      <p class="text-muted-foreground mt-2">
        Create or import a reading plan to get started
      </p>
    </Card>
  {:else}
    <div class="grid gap-6">
      {#each data.plans as plan}
        <Card class="p-6">
          <div class="flex justify-between items-start mb-4">
            <div>
              <h2 class="text-xl font-semibold">{plan.name}</h2>
              <p class="text-muted-foreground">{plan.description}</p>
            </div>
            <Button 
              variant="ghost" 
              size="icon"
              onclick={() => {
                const url = `${window.location.origin}/share/${plan.id}`;
                navigator.clipboard.writeText(url);
              }}
            >
              <Share class="w-4 h-4" />
            </Button>
          </div>

          <div class="space-y-2 mb-4">
            <div class="flex justify-between text-sm">
              <span>Progress</span>
              <span>{calculateProgress(plan)}%</span>
            </div>
            <Progress value={calculateProgress(plan)} />
          </div>

          <div class="flex gap-4">
            <a href="/dashboard/plan/{plan.id}" class="flex-1">
              <Button variant="outline" class="w-full">View Details</Button>
            </a>
            <a href="/dashboard/plan/{plan.id}/edit" class="flex-1">
              <Button variant="outline" class="w-full">Edit Schedule</Button>
            </a>
          </div>
        </Card>
      {/each}
    </div>
  {/if}
</div>
