<template>
  <breeze-guest-layout>
    <inertia-head title="Forgot Password" />

    <div class="mb-4 text-sm text-gray-600">
      Forgot your password? No problem. Just let us know your email address and
      we will email you a password reset link that will allow you to choose a
      new one.
    </div>

    <div v-if="status" class="mb-4 font-medium text-sm text-green-600">
      {{ status }}
    </div>

    <breeze-validation-errors class="mb-4" />

    <form @submit.prevent="submit">
      <div>
        <breeze-label for="email" value="Email" />
        <breeze-input
          id="email"
          type="email"
          class="mt-1 block w-full"
          v-model="form.email"
          required
          autofocus
          autocomplete="username"
        />
      </div>

      <div class="flex items-center justify-end mt-4">
        <breeze-button
          :class="{ 'opacity-25': form.processing }"
          :disabled="form.processing"
        >
          Email Password Reset Link
        </breeze-button>
      </div>
    </form>
  </breeze-guest-layout>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from '@vue/composition-api';
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
  /** Props Definition */
  props: {
    /** Status Message */
    status: { type: String, default: undefined },
  },
  /**
   * Setup
   */
  setup() {
    /** Get Inertia instance */
    const inertia = useInertia();

    /** Form */
    const form: Ref<{ email: string; processing?: boolean }> = ref({
      email: '',
    });

    /** Submit button clicked */
    const submit = () => {
      inertia.post(route('password.email'), form.value);
    };

    return {
      form,
      submit,
    };
  },
});
</script>
