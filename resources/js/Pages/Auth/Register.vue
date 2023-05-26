<template>
  <guest-layout>
    <inertia-head title="Register" />

    <form @submit.prevent="submit">
      <div>
        <input-label for="name" value="Name" />
        <text-input
          id="name"
          v-model="form.name"
          type="text"
          class="mt-1 block w-full"
          required
          autocomplete="name"
        />
        <input-error class="mt-2" :message="form.errors.name" />
      </div>

      <div class="mt-4">
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
        <inertia-link
          :href="route('login')"
          class="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
        >
          Already registered?
        </inertia-link>

        <primary-button
          class="ml-4"
          :class="{ 'opacity-25': form.processing }"
          :disabled="form.processing"
        >
          Register
        </primary-button>
      </div>
    </form>
  </guest-layout>
</template>

<script lang="ts">
import { Head as InertiaHead, useForm } from '@inertiajs/vue2';
import { defineComponent, type SetupContext } from 'vue';
import { InertiaLink, route } from 'vue-inertia-composable';

import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
import GuestLayout from '@/Layouts/GuestLayout.vue';

type TForm = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  terms: boolean;
};

export default defineComponent({
  /** Using Components */
  components: {
    GuestLayout,
    InputError,
    InputLabel,
    PrimaryButton,
    TextInput,
    InertiaLink,
    InertiaHead,
  },
  /**
   * Setup
   *
   * @param _props - Props
   * @param _context - Setup Context
   */
  setup(_props, _context: SetupContext) {
    const form = useForm<TForm>({
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      terms: false,
    });

    const submit = () => {
      form.post(route('register'), {
        onFinish: () => form.reset('password', 'password_confirmation'),
      });
    };

    return { form, submit, route };
  },
});
</script>
