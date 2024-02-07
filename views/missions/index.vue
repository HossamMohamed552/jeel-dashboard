<template>
  <section class="container-fluid custom-container">
    <ListItems :header-name="'قائمة المهام'" :number-of-item="totalNumber"
               :tableItems="missionsList" :fieldsList="fieldsList"
               :v-search-model="missionSearchWord"
               @detailItem="detailItem($event)"
               @editItem="editItem($event)" @deleteItem="deleteItem($event)"
               @refetch="getMissions"
               :loading="loading"
               :permission_delete="'delete-missions'"
               :permission_edit="'edit-missions'"
               :permission_view="'show-missions'"
    >
      <template #buttons>
        <Button :custom-class="'btn-add rounded-btn big-padding'" @click="goToAddMissions"
                v-if="user.permissions.includes(`add-missions`)">
          <img src="@/assets/images/icons/plus.svg">
          <span>إضافة مهمة جديد</span>
        </Button>
      </template>
    </ListItems>
    <Modal :content-message="'حذف المهمة'"
           :content-message-question="'هل انت متأكد من حذف المهمة'"
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
import {mapGetters} from "vuex";

export default {
  name: "index",
  components: {Modal, ListItems, Button},
  computed: {
    ...mapGetters(['user'])
  },
  data() {
    return {
      loading: false,
      showModal: false,
      missionSearchWord: "",
      missionsList: [],
      totalNumber: 0,
      fieldsList: [
        {key: "id", label: "التسلسل"},
        {key: "name", label: "الإسم"},
        {key: "level", label: "المرحله الدراسية"},
        {key: "description", label: "الوصف"},
        {key: "learningpaths", label: "المسارات التعليمية"},
        {key: "actions", label: "الإجراء"},
      ],
    }
  },
  methods: {
    goToAddMissions() {
      this.$router.push('/dashboard/missions/add')
    },
    getMissions(event) {
      this.loading = true
      const params = event
      this.ApiService(getMissionsRequest(params)).then((response) => {
        this.missionsList = response.data.data
        this.totalNumber = response.data.meta.total
      }).finally(() => {
        this.loading = false;
      });
    },
    searchBy($event) {

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
    // window.localStorage.setItem("page", "missions");
  },
  beforeDestroy() {
    window.localStorage.setItem("page", "");
  }
}
</script>
<style scoped lang="scss">
@import "./index";
</style>
