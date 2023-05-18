<template>
  <section class="container-fluid custom-container">
    <ListItems :header-name="'قائمة المدارس'" :number-of-item="totalNumber"
               :tableItems="schoolsList" :fields-list="fieldsList" :v-search-model="groupSearchWord"
               @searchBy="searchBy">
      <template #buttons>
        <Button :custom-class="'btn-add rounded-btn big-padding'" @click="goToAddSchools">
          <img src="@/assets/images/icons/plus.svg">
          <span>إضافة مدرسة</span>
        </Button>
      </template>
    </ListItems>
    <Modal :content-message="'حذف المدرسة'"
           :content-message-question="'هل انت متأكد من حذف المدرسة'"
           :showModal="showModal"
           @cancel="cancel($event)"
           :is-warning="true"
           @cancelWithConfirm="cancelWithConfirm($event)"/>
  </section>
</template>

<script>
import Button from "@/components/Shared/Button/index.vue";
import ListItems from "@/components/ListItems/index.vue";
import {deleteSchoolsRequest, getSchoolsRequest} from "@/api/school";
import Modal from "@/components/Shared/Modal/index.vue";

export default {
  components: {Modal, ListItems, Button},
  data() {
    return {
      showModal: false,
      groupSearchWord: "",
      schoolsList: [],
      totalNumber: null,
      fieldsList: [
        {key: "id", label: "التسلسل"},
        {key: "name", label: this.$i18n.t('TABLE_FIELDS.name')},
        {key: "school_group", label: this.$i18n.t('TABLE_FIELDS.school_group')},
        {key: "logo", label: this.$i18n.t('TABLE_FIELDS.logo')},
        {key: "school_type", label: this.$i18n.t('TABLE_FIELDS.school_type')},
        {key: "subscription_start_date", label: ""},
        {key: "subscription_end_date", label: "نهاية التعاقد"},
        {key: "package", label: this.$i18n.t('TABLE_FIELDS.package')},
        {key: "status", label: this.$i18n.t('TABLE_FIELDS.status')},
        {key: "actions", label: "الإجراء"},
      ],
    }
  },
  methods: {
    goToAddSchools() {
      this.$router.push('/dashboard/schools/add')
    },
    getSchools() {
      this.ApiService(getSchoolsRequest()).then((response) => {
        this.schoolsList = response.data.data
        this.totalNumber = response.data.meta.total
      })
    },
    searchBy($event) {
      console.log('$event', $event)
    },
    detailItem($event) {
      this.$router.push(`/dashboard/schools/show/${$event}`)
      console.log('detailItem', $event)
    },
    editItem($event) {
      this.$router.push(`/dashboard/schools/edit/${$event}`)
      console.log('editItem', $event)
    },
    deleteItem($event) {
      this.itemId = $event
      this.showModal = true
    },
    cancel($event) {
      this.showModal = $event
    },
    cancelWithConfirm() {
      this.ApiService(deleteSchoolsRequest(this.itemId)).then(() => {
        this.getSchools()
      })
      this.cancel()
    }
  },
  mounted() {
    this.getSchools()
  }

}
</script>

<style scoped lang="scss">
@import "./index";
</style>
