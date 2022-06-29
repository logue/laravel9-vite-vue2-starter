/* eslint-disable */
/// <reference types="vite/client" />

import { Route } from 'ziggy-js';

declare module '*.vue' {
  import Vue from 'vue';
  const component: ReturnType<typeof defineComponent>;
  export default component;
}

declare module 'vue/types/vue' {
  import Vue from 'vue';
  import { Inertia } from '@inertiajs/inertia';
  import Page from '@inertiajs/inertia/types/Page';
  interface Vue {
    readonly $inertia: Inertia;
    readonly $page: Page;
    readonly route;
  }
}

declare type route = Route;

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    layout?: any;
  }
}

interface ImportMetaEnv {
  // see https://vitejs.dev/guide/env-and-mode.html#env-files
  // add .env variables.
  readonly VITE_APP_TITLE: string;
  readonly VITE_APP_WEBSTORAGE_NAMESPACE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
