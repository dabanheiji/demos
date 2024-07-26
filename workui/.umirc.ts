import { defineConfig } from '@umijs/max';
import { routes } from './config/routes';

export default defineConfig({
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
});
