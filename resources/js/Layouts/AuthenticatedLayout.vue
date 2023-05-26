<template>
  <div>
    <div class="min-h-screen bg-gray-100 dark:bg-gray-900">
      <nav
        class="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700"
      >
        <!-- Primary Navigation Menu -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between h-16">
            <div class="flex">
              <!-- Logo -->
              <div class="shrink-0 flex items-center">
                <inertia-link :href="route('dashboard')">
                  <application-logo
                    class="block h-9 w-auto fill-current text-gray-800 dark:text-gray-200"
                  />
                </inertia-link>
              </div>

              <!-- Navigation Links -->
              <div class="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                <nav-link :href="route('dashboard')">Dashboard</nav-link>
              </div>
            </div>

            <div class="hidden sm:flex sm:items-center sm:ml-6">
              <!-- Settings Dropdown -->
              <div class="ml-3 relative">
                <dropdown align="right" :width="48">
                  <template #trigger>
                    <span class="inline-flex rounded-md">
                      <button
                        type="button"
                        class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
                      >
                        {{ props.auth.user.name }}

                        <svg
                          class="ml-2 -mr-0.5 h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </button>
                    </span>
                  </template>

                  <template #content>
                    <dropdown-link :href="route('profile.edit')">
                      Profile
                    </dropdown-link>
                    <dropdown-link
                      :href="route('logout')"
                      method="post"
                      as="button"
                    >
                      Log Out
                    </dropdown-link>
                  </template>
                </dropdown>
              </div>
            </div>

            <!-- Hamburger -->
            <div class="-mr-2 flex items-center sm:hidden">
              <button
                class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-900 focus:text-gray-500 dark:focus:text-gray-400 transition duration-150 ease-in-out"
                @click="showingNavigationDropdown = !showingNavigationDropdown"
              >
                <svg
                  class="h-6 w-6"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    :class="{
                      hidden: showingNavigationDropdown,
                      'inline-flex': !showingNavigationDropdown,
                    }"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                  <path
                    :class="{
                      hidden: !showingNavigationDropdown,
                      'inline-flex': showingNavigationDropdown,
                    }"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Responsive Navigation Menu -->
        <div
          :class="{
            block: showingNavigationDropdown,
            hidden: !showingNavigationDropdown,
          }"
          class="sm:hidden"
        >
          <div class="pt-2 pb-3 space-y-1">
            <responsive-nav-link :href="route('dashboard')">
              Dashboard
            </responsive-nav-link>
          </div>

          <!-- Responsive Settings Options -->
          <div class="pt-4 pb-1 border-t border-gray-200 dark:border-gray-600">
            <div class="px-4">
              <div
                class="font-medium text-base text-gray-800 dark:text-gray-200"
              >
                {{ props.auth.user.name }}
              </div>
              <div class="font-medium text-sm text-gray-500">
                {{ props.auth.user.email }}
              </div>
            </div>

            <div class="mt-3 space-y-1">
              <responsive-nav-link :href="route('profile.edit')">
                Profile
              </responsive-nav-link>
              <responsive-nav-link
                :href="route('logout')"
                method="post"
                as="button"
              >
                Log Out
              </responsive-nav-link>
            </div>
          </div>
        </div>
      </nav>

      <!-- Page Heading -->
      <header v-if="$slots.header" class="bg-white dark:bg-gray-800 shadow">
        <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <slot name="header" />
        </div>
      </header>

      <!-- Page Content -->
      <main>
        <slot />
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { usePage } from '@inertiajs/vue2';
import { defineComponent, ref, type Ref, type SetupContext } from 'vue';
import { InertiaLink, route } from 'vue-inertia-composable';

import ApplicationLogo from '@/Components/ApplicationLogo.vue';
import Dropdown from '@/Components/Dropdown.vue';
import DropdownLink from '@/Components/DropdownLink.vue';
import NavLink from '@/Components/NavLink.vue';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink.vue';

export default defineComponent({
  /** Using Components */
  components: {
    ApplicationLogo,
    Dropdown,
    DropdownLink,
    NavLink,
    ResponsiveNavLink,
    InertiaLink,
  },
  /**
   * Setup
   *
   * @param _props - Props
   * @param _context - Setup Context
   */
  setup(_props, _context: SetupContext) {
    /** Get inertia page instance */
    const page = usePage();

    /** Navigation Dropdown visibility */
    const showingNavigationDropdown: Ref<boolean> = ref(false);

    return {
      ...page,
      showingNavigationDropdown,
      route,
    };
  },
});
</script>
