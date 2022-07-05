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
          v-model="form.email"
          type="email"
          class="mt-1 block w-full"
          required
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
