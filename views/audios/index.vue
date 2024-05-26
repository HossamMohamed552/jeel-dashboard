<template>
  <section class="container-fluid custom-container">
    <ListItems :header-name="$t('AUDIOS.tasks')" :number-of-item="totalNumber"
               :tableItems="audiosList" :fields-list="fieldsList" :v-search-model="groupSearchWord"
               @detailItem="detailItem($event)"
               @editItem="editItem($event)" @deleteItem="deleteItem($event)"
               @refetch="getAudios"
               :loading="loading"
               @resetRefresh="refreshIt=false"
               :isRefresh="refreshIt"
               :permission_delete="'delete-tasks'"
               :permission_edit="'edit-tasks'"
               :permission_view="'show-tasks'"
    >
      <template #buttons>
        <Button :custom-class="'btn-add rounded-btn big-padding'" @click="goToAddAudios"
                v-if="user.permissions.includes(`add-tasks`)">
          <img src="@/assets/images/icons/plus.svg">
          <span>{{$t('AUDIOS.ADD_NEW')}}</span>
        </Button>
      </template>
    </ListItems>
    <Modal :content-message="$t('AUDIOS.delete_task')"
           :content-message-question="$t('AUDIOS.confirm_delete_tasks')"
           :showModal="showModal"
           @cancel="cancel($event)"
           :is-warning="true"
           @cancelWithConfirm="cancelWithConfirm($event)"/>
    <Modal :content-message="$t('can_not_delete')"
           :showModal="showModalFailed" :alarm="true"
           @cancelWithConfirm="showModalFailed=false"/>
  </section>
</template>

<script>
import Button from "@/components/Shared/Button/index.vue";
import ListItems from "@/components/ListItems/index.vue";
import {deleteAudioRequest, getAudiosRequest} from "@/api/audios";
import Modal from "@/components/Shared/Modal/index.vue";
import {mapGetters} from "vuex";

export default {
  components: {Modal, ListItems, Button},
  computed: {
    fieldsList(){
      return  [
        {
          key: "vid",
          label: this.$i18n.t("TABLE_FIELDS.id"),
        },
        {key: "name", label: this.$i18n.t('AUDIOS.AUDIO_NAME')},
        {key: "learningPath.name", label: this.$i18n.t('AUDIOS.LEARNING_PATH')},
        {key: "lesson.name", label: this.$i18n.t('AUDIOS.LESSION_NAME')},
        {key: "task_degree", label: this.$i18n.t('AUDIOS.DEGREE')},
        {key: "actions", label: this.$i18n.t('actions')},
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
      groupSearchWord: "",
      audiosList: [],
      totalNumber: 0,
    }
  },
  methods: {
    goToAddAudios() {
      this.$router.push('/dashboard/audios/add')
    },
    getAudios(event) {
      this.loading = true
      const params = !event ? {per_page: 10} : event;
      this.ApiService(getAudiosRequest(params)).then((response) => {
        this.audiosList = response.data.data
        this.totalNumber = response.data.meta.total
      }).finally(() => {
        this.loading = false;
      });
    },
    searchBy($event) {

    },
    detailItem($event) {
      this.$router.push(`/dashboard/Audios/show/${$event}`)
    },
    editItem($event) {
      this.$router.push(`/dashboard/Audios/edit/${$event}`)
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
      this.ApiService(deleteAudioRequest(this.itemId)).then(() => {
        this.getAudios()
        this.refreshIt = true
      }).catch((error) => {
        this.showModalFailed = error.response.data.code === 23000;
      }).finally(() => {
        this.cancel();
      })
    }
  },
  mounted() {
    this.getAudios()
  }

}
</script>

<style scoped lang="scss">
@import "./index";
</style>
