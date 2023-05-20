<template>
  <section class="container-fluid custom-container">
    <ListItems :header-name="'قائمة بنك الأسئلة'" :number-of-item="totalNumber"
               :tableItems="termsList" :fieldsList="fieldsList" :v-search-model="groupSearchWord" @detailItem="detailItem($event)"
               @editItem="editItem($event)" @deleteItem="deleteItem($event)"
               @searchBy="searchBy" >
      <template #buttons>
        <Button :custom-class="'btn-add rounded-btn big-padding'" @click="goToAddQuestions">
          <img src="@/assets/images/icons/plus.svg">
          <span>إضافة سؤال جديد </span>
        </Button>
      </template>
    </ListItems>
    <Modal :content-message="'حذف الفصل دراسى'"
           :content-message-question="'هل انت متأكد من حذف الفصل دراسى '"
           :showModal="showModal"
           @cancel="cancel($event)"
           :is-warning="true"
           @cancelWithConfirm="cancelWithConfirm($event)"/>
  </section>
</template>

<script>
import Button from "@/components/Shared/Button/index.vue";
import ListItems from "@/components/ListItems/index.vue";
import {deleteTermsRequest, getTermsRequest} from "@/api/term";
import Modal from "@/components/Shared/Modal/index.vue";
export default {
  components: {Modal, ListItems, Button},
  data() {
    return {
      showModal: false,
      groupSearchWord: "",
      termsList: [],
      totalNumber: null,
      fieldsList: [
        { key: "id", label: "التسلسل" },
        { key: "name", label: "اسم الفصل" },
        { key: "actions",label:"الإجراء" },
      ],
    }
  },
  methods: {
    goToAddQuestions(){
      this.$router.push('/dashboard/questions/add')
    },
    getTerms(){
      this.ApiService(getTermsRequest()).then((response) => {
        this.termsList = response.data.data
        this.totalNumber = response.data.meta.total
      })
    },
    searchBy($event) {
      console.log('$event', $event)
    },
    detailItem($event) {
      this.$router.push(`/dashboard/terms/show/${$event}`)
    },
    editItem($event) {
      this.$router.push(`/dashboard/terms/edit/${$event}`)
    },
    deleteItem($event) {
      this.itemId = $event
      this.showModal = true
    },
    cancel($event) {
      this.showModal = $event
    },
    cancelWithConfirm() {
      this.ApiService(deleteTermsRequest(this.itemId)).then(()=>{
        this.getTerms()
      })
      this.cancel()
    }
  },
  mounted() {
    this.getTerms()
  }

}
</script>

<style scoped lang="scss">
@import "./index";
</style>
