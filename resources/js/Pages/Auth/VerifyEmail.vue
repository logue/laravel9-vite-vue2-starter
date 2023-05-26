<template>
  <guest-layout>
    <inertia-head title="Email Verification" />

    <div class="mb-4 text-sm text-gray-600 dark:text-gray-400">
      Thanks for signing up! Before getting started, could you verify your email
      address by clicking on the link we just emailed to you? If you didn't
      receive the email, we will gladly send you another.
    </div>

    <div
      v-if="verificationLinkSent"
      class="mb-4 font-medium text-sm text-green-600 dark:text-green-400"
    >
      A new verification link has been sent to the email address you provided
      during registration.
    </div>

    <form @submit.prevent="submit">
      <div class="mt-4 flex items-center justify-between">
        <primary-button
          :class="{ 'opacity-25': form.processing }"
          :disabled="form.processing"
        >
          Resend Verification Email
        </primary-button>

        <inertia-link
          :href="route('logout')"
          method="post"
          as="button"
          class="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
        >
          Log Out
        </inertia-link>
      </div>
    </form>
  </guest-layout>
</template>

<script lang="ts">
import { Head as InertiaHead, useForm } from '@inertiajs/vue2';
import {
  computed,
  defineComponent,
  type ComputedRef,
  type SetupContext,
} from 'vue';
import { InertiaLink, route } from 'vue-inertia-composable';

import PrimaryButton from '@/Components/PrimaryButton.vue';
import GuestLayout from '@/Layouts/GuestLayout.vue';

export default defineComponent({
  /** Using Components */
  components: {
    GuestLayout,
    PrimaryButton,
    InertiaLink,
    InertiaHead,
  },
  /** Props Definition */
  props: {
    /** Status message */
    status: { type: String, default: undefined },
  },
  /**
   * Setup
   *
   * @param props - Props
   * @param _context - Setup Context
   */
  setup(props, _context: SetupContext) {
    /** Inertia Form */
    const form = useForm({}) as any;

    /** Verification email send flag */
    const verificationLinkSent: ComputedRef<boolean> = computed(
      () => props.status === 'verification-link-sent'
    );

    /** Submit button handler */
    const submit = () => {
      form.post(route('verification.send'));
    };

    return {
      form,
      route,
      submit,
      verificationLinkSent,
    };
  },
});
</script>
