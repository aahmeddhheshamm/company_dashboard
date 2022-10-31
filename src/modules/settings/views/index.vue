<template>
  <div>
    <dashboard-page-title :showSearch="false" :showFilter="false" :showMainActions="false" @addEvent="$router.push({name: 'addMerchant'})">
      تكملة البيانات
    </dashboard-page-title>

     <form @submit.prevent="save">
        <b-row>
          <b-col md="8">
            <div>
              <b-card class="iq-border-radius-10 mb-3">
                <template v-slot:header>
                  <h5 class="text-primary"><i class="las la-file-alt"></i> معلومات السائق</h5>
                </template>
                <b-row>
                  <b-col  cols="4">
                    <input-form
                        class="mb-3 joining-label"
                        v-model="companyInfo.fullName"
                        validate="required"
                        name="id"
                        placeholder="أدخل الاسم" label="الإسم بالكامل"
                    />
                  </b-col>
                  <b-col  md="4">
                    <input-form
                        class="mb-3 joining-label"
                        v-model="companyInfo.companyName"
                        :validate="'required|numeric'"
                        name="id"
                        placeholder="اضف اسم الشركة" label="اسم الشرمة"
                    />
                  </b-col>
                  <b-col  md="4">
                    <input-form
                        class="mb-3 joining-label"
                        v-model="companyInfo.city"
                        :validate="'required'"
                        name="id"
                        :disabled="false"
                        placeholder="" label="المدينة"
                    />
                  </b-col>
                  <b-col  md="4">
                    <input-form
                        class="mb-3 joining-label"
                        v-model="companyInfo.phone"
                        :validate="'required'"
                        name="id"
                        :disabled="false"
                        placeholder="" label="رقم الهاتف"
                    />
                  </b-col>
                  <b-col  md="4">
                    <input-form
                        class="mb-3 joining-label"
                        v-model="companyInfo.secondPhone"
                        :validate="''"
                        name="id"
                        :disabled="false"
                        placeholder="Ex: 454846511154" label="رقم هاتف اخر"
                    />
                  </b-col>
                  <b-col  md="4">
                    <input-form
                        class="mb-3 joining-label"
                        v-model="companyInfo.email"
                        :validate="'required'"
                        name="id"
                        :disabled="false"
                        placeholder="Ex: 454846511154" label="البريد الالكترونى"
                    />
                  </b-col>
                  <b-col  md="12">
                    <input-form
                        class="mb-3 joining-label"
                        v-model="companyInfo.address"
                        :validate="'required'"
                        name="id"
                        :disabled="false"
                        placeholder="Ex: 454846511154" label="العنوان"
                    />
                  </b-col>
                </b-row>
              </b-card>
              <b-card class="iq-border-radius-10 mb-3">
                <template v-slot:header>
                  <h5 class="text-primary"><i class="las la-image"></i>  الصور</h5>
                </template>
                <b-row>
                  <b-col md="12" class="mb-4">
                    <cropper-images
                        label="شعار الشركة"
                        nameOfImage="image.jpg"
                        @cropper-save="saveIdImage"
                        :progressLoading="progressIdImage"
                        :multi="false"
                        :imageUrl="companyInfo.idImage"
                    />
                  </b-col>
                  <b-col md="12" class="mb-4">
                    <cropper-images
                        label="البطاقة الضاربية"
                        nameOfImage="image.jpg"
                        @cropper-save="saveCarLicense"
                        :progressLoading="progressCarLicense"
                        :showProgress="true"
                        :multi="false"
                        :imageUrl="companyInfo.carLicense"
                    />
                  </b-col>
                  <b-col md="12" class="mb-4">
                    <cropper-images
                        label="السجل التجارى"
                        nameOfImage="image.jpg"
                        @cropper-save="saveUserLicense"
                        :progressLoading="progressUserLicense"
                        :showProgress="true"
                        :multi="false"
                        :imageUrl="companyInfo.userLicense"
                    />
                  </b-col>
                  <b-col md="12" class="mb-3">
                    <cropper-images
                        label="رفع الصور المتبقية"
                        @cropper-save="saveGalleryImage"
                        @remove-image="removeGalleryImage"
                        :progressLoading="loadingGallery"
                        :removeLoadingUi="removeLoadingUi"
                        :images="companyInfo.carImages"
                    ></cropper-images>
                  </b-col>
                </b-row>
              </b-card>
            </div>
          </b-col>
          <b-col md="3">
            <b-card class="iq-border-radius-10 mb-3 main-actions">
              <template v-slot:header>
                <h5 class="text-primary">
                  <i class="las la-save"></i>
                  النشر
                </h5>
              </template>
              <div v-if="loadingSubmitForm">
                <b-button variant="primary" class="w-100" disabled>
                  <spinner-loading text="يتم الحفظ"></spinner-loading>
                </b-button>
              </div>
              <div class="d-flex justify-content-end gap_1" v-else>
                  <b-button variant="primary"  class="w-100" type="submit" > حفظ </b-button>
              </div>
            </b-card>
          </b-col>
        </b-row>
      </form>
  </div>
