<template>
  <section class="container-fluid custom-container">
    <ListItems :header-name="'قائمة اوراق العمل'" :number-of-item="totalNumber"
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
import {mapGetters} from "vuex";

export default {
  components: {Modal, ListItems, Button},
  computed:{
    ...mapGetters(['user'])
  },
  data() {
    return {
      loading: false,
      showModal: false,
      refreshIt: false,
      groupSearchWord: "",
      paperWorkList: [],
      totalNumber: 0,
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
        this.getPaperWorks()
        this.refreshIt = true
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
