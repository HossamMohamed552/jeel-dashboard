<template>
  <section class="container-fluid custom-container">
    <ListItems :header-name="'قائمة المجموعات'" :number-of-item="totalNumber"
               :table-items="schoolGroupList" :v-search-model="groupSearchWord"
               :fieldsList="fieldsList" @detailItem="detailItem($event)"
               @editItem="editItem($event)" @deleteItem="deleteItem($event)"
               @refetch="getSchoolGroups"
               :loading="loading"
               >
      <template #buttons>
        <Button :custom-class="'btn-add rounded-btn big-padding'" @click="goToSchoolGroup">
          <img src="@/assets/images/icons/plus.svg">
          <span>إضافة مجموعه</span>
        </Button>
      </template>
    </ListItems>
    <Modal :content-message="'حذف المجموعة المدرسية'"
           :content-message-question="'هل انت متأكد من حذف المجموعة المدرسية'"
           :showModal="showModal"
           @cancel="cancel($event)"
           :is-warning="true"
           @cancelWithConfirm="cancelWithConfirm($event)"/>
  </section>
</template>

<script>
import Button from "@/components/Shared/Button/index.vue";
import ListItems from "@/components/ListItems/index.vue";
import {deleteSchoolGroupRequest, getSchoolGroupRequest} from "@/api/schoolGroup";
import Modal from "@/components/Shared/Modal/index.vue";

export default {
  components: {Modal, ListItems, Button},
  data() {
    return {
      loading: false,
      showModal: false,
      groupSearchWord: "",
      schoolGroupList: [],
      totalNumber: 0,
      fieldsList: [
        {
          key: "id",
          label: this.$i18n.t("TABLE_FIELDS.id")
        },
        {
          key: "name",
          label: this.$i18n.t("TABLE_FIELDS.name")
        },
        {
          key: "type",
          label: this.$i18n.t("TABLE_FIELDS.type")
        },
        {
          key: "status",
          label: this.$i18n.t("TABLE_FIELDS.status")
        },
        {
          key: "music_status",
          label: this.$i18n.t("TABLE_FIELDS.music_status")
        },
        {
          key: "email.owner",
          label: this.$i18n.t("TABLE_FIELDS.email")
        },
        {
          key: "country.name",
          label: this.$i18n.t("TABLE_FIELDS.country")
        },
        {
          key: "actions",
          label: this.$i18n.t("TABLE_FIELDS.actions")
        }
      ],
      itemId: 0,
    }
  },
  methods: {
    goToSchoolGroup(){
      this.$router.push('/dashboard/school-group/add')
    },
    getSchoolGroups(event) {
      this.loading = true
      const params = event
      this.ApiService(getSchoolGroupRequest(params)).then((response) => {
        this.schoolGroupList = response.data.data
        this.totalNumber = response.data.meta.total
      }) .finally(() => {
          this.loading = false;
        });
    },
    detailItem($event) {
      this.$router.push(`/dashboard/school-group/show/${$event}`)
    },
    editItem($event) {
      this.$router.push(`/dashboard/school-group/edit/${$event}`)
    },
    deleteItem($event) {
      this.itemId = $event
      this.showModal = true
    },
    cancel($event) {
      this.showModal = $event
    },
    cancelWithConfirm() {
      this.ApiService(deleteSchoolGroupRequest(this.itemId)).then(()=>{
        this.getSchoolGroups()
      })
      this.cancel()
    }
  },
  mounted() {
    this.getSchoolGroups()
  }

}
</script>

<style scoped lang="scss">
@import "./index";
</style>
