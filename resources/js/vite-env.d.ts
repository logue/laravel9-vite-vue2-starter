// eslint-disable-next-line
/// <reference types="vite/client" />
declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

// eslint-disable-next-line no-unused-vars
declare module route {
  import type { Route } from 'ziggy-js';
  export default Route;
}

interface ImportMetaEnv {
  // see https://vitejs.dev/guide/env-and-mode.html#env-files
  // add .env variables.
  readonly VITE_PUSHER_APP_KEY: string;
  readonly VITE_PUSHER_HOST: string;
  readonly VITE_PUSHER_PORT: string;
  readonly VITE_PUSHER_SCHEME: string;
  readonly VITE_PUSHER_APP_CLUSTER: string;

  readonly VITE_APP_TITLE: string;
  readonly VITE_APP_WEBSTORAGE_NAMESPACE: string;

  readonly VITE_APP_INERTIA_PROGRESS_COLOR: string;
}

// eslint-disable-next-line no-unused-vars
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
