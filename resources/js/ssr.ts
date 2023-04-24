import Vue, { type DefineComponent } from 'vue';
import { createRenderer } from 'vue-server-renderer';
import { createInertiaApp } from '@inertiajs/vue2';
import createServer from '@inertiajs/vue2/server';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
// @ts-expect-error
import { ZiggyVue } from 'ziggy-vue';
import teleport from '@logue/vue2-helpers/teleport';
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
        await resolvePageComponent(
          `./Pages/${name}.vue`,
          import.meta.glob<DefineComponent>('./Pages/**/*.vue')
        ),
      setup({ App, props, plugin }) {
        // Add route function.
        Vue.mixin({ methods: { route: ziggy } });
        // Register Inertia
        Vue.use(plugin);
        // Telepot for vue2.
        Vue.component('Teleport', teleport);

        Vue.use(ZiggyVue, {
          // @ts-expect-error
          ...page.props.ziggy,
          // @ts-expect-error
          location: new URL(page.props.ziggy.location),
        });
        // @ts-expect-error
        return new Vue({ render: h => h(App, props) });
      },
      progress: {
        color: import.meta.env.VITE_APP_INERTIA_PROGRESS_COLOR ?? '#4B5563',
      },
    })
);
