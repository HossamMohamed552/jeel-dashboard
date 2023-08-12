<template>
  <section class="container-fluid custom-container">
    <ListItems :header-name="'قائمة الفيديوهات'" :number-of-item="totalNumber"
               :tableItems="videosList" :fields-list="fieldsList" :v-search-model="groupSearchWord" @detailItem="detailItem($event)"
               @editItem="editItem($event)" @deleteItem="deleteItem($event)"
               @refetch="getVideos"
               :loading="loading"
               :permission_delete="'delete-video'"
               :permission_edit="'edit-video'"
               :permission_view="'show-video'"
               >
      <template #buttons>
        <Button :custom-class="'btn-add rounded-btn big-padding'" @click="goToAddSchools" v-if="user.permissions.includes(`add-video`)">
          <img src="@/assets/images/icons/plus.svg">
          <span> إضافة فيديو جديد</span>
        </Button>
      </template>
    </ListItems>
    <Modal :content-message="'حذف الفيديو'"
           :content-message-question="'هل انت متأكد من حذف الفيديو'"
           :showModal="showModal"
           @cancel="cancel($event)"
           :is-warning="true"
           @cancelWithConfirm="cancelWithConfirm($event)"/>
  </section>
</template>

<script>
import Button from "@/components/Shared/Button/index.vue";
import ListItems from "@/components/ListItems/index.vue";
import {deleteVideoRequest, getVideosRequest} from "@/api/videos";
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
      videosList: [],
      totalNumber: 0,
      fieldsList: [
        {key: "id", label: "التسلسل"},
        {key: "original_name", label: this.$i18n.t('TABLE_FIELDS.name')},
        // {key: "year", label: this.$i18n.t('TABLE_FIELDS.year')},
        // {key: "ques_num", label: this.$i18n.t('TABLE_FIELDS.questions_num')},
        {key: "learningPath.name", label: this.$i18n.t('TABLE_FIELDS.learning_path')},
        {key: "level.name", label: this.$i18n.t('TABLE_FIELDS.level')},
        {key: "description", label: this.$i18n.t('TABLE_FIELDS.description')},
        {key: "actions", label: "الإجراء"},
      ],
    }
  },
  methods: {
    goToAddSchools() {
      this.$router.push('/dashboard/videos/add')
    },
    getVideos(event) {
      this.loading = true
      const params = !event ? { per_page: 10 } : event;
      this.ApiService(getVideosRequest(params)).then((response) => {
        this.videosList = response.data.data
        this.totalNumber = response.data.meta.total
      }) .finally(() => {
          this.loading = false;
        });
    },
    searchBy($event) {
      console.log('$event', $event)
    },
    detailItem($event) {
      this.$router.push(`/dashboard/videos/show/${$event}`)
      console.log('detailItem', $event)
    },
    editItem($event) {
      this.$router.push(`/dashboard/videos/edit/${$event}`)
      console.log('editItem', $event)
    },
    deleteItem($event) {
      this.itemId = $event
      this.showModal = true
    },
    addVideoQuestion($event){
      // add video questions
    },
    cancel($event) {
      this.showModal = $event
    },
    cancelWithConfirm() {
      this.ApiService(deleteVideoRequest(this.itemId)).then(() => {
        this.getVideos()
      })
      this.cancel()
    }
  },
  mounted() {
    this.getVideos()
  }

}
</script>

<style scoped lang="scss">
@import "./index";
</style>
