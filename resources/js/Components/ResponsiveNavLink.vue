<template>
  <inertia-link :href="href" :class="classes" @click.prevent="click">
    <slot />
  </inertia-link>
</template>

<script lang="ts">
import { computed, defineComponent, type ComputedRef } from 'vue';
import { useInertia } from 'vue-inertia-composable';

import { Link as InertiaLink } from '@inertiajs/inertia-vue';

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
   */
  setup(props) {
    /** Get Inertia Instance */
    const inertia = useInertia();

    /** Toggle class */
    const classes: ComputedRef<string> = computed(() =>
      props.active
        ? 'block pl-3 pr-4 py-2 border-l-4 border-indigo-400 text-base font-medium text-indigo-700 bg-indigo-50 focus:outline-none focus:text-indigo-800 focus:bg-indigo-100 focus:border-indigo-700 transition duration-150 ease-in-out'
        : 'block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 transition duration-150 ease-in-out'
    );

    /** Link clicked */
    const click = () => {
      console.log('click');
      if (props.method !== 'get') {
        inertia[props.method.toLowerCase()](props.href, {
          onFinish() {
            // TODO: this link always to top page
            inertia.visit('/');
            return;
          },
        });
        // Prevend page link
        return false;
      }
    };
    return { classes, click };
  },
});
</script>
