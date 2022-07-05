<template>
  <div v-show="message">
    <p class="text-sm text-red-600">
      {{ message }}
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  /** Props Definition */
  props: {
    /** Message */
    messages: { type: String, default: undefined },
  },
});
</script>
