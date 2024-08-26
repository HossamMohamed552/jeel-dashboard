<template>
  <section class="container-fluid custom-container">
    <ListItems :header-name="$t('PAPER_WORK.paperWorks')" :number-of-item="totalNumber"
               :tableItems="paperWorkList" :fields-list="fieldsList" :v-search-model="groupSearchWord" @detailItem="detailItem($event)"
               @editItem="editItem($event)" @deleteItem="deleteItem($event)"
               @refetch="getPaperWorks"
               @resetRefresh="refreshIt=false"
               :isRefresh="refreshIt"
               :loading="loading"
               :permission_delete="'delete-paperWork'"
               :permission_edit="'edit-paperWork'"
               :permission_view="'show-paperWork'"
               >
      <template #buttons>
        <Button :custom-class="'btn-add rounded-btn big-padding'" @click="goToAddPaperWorks" v-if="user.permissions.includes(`add-paperWork`)">
          <img src="@/assets/images/icons/plus.svg">
          <span>{{$t('PAPER_WORK.ADD_NEW') }}</span>
        </Button>
      </template>
    </ListItems>
    <Modal :content-message="$t('PAPER_WORK.delete')"
           :content-message-question="$t('PAPER_WORK.confirm_delete')"
           :showModal="showModal"
           @cancel="cancel($event)"
           :is-warning="true"
           @cancelWithConfirm="cancelWithConfirm($event)"/>
    <Modal :content-message="$t('can_not_delete')"
           :showModal="showModalFailed" :alarm="true"
           @cancelWithConfirm="showModalFailed=false"/>
    <Modal :content-message="$t('CONTROLS.delete_successfully')" :showModal="deleteModal" :is-success="true" />
  </section>
</template>

<script>
import Button from "@/components/Shared/Button/index.vue";
import ListItems from "@/components/ListItems/index.vue";
import {deletePaperWorkRequest, getPaperWorksRequest} from "@/api/paperWork";
import Modal from "@/components/Shared/Modal/index.vue";
import {mapGetters} from "vuex";

export default {
  components: {Modal, ListItems, Button},
  computed:{
    fieldsList(){
      return  [
        {key: "vid", label: this.$i18n.t('TABLE_FIELDS.id')},
        {key: "name", label: this.$i18n.t('TABLE_FIELDS.paperName')},
        {key: "learningPath.name", label: this.$i18n.t('TABLE_FIELDS.learning_path')},
        {key: "lesson.name", label: this.$i18n.t('TABLE_FIELDS.lesson')},
        {key: "paper_work_final_degree", label: this.$i18n.t('TABLE_FIELDS.paper_work_final_degree')},
        {key: "actions", label: this.$i18n.t('TABLE_FIELDS.actions')},
      ]
    },
    ...mapGetters(['user'])
  },
  data() {
    return {
      loading: false,
      showModal: false,
      showModalFailed: false,
      deleteModal: false,
      refreshIt: false,
      groupSearchWord: "",
      paperWorkList: [],
      totalNumber: 0,
    }
  },
  methods: {
    goToAddPaperWorks() {
      this.$router.push('/dashboard/paper-work/add')
    },
    getPaperWorks(event) {
      this.loading = true
      const params = event
      this.ApiService(getPaperWorksRequest(params)).then((response) => {
        this.paperWorkList = response.data.data
        this.totalNumber = response.data.meta.total
      }) .finally(() => {
          this.loading = false;
        });
    },
    detailItem($event) {
      this.$router.push(`/dashboard/paper-work/show/${$event}`)

    },
    editItem($event) {
      this.$router.push(`/dashboard/paper-work/edit/${$event}`)

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
        this.deleteModal = true;
        this.getPaperWorks()
        this.refreshIt = true
        setTimeout(()=>{
          this.deleteModal = false
        },1500)
      }).catch((error) => {
        this.showModalFailed = error.response.data.code === 23000;
      }).finally(() => {
        this.cancel();
      })
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
