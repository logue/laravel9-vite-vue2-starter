<template>
  <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
  <label class="block font-medium text-sm text-gray-700">
    <span v-if="value">{{ value }}</span>
    <span v-else><slot /></span>
  </label>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  /** Props Definition */
  props: {
    /** Label text */
    value: { type: String, default: undefined },
  },
});
</script>
