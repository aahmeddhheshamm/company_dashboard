// Layout
const dashboardLayout = () => import('@/layouts/DashboardLayout/dashboardLayout.vue')

const vehicles = () => import('./views/index')
const addVehicles = () => import('./views/addVehicle')

// start Routes
export default [
  {
    path: '/vehicles',
    name: 'vehicles',
    component: dashboardLayout,
    children: [
      {
        path: '',
        name: 'vehicles',
        meta: {
          name: 'vehicles',
          parentName: 'transportation',
          userType: '',
          permission: ''
        },
        component: vehicles
      },
      {
        path: 'add-vehicles',
        name: 'addVehicles',
        meta: {
          name: 'addVehicles',
          parentName: 'transportation',
          userType: '',
          permission: ''
        },
        component: addVehicles
      }
    ]
  }
]
