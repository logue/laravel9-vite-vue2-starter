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
  },
  /**
   * Setup
   *
   * @param props - Props
   * @param _context - Setup Context
   */
  setup(props, _context: SetupContext) {
    /** Toggle active class */
    const classes: ComputedRef<string> = computed(() =>
      props.active
        ? 'inline-flex items-center px-1 pt-1 border-b-2 border-indigo-400 dark:border-indigo-600 text-sm font-medium leading-5 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-indigo-700 transition duration-150 ease-in-out'
        : 'inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-700 focus:outline-none focus:text-gray-700 dark:focus:text-gray-300 focus:border-gray-300 dark:focus:border-gray-700 transition duration-150 ease-in-out'
    );

    return { classes };
  },
});
</script>
