
const routes = [
  {
    path: '/',
    component: () => import('layouts/AppLayout.vue'),
    children: [
      { path: 'perfil', component: () => import('pages/aspirantes/perfil.vue') }
    ]
  },
  {
    path: '/login',
    component: () => import('layouts/CenteredPanelLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Login.vue') }
    ]
  },
  {
    path: '/register',
    component: () => import('layouts/CenteredPanelLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Register.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
