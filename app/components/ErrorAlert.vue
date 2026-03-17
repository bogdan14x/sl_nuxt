<template>
  <Transition
    enter-active-class="transition-all duration-200 ease-out"
    enter-from-class="-translate-y-1 opacity-0"
    enter-to-class="translate-y-0 opacity-100"
    leave-active-class="transition-all duration-150 ease-in"
    leave-from-class="translate-y-0 opacity-100"
    leave-to-class="-translate-y-1 opacity-0">
    <div
      v-if="errorMsg"
      class="mb-4 flex items-start gap-3 border border-[rgba(235,44,136,0.28)] bg-[rgba(235,44,136,0.08)] px-3 py-2 text-left text-[#f9f9f9]">
      <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="mt-0.5 h-5 w-5 shrink-0 text-[#eb2c88]">
        <path
          d="M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round" />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M11.5321 12.5927C11.825 12.8856 12.2998 12.8856 12.5927 12.5927C12.8856 12.2998 12.8856 11.825 12.5927 11.5321L11.0607 10L12.5927 8.46799C12.8856 8.17509 12.8856 7.70022 12.5927 7.40733C12.2998 7.11443 11.825 7.11443 11.5321 7.40733L10 8.93937L8.46795 7.40729C8.17506 7.1144 7.70019 7.1144 7.40729 7.40729C7.1144 7.70019 7.1144 8.17506 7.40729 8.46795L8.93937 10L7.40729 11.5321C7.1144 11.825 7.1144 12.2999 7.40729 12.5928C7.70019 12.8857 8.17506 12.8857 8.46795 12.5928L10 11.0607L11.5321 12.5927Z"
          fill="currentColor" />
      </svg>
      <p class="min-w-0 flex-1 text-sm font-medium leading-6">{{ errorMsg }}</p>
      <button
        type="button"
        class="inline-flex h-6 w-6 items-center justify-center text-[#eb2c88] transition hover:bg-[rgba(235,44,136,0.12)] focus:outline-none focus:ring-2 focus:ring-[#594ddf]"
        @click="clearError">
        <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4">
          <path d="M13.5355 6.46448L6.46445 13.5355" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M13.5355 13.5355L6.46442 6.46445" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
    </div>
  </Transition>
</template>

<script setup lang="ts">
defineProps<{ errorMsg: String }>();

const emit = defineEmits(['clearError']);

const clearError = () => {
  emit('clearError');
};
</script>
