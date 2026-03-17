<template>
  <div class="space-y-8">
    <div class="space-y-3 text-center">
      <p class="text-xs font-semibold uppercase tracking-[0.18em] text-[#8f87ff]">Soundlog</p>
      <h1 class="text-3xl font-semibold tracking-[-0.03em] text-[#f9f9f9]">Sign in</h1>
      <p class="text-sm leading-6 text-[#808080]">Access your artist pages, links, and release updates.</p>
    </div>

    <form class="space-y-6" @submit.prevent="login">
      <ErrorAlert :error-msg="authError" @clearError="clearError" />

      <div class="space-y-4">
        <label class="block space-y-2">
          <span class="text-sm font-medium text-[#d0d2d7]">Email address</span>
          <input
            v-model="email"
            type="email"
            autocomplete="email"
            placeholder="artist@email.com"
            class="w-full border border-[#2a2b33] bg-[#0f1014] px-4 py-3 text-sm text-[#f9f9f9] outline-none transition placeholder:text-[#5f636d] focus:border-[#594ddf] focus:ring-2 focus:ring-[#594ddf]/20" />
        </label>

        <label class="block space-y-2">
          <div class="flex items-center justify-between gap-3">
            <span class="text-sm font-medium text-[#d0d2d7]">Password</span>
            <NuxtLink
              to="/forgot-password"
              class="text-xs font-medium text-[#9ca0aa] transition hover:text-[#f9f9f9] focus:outline-none focus:ring-2 focus:ring-[#594ddf]">
              Forgot password?
            </NuxtLink>
          </div>
          <input
            v-model="password"
            type="password"
            autocomplete="current-password"
            placeholder="Enter your password"
            class="w-full border border-[#2a2b33] bg-[#0f1014] px-4 py-3 text-sm text-[#f9f9f9] outline-none transition placeholder:text-[#5f636d] focus:border-[#594ddf] focus:ring-2 focus:ring-[#594ddf]/20" />
        </label>
      </div>

      <button
        type="submit"
        :disabled="loading"
        class="inline-flex w-full items-center justify-center gap-2 border border-[#594ddf] bg-[#594ddf] px-4 py-3 text-sm font-semibold text-white transition hover:border-[#6a5ff0] hover:bg-[#6a5ff0] disabled:cursor-not-allowed disabled:opacity-70">
        <svg
          v-if="loading"
          viewBox="0 0 24 24"
          fill="none"
          class="h-4 w-4 animate-spin"
          aria-hidden="true">
          <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2" class="opacity-25" />
          <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        </svg>
        <span>{{ loading ? 'Signing in...' : 'Sign in' }}</span>
      </button>
    </form>

    <div class="border-t border-[#23232b] pt-6 text-center">
      <p class="text-sm text-[#808080]">
        Don’t have an account?
        <NuxtLink
          to="/register"
          class="font-medium text-[#f9f9f9] underline decoration-[#2b2c34] underline-offset-4 transition hover:text-[#cfd1ff]">
          Create one
        </NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'auth',
});
useHead({
  title: 'Login | supaAuth',
});
const user = useSupabaseUser();
const loading = ref(false);
const authError = ref('');
const email = ref('');
const password = ref('');
const client = useSupabaseClient();

watchEffect(async () => {
  if (user.value) {
    await navigateTo('/');
  }
});

const login = async () => {
  loading.value = true;
  const { error } = await client.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });
  if (error) {
    loading.value = false;
    authError.value = error.message;
    setTimeout(() => {
      authError.value = '';
    }, 5000);
  }
};

const clearError = () => {
  authError.value = '';
};
</script>
