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
          type="password"
          class="mt-1 block w-full"
          v-model="form.password"
          required
          autocomplete="current-password"
          autofocus
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
import { defineComponent, ref, type Ref } from '@vue/composition-api';
import { useInertia, route } from '@/plugins/inertia-helper';

import BreezeButton from '@/components/Button.vue';
import BreezeGuestLayout from '@/layouts/Guest.vue';
import BreezeInput from '@/components/Input.vue';
import BreezeLabel from '@/components/Label.vue';
import BreezeValidationErrors from '@/components/ValidationErrors.vue';
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
