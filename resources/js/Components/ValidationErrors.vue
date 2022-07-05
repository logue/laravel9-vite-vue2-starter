<template>
  <div v-if="hasErrors">
    <div class="font-medium text-red-600">Whoops! Something went wrong.</div>
    <ul class="mt-3 list-disc list-inside text-sm text-red-600">
      <li v-for="(error, key) in errors" :key="key">{{ error }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, type ComputedRef } from 'vue';
import { usePage } from 'vue-inertia-composable';

export default defineComponent({
  /**
   * Setup
   */
  setup() {
    /** Error Messages */
    const errors: ComputedRef<string[]> = computed(
      () => usePage().props.errors
    );

    /** Display error messages flag */
    const hasErrors: ComputedRef<boolean> = computed(
      () => Object.keys(errors.value).length > 0
    );

    return {
      errors,
      hasErrors,
    };
  },
});
</script>
