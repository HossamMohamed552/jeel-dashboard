<template>
  <section class="container-fluid custom-container">
    <div class="show-role adjust-height">
      <div class="hold-fields">
        <b-row>
          <b-col lg="12" class="d-flex justify-content-between align-items-center">
            <h2 class="heading">{{ $t('schoolAdmin.classDETAILS') }}</h2>
            <Button
              :custom-class="'btn-add rounded-btn big-padding'"
              @click="goToAddGroup"
              v-if="user.permissions.includes(`add-teacher-groups`)"
            >
              <img src="@/assets/images/icons/plus.svg"/>
              <span>{{ $t('teacher.addGroup') }}</span>
            </Button>
          </b-col>
        </b-row>
        <b-row class="divider p-0 mt-5">
          <b-col lg="3" class="mb-5">
            <ShowItem v-if="singleClass && singleClass.studyYear"
                      :title="$t('TABLE_FIELDS.studyYearName')"
                      :subtitle="singleClass.studyYear.name"/>
          </b-col>
          <b-col lg="3" class="mb-5">
            <ShowItem v-if="singleClass && singleClass.level"
                      :title="$t('TABLE_FIELDS.levelSchoolAdmin')"
                      :subtitle="singleClass.level.name"
            />
          </b-col>
          <b-col lg="3" class="mb-5">
            <ShowItem
              :title="$t('TABLE_FIELDS.className')"
              :subtitle="singleClass.name"
            />
          </b-col>
          <b-col lg="3" class="mb-5" v-if="singleClass.students_count">
            <ShowItem :title="$t('CLASS.students_count')" :subtitle="singleClass.students_count"/>
          </b-col>
        </b-row>
      </div>
    </div>
    <div class="tabs">
      <div @click="activeTap = 1" :class="activeTap === 1 ? 'active' : ''" class="tap">
        {{ $t('teacher.listOfClassStudents') }}
      </div>
      <div @click="activeTap = 2" :class="activeTap === 2 ? 'active' : ''" class="tap">
        {{ $t('teacher.classGroups') }}
      </div>
    </div>
    <div class="content">
      <div class="row">
        <div class="col-12 " v-if="activeTap === 1">
          <ListItems
            class="background-transparent m-0 p-0"
            :show-sort-controls="false"
            :fieldsList="fieldsList"
            :table-items="students"
            :number-of-item="numberOfStudents"
            :loading="loading"
            :disableIt="true"
            @refetch="getStudentForClass"
            @detailItem="goToStudentDetail"
            :permission_view="'show-teacher-students'"
          >
          </ListItems>
        </div>
        <div class="col-12" v-else>
          <ListItems
            class="background-transparent m-0 p-0"
            :show-sort-controls="false"
            :fieldsList="groupFieldsList"
            :table-items="groups"
            :number-of-item="numberOfGroups"
            :loading="loading"
            :disableIt="true"
            @refetch="getGroupsForClass"
            @addStudentOnGroupItem="addStudentOnGroupItem"
            @editItem="editItem($event)"
            @detailItem="detailItem($event)"
            @deleteItem="deleteItem($event)"
            :permission_view="'show-teacher-groups'"
            :permission_edit="'edit-teacher-groups'"
            :permission_add_studentForGroup="'add-teacher-student-groups'"
            :permission_delete="'delete-teacher-groups'"
          >
          </ListItems>
        </div>
      </div>
    </div>
    <Modal
      :content-message="$t('teacher.deleteGroup')"
      :content-message-question="$t('teacher.deleteConfirm')"
      :showModal="showModal"
      @cancel="cancel($event)"
      :is-warning="true"
      @cancelWithConfirm="cancelWithConfirm($event)"
    />
  </section>
</template>
<script>
import ShowItem from "@/components/Shared/ShowItem/index.vue";
import {
  deleteClassRequest,
  getSingleClassForSuperVisorRequest,
  getSingleClassRequest
} from "@/api/class.js";
import ListItems from "@/components/ListItems/index.vue";
import {
  deleteClassTeacherRequest,
  getGroupsOfClassTeacherRequest,
  getSingleClassForTeacherRequest,
  getStudentsForClassTeacherRequest
} from "@/api/teacher-module";
import Button from "@/components/Shared/Button/index.vue";
import {mapGetters} from "vuex";
import Modal from "@/components/Shared/Modal/index.vue";

export default {
  name: "index",
  components: {
    Modal,
    Button,
    ListItems,
    ShowItem,
  },
  data() {
    return {
      loading: false,
      showModal: false,
      userSearchWord: "",
      itemId: "",
      singleClass: {},
      activeTap: 1,
      students: [],
      groups: [],
      numberOfStudents: 0,
      numberOfGroups: 0
    };
  },
  computed: {
    ...mapGetters(["user"]),
    fieldsList() {
      return [
        {
          key: "vid",
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
      ]
    },
    groupFieldsList() {
      return [
        {
          key: "vid",
          label: this.$i18n.t("TABLE_FIELDS.id"),
        },
        {
          key: "name",
          label: this.$i18n.t("TABLE_FIELDS.name"),
        },
        {
          key: "students",
          label: this.$i18n.t("TABLE_FIELDS.students"),
        },
        {
          key: "actions",
          label: this.$i18n.t("TABLE_FIELDS.actions"),
        },
      ]
    },
  },
  methods: {
    detailItem($event) {
      this.$router.push(`/dashboard/teacher-group/show/${$event}`);
    },
    addStudentOnGroupItem($event) {
      this.$router.push(`/dashboard/teacher-group/show/${$event.id}`);
    },
    editItem($event) {
      this.$router.push(`/dashboard/teacher-group/edit/${$event}`);
    },
    deleteItem($event) {
      this.itemId = $event;
      this.showModal = true;
    },
    cancel($event) {
      this.showModal = $event;
    },
    cancelWithConfirm() {
      this.ApiService(deleteClassTeacherRequest(this.itemId)).then((response) => {
        this.getGroupsForClass()
      })
      this.cancel();
    },
    goToStudentDetail($event) {
      this.$router.push(`/dashboard/teacher-student/show/${$event}`);
    },
    goToAddGroup() {
      this.$store.commit('SET_CLASS_ID', this.$route.params.id)
      this.$router.push(`/dashboard/teacher-group/add`)
    },
    getStudentForClass($event) {
      this.ApiService(getStudentsForClassTeacherRequest(this.$route.params.id, $event)).then((response) => {
        this.students = response.data.data
        this.numberOfStudents = response.data.meta.total
      })
    },
    getGroupsForClass($event) {
      this.ApiService(getGroupsOfClassTeacherRequest(this.$route.params.id, $event)).then((response) => {
        this.groups = response.data.data
        this.numberOfGroups = response.data.meta.total
      })
    },
  },
  mounted() {
    this.ApiService(getSingleClassForTeacherRequest(this.$route.params.id)).then(
      (response) => {
        this.singleClass = response.data.data;
      }
    );
    this.getStudentForClass()
    this.getGroupsForClass()
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
