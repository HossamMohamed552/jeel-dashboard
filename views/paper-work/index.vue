<template>
  <section class="container-fluid custom-container">
    <ListItems :header-name="'قائمة اوراق العمل'" :number-of-item="totalNumber"
               :tableItems="paperWorkList" :fields-list="fieldsList" :v-search-model="groupSearchWord" @detailItem="detailItem($event)"
               @editItem="editItem($event)" @deleteItem="deleteItem($event)"
               @searchBy="searchBy">
      <template #buttons>
        <Button :custom-class="'btn-add rounded-btn big-padding'" @click="goToAddPaperWorks">
          <img src="@/assets/images/icons/plus.svg">
          <span> إضافة ورقة عمل جديده</span>
        </Button>
      </template>
    </ListItems>
    <Modal :content-message="'حذف ورقة عمل'"
           :content-message-question="'هل انت متأكد من حذف ورقة عمل'"
           :showModal="showModal"
           @cancel="cancel($event)"
           :is-warning="true"
           @cancelWithConfirm="cancelWithConfirm($event)"/>
  </section>
</template>

<script>
import Button from "@/components/Shared/Button/index.vue";
import ListItems from "@/components/ListItems/index.vue";
import {deletePaperWorkRequest, getPaperWorksRequest} from "@/api/paperWork";
import Modal from "@/components/Shared/Modal/index.vue";

export default {
  components: {Modal, ListItems, Button},
  data() {
    return {
      showModal: false,
      groupSearchWord: "",
      paperWorkList: [],
      totalNumber: null,
      fieldsList: [
        {key: "id", label: "التسلسل"},
        {key: "name", label: this.$i18n.t('TABLE_FIELDS.name')},
        {key: "learningPath.name", label: this.$i18n.t('TABLE_FIELDS.learning_path')},
        {key: "level.name", label: this.$i18n.t('TABLE_FIELDS.level')},
        {key: "type", label: this.$i18n.t('TABLE_FIELDS.type')},
        {key: "description", label: this.$i18n.t('TABLE_FIELDS.description')},
        {key: "actions", label: "الإجراء"},
      ],
    }
  },
  methods: {
    goToAddPaperWorks() {
      this.$router.push('/dashboard/paper-work/add')
    },
    getPaperWorks() {
      this.ApiService(getPaperWorksRequest()).then((response) => {
        this.paperWorkList = response.data.data
        this.totalNumber = response.data.meta.total
      })
    },
    searchBy($event) {
      console.log('$event', $event)
    },
    detailItem($event) {
      this.$router.push(`/dashboard/paper-work/show/${$event}`)
      console.log('detailItem', $event)
    },
    editItem($event) {
      this.$router.push(`/dashboard/paper-work/edit/${$event}`)
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
      this.ApiService(deletePaperWorkRequest(this.itemId)).then(() => {
        this.getVideos()
      })
      this.cancel()
    }
  },
  mounted() {
    this.getPaperWorks()
  }

}
</script>

<style scoped lang="scss">
@import "./index";
</style>
