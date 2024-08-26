<template>
  <section class="container-fluid custom-container">
    <ListItems :header-name="$t('VIDEO.videos')" :number-of-item="totalNumber"
               :tableItems="videosList" :fields-list="fieldsList" :v-search-model="groupSearchWord"
               @detailItem="detailItem($event)"
               @editItem="editItem($event)" @deleteItem="deleteItem($event)"
               @refetch="getVideos"
               :loading="loading"
               @resetRefresh="refreshIt=false"
               :isRefresh="refreshIt"
               :permission_delete="'delete-video'"
               :permission_edit="'edit-video'"
               :permission_view="'show-video'"
    >
      <template #buttons>
        <Button :custom-class="'btn-add rounded-btn big-padding'" @click="goToAddSchools"
                v-if="user.permissions.includes(`add-video`)">
          <img src="@/assets/images/icons/plus.svg">
          <span>{{ $t('VIDEO.ADD_NEW') }}</span>
        </Button>
      </template>
    </ListItems>
    <Modal :content-message="$t('VIDEO.deleteVideo')"
           :content-message-question="$t('VIDEO.confirm_delete_video')"
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
import {deleteVideoRequest, getVideosRequest} from "@/api/videos";
import Modal from "@/components/Shared/Modal/index.vue";
import {mapGetters} from "vuex";

export default {
  components: {Modal, ListItems, Button},
  computed: {
    fieldsList() {
      return [
        {
          key: "vid",
          label: this.$i18n.t("TABLE_FIELDS.id"),
        },
        {key: "title", label: this.$i18n.t('TABLE_FIELDS.videoTitle')},
        {key: "learningPath.name", label: this.$i18n.t('TABLE_FIELDS.learning_path')},
        {key: "lesson.name", label: this.$i18n.t('TABLE_FIELDS.lesson')},
        {
          key: "video_with_music_transcode",
          label: this.$i18n.t('TABLE_FIELDS.video_with_music_transcode')
        },
        {key: "actions", label: this.$i18n.t("TABLE_FIELDS.actions")},
      ]
    },
    ...mapGetters(['user'])
  },
  data() {
    return {
      loading: false,
      showModal: false,
      showModalFailed: false,
      refreshIt: false,
      deleteModal: false,
      groupSearchWord: "",
      videosList: [],
      totalNumber: 0,
    }
  },
  methods: {
    goToAddSchools() {
      this.$router.push('/dashboard/videos/add')
    },
    getVideos(event) {
      this.loading = true
      const params = !event ? {per_page: 10} : event;
      this.ApiService(getVideosRequest(params)).then((response) => {
        this.videosList = response.data.data
        this.totalNumber = response.data.meta.total
      }).finally(() => {
        this.loading = false;
      });
    },
    detailItem($event) {
      this.$router.push(`/dashboard/videos/show/${$event}`)
    },
    editItem($event) {
      this.$router.push(`/dashboard/videos/edit/${$event}`)
    },
    deleteItem($event) {
      this.itemId = $event
      this.showModal = true
    },
    addVideoQuestion($event) {
      // add video questions
    },
    cancel($event) {
      this.showModal = $event
    },
    cancelWithConfirm() {
      this.ApiService(deleteVideoRequest(this.itemId)).then(() => {
        this.deleteModal = true;
        this.getVideos()
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
    this.getVideos()
  }

}
</script>

<style scoped lang="scss">
@import "./index";
</style>
