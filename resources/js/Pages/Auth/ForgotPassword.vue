<template>
  <guest-layout>
    <inertia-head title="Forgot Password" />

    <div class="mb-4 text-sm text-gray-600 dark:text-gray-400">
      Forgot your password? No problem. Just let us know your email address and
      we will email you a password reset link that will allow you to choose a
      new one.
    </div>

    <div
      v-if="status"
      class="mb-4 font-medium text-sm text-green-600 dark:text-green-400"
    >
      {{ status }}
    </div>

    <form @submit.prevent="submit">
      <div>
        <input-label for="email" value="Email" />
        <text-input
          id="email"
          v-model="form.email"
          autocomplete="username"
          class="mt-1 block w-full"
          required
          type="email"
        />
        <input-error class="mt-2" :message="form.errors.email" />
      </div>

      <div class="flex items-center justify-end mt-4">
        <primary-button
          :class="{ 'opacity-25': form.processing }"
          :disabled="form.processing"
        >
          Email Password Reset Link
        </primary-button>
      </div>
    </form>
  </guest-layout>
</template>

<script lang="ts">
import { useForm, Head as InertiaHead } from '@inertiajs/vue2';
import { defineComponent, type SetupContext } from 'vue';
import { route } from 'vue-inertia-composable';

import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
import GuestLayout from '@/Layouts/GuestLayout.vue';

export default defineComponent({
  /** Using Components */
  components: {
    GuestLayout,
    InputError,
    InputLabel,
    PrimaryButton,
    TextInput,
    InertiaHead,
  },
  /** Props Definition */
  props: {
    /** Status Message */
    status: { type: String, default: undefined },
  },
  /**
   * Setup
   *
   * @param _props - Props
   * @param _context - Setup Context
   */
  setup(_rops, _context: SetupContext) {
    /** Inertia Form */
    const form = useForm({
      email: '',
    }) as any;

    /** Submit button clicked */
    const submit = () => {
      form.post(route('password.email'));
    };

    return {
      form,
      submit,
    };
  },
});
</script>
