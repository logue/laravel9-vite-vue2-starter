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
          type="email"
          class="mt-1 block w-full"
          v-model="form.email"
          required
          autofocus
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
          autocomplete="current-password"
        />
      </div>

      <div class="block mt-4">
        <label class="flex items-center">
          <breeze-checkbox name="remember" v-model:checked="form.remember" />
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
import { defineComponent, Ref, ref } from '@vue/composition-api';
import { useInertia, route } from '@/plugins/inertia-helper';

import BreezeButton from '@/components/Button.vue';
import BreezeCheckbox from '@/components/Checkbox.vue';
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
    };
  },
});
</script>
