<template>
  <section>
    <header>
      <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">
        Update Password
      </h2>

      <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
        Ensure your account is using a long, random password to stay secure.
      </p>
    </header>

    <form class="mt-6 space-y-6" @submit.prevent="updatePassword">
      <div>
        <input-label for="current_password" value="Current Password" />

        <text-input
          id="current_password"
          ref="currentPasswordInput"
          v-model="form.current_password"
          type="password"
          class="mt-1 block w-full"
          autocomplete="current-password"
        />

        <input-error :message="form.errors.current_password" class="mt-2" />
      </div>

      <div>
        <input-label for="password" value="New Password" />

        <text-input
          id="password"
          ref="passwordInput"
          v-model="form.password"
          type="password"
          class="mt-1 block w-full"
          autocomplete="new-password"
        />

        <input-error :message="form.errors.password" class="mt-2" />
      </div>

      <div>
        <input-label for="password_confirmation" value="Confirm Password" />

        <text-input
          id="password_confirmation"
          v-model="form.password_confirmation"
          type="password"
          class="mt-1 block w-full"
          autocomplete="new-password"
        />

        <input-error
          :message="form.errors.password_confirmation"
          class="mt-2"
        />
      </div>

      <div class="flex items-center gap-4">
        <Ppimary-button :disabled="form.processing">Save</Ppimary-button>

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
import { useForm } from '@inertiajs/vue2';
import { ref, defineComponent, type Ref, type SetupContext } from 'vue';
import { route } from 'vue-inertia-composable';

import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import TextInput from '@/Components/TextInput.vue';

type TForm = {
  current_password: string;
  password: string;
  password_confirmation: string;
};

export default defineComponent({
  /** Using Components */
  components: {
    InputError,
    InputLabel,
    TextInput,
  },
  /**
   * Setup
   *
   * @param _props - Props
   * @param _context - Setup Context
   */
  setup(_props, _context: SetupContext) {
    const passwordInput: Ref<typeof TextInput | undefined> = ref();
    const currentPasswordInput: Ref<typeof TextInput | undefined> = ref();

    const form = useForm<TForm>({
      current_password: '',
      password: '',
      password_confirmation: '',
    }) as any;

    const updatePassword = () => {
      form.put(route('password.update'), {
        preserveScroll: true,
        onSuccess: () => form.reset(),
        onError: () => {
          if (form.errors.password) {
            form.reset('password', 'password_confirmation');
            passwordInput.value?.focus();
          }
          if (form.errors.current_password) {
            form.reset('current_password');
            currentPasswordInput.value?.focus();
          }
        },
      });
    };

    return {
      form,
      passwordInput,
      currentPasswordInput,
      updatePassword,
    };
  },
});
</script>
