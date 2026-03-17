<template>
  <div class="space-y-8">
    <div class="space-y-3 text-center">
      <p class="text-xs font-semibold uppercase tracking-[0.18em] text-[#8f87ff]">Start your trial</p>
      <h1 class="text-3xl font-semibold tracking-[-0.03em] text-[#f9f9f9]">Create your account</h1>
      <p class="text-sm leading-6 text-[#808080]">Set up Soundlog and publish your artist page with less upkeep.</p>
    </div>

    <form class="space-y-6" @submit.prevent="signUp">
      <ErrorAlert :error-msg="authError" @clearError="clearError" />

      <div class="grid gap-4 sm:grid-cols-2">
        <label class="block space-y-2">
          <span class="text-sm font-medium text-[#d0d2d7]">First name</span>
          <input
            v-model="name"
            type="text"
            autocomplete="given-name"
            placeholder="First name"
            class="w-full border border-[#2a2b33] bg-[#0f1014] px-4 py-3 text-sm text-[#f9f9f9] outline-none transition placeholder:text-[#5f636d] focus:border-[#594ddf] focus:ring-2 focus:ring-[#594ddf]/20" />
        </label>

        <label class="block space-y-2">
          <span class="text-sm font-medium text-[#d0d2d7]">Last name</span>
          <input
            v-model="lastname"
            type="text"
            autocomplete="family-name"
            placeholder="Last name"
            class="w-full border border-[#2a2b33] bg-[#0f1014] px-4 py-3 text-sm text-[#f9f9f9] outline-none transition placeholder:text-[#5f636d] focus:border-[#594ddf] focus:ring-2 focus:ring-[#594ddf]/20" />
        </label>
      </div>

      <div class="space-y-4">
        <label class="block space-y-2">
          <span class="text-sm font-medium text-[#d0d2d7]">Company</span>
          <input
            v-model="company"
            type="text"
            autocomplete="organization"
            placeholder="Optional"
            class="w-full border border-[#2a2b33] bg-[#0f1014] px-4 py-3 text-sm text-[#f9f9f9] outline-none transition placeholder:text-[#5f636d] focus:border-[#594ddf] focus:ring-2 focus:ring-[#594ddf]/20" />
        </label>

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
          <span class="text-sm font-medium text-[#d0d2d7]">Password</span>
          <input
            v-model="password"
            type="password"
            autocomplete="new-password"
            placeholder="Create a password"
            class="w-full border border-[#2a2b33] bg-[#0f1014] px-4 py-3 text-sm text-[#f9f9f9] outline-none transition placeholder:text-[#5f636d] focus:border-[#594ddf] focus:ring-2 focus:ring-[#594ddf]/20" />
        </label>
      </div>

      <div class="space-y-4">
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
          <span>{{ loading ? 'Creating account...' : 'Create account' }}</span>
        </button>

        <p class="text-sm leading-6 text-[#808080]">
          By signing up, you agree to our
          <a
            href="https://policies.google.com/terms"
            target="_blank"
            rel="noopener noreferrer"
            class="text-[#f9f9f9] underline decoration-[#2b2c34] underline-offset-4 transition hover:text-[#cfd1ff]">
            API Terms of Service
          </a>
          and
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            class="text-[#f9f9f9] underline decoration-[#2b2c34] underline-offset-4 transition hover:text-[#cfd1ff]">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'auth',
});
useHead({
  title: 'Register | supaAuth',
});
const email = ref('');
const password = ref('');
const name = ref('');
const lastname = ref('');
const company = ref('');
const client = useSupabaseClient();
const user = useSupabaseUser();
const loading = ref(false);
const authError = ref('');

watchEffect(async () => {
  if (user.value) {
    await navigateTo('/');
  }
});

const signUp = async () => {
  if (!name.value) return (authError.value = 'First name required');
  if (!lastname.value) return (authError.value = 'Last name required');
  loading.value = true;
  const { error } = await client.auth.signUp({
    email: email.value,
    password: password.value,
    options: {
      data: {
        first_name: name.value,
        last_name: lastname.value,
        company: company.value,
      },
    },
  });
  if (error) {
    loading.value = false;
    authError.value = 'Failed to fetch';
  }
};

const clearError = () => {
  authError.value = '';
};
</script>
