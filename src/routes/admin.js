export default [
  {
    path: '/admin',
    component: () => import(/* webpackChunkName: "autenticated" */ './../layouts/Authenticated.vue'),
    meta: { auth: true },
    children: [
      {
        path: '',
        name: 'admin.dashboard',
        component: () => import(/* webpackChunkName: "dashboard" */ './../views/admin/Dashboard.vue'),
      }
    ]
  }
]
