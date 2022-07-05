<template>
  <inertia-link
    :href="href"
    class="block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
    @click.prevent="click"
  >
    <slot />
  </inertia-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useInertia } from 'vue-inertia-composable';

import { Link as InertiaLink } from '@inertiajs/inertia-vue';

export default defineComponent({
  /** Components */
  components: {
    InertiaLink,
  },
  /** Props */
  props: {
    href: { type: String, required: true },
    method: { type: String, default: 'get' },
  },
  /**
   * Setup
   *
   * @param props - Props
   */
  setup(props) {
    /** Inertia Instance */
    const inertia = useInertia();

    /** Link clicked */
    const click = () => {
      if (props.method !== 'get') {
        inertia[props.method.toLowerCase()](props.href, {
          onFinish() {
            inertia.visit(import.meta.env.BASE_URL);
            return;
          },
        });
      } else {
        inertia.visit(props.href);
      }
      return false;
    };

    return {
      click,
    };
  },
});
</script>
