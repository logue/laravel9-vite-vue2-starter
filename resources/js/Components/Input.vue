<template>
  <input
    ref="input"
    class="border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
    :value="modelValue"
    @input="onInput"
  />
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
  type SetupContext,
  type Ref,
} from 'vue';

export default defineComponent({
  /** Model Definition */
  model: {
    prop: 'modelValue',
    event: 'update:modelValue',
  },
  /** Props Definition */
  props: {
    modelValue: {
      type: String,
      default: undefined,
    },
  },
  /** Emits */
  emits: ['update:modelValue'],
  /**
   * Setup
   *
   * @param _props  - Props
   * @param context - Context
   */
  setup(_props, context: SetupContext) {
    const input: Ref<HTMLInputElement | undefined> = ref();

    onMounted(() => {
      if (input.value && input.value.hasAttribute('autofocus')) {
        input.value.focus();
      }
    });

    const onInput = (e: InputEvent) =>
      context.emit('update:modelValue', (e.target as HTMLInputElement).value);

    return {
      input,
      onInput,
    };
  },
});
</script>
