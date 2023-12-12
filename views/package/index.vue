<template>
  <section class="container-fluid custom-container">
    <ListItems
      :header-name="'قائمة الباقات'"
      :fieldsList="fieldsList"
      :number-of-item="totalNumber"
      :table-items="packagesList"
      :v-search-model="packageSearchWord"
      @detailItem="detailItem($event)"
      @editItem="editItem($event)"
      @deleteItem="deleteItem($event)"
      @refetch="getPackages"
      :loading="loading"
      :permission_delete="'delete-packages'"
      :permission_edit="'edit-packages'"
      :permission_view="'show-packages'"
    >
      <template #buttons>
        <Button
          :custom-class="'btn-add rounded-btn big-padding'"
          @click="goToAddPackage"
          v-if="user.permissions.includes(`add-packages`)"
        >
          <img src="@/assets/images/icons/plus.svg" />
          <span>إضافة باقة</span>
        </Button>
      </template>
    </ListItems>
    <Modal
      :content-message="'حذف الباقة'"
      :content-message-question="'هل انت متأكد من حذف الباقة'"
      :showModal="showModal"
      @cancel="cancel($event)"
      :is-warning="true"
      @cancelWithConfirm="cancelWithConfirm($event)"
    />
  </section>
</template>

<script>
import Button from "@/components/Shared/Button/index.vue";
import ListItems from "@/components/ListItems/index.vue";
import { deletePackagesRequest, getPackagesRequest } from "@/api/packages.js";
import Modal from "@/components/Shared/Modal/index.vue";
import {mapGetters} from "vuex";
export default {
  components: { Modal, ListItems, Button },
  computed:{
    ...mapGetters(['user'])
  },
  data() {
    return {
      loading: false,
      showModal: false,
      packageSearchWord: "",
      packagesList: [],
      totalNumber: 0,
      fieldsList: [
        {
          key: "id",
          label: this.$i18n.t("TABLE_FIELDS.id"),
        },
        {
          key: "name",
          label: this.$i18n.t("TABLE_FIELDS.name"),
        },
        {
          key: "classes_count",
          label: this.$i18n.t("TABLE_FIELDS.classes_count"),
        },
        {
          key: "number_users_roles[0]",
          label: "عدد المديرين",
        },
        {
          key: "number_users_roles[1]",
          label: "عدد المشرفين",
        },
        {
          key: "number_users_roles[2]",
          label: "عدد المدرسين",
        },
        {
          key: "number_users_roles[3]",
          label: "عدد الطلاب",
        },
        {
          key: "number_users_roles[4]",
          label: "عدد الأبوين",
        },
        {
          key: "actions",
          label: this.$i18n.t("TABLE_FIELDS.actions"),
        },
      ],
      itemId: 0,
    };
  },
  methods: {
    goToAddPackage() {
      this.$router.push("/dashboard/package/add");
    },
    getPackages(event) {
      this.loading = true
      const params = event
      this.ApiService(getPackagesRequest(params)).then((response) => {
        this.packagesList = response.data.data;
        this.totalNumber = response.data.meta.total;
      }) .finally(() => {
          this.loading = false;
        });;
    },

    detailItem($event) {
      this.$router.push(`/dashboard/package/show/${$event}`);

    },
    editItem($event) {
      this.$router.push(`/dashboard/package/edit/${$event}`);

    },
    deleteItem($event) {
      this.itemId = $event;
      this.showModal = true;
    },
    cancel($event) {
      this.showModal = $event;
    },
    cancelWithConfirm() {
      this.ApiService(deletePackagesRequest(this.itemId)).then(() => {
        this.getPackages();
      });
      this.cancel();
    },
  },
  mounted() {
    this.getPackages();
  },
};
</script>

<style scoped lang="scss">
@import "./index";
</style>
