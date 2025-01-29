<script lang="ts">
	import { enhance } from "$app/forms";
	import { Button } from "$lib/components/ui/button";
	import * as Card from "$lib/components/ui/card";
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label";
  import type { ActionData } from './$types';

  let { form }: { form: ActionData } = $props();
</script>

<svelte:head>
  <title>Sign Up | Cadence</title>
</svelte:head>

<div class="flex h-screen w-full items-center justify-center px-4">
  <Card.Root class="mx-auto max-w-sm">
    <Card.Header>
      <Card.Title class="text-2xl">Sign Up</Card.Title>
      <Card.Description>Enter your details below to create a new account</Card.Description>
    </Card.Header>
    <Card.Content>
      <form method="post" use:enhance>
        <div class="grid gap-4">
          <div class="grid gap-2">
            <Label for="name">Name</Label>
            <Input id="name" name="name" placeholder="Peregrin Took" required />
          </div>
          <div class="grid gap-2">
            <Label for="username">Username (optional)</Label>
            <Input id="username" name="username" placeholder="PippinItReal" />
          </div>
          <div class="grid gap-2">
            <Label for="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="pippin@middle.earth" required />
          </div>
          <div class="grid gap-2">
            <Label for="password">Password</Label>
            <Input id="password" name="password" type="password" required />
          </div>
          <p class="text-red-600">{form?.message ?? ''}</p>
          <Button type="submit" class="w-full">Sign up</Button>
        </div>
        <div class="mt-4 text-center text-sm">
          Already have an account?
          <a href="/login" class="underline"> Login </a>
        </div>
      </form>
    </Card.Content>
  </Card.Root>
</div>
