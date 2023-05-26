<template>
  <section>
    <header>
      <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">
        Profile Information
      </h2>

      <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
        Update your account's profile information and email address.
      </p>
    </header>

    <form
      class="mt-6 space-y-6"
      @submit.prevent="form.patch(route('profile.update'))"
    >
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

      <div>
        <input-label for="email" value="Email" />

        <text-input
          id="email"
          v-model="form.email"
          autocomplete="email"
          class="mt-1 block w-full"
          required
          type="email"
        />

        <input-error class="mt-2" :message="form.errors.email" />
      </div>

      <div v-if="mustVerifyEmail && user.email_verified_at === null">
        <p class="text-sm mt-2 text-gray-800 dark:text-gray-200">
          Your email address is unverified.
          <inertia-link
            :href="route('verification.send')"
            method="post"
            as="button"
            class="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
          >
            Click here to re-send the verification email.
          </inertia-link>
        </p>

        <div
          v-show="status === 'verification-link-sent'"
          class="mt-2 font-medium text-sm text-green-600 dark:text-green-400"
        >
          A new verification link has been sent to your email address.
        </div>
      </div>

      <div class="flex items-center gap-4">
        <primary-button :disabled="form.processing">Save</primary-button>

        <transition
          enter-from-class="opacity-0"
          leave-to-class="opacity-0"
          class="transition ease-in-out"
        >
          <p
            v-if="form.recentlySuccessful"
            class="text-sm text-gray-600 dark:text-gray-400"
          >
            Saved.
          </p>
        </transition>
      </div>
    </form>
  </section>
</template>

<script lang="ts">
import { useForm, usePage } from '@inertiajs/vue2';
import { defineComponent, type SetupContext } from 'vue';
import { InertiaLink, route } from 'vue-inertia-composable';

import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue';

export default defineComponent({
  /** Using Components */
  components: {
    InertiaLink,
    InputError,
    InputLabel,
    PrimaryButton,
    TextInput,
  },
  /** Props Definition */
  props: {
    mustVerifyEmail: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      default: '',
    },
  },
  /**
   * Setup
   *
   * @param _props - Props
   * @param _context - Setup Context
   */
  setup(_props, _context: SetupContext) {
    const user = usePage().props.auth.user;

    const form = useForm({
      name: user.name,
      email: user.email,
    }) as any;

    return { user, form, route };
  },
});
</script>
