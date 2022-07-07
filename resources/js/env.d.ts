// eslint-disable-next-line
/// <reference types="vite/client" />
declare module '*.vue' {
  import type Vue from 'vue';
  export default Vue;
}

// eslint-disable-next-line no-unused-vars
declare module route {
  import type { Route } from 'ziggy-js';
  export default Route;
}

interface ImportMetaEnv {
  // see https://vitejs.dev/guide/env-and-mode.html#env-files
  // add .env variables.
  readonly VITE_APP_TITLE: string;
  readonly VITE_APP_WEBSTORAGE_NAMESPACE: string;
}

// eslint-disable-next-line no-unused-vars
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
