<template>
  <breeze-guest-layout>
    <inertia-head title="Log in" />

    <breeze-validation-errors class="mb-4" />

    <div v-if="status" class="mb-4 font-medium text-sm text-green-600">
      {{ status }}
    </div>

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

      <div class="mt-4">
        <breeze-label for="password" value="Password" />
        <breeze-input
          id="password"
          v-model="form.password"
          type="password"
          class="mt-1 block w-full"
          required
          autocomplete="current-password"
        />
      </div>

      <div class="block mt-4">
        <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
        <label class="flex items-center">
          <breeze-checkbox v-model="form.remember" name="remember" />
          <span class="ml-2 text-sm text-gray-600">Remember me</span>
        </label>
      </div>

      <div class="flex items-center justify-end mt-4">
        <inertia-link
          v-if="canResetPassword"
          :href="route('password.request')"
          class="underline text-sm text-gray-600 hover:text-gray-900"
        >
          Forgot your password?
        </inertia-link>

        <breeze-button
          class="ml-4"
          :class="{ 'opacity-25': form.processing }"
          :disabled="form.processing"
        >
          Log in
        </breeze-button>
      </div>
    </form>
  </breeze-guest-layout>
</template>

<script lang="ts">
import { defineComponent, ref, type Ref } from 'vue';
import { useInertia, route } from 'vue-inertia-composable';

import BreezeButton from '@/Components/Button.vue';
import BreezeCheckbox from '@/Components/Checkbox.vue';
import BreezeGuestLayout from '@/Layouts/Guest.vue';
import BreezeInput from '@/Components/Input.vue';
import BreezeLabel from '@/Components/Label.vue';
import BreezeValidationErrors from '@/Components/ValidationErrors.vue';
import {
  Head as InertiaHead,
  Link as InertiaLink,
} from '@inertiajs/inertia-vue';

export default defineComponent({
  /** Using Components */
  components: {
    BreezeButton,
    BreezeCheckbox,
    BreezeGuestLayout,
    BreezeInput,
    BreezeLabel,
    BreezeValidationErrors,
    InertiaHead,
    InertiaLink,
  },
  /** Props Definition */
  props: {
    /** Reset password flag */
    canResetPassword: { type: Boolean, default: false },
    /** Status message */
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
      email: string;
      password: string;
      remember: boolean;
      processing?: boolean;
    }> = ref({
      email: '',
      password: '',
      remember: false,
    });

    /** Form submit handler */
    const submit = () => {
      console.log(form.value);
      inertia.post(route('login'), form.value, {
        onFinish: () => (form.value.password = ''),
      });
    };

    return {
      form,
      submit,
      route,
    };
  },
});
</script>
