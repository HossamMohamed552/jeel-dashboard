<template>
  <section class="container-fluid custom-container">
    <div class="show-role">
      <div class="hold-fields">
        <b-row>
          <b-col lg="12">
            <h2 class="heading"> {{ $t('classGroup.detail') }}</h2>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="4">
            <ShowItem class="divider-show" :title="$t('classGroup.classGroup_name')"
                      :subtitle="groupDetail.name"/>
          </b-col>
          <b-col lg="4">
            <ShowItem v-if="groupDetail && groupDetail.class" class="divider-show" :title="$t('classGroup.class_name')"
                      :subtitle="groupDetail.class.name"/>
          </b-col>
          <b-col lg="12" class="mt-4">
            <validation-observer class="w-100 px-3" v-slot="{ invalid }"
                                 ref="addStudentOnGroupForm">
              <form @submit.prevent="onSubmit">
                <b-row>
                  <b-col lg="9">
                    <div class="hold-field" v-if="getAllStudents">
                      <SelectSearch
                        v-model="student_id"
                        :label="$t('schoolAdmin.studentName')"
                        :name="$t('schoolAdmin.studentName')"
                        :placeholder="$t('teacher.enterStudentName')"
                        :options="students"
                        :reduce="(option) => option.id"
                        :get-option-label="(option) => option.name"
                        :rules="'required'"
                        multiple
                      ></SelectSearch>
                    </div>
                  </b-col>
                  <b-col lg="3" class="d-flex justify-content-start align-items-end">
                    <Button
                      type="submit"
                      :loading="loading"
                      :disabled="invalid"
                      custom-class="submit-btn margin-0-all add-group"
                    >
                      <img src="@/assets/images/icons/plus.svg" class="ml-2"/>
                      <span>{{ $t("classGroup.addStudentOnGroup") }}</span>
                    </Button>
                  </b-col>
                </b-row>
              </form>
            </validation-observer>
          </b-col>
          <b-col lg="12">
            <ListItems
              class="m-0 p-0"
              :header-name="$t('teacher.listOfStudents')"
              :fieldsList="fieldsList"
              :number-of-item="totalNumber"
              :table-items="studentsInGroup"
              :loading="loading"
              :disable-it="true"
              :show-sort-controls="false"
              @detailItem="detailItem($event)"
              @deleteItem="deleteItem($event)"
              @refetch="getStudentsInGroup"
              :permission_view="'show-teacher-students'"
              :permission_delete="'delete-teacher-student-groups'"
            >
            </ListItems>
          </b-col>
        </b-row>
      </div>
    </div>
    <Modal :content-message="$t('CONTROLS.add_successfully')" :showModal="showModal" :is-success="true" />
    <Modal
      :content-message="$t('teacher.delete_student')"
      :content-message-question="$t('teacher.delete_studentFromGroup')"
      :showModal="showModalDelete"
      @cancel="cancel($event)"
      :is-warning="true"
      @cancelWithConfirm="cancelWithConfirmDelete($event)"
    />
  </section>
</template>
<script>
import ShowItem from "@/components/Shared/ShowItem/index.vue";
import {
  deleteStudentFromGroupRequest,
  getAllStudentsForTeacherRequest, getAllStudentsInGroupForTeacherRequest,
  getClassGroupIdByIdRequest, getStudentForClassRequest,
  postAddStudentForGroupRequest
} from "@/api/teacher-module";
import ListItems from "@/components/ListItems/index.vue";
import SelectSearch from "@/components/Shared/SelectSearch/index.vue";
import Button from "@/components/Shared/Button/index.vue";
import Modal from "@/components/Shared/Modal/index.vue";
import {deleteBloomRequest} from "@/api/bloom";

export default {
  name: "index",
  components: {
    Modal,
    Button, SelectSearch,
    ListItems,
    ShowItem,
  },
  data() {
    return {
      loading: false,
      showModal: false,
      showModalDelete: false,
      studentsSearchWord: "",
      student_id: [],
      students: [],
      studentsInGroup: [],
      totalNumber: 0,
      groupDetail: {},
    };
  },
  computed:{
    fieldsList(){
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
  },
  methods: {
    detailItem($event) {
      this.$router.push(`/dashboard/teacher-student/show/${$event}`);
    },
    deleteItem($event){
      this.itemId = $event;
      this.showModalDelete = true;
    },
    getAllStudents() {
      this.ApiService(getStudentForClassRequest(this.groupDetail.class.id,{out_group: this.$route.params.id})).then((response) => {
        this.students = response.data.data
      })
    },
    getStudentsInGroup($event){
      this.ApiService(getAllStudentsInGroupForTeacherRequest(this.$route.params.id,$event)).then((response) => {
        this.studentsInGroup = response.data.data
        this.totalNumber = response.data.meta.total
      })
    },
    cancel($event) {
      this.showModalDelete = $event;
    },
    cancelWithConfirmDelete() {
      this.ApiService(deleteStudentFromGroupRequest(this.$route.params.id,this.itemId)).then(() => {
        this.showModalDelete = true;
        this.getAllStudents();
        this.getStudentsInGroup();
        setTimeout(()=>{
          this.showModalDelete = false
        },1500)
      }).finally(() => {
        this.cancel();
      })
    },
    onSubmit() {
      this.$refs.addStudentOnGroupForm.validate().then((success) => {
        if (!success) return;
      });
      let data = {
        group_id: this.$route.params.id,
        users: this.student_id
      }
      this.ApiService(postAddStudentForGroupRequest(data)).then((response) => {
        this.student_id = null
        this.$nextTick(() => {
          this.$refs.addStudentOnGroupForm.reset()
        })
      }).then(()=>{
        this.showModal = true;
        setTimeout(() => {
          this.showModal = false;
        }, 1500);
        this.getStudentsInGroup();
        this.getAllStudents()
      })

    },
  },
  mounted() {
    this.ApiService(getClassGroupIdByIdRequest(this.$route.params.id)).then((response) => {
      this.groupDetail = response.data.data;
    }).then(()=>{
      this.getAllStudents()
    })
    this.getStudentsInGroup()
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
