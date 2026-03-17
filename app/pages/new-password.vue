<template>
  <div class="space-y-8">
    <div class="space-y-3 text-center">
      <p class="text-xs font-semibold uppercase tracking-[0.18em] text-[#8f87ff]">Finish reset</p>
      <h1 class="text-3xl font-semibold tracking-[-0.03em] text-[#f9f9f9]">Set a new password</h1>
      <p class="text-sm leading-6 text-[#808080]">Choose a new password to secure your Soundlog account.</p>
    </div>

    <form class="space-y-6" @submit.prevent="updatepassword">
      <ErrorAlert :error-msg="authError" @clearError="clearError" />
      <SuccessAlert :success-msg="authSuccess" @clearSuccess="clearSuccess" />

      <div class="space-y-4">
        <label class="block space-y-2">
          <span class="text-sm font-medium text-[#d0d2d7]">New password</span>
          <input
            v-model="password"
            type="password"
            autocomplete="new-password"
            placeholder="Create a password"
            class="w-full border border-[#2a2b33] bg-[#0f1014] px-4 py-3 text-sm text-[#f9f9f9] outline-none transition placeholder:text-[#5f636d] focus:border-[#594ddf] focus:ring-2 focus:ring-[#594ddf]/20" />
        </label>

        <label class="block space-y-2">
          <span class="text-sm font-medium text-[#d0d2d7]">Repeat password</span>
          <input
            v-model="passwordConfirm"
            type="password"
            autocomplete="new-password"
            placeholder="Repeat your password"
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
        <span>{{ loading ? 'Saving password...' : 'Save new password' }}</span>
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'auth',
});
useHead({
  title: 'New Password | supaAuth',
});
const password = ref('');
const passwordConfirm = ref('');
const client = useSupabaseClient();
const loading = ref(false);
const authSuccess = ref('');
const authError = ref('');

const updatepassword = async () => {
  if (password.value !== passwordConfirm.value) return (authError.value = 'Password mismatch!');
  loading.value = true;
  const { error } = await client.auth.updateUser({
    password: password.value,
  });
  await client.auth.signOut();
  if (error) {
    loading.value = false;
    authError.value = error.message;
    setTimeout(() => {
      authError.value = '';
    }, 5000);
  } else {
    loading.value = false;
    authSuccess.value = `Password changed`;
    setTimeout(() => {
      authSuccess.value = '';
      navigateTo('/login');
    }, 5000);
  }
};

const clearError = () => {
  authError.value = '';
};

const clearSuccess = () => {
  authSuccess.value = '';
  navigateTo('/login');
};
</script>
