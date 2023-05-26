<template>
  <guest-layout>
    <inertia-head title="Confirm Password" />

    <div class="mb-4 text-sm text-gray-600 dark:text-gray-400">
      This is a secure area of the application. Please confirm your password
      before continuing.
    </div>

    <form @submit.prevent="submit">
      <div>
        <input-label for="password" value="Password" />
        <text-input
          id="password"
          v-model="form.password"
          autocomplete="current-password"
          class="mt-1 block w-full"
          required
          type="password"
        />
        <input-error class="mt-2" :message="form.errors.password" />
      </div>

      <div class="flex justify-end mt-4">
        <primary-button
          class="ml-4"
          :class="{ 'opacity-25': form.processing }"
          :disabled="form.processing"
        >
          Confirm
        </primary-button>
      </div>
    </form>
  </guest-layout>
</template>

<script lang="ts">
import { Head as InertiaHead, useForm } from '@inertiajs/vue2';
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
  /**
   * Setup
   *
   * @param _props - Props
   * @param _context - Setup Context
   */
  setup(_props, _context: SetupContext) {
    /** Get Inertia form instance */
    const form = useForm({
      password: '',
    }) as any;

    const submit = () => {
      form.post(route('password.confirm'), {
        onFinish: () => form.reset(),
      });
    };

    return {
      form,
      submit,
    };
  },
});
</script>
