<template>
  <guest-layout>
    <inertia-head title="Log in" />

    <div v-if="status" class="mb-4 font-medium text-sm text-green-600">
      {{ status }}
    </div>

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
          autocomplete="current-password"
        />
        <input-error class="mt-2" :message="form.errors.password" />
      </div>

      <div class="block mt-4">
        <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
        <label class="flex items-center">
          <!-- eslint-disable-next-line vue/no-v-model-argument -->
          <checkbox v-model:checked="form.remember" name="remember" />
          <span class="ml-2 text-sm text-gray-600 dark:text-gray-400">
            Remember me
          </span>
        </label>
      </div>

      <div class="flex items-center justify-end mt-4">
        <inertia-link
          v-if="canResetPassword"
          :href="route('password.request')"
          class="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
        >
          Forgot your password?
        </inertia-link>

        <primary-button
          class="ml-4"
          :class="{ 'opacity-25': form.processing }"
          :disabled="form.processing"
        >
          Log in
        </primary-button>
      </div>
    </form>
  </guest-layout>
</template>

<script lang="ts">
import { Head as InertiaHead, useForm } from '@inertiajs/vue2';
import { defineComponent, type SetupContext } from 'vue';
import { InertiaLink, route } from 'vue-inertia-composable';

import Checkbox from '@/Components/Checkbox.vue';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
import GuestLayout from '@/Layouts/GuestLayout.vue';

export default defineComponent({
  /** Using Components */
  components: {
    Checkbox,
    GuestLayout,
    InputError,
    InputLabel,
    PrimaryButton,
    TextInput,
    InertiaHead,
    InertiaLink,
  },
  /** Props Definition */
  props: {
    canResetPassword: {
      type: Boolean,
      default: false,
    },
    status: { type: String, default: undefined },
  },
  /**
   * Setup
   *
   * @param _props - Props
   * @param _context - Setup Context
   */
  setup(_props, _context: SetupContext) {
    const form = useForm({
      email: '',
      password: '',
      remember: false,
    }) as any;

    const submit = () => {
      form.post(route('login'), {
        onFinish: () => form.reset('password'),
      });
    };

    return { form, submit, route };
  },
});
</script>
