import { defineConfig } from '@umijs/max';
import { routes } from './config/routes';

export default defineConfig({
  mock: false,
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '老常',
  },
  routes,
  npmClient: 'pnpm',
  tailwindcss: {},
  proxy: {
    '/api': {
      target: 'http://localhost:3000',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    },
  },
});
