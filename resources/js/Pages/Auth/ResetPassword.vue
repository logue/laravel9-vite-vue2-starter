<template>
  <breeze-guest-layout>
    <inertia-head title="Reset Password" />

    <breeze-validation-errors class="mb-4" />

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
          v-model="form.password"
          id="password"
          type="password"
          class="mt-1 block w-full"
          required
          autocomplete="new-password"
        />
      </div>

      <div class="mt-4">
        <breeze-label for="password_confirmation" value="Confirm Password" />
        <breeze-input
          v-model="form.password_confirmation"
          id="password_confirmation"
          type="password"
          class="mt-1 block w-full"
          required
          autocomplete="new-password"
        />
      </div>

      <div class="flex items-center justify-end mt-4">
        <breeze-button
          :class="{ 'opacity-25': form.processing }"
          :disabled="form.processing"
        >
          Reset Password
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
import { Head as InertiaHead } from '@inertiajs/inertia-vue';

export default defineComponent({
  /** Using components */
  components: {
    BreezeButton,
    BreezeGuestLayout,
    BreezeInput,
    BreezeLabel,
    BreezeValidationErrors,
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
   * @param props - Props
   */
  setup(props) {
    /** Get Inertia instance */
    const inertia = useInertia();

    /** Form value */
    const form: Ref<{
      token: string;
      email: string;
      password: string;
      password_confirmation: string;
      processing?: boolean;
    }> = ref({
      token: props.token,
      email: props.email,
      password: '',
      password_confirmation: '',
    });

    /** Submit button clicked */
    const submit = () => {
      inertia.post(route('password.update'), form.value, {
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
