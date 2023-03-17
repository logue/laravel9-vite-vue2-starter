import { createInertiaApp } from '@inertiajs/vue2';
import { createRenderer } from 'vue-server-renderer';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ZiggyVue } from 'ziggy-vue';
import createServer from '@inertiajs/vue2/server';
import teleport from '@logue/vue2-helpers/teleport';
import Vue from 'vue';
import ziggy from 'ziggy-js';

/** Application Name */
const appName: string = import.meta.env.APP_NAME ?? 'Laravel';

createServer(
  async page =>
    await createInertiaApp({
      title: title => `${title} - ${appName}`,
      page,
      render: createRenderer().renderToString,
      resolve: async name =>
        // @ts-expect-error
        await resolvePageComponent(
          `./Pages/${name}.vue`,
          import.meta.glob('./Pages/**/*.vue')
        ),
      setup({ App, props, plugin }) {
        // Add route function.
        Vue.mixin({ methods: { route: ziggy } });
        // Register Inertia
        Vue.use(plugin);
        // Telepot for vue2.
        Vue.component('Teleport', teleport);
        // @ts-expect-error
        Vue.use(ZiggyVue, Ziggy);
        // @ts-expect-error
        return new Vue({ render: h => h(App, props) });
      },
      progress: {
        color: import.meta.env.VITE_APP_INERTIA_PROGRESS_COLOR ?? '#4B5563',
      },
    })
);
