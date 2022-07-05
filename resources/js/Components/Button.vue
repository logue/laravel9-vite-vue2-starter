<template>
  <button
    :type="type"
    class="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:shadow-outline-gray transition ease-in-out duration-150"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';

export default defineComponent({
  /** Props Definition */
  props: {
    /** Button type */
    type: {
      type: String as PropType<'submit' | 'reset' | 'button'>,
      default: 'submit',
    },
  },
});
</script>
