<template>
  <section class="container-fluid custom-container">
    <div class="show-role">
      <div class="hold-fields">
        <b-row>
          <b-col lg="12">
            <h2 class="heading">إضافة ولى الأمر إلى الطالب</h2>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="3" class="mb-4">
            <ShowItem
              class="divider-show"
              :title="$t('schoolAdmin.firstName')"
              :subtitle="singleUser.first_name"
            />
          </b-col>
          <b-col lg="3" class="mb-4">
            <ShowItem
              class="divider-show"
              :title="$t('schoolAdmin.midName')"
              :subtitle="singleUser.middle_name"
            />
          </b-col>
          <b-col lg="3" class="mb-4">
            <ShowItem
              class="divider-show"
              :title="$t('schoolAdmin.lastName')"
              :subtitle="singleUser.last_name"
            />
          </b-col>
          <b-col lg="3" class="mb-4" v-if="singleUser && singleUser.status">
            <ShowItem
              class="divider-show"
              :title="$t('schoolAdmin.status')"
              :subtitle="singleUser.status.name"
            />
          </b-col>
          <b-col lg="6" class="mb-4">
            <ShowItem
              class="divider-show"
              :title="$t('schoolAdmin.email')"
              :subtitle="singleUser.email"
            />
          </b-col>
          <b-col lg="3" class="mb-4">
            <ShowItem
              class="divider-show"
              :title="$t('schoolAdmin.mobile')"
              :subtitle="singleUser.mobile"
            />
          </b-col>
          <b-col lg="3" class="mb-4" v-if="singleUser && singleUser?.roles?.[0]">
            <ShowItem
              class="divider-show"
              :title="$t('schoolAdmin.roleDetail')"
              :subtitle="singleUser?.roles?.[0].name"
            />
          </b-col>
        </b-row>
        <validation-observer class="w-100 px-3" v-slot="{ invalid }" ref="addEditSchoolClassForm">
          <form @submit.prevent="onSubmit">
            <b-row>
              <b-col lg="12">
                <h2 class="heading mt-3">{{ $t("schoolAdmin.addParent") }}</h2>
              </b-col>
              <b-col lg="10">
                <SelectSearch
                  v-model="enrollment.parent_id"
                  :label="$t('schoolAdmin.selectParent')"
                  :name="$t('schoolAdmin.selectParent')"
                  :placeholder="$t('schoolAdmin.selectParent')"
                  :options="parentsList"
                  :reduce="(option) => option.id"
                  :get-option-label="(option) => option.name"
                  :rules="'required'"
                ></SelectSearch>
              </b-col>
              <b-col lg="2" class="mt-3 mb-3">
                <Button type="submit" :loading="loading" :disabled="invalid"
                        custom-class="submit-btn margin-0">
                  {{ $t("GLOBAL_SAVE") }}
                </Button>
              </b-col>
            </b-row>
          </form>
        </validation-observer>
        <b-row>
          <b-col lg="12">
            <ListItems
              :fieldsList="fieldsList"
              :table-items="singleUser.parents"
              :loading="loading"
              :permission_delete="'delete-enrollment-students-parents-users'"
              @deleteItem="deleteItem($event)"
              :showSortControls="false"
              :disableIt="true"
              class="m-0 p-0"
            >
            </ListItems>
          </b-col>
        </b-row>
      </div>
    </div>
    <Modal
      :content-message="'حذف العنصر'"
      :content-message-question="'هل انت متأكد من حذف العنصر ؟'"
      :showModal="showModal"
      @cancel="cancel($event)"
      :is-warning="true"
      @cancelWithConfirm="cancelWithConfirm($event)"
    />
  </section>
</template>
<script>
import ShowItem from "@/components/Shared/ShowItem/index.vue";
import Button from "@/components/Shared/Button/index.vue";
import TextField from "@/components/Shared/TextField/index.vue";
import SelectSearch from "@/components/Shared/SelectSearch/index.vue";
import ListItems from "@/components/ListItems/index.vue";
import Modal from "@/components/Shared/Modal/index.vue";
import {
  deleteStudentParentEnrollmentRequest,
  getAllParentUsersRequest,
  getParentForStudentUserRequest,
  postStudentForParentRequest
} from "@/api/school-info";

export default {
  name: "index",
  components: {Modal, ListItems, SelectSearch, TextField, Button, ShowItem},
  data() {
    return {
      userId: this.$route.params.id,
      singleUser: {},
      loading: false,
      showModal: false,
      parentsList:[],
      enrollment: {
        student_id:  Number(this.$route.params.id),
        parent_id: "",
      },
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
          key: "last_name",
          label: this.$i18n.t("TABLE_FIELDS.last_name"),
        },
        {
          key: "user_name",
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
    }
  },
  watch: {
    singleUser(newVal) {
      return newVal
    }
  },
  methods: {
    getStudentDetails() {
      this.ApiService(getParentForStudentUserRequest(this.userId)).then((response) => {
        this.singleUser = response.data.data
      })
    },
    deleteItem($event) {
      this.itemId = $event;
      this.showModal = true;
    },
    cancel($event) {
      this.showModal = $event;
    },
    cancelWithConfirm() {
      this.ApiService(deleteStudentParentEnrollmentRequest(this.itemId)).then(() => {
        this.getStudentDetails();
      });
      this.cancel();
    },
    onSubmit(){
      this.ApiService(postStudentForParentRequest(this.enrollment)).then(() => {
        this.$nextTick(() => {
          this.parent_id = ""
          this.$refs.addEditSchoolClassForm.reset()
        })
        this.getStudentDetails()
    })
  },
    getParentUsers(){
      this.ApiService(getAllParentUsersRequest()).then((response)=>{
        this.parentsList = response.data.data
      })
    }
  },
  mounted() {
    this.getStudentDetails()
    this.getParentUsers()
  }
}
</script>
<style scoped lang="scss">

</style>
