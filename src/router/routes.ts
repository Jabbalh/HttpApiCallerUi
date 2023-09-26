import { RouteRecordRaw } from 'vue-router';
import restPage from 'pages/RestPage.vue';
import testPage from 'pages/TestPage.vue';
import settingsPage from 'pages/SettingsPage.vue';


const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'rest', component: restPage},
      { path: 'test', component: testPage },
      { path: 'settings', component: settingsPage }
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
