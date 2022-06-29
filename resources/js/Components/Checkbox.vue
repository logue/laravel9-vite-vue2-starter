<template>
  <input
    type="checkbox"
    :value="value"
    v-model="proxyChecked"
    class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
  />
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  type Ref,
  type SetupContext,
} from '@vue/composition-api';

export default defineComponent({
  /** Props Definition */
  props: {
    checked: {
      type: Boolean,
      default: false,
    },
    value: {
      type: Boolean,
      default: false,
    },
  },
  /** Emits */
  emits: ['update:checked'],
  /**
   * Setup
   * @param props - Props
   * @param context - Setup Context
   */
  setup(props, context: SetupContext) {
    const proxyChecked: Ref<boolean> = computed({
      get: () => props.checked,
      set: val => context.emit('update:checked', val),
    });

    return { proxyChecked };
  },
});
</script>
