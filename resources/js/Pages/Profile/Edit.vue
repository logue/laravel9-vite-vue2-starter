<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <authenticated-layout>
    <inertia-head title="Profile" />
    <template #header>
      <h2
        class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight"
      >
        Profile
      </h2>
    </template>

    <div class="py-12">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
        <div class="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
          <update-profile-information-form
            :must-verify-email="mustVerifyEmail"
            :status="status"
            class="max-w-xl"
          />
        </div>

        <div class="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
          <update-password-form class="max-w-xl" />
        </div>

        <div class="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
          <delete-user-form class="max-w-xl" />
        </div>
      </div>
    </div>
  </authenticated-layout>
</template>

<script lang="ts">
import { Head as InertiaHead } from '@inertiajs/vue2';
import { defineComponent } from 'vue';

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import UpdatePasswordForm from '@/Pages/Profile//Partials/UpdatePasswordForm.vue';
import UpdateProfileInformationForm from '@/Pages/Profile//Partials/UpdateProfileInformationForm.vue';
import DeleteUserForm from '@/Pages/Profile/Partials/DeleteUserForm.vue';

export default defineComponent({
  components: {
    AuthenticatedLayout,
    DeleteUserForm,
    UpdatePasswordForm,
    UpdateProfileInformationForm,
    InertiaHead,
  },
  /** Props Definition */
  props: {
    mustVerifyEmail: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      required: true,
    },
  },
});
</script>
