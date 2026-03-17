<template>
  <div class="min-h-screen bg-[#101113] text-[#f9f9f9]">
    <AppBackToLogin />
    <div class="flex min-h-screen items-center justify-center px-5 py-24 sm:px-6">
      <div class="w-full max-w-md">
        <div class="border border-[#23232b] bg-[#14151a] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)] sm:p-8">
          <slot />
        </div>
        <p class="mx-auto mt-6 max-w-sm text-center text-xs leading-5 text-[#808080]">
          This site is authenticated by Supabase and the
          <a
            target="_blank"
            href="https://supabase.com/privacy"
            rel="noreferrer"
            class="text-[#b9bcc4] underline decoration-[#2b2c34] underline-offset-4 transition hover:text-[#f9f9f9]">
            Privacy Policy
          </a>
          and
          <a
            target="_blank"
            href="https://supabase.com/terms"
            rel="noreferrer"
            class="text-[#b9bcc4] underline decoration-[#2b2c34] underline-offset-4 transition hover:text-[#f9f9f9]">
            Terms of Service
          </a>
          apply.
        </p>
      </div>
    </div>
  </div>
</template>
