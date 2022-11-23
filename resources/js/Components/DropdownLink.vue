<template>
  <inertia-link
    class="block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800 transition duration-150 ease-in-out"
  >
    <slot />
  </inertia-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { InertiaLink } from 'vue-inertia-composable';

export default defineComponent({
  /** Using Components */
  components: {
    InertiaLink,
  },
});
</script>
