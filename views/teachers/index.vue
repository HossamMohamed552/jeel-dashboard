<template>
  <section class="container-fluid custom-container">
    <ListItems
      :header-name="'قائمة المدرسين'"
      :fieldsList="fieldsList"
      :number-of-item="totalNumber"
      :table-items="teachers"
      :v-search-model="teachersSearchWord"
      :loading="loading"
      :disable-it="true"
      @detailItem="detailItem($event)"
      @refetch="getAllTeachers"
      :permission_delete="'delete-teachers'"
      :permission_edit="'edit-teachers'"
      :permission_view="'show-supervisor-teachers'"
    >
    </ListItems>
  </section>
</template>

<script>
import Button from "@/components/Shared/Button/index.vue";
import ListItems from "@/components/ListItems/index.vue";
import Modal from "@/components/Shared/Modal/index.vue";
import {mapGetters} from "vuex";
import {getAllTeachersForSuperVisorRequest, getAllTeachersRequest} from "@/api/user";

export default {
  components: {Modal, ListItems, Button},
  data() {
    return {
      loading: false,
      showModal: false,
      teachersSearchWord: "",
      teachers: [],
      totalNumber: 0,
      fieldsList: [
        {
          key: "id",
          label: this.$i18n.t("TABLE_FIELDS.id"),
        },
        {
          key: "image",
          label: this.$i18n.t("TABLE_FIELDS.image"),
        },
        {
          key: "first_name",
          label: this.$i18n.t("TABLE_FIELDS.first_name"),
        },
        {
          key: "middle_name",
          label: this.$i18n.t("TABLE_FIELDS.middle_name"),
        },
        {
          key: "last_name",
          label: this.$i18n.t("TABLE_FIELDS.last_name"),
        },
        {
          key: "email",
          label: this.$i18n.t("USERS.name"),
        },
        {
          key: "status.key",
          label: this.$i18n.t("TABLE_FIELDS.status"),
        },
        {
          key: "actions",
          label: this.$i18n.t("TABLE_FIELDS.actions"),
        },
      ],
      itemId: 0,
    };
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    getAllTeachers(){
      this.ApiService(getAllTeachersForSuperVisorRequest()).then((response)=>{
        this.teachers = response.data.data
        this.totalNumber = response.data.meta.total
      })
    },
    detailItem($event) {
      this.$router.push(`/dashboard/teachers/show/${$event}`);
    },
  },
  mounted() {
    this.getAllTeachers();
  },
};
</script>

<style scoped lang="scss">
@import "./index";
</style>
