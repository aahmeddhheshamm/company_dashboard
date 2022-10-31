<template>
  <div>
    <dashboard-page-title :showFilter="true" :showSearch="true" :showExportation="true" @addEvent="$router.push({name: 'addDriver'})">{{$t('drivers.drivers')}}</dashboard-page-title>
    <main-table :fields="fields" :list_url="'merchant/products'"></main-table>
  </div>
</template>
<script>
import { core } from '@/config/pluginInit'
// import productServices from '@/modules/products/services/products'
export default {
  components: {},
  mounted () {
    core.index()
  },
  data () {
    return {
      fields: [
        { label: this.$t('drivers.driverName'), key: 'featured_image', class: 'text-right', type: 'image' },
        { label: this.$t('drivers.phoneNumber'), key: 'name', class: 'text-right' },
        { label: this.$t('drivers.tripsCount'), key: 'product_images', class: 'text-right', type: 'multi_image' },
        { label: this.$t('drivers.imports'), key: 'price', class: 'text-right' },
        { label: this.$t('drivers.paymentWay'), key: 'quantity', class: 'text-right' },
        { label: this.$t('drivers.lastTrip'), key: 'created_at', class: 'text-right' },
        {
          label: this.$t('drivers.control'),
          key: 'actions',
          class: 'text-right',
          type: 'actions',
          actions: [
            {
              text: 'view',
              icon: 'ri-eye-fill',
              color: 'primary',
              ifNavigate: true,
              routePath: 'show-product/:id'
            },
            {
              text: 'edit',
              icon: 'ri-ball-pen-fill',
              color: 'info',
              ifNavigate: true,
              routePath: 'edit-product/:id'
            },
            {
              text: 'Delete',
              icon: 'ri-delete-bin-line',
              color: 'danger',
              url: 'merchant/products',
              titleHeader: 'منتج',
              question: 'هل متأكد أنك تريد مسح هذا المنتج',
              textContent: 'name',
              textDeleteButton: 'بالتأكيد, مسح',
              textCancelButton: 'الغاء',
              showAlert: true
            }
          ]
        }
      ]
    }
  },
  methods: {}
}
</script>
