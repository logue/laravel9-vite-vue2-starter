<template>
  <breeze-guest-layout>
    <inertia-head title="Register" />

    <breeze-validation-errors class="mb-4" />

    <form @submit.prevent="submit">
      <div>
        <breeze-label for="name" value="Name" />
        <breeze-input
          id="name"
          type="text"
          class="mt-1 block w-full"
          v-model="form.name"
          required
          autofocus
          autocomplete="name"
        />
      </div>

      <div class="mt-4">
        <breeze-label for="email" value="Email" />
        <breeze-input
          id="email"
          type="email"
          class="mt-1 block w-full"
          v-model="form.email"
          required
          autocomplete="username"
        />
      </div>

      <div class="mt-4">
        <breeze-label for="password" value="Password" />
        <breeze-input
          id="password"
          type="password"
          class="mt-1 block w-full"
          v-model="form.password"
          required
          autocomplete="new-password"
        />
      </div>

      <div class="mt-4">
        <breeze-label for="password_confirmation" value="Confirm Password" />
        <breeze-input
          id="password_confirmation"
          type="password"
          class="mt-1 block w-full"
          v-model="form.password_confirmation"
          required
          autocomplete="new-password"
        />
      </div>

      <div class="flex items-center justify-end mt-4">
        <inertia-link
          :href="route('login')"
          class="underline text-sm text-gray-600 hover:text-gray-900"
        >
          Already registered?
        </inertia-link>

        <breeze-button
          class="ml-4"
          :class="{ 'opacity-25': form.processing }"
          :disabled="form.processing"
        >
          Register
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
import {
  Head as InertiaHead,
  Link as InertiaLink,
} from '@inertiajs/inertia-vue';

export default defineComponent({
  /** Using Components */
  components: {
    BreezeButton,
    BreezeGuestLayout,
    BreezeInput,
    BreezeLabel,
    BreezeValidationErrors,
    InertiaHead,
    InertiaLink,
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

    /** Form value */
    const form: Ref<{
      name: string;
      email: string;
      password: string;
      password_confirmation: string;
      terms: boolean;
      processing?: boolean;
    }> = ref({
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      terms: false,
    });

    /** Form submit handler */
    const submit = () => {
      // console.log(form.value);
      inertia.post(route('register'), form.value, {
        onFinish: () => {
          form.value.password = '';
          form.value.password_confirmation = '';
        },
      });
    };

    return {
      form,
      submit,
    };
  },
});
</script>
