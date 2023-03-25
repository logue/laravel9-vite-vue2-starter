<!-- eslint-disable vuejs-accessibility/label-has-for -->
<template>
  <label class="block font-medium text-sm text-gray-700 dark:text-gray-300">
    <template v-if="value">{{ value }}</template>
    <template v-else><slot /></template>
  </label>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  /** Props Definition */
  props: {
    value: { type: String, default: undefined },
  },
});
</script>
