<template>
  <div class="space-y-8">
    <div class="space-y-3 text-center">
      <p class="text-xs font-semibold uppercase tracking-[0.18em] text-[#8f87ff]">Password reset</p>
      <h1 class="text-3xl font-semibold tracking-[-0.03em] text-[#f9f9f9]">Forgot password</h1>
      <p class="text-sm leading-6 text-[#808080]">Enter your email and we’ll send you a reset link.</p>
    </div>

    <form class="space-y-6" @submit.prevent="resetPassword">
      <ErrorAlert :error-msg="authError" @clearError="clearError" />
      <SuccessAlert :success-msg="authSuccess" @clearSuccess="clearSuccess" />

      <label class="block space-y-2">
        <span class="text-sm font-medium text-[#d0d2d7]">Email address</span>
        <input
          v-model="email"
          type="email"
          autocomplete="email"
          placeholder="artist@email.com"
          class="w-full border border-[#2a2b33] bg-[#0f1014] px-4 py-3 text-sm text-[#f9f9f9] outline-none transition placeholder:text-[#5f636d] focus:border-[#594ddf] focus:ring-2 focus:ring-[#594ddf]/20" />
      </label>

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
        <span>{{ loading ? 'Sending reset link...' : 'Request reset link' }}</span>
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'auth',
});
useHead({
  title: 'Forgot Password | supaAuth',
});
const email = ref('');
const client = useSupabaseClient();
const loading = ref(false);
const authSuccess = ref('');
const authError = ref('');

const resetPassword = async () => {
  loading.value = true;
  const { error } = await client.auth.resetPasswordForEmail(email.value, {
    redirectTo: `${window.location.origin}/new-password`,
  });
  if (error) {
    loading.value = false;
    authError.value = error.message;
    setTimeout(() => {
      authError.value = '';
    }, 5000);
  } else {
    loading.value = false;
    authSuccess.value = `We've sent your an email.`;
    setTimeout(() => {
      authSuccess.value = '';
    }, 5000);
  }
};

const clearError = () => {
  authError.value = '';
};

const clearSuccess = () => {
  authSuccess.value = '';
};
</script>