</template>
<script>
import { core } from '@/config/pluginInit'
import settingsServices from '../services/settings'
import mainInfoMixins from '@/mixins/mainInfo'
export default {
  mixins: [mainInfoMixins],
  components: { },
  mounted () {
    core.index()
  },
  data () {
    return {
      companyInfo: {
        fullName: '',
        companyName: '',
        phone: '',
        secondPhone: '',
        email: '',
        city: '',
        address: '',
        idImage: '',
        carLicense: '',
        userLicense: '',
        status: 'processing',
        carDescription: '',
        carImages: []
      },
      loadingSubmitForm: false,
      loadingGallery: 0,
      removeLoadingUi: false,
      progressIdImage: 0,
      progressCarLicense: 0,
      progressUserLicense: 0
    }
  },
  methods: {
    saveIdImage (file) {
      const formData = new FormData()
      formData.append('file', file.image)
      const options = {
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent
          const percent = Math.floor((loaded * 100) / total)
          this.progressIdImage = percent
        }
      }
      this.commonUploadFiles(formData, options).then(res => {
        this.driver.idImage = res.data.url
        this.showSuccessUploadFile()
      })
    },
    saveCarLicense (file) {
      const formData = new FormData()
      formData.append('file', file.image)
      const options = {
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent
          const percent = Math.floor((loaded * 100) / total)
          this.progressCarLicense = percent
        }
      }
      this.commonUploadFiles(formData, options).then(res => {
        this.driver.carLicense = res.data.url
        this.showSuccessUploadFile()
      })
    },
    saveUserLicense (file) {
      const formData = new FormData()
      formData.append('file', file.image)
      const options = {
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent
          const percent = Math.floor((loaded * 100) / total)
          this.progressUserLicense = percent
        }
      }
      this.commonUploadFiles(formData, options).then(res => {
        this.driver.userLicense = res.data.url
        this.showSuccessUploadFile()
      })
    },

    saveGalleryImage (data) {
      this.removeLoadingUi = false
      const formData = new FormData()
      formData.append('file', data.image)
      formData.append('name', data.imageInfo.name)
      const options = {
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent
          const percent = Math.floor((loaded * 100) / total)
          this.loadingGallery = percent
        }
      }
      this.commonUploadFiles(formData, options).then(res => {
        this.driver.carImages.push(res.data.url)
        this.showSuccessUploadFile()
        this.removeLoadingUi = true
      })
    },
    removeGalleryImage () {
      console.log('Removeeeee')
    },

    save () {
      this.loadingSubmitForm = true
      settingsServices.uploadMarketplaceFiles(this.driver).then(res => {
        core.showSnackbar('success', 'Data Updated Successfully')
        this.getInfo()
      }).finally(() => {
        this.loadingSubmitForm = false
      })
    }
  }
}
</script>
<style>
.main-actions {
  position: sticky !important;
  top: 0px;
}
.deleteLabelButton {
  position: absolute;
  left: 10px;
  top: -30px;
}
</style>
