<template>
  <breeze-guest-layout>
    <inertia-head title="Confirm Password" />

    <div class="mb-4 text-sm text-gray-600">
      This is a secure area of the application. Please confirm your password
      before continuing.
    </div>

    <breeze-validation-errors class="mb-4" />

    <form @submit.prevent="submit">
      <div>
        <breeze-label for="password" value="Password" />
        <breeze-input
          id="password"
          v-model="form.password"
          type="password"
          class="mt-1 block w-full"
          required
          autocomplete="current-password"
        />
      </div>

      <div class="flex justify-end mt-4">
        <breeze-button
          class="ml-4"
          :class="{ 'opacity-25': form.processing }"
          :disabled="form.processing"
        >
          Confirm
        </breeze-button>
      </div>
    </form>
  </breeze-guest-layout>
</template>

<script lang="ts">
import { defineComponent, ref, type Ref } from 'vue';
import { useInertia, route } from 'vue-inertia-composable';

import BreezeButton from '@/Components/Button.vue';
import BreezeGuestLayout from '@/Layouts/Guest.vue';
import BreezeInput from '@/Components/Input.vue';
import BreezeLabel from '@/Components/Label.vue';
import BreezeValidationErrors from '@/Components/ValidationErrors.vue';
import { Head as InertiaHead } from '@inertiajs/inertia-vue';

export default defineComponent({
  /** Using Components */
  components: {
    BreezeButton,
    BreezeGuestLayout,
    BreezeInput,
    BreezeLabel,
    BreezeValidationErrors,
    InertiaHead,
  },
  /**
   * Setup
   */
  setup() {
    /** Get Inertia instance */
    const inertia = useInertia();

    /** Form */
    const form: Ref<{ password: string; processing?: boolean }> = ref({
      password: '',
    });

    const submit = () => {
      inertia.post(route('password.confirm'), form.value, {
        onFinish: () => (form.value.password = ''),
      });
    };

    return {
      form,
      submit,
    };
  },
});
</script>
