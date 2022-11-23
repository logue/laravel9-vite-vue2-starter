<template>
  <div
    class="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100 dark:bg-gray-900"
  >
    <div>
      <inertia-link href="/">
        <application-logo class="w-20 h-20 fill-current text-gray-500" />
      </inertia-link>
    </div>

    <div
      class="w-full sm:max-w-md mt-6 px-6 py-4 bg-white dark:bg-gray-800 shadow-md overflow-hidden sm:rounded-lg"
    >
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { InertiaLink } from 'vue-inertia-composable';

import ApplicationLogo from '@/Components/ApplicationLogo.vue';

export default defineComponent({
  /** Using components */
  components: {
    ApplicationLogo,
    InertiaLink,
  },
});
</script>
