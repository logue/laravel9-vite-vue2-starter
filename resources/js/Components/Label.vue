<template>
  <label class="block font-medium text-sm text-gray-700">
    <span v-if="value">{{ value }}</span>
    <span v-else><slot /></span>
  </label>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  /** Props Definition */
  props: {
    /** Lavel text */
    value: { type: String, default: undefined },
  },
});
</script>
