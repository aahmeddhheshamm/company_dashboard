// Layout
const dashboardLayout = () => import('@/layouts/DashboardLayout/dashboardLayout.vue')

const drivers = () => import('./views/index')
const addDriver = () => import('./views/addDriver')

// start Routes
export default [
  {
    path: '/drivers',
    name: 'drivers',
    component: dashboardLayout,
    children: [
      {
        path: '',
        name: 'drivers',
        meta: {
          name: 'drivers',
          parentName: 'transportation',
          userType: '',
          permission: ''
        },
        component: drivers
      }, {
        path: 'add-driver',
        name: 'addDriver',
        meta: {
          name: 'addDriver',
          parentName: 'transportation',
          userType: '',
          permission: ''
        },
        component: addDriver
      },
      {
        path: 'show-driver/:id',
        name: 'showDriver',
        props: true,
        meta: {
          name: 'showDriver',
          parentName: 'transportation',
          userType: '',
          permission: ''
        },
        component: addDriver
      },
      {
        path: 'edit-driver/:id',
        name: 'editDriver',
        props: true,
        meta: {
          name: 'editDriver',
          parentName: 'transportation',
          userType: '',
          permission: ''
        },
        component: addDriver
      }
    ]
  }
]
