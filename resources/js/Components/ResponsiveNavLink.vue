<template>
  <inertia-link :href="href" :class="classes">
    <slot />
  </inertia-link>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  type ComputedRef,
  type SetupContext,
} from 'vue';
import { InertiaLink } from 'vue-inertia-composable';

export default defineComponent({
  /** Using Components */
  components: {
    InertiaLink,
  },
  /** Props Definition */
  props: {
    /** URL */
    href: { type: String, required: true },
    /** is active */
    active: { type: Boolean, default: false },
    /** Form method */
    method: { type: String, default: 'get' },
  },
  /**
   * Setup
   *
   * @param props - Props
   * @param _context - Setup Context
   */
  setup(props, _context: SetupContext) {
    /** Toggle class */
    const classes: ComputedRef<string> = computed(() =>
      props.active
        ? 'block w-full pl-3 pr-4 py-2 border-l-4 border-indigo-400 dark:border-indigo-600 text-left text-base font-medium text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/50 focus:outline-none focus:text-indigo-800 dark:focus:text-indigo-200 focus:bg-indigo-100 dark:focus:bg-indigo-900 focus:border-indigo-700 dark:focus:border-indigo-300 transition duration-150 ease-in-out'
        : 'block w-full pl-3 pr-4 py-2 border-l-4 border-transparent text-left text-base font-medium text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600 focus:outline-none focus:text-gray-800 dark:focus:text-gray-200 focus:bg-gray-50 dark:focus:bg-gray-700 focus:border-gray-300 dark:focus:border-gray-600 transition duration-150 ease-in-out'
    );

    return { classes };
  },
});
</script>
