import { defineConfig, type UserConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import { visualizer } from 'rollup-plugin-visualizer';
import vue from '@vitejs/plugin-vue2';
import checker from 'vite-plugin-checker';
import path from 'path';
import fs from 'fs';
import os from 'os';

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }): Promise<UserConfig> => {
  const config: UserConfig = {
    // https://vitejs.dev/config/#server-options
    server: {
      fs: {
        // Allow serving files from one level up to the project root
        allow: ['..'],
      },
      host: process.env.LARAVEL_SAIL
        ? Object.values(os.networkInterfaces())
            .flat()
            .find(info => info?.internal === false)?.address
        : undefined,
      hmr: {
        host: 'localhost',
      },
    },
    plugins: [
      // Laravel Vite
      // https://laravel.com/docs/9.x/vite
      laravel({
        input: ['resources/js/app.ts'],
        refresh: true,
      }),
      // Vue2
      // https://github.com/vitejs/vite-plugin-vue2
      vue(),
      // vite-plugin-checker
      // https://github.com/fi3ework/vite-plugin-checker
      checker({
        typescript: true,
        vueTsc: false,
        eslint: {
          lintCommand: 'eslint', // for example, lint .ts & .tsx
        },
      }),
    ],
    // Build Options
    // https://vitejs.dev/config/#build-options
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            // Split external library from transpiled code.
            vue: [
              'deepmerge',
              'vue-inertia-composable',
              'vue',
              'vue2-teleport',
            ],
            inertia: [
              'laravel-vite-plugin/inertia-helpers/index.js',
              '@inertiajs/inertia-vue/dist/index.js',
              '@inertiajs/inertia',
              'get-intrinsic',
              'nprogress',
              'object-inspect',
              'qs',
              'ziggy-js',
            ],
            axios: ['axios'],
            lodash: ['lodash'],
          },
          plugins: [
            mode === 'analyze'
              ? // rollup-plugin-visualizer
                // https://github.com/btd/rollup-plugin-visualizer
                visualizer({
                  open: true,
                  filename: './stats.html',
                  gzipSize: true,
                  brotliSize: true,
                })
              : undefined,
            /*
            // if you use Code encryption by rollup-plugin-obfuscator
            // https://github.com/getkey/rollup-plugin-obfuscator
            obfuscator({
              globalOptions: {
                debugProtection: true,
              },
            }),
            */
          ],
        },
      },
      target: 'es2021',
      /*
      // Minify option
      // https://vitejs.dev/config/#build-minify
      minify: 'terser',
      terserOptions: {
        ecma: 2020,
        parse: {},
        compress: { drop_console: true },
        mangle: true, // Note `mangle.properties` is `false` by default.
        module: true,
        output: { comments: true, beautify: false },
      },
      */
    },
  };

  // Write meta data.
  fs.writeFileSync(
    path.resolve(path.join(__dirname, 'resources/js/meta.ts')),
    `// This file is auto-generated by the build system.
export default {
  date: '${new Date().toISOString()}',
};`
  );

  return config;
});
