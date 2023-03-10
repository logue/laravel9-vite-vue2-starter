<template>
  <!-- eslint-disable-next-line vuejs-accessibility/form-control-has-label -->
  <input
    v-model="proxyChecked"
    type="checkbox"
    :value="modelValue"
    class="rounded dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-indigo-600 shadow-sm focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:focus:ring-offset-gray-800"
  />
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  type SetupContext,
  type WritableComputedRef,
} from 'vue';

export default defineComponent({
  /** Model Definition */
  model: {
    prop: 'modelValue',
    event: 'update:modelValue',
  },
  /** Props Definition */
  props: {
    checked: {
      type: [Array, Boolean],
      default: false,
    },
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  /** Emits */
  emits: ['update:modelValue'],
  /**
   * Setup
   *
   * @param props - Props
   * @param context - Setup Context
   */
  setup(props, context: SetupContext) {
    const proxyChecked: WritableComputedRef<boolean | unknown[]> = computed({
      get: () => props.checked,
      set: val => context.emit('update:checked', val),
    });

    return { proxyChecked };
  },
});
</script>
