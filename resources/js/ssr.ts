import { createInertiaApp } from '@inertiajs/vue2';
// @ts-ignore
import { createRenderer } from 'vue-server-renderer';
// @ts-ignore
import createServer from '@inertiajs/vue2/server';
import Vue from 'vue';
import teleport from '@logue/vue2-helpers/teleport';
import ziggy from 'ziggy-js';

/** Application Name */
const appName = import.meta.env.APP_NAME || 'Laravel';

createServer(page =>
  createInertiaApp({
    title: title => `${title} - ${appName}`,
    page,
    render: createRenderer().renderToString,
    resolve: name =>
      // @ts-ignore
      resolvePageComponent(
        `./Pages/${name}.vue`,
        import.meta.glob('./Pages/**/*.vue')
      ),
    // @ts-ignore
    setup({ App, props, plugin }) {
      // Add route function.
      Vue.mixin({ methods: { route: ziggy } });
      // Register Inertia
      Vue.use(plugin);
      // Telepot for vue2.
      Vue.component('Teleport', teleport);
      // @ts-ignore
      Vue.use(ZiggyVue, Ziggy);
      return new Vue({ render: h => h(App, props) });
    },
    progress: {
      color: import.meta.env.VITE_APP_INERTIA_PROGRESS_COLOR || '#4B5563',
    },
  })
);
