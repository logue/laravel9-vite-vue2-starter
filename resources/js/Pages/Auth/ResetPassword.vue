<template>
  <breeze-guest-layout>
    <inertia-head title="Reset Password" />

    <breeze-validation-errors class="mb-4" />

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
          autocomplete="new-password"
        />
      </div>

      <div class="mt-4">
        <breeze-label for="password_confirmation" value="Confirm Password" />
        <breeze-input
          id="password_confirmation"
          v-model="form.password_confirmation"
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
import { defineComponent, ref, type Ref } from 'vue';
import { useInertia, route } from 'vue-inertia-composable';

import BreezeButton from '@/Components/Button.vue';
import BreezeGuestLayout from '@/Layouts/Guest.vue';
import BreezeInput from '@/Components/Input.vue';
import BreezeLabel from '@/Components/Label.vue';
import BreezeValidationErrors from '@/Components/ValidationErrors.vue';
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
   *
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
