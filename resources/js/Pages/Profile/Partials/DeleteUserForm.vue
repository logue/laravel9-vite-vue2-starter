<template>
  <section class="space-y-6">
    <header>
      <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">
        Delete Account
      </h2>

      <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
        Once your account is deleted, all of its resources and data will be
        permanently deleted. Before deleting your account, please download any
        data or information that you wish to retain.
      </p>
    </header>

    <danger-button @click="confirmUserDeletion">Delete Account</danger-button>

    <modal :show="confirmingUserDeletion" @close="closeModal">
      <div class="p-6">
        <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">
          Are you sure your want to delete your account?
        </h2>

        <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Once your account is deleted, all of its resources and data will be
          permanently deleted. Please enter your password to confirm you would
          like to permanently delete your account.
        </p>

        <div class="mt-6">
          <input-label for="password" value="Password" class="sr-only" />

          <text-input
            id="password"
            ref="passwordInput"
            v-model="form.password"
            type="password"
            class="mt-1 block w-3/4"
            placeholder="Password"
            @keyup.enter="deleteUser"
          />

          <input-error :message="form.errors.password" class="mt-2" />
        </div>

        <div class="mt-6 flex justify-end">
          <secondary-button @click="closeModal">Cancel</secondary-button>

          <danger-button
            class="ml-3"
            :class="{ 'opacity-25': form.processing }"
            :disabled="form.processing"
            @click="deleteUser"
          >
            Delete Account
          </danger-button>
        </div>
      </div>
    </modal>
  </section>
</template>

<script lang="ts">
import { useForm } from '@inertiajs/vue2';
import {
  defineComponent,
  nextTick,
  ref,
  type Ref,
  type SetupContext,
} from 'vue';
import { route } from 'vue-inertia-composable';

import DangerButton from '@/Components/DangerButton.vue';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import Modal from '@/Components/Modal.vue';
import SecondaryButton from '@/Components/SecondaryButton.vue';
import TextInput from '@/Components/TextInput.vue';

export default defineComponent({
  /** Using Components */
  components: {
    DangerButton,
    InputError,
    InputLabel,
    Modal,
    SecondaryButton,
    TextInput,
  },
  /**
   * Setup
   *
   * @param _props - Props
   * @param _context - Setup Context
   */
  setup(_props, _context: SetupContext) {
    const confirmingUserDeletion: Ref<boolean> = ref(false);
    const passwordInput: Ref<typeof TextInput | undefined> = ref();

    const form = useForm({
      password: '',
    }) as any;

    const confirmUserDeletion = () => {
      confirmingUserDeletion.value = true;

      nextTick(() => passwordInput.value?.focus());
    };

    const deleteUser = () => {
      form.delete(route('profile.destroy'), {
        preserveScroll: true,
        onSuccess: () => closeModal(),
        onError: () => passwordInput.value?.focus(),
        onFinish: () => form.reset(),
      });
    };

    const closeModal = () => {
      confirmingUserDeletion.value = false;

      form.reset();
    };

    return {
      form,
      confirmingUserDeletion,
      passwordInput,
      confirmUserDeletion,
      deleteUser,
      closeModal,
    };
  },
});
</script>
