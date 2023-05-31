<template>
  <section class="container-fluid custom-container">
    <ListItems :header-name="'قائمة المراحل'" :number-of-item="totalNumber"
               :tableItems="missionsList" :fieldsList="fieldsList"
               :v-search-model="missionSearchWord"
               @detailItem="detailItem($event)"
               @editItem="editItem($event)" @deleteItem="deleteItem($event)"
               @searchBy="searchBy">
      <template #buttons>
        <Button :custom-class="'btn-add rounded-btn big-padding'" @click="goToAddMissions">
          <img src="@/assets/images/icons/plus.svg">
          <span>إضافة مرحلة جديد</span>
        </Button>
      </template>
    </ListItems>
    <Modal :content-message="'حذف المرحلة'"
           :content-message-question="'هل انت متأكد من حذف المرحلة'"
           :showModal="showModal"
           @cancel="cancel($event)"
           :is-warning="true"
           @cancelWithConfirm="cancelWithConfirm($event)"/>
  </section>
</template>
<script>
import Button from "@/components/Shared/Button/index.vue";
import ListItems from "@/components/ListItems/index.vue";
import Modal from "@/components/Shared/Modal/index.vue";
import {deleteMissionsRequest, getMissionsRequest} from "@/api/missios";
import {getLevelsRequest} from "@/api/level";

export default{
  name: "index",
  components: {Modal, ListItems, Button},
  data(){
    return{
      showModal: false,
      missionSearchWord: "",
      missionsList: [],
      totalNumber: null,
      fieldsList: [
        {key: "id", label: "التسلسل"},
        {key: "name", label: "الإسم"},
        {key: "level", label: "المرحله الدراسية"},
        {key: "description", label: "الوصف"},
        {key: "learningpaths", label: "المسارات"},
        {key: "actions", label: "الإجراء"},
      ],
    }
  },
  methods:{
    goToAddMissions(){
      this.$router.push('/dashboard/missions/add')
    },
    getMissions(){
      this.ApiService(getMissionsRequest({page:1})).then((response) => {
        this.missionsList = response.data.data
        this.totalNumber = response.data.meta.total
      })
    },
    searchBy($event) {
      console.log('$event', $event)
    },
    detailItem($event) {
      this.$router.push(`/dashboard/missions/show/${$event}`)
    },
    editItem($event) {
      this.$router.push(`/dashboard/missions/edit/${$event}`)
    },
    deleteItem($event) {
      this.itemId = $event
      this.showModal = true
    },
    cancel($event) {
      this.showModal = $event
    },
    cancelWithConfirm() {
      this.ApiService(deleteMissionsRequest(this.itemId)).then(() => {
        this.getMissions()
      })
      this.cancel()
    }
  },
  mounted() {
    this.getMissions()
  }
}
</script>
<style scoped lang="scss">
@import "./index";
</style>
