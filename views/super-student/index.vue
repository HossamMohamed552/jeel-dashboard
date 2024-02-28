<template>
  <section class="container-fluid custom-container">
    <ListItems
      :header-name="'قائمة الطلاب'"
      :fieldsList="fieldsList"
      :number-of-item="totalNumber"
      :table-items="students"
      :v-search-model="studentsSearchWord"
      :loading="loading"
      :disable-it="true"
      @detailItem="detailItem($event)"
      @refetch="getAllTeachers"
      :permission_delete="'delete-teachers'"
      :permission_edit="'edit-teachers'"
      :permission_view="'show-supervisor-students'"
    >
    </ListItems>
  </section>
</template>

<script>
import Button from "@/components/Shared/Button/index.vue";
import ListItems from "@/components/ListItems/index.vue";
import Modal from "@/components/Shared/Modal/index.vue";
import {mapGetters} from "vuex";
import {
  getAllStudentsForSuperVisorRequest,
  getAllTeachersForSuperVisorRequest,
  getAllTeachersRequest
} from "@/api/user";
import students from "../user-parent/students/index.vue";

export default {
  components: {Modal, ListItems, Button},
  data() {
    return {
      loading: false,
      showModal: false,
      studentsSearchWord: "",
      students: [],
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
      this.ApiService(getAllStudentsForSuperVisorRequest()).then((response)=>{
        this.students = response.data.data
        this.totalNumber = response.data.meta.total
      })
    },
    detailItem($event) {
      this.$router.push(`/dashboard/super-student/show/${$event}`);
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
