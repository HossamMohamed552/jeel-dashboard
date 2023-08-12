<template>
  <section class="container-fluid custom-container">
    <ListItems :header-name="'قائمة المسارات'" :number-of-item="totalNumber"
               :tableItems="pathsList" :fields-list="fieldsList" :v-search-model="groupSearchWord" @detailItem="detailItem($event)"
               @editItem="editItem($event)" @deleteItem="deleteItem($event)"
               @refetch="getPaths"
               :loading="loading"
               :permission_delete="'delete-learningpath'"
               :permission_edit="'edit-learningpath'"
               :permission_view="'show-learningpath'"
               >
      <template #buttons>
        <Button :custom-class="'btn-add rounded-btn big-padding'" @click="goToAddPath()"  v-if="user.permissions.includes(`add-learningpath`)">
          <img src="@/assets/images/icons/plus.svg">
          <span> إضافة مسار جديد</span>
        </Button>
      </template>
    </ListItems>
    <Modal :content-message="'حذف المسار'"
           :content-message-question="'هل انت متأكد من حذف المسار'"
           :showModal="showModal"
           @cancel="cancel($event)"
           :is-warning="true"
           @cancelWithConfirm="cancelWithConfirm($event)"/>
  </section>
</template>

<script>
import Button from "@/components/Shared/Button/index.vue";
import ListItems from "@/components/ListItems/index.vue";
import {deleteLearningPathRequest, getLearningPathsRequest} from "@/api/learningPath";
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
      groupSearchWord: "",
      pathsList: [],
      totalNumber: null,
      fieldsList: [
        {key: "id", label: "التسلسل"},
        {key: "name", label: this.$i18n.t('TABLE_FIELDS.name')},
        {key: "description", label: this.$i18n.t('TABLE_FIELDS.description')},
        {key: "actions", label: "الإجراء"},
      ],
    }
  },
  methods: {
    goToAddPath() {
      this.$router.push('/dashboard/path/add')
    },
    getPaths(event) {
      this.loading = true
      const params = !event ? { per_page: 10 } : event;
      this.ApiService(getLearningPathsRequest(params)).then((response) => {
        this.pathsList = response.data.data
        this.totalNumber = response.data.meta.total
      }) .finally(() => {
          this.loading = false;
        });
    },
    detailItem($event) {
      this.$router.push(`/dashboard/path/show/${$event}`)
      console.log('detailItem', $event)
    },
    editItem($event) {
      this.$router.push(`/dashboard/path/edit/${$event}`)
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
      this.ApiService(deleteLearningPathRequest(this.itemId)).then(() => {
        this.getPaths()
      })
      this.cancel()
    }
  },
  mounted() {
    this.getPaths()
  }

}
</script>

<style scoped lang="scss">
@import "./index";
</style>
