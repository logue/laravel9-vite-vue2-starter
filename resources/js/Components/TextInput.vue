<template>
  <input
    ref="input"
    class="border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
    :value="modelValue"
    @input="onInput"
  />
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
  type Ref,
  type SetupContext,
} from 'vue';

export default defineComponent({
  /** Model Definition */
  model: {
    prop: 'modelValue',
    event: 'update:modelValue',
  },
  /** Props */
  props: {
    modelValue: {
      type: String,
      default: '',
    },
  },
  /** Emits */
  emits: ['update:modelValue'],
  /**
   * Setup
   *
   * @param _props - Props
   * @param context - Setup Context
   */
  setup(_props, context: SetupContext) {
    const input: Ref<HTMLInputElement | undefined> = ref();

    const focus = () => input.value?.focus();

    const onInput = () => {
      if (input.value) {
        context.emit('update:modelValue', input.value.value);
      }
    };

    onMounted(() => {
      if (input.value?.hasAttribute('autofocus')) {
        input.value.focus();
      }
    });

    context.expose({ focus: () => input.value?.focus() });

    return {
      input,
      focus,
      onInput,
    };
  },
});
</script>
