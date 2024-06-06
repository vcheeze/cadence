<script lang="ts">
  import Logout from 'lucide-svelte/icons/log-out';
  import Moon from 'lucide-svelte/icons/moon';
  import Sun from 'lucide-svelte/icons/sun';
  import { toggleMode } from 'mode-watcher';

  import { enhance } from '$app/forms';
  import { Button } from '$lib/components/ui/button';
  import * as Tooltip from '$lib/components/ui/tooltip';
</script>

<div class="fixed right-6 top-6">
  <!-- Theme Toggle -->

  <Button on:click={toggleMode} variant="ghost" size="icon">
    <Sun
      class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
    />
    <Moon
      class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
    />
    <span class="sr-only">Toggle theme</span>
  </Button>
  <!-- Log Out -->
  <Tooltip.Root>
    <form method="post" action="/logout" use:enhance>
      <Tooltip.Trigger asChild let:builder>
        <Button type="submit" builders={[builder]} variant="ghost" size="icon">
          <Logout class="h-[1.2rem] w-[1.2rem]" />
          <span class="sr-only">Log out</span>
        </Button></Tooltip.Trigger
      >
      <Tooltip.Content side="left">
        <p>Log out</p>
      </Tooltip.Content>
    </form></Tooltip.Root
  >
</div>
