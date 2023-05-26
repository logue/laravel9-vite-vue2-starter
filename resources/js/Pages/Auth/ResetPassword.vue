<template>
  <guest-layout>
    <inertia-head title="Reset Password" />

    <form @submit.prevent="submit">
      <div>
        <input-label for="email" value="Email" />
        <text-input
          id="email"
          v-model="form.email"
          type="email"
          class="mt-1 block w-full"
          required
          autocomplete="username"
        />
        <input-error class="mt-2" :message="form.errors.email" />
      </div>

      <div class="mt-4">
        <input-label for="password" value="Password" />
        <text-input
          id="password"
          v-model="form.password"
          type="password"
          class="mt-1 block w-full"
          required
          autocomplete="new-password"
        />
        <input-error class="mt-2" :message="form.errors.password" />
      </div>

      <div class="mt-4">
        <input-label for="password_confirmation" value="Confirm Password" />
        <text-input
          id="password_confirmation"
          v-model="form.password_confirmation"
          type="password"
          class="mt-1 block w-full"
          required
          autocomplete="new-password"
        />
        <input-error
          class="mt-2"
          :message="form.errors.password_confirmation"
        />
      </div>

      <div class="flex items-center justify-end mt-4">
        <primary-button
          :class="{ 'opacity-25': form.processing }"
          :disabled="form.processing"
        >
          Reset Password
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
  /** Props Definition */
  props: {
    /** Email Address */
    email: { type: String, default: undefined },
    /** Access token */
    token: { type: String, default: undefined },
  },
  /**
   * Setup
   *
   * @param props - Props
   * @param _context - Setup Context
   */
  setup(props, _context: SetupContext) {
    /** Inertia Form */
    const form = useForm({
      token: props.token,
      email: props.email,
      password: '',
      password_confirmation: '',
    }) as any;

    /** Submit button clicked */
    const submit = () => {
      form.post(route('password.store'), {
        onFinish: () => form.reset('password', 'password_confirmation'),
      });
    };

    return {
      form,
      submit,
    };
  },
});
</script>
