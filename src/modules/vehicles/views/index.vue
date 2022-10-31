<template>
  <div>
    <dashboard-page-title :showFilter="true" :showSearch="true" :showExportation="true" @addEvent="$router.push({name: 'addVehicles'})">الشاحنات</dashboard-page-title>

    <main-table :fields="fields" :baseURL="VUE_APP_TRANSPORTATION_LINK" :status-url="'vehicles/status'" :list_url="'vehicles'"></main-table>
  </div>
</template>
<script>
import { core } from '@/config/pluginInit'
import { VUE_APP_TRANSPORTATION_LINK } from '@/config/constant'
export default {
  name: 'index',
  mounted () {
    core.index()
  },
  data () {
    return {
      VUE_APP_TRANSPORTATION_LINK,
      fields: [
        { label: 'صور المركبة', key: 'featuredImage', type: 'image', class: 'text-right' },
        { label: 'اسم المركبة', key: 'model', type: 'name', class: 'text-right' },
        { label: 'عدد الرحلات', key: 'numberOfTrips', type: 'number', class: 'text-right' },
        { label: 'اجمالى الأرباح', key: 'profits', class: 'text-right' },
        {
          label: 'الحالة',
          key: 'change_status'
        }
      ]
    }
  },
  methods: {
    addMerchant () {
      console.log('hello')
    }
  }
}
</script>
