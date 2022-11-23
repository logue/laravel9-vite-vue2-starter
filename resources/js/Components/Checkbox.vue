<template>
  <!-- eslint-disable-next-line vuejs-accessibility/form-control-has-label -->
  <input
    v-model="proxyChecked"
    type="checkbox"
    :value="modelValue"
    class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
      type: Boolean,
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
    const proxyChecked: WritableComputedRef<boolean> = computed({
      get: () => props.checked,
      set: val => context.emit('update:checked', val),
    });

    return { proxyChecked };
  },
});
</script>
