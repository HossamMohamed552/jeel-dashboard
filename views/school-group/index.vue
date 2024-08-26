<template>
  <section class="container-fluid custom-container">
    <ListItems
      :header-name="$t('schoolGroup.list')"
      :number-of-item="totalNumber"
      :table-items="schoolGroupList"
      :v-search-model="groupSearchWord"
      :fieldsList="fieldsList"
      :isRefresh="refresh"
      @detailItem="detailItem($event)"
      @editItem="editItem($event)"
      @deleteItem="deleteItem($event)"
      @refetch="getSchoolGroups"
      :loading="loading"
      :permission_delete="'delete-schoolGroups'"
      :permission_edit="'edit-schoolGroups'"
      :permission_view="'show-schoolGroups'"
    >
      <template #buttons>
        <Button
          :custom-class="'btn-add rounded-btn big-padding'"
          @click="goToSchoolGroup"
          v-if="user.permissions.includes(`add-schoolGroups`)"
        >
          <img src="@/assets/images/icons/plus.svg" />
          <span>{{ $t('schoolGroup.add') }}</span>
        </Button>
      </template>
    </ListItems>
    <Modal
      :content-message="$t('schoolGroup.delete')"
      :content-message-question="$t('schoolGroup.confirm_delete')"
      :showModal="showModal"
      @cancel="cancel($event)"
      :is-warning="true"
      @cancelWithConfirm="cancelWithConfirm($event)"
    />
    <Modal :content-message="$t('can_not_delete')"
           :showModal="showModalFailed" :alarm="true"
           @cancelWithConfirm="showModalFailed=false"/>
    <Modal :content-message="$t('CONTROLS.delete_successfully')" :showModal="deleteModal" :is-success="true" />
  </section>
</template>

<script>
import Button from "@/components/Shared/Button/index.vue";
import ListItems from "@/components/ListItems/index.vue";
import { deleteSchoolGroupRequest, getSchoolGroupRequest } from "@/api/schoolGroup";
import Modal from "@/components/Shared/Modal/index.vue";
import { mapGetters } from "vuex";

export default {
  components: { Modal, ListItems, Button },
  computed: {
    fieldsList(){
      return [
        {
          key: "vid",
          label: this.$i18n.t("TABLE_FIELDS.id"),
        },
        {
          key: "name",
          label: this.$i18n.t("schoolGroup.name"),
        },
        {
          key: "country.name",
          label: this.$i18n.t("schoolGroup.country"),
        },
        {
          key: "status",
          label: this.$i18n.t("schoolGroup.status"),
        },
        {
          key: "actions",
          label: this.$i18n.t("TABLE_FIELDS.actions"),
        },
      ]
    },
    ...mapGetters(["user"]),
  },
  data() {
    return {
      loading: false,
      showModal: false,
      showModalFailed: false,
      refresh: false,
      deleteModal: false,
      groupSearchWord: "",
      schoolGroupList: [],
      totalNumber: 0,
      itemId: 0,
    };
  },
  methods: {
    goToSchoolGroup() {
      this.$router.push("/dashboard/school-group/add");
    },
    getSchoolGroups(event) {
      this.loading = true;
      const params = event;
      this.ApiService(getSchoolGroupRequest(params))
        .then((response) => {
          this.schoolGroupList = response.data.data;
          this.totalNumber = response.data.meta.total;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    detailItem($event) {
      this.$router.push(`/dashboard/school-group/show/${$event}`);
    },
    editItem($event) {
      this.$router.push(`/dashboard/school-group/edit/${$event}`);
    },
    deleteItem($event) {
      this.itemId = $event;
      this.showModal = true;
    },
    cancel($event) {
      this.showModal = $event;
    },
    cancelWithConfirm() {
      this.ApiService(deleteSchoolGroupRequest(this.itemId)).then(() => {
        this.deleteModal = true;
        this.getSchoolGroups();
        this.refresh = true
        setTimeout(()=>{
          this.deleteModal = false
        },1500)
      }).catch((error) => {
        this.showModalFailed = error.response.data.code === 23000;
      }).finally(() => {
        this.cancel();
      })
    },
  },
  mounted() {
    this.getSchoolGroups();
  },
};
</script>

<style scoped lang="scss">
@import "./index";
</style>
