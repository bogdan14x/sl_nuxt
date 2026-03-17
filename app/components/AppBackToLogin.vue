<template>
  <div v-if="!isLoginPage" class="fixed inset-x-0 top-0 z-10 flex justify-start px-5 py-5 sm:px-6">
    <NuxtLink
      to="/login"
      class="inline-flex items-center gap-2 text-sm font-semibold text-[#9ca0aa] transition hover:text-[#f9f9f9] focus:outline-none focus:ring-2 focus:ring-[#594ddf] focus:ring-offset-2 focus:ring-offset-[#101113]">
      <svg viewBox="0 0 20 20" fill="none" class="h-5 w-5" aria-hidden="true">
        <path
          d="M11.6667 6.66663L8.33334 9.99996L11.6667 13.3333"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round" />
      </svg>
      <span>Back to login</span>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();

const isLoginPage = computed(() => route.path === '/login');
</script>
