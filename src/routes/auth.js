export default [
  {
    path: '/auth',
    component: () => import(/* webpackChunkName: "template-unauthenticated" */ './../layouts/Unauthenticated.vue'),
    meta: { auth: false },
    children: [
      {
        path: 'login',
        name: 'auth.login',
        component: () => import(/* webpackChunkName: "login" */ './../views/auth/Login.vue'),
        meta: { auth: false }
      },
      // {
      //   path: 'register',
      //   name: 'auth.register',
      //   component: () => import(/* webpackChunkName: "register" */ './../views/auth/client/Register.vue'),
      //   meta: { auth: false }
      // },
      {
        path: 'reset-password',
        name: 'auth.reset-password',
        component: () => import(/* webpackChunkName: "reset-password" */ './../views/auth/ResetPassword.vue'),
        meta: { auth: false }
      },
      {
        path: 'update-password/:token/:username',
        name: 'auth.update-password',
        component: () => import(/* webpackChunkName: "update-password" */ './../views/auth/UpdatePassword.vue'),
        meta: { auth: false }
      }
    ]
  }
]