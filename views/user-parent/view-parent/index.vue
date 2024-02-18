<template>
  <section class="container-fluid custom-container">
    <div class="show-role">
      <div class="hold-fields">
        <b-row>
          <b-col lg="12">
            <h2 class="heading">{{ $t("schoolAdmin.showDetailsParent") }}</h2>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="3">
            <div class="img-container">
              <span>
                <img v-if="singleUser.image" :src="singleUser.image" alt="Person Image" />
                <i v-else class="far fa-user"></i>
              </span>
            </div>
          </b-col>
          <b-col lg="9">
            <b-row>
              <b-col lg="4" class="mb-5 showItem">
                <ShowItem :title="$t('USER.first_name')" :subtitle="singleUser.first_name" />
              </b-col>
              <b-col lg="4" class="mb-5 showItem">
                <ShowItem :title="$t('USERS.SECOND_NAME')" :subtitle="singleUser.middle_name" />
              </b-col>
              <b-col lg="4" class="mb-5 showItem">
                <ShowItem :title="$t('USER.last_name')" :subtitle="singleUser.last_name" />
              </b-col>
              <b-col lg="8" class="mb-5 showItem">
                <ShowItem :title="$t('TABLE_FIELDS.email_username')" :subtitle="singleUser.email" />
              </b-col>
              <b-col lg="4" class="mb-5 showItem">
                <ShowItem :title="$t('USER.mobile')" :subtitle="singleUser.mobile" />
              </b-col>
              <b-col lg="4" class="mb-5 showItem">
                <ShowItem
                  :title="$t('USERS.NATIONALITY')"
                  :subtitle="singleUser?.user_country?.name"
                />
              </b-col>
              <b-col lg="4" class="mb-5 showItem">
                <ShowItem
                  :title="$t('USERS.religion')"
                  :subtitle="singleUser?.user_religion?.name"
                />
              </b-col>
              <b-col lg="4" class="mb-5 showItem">
                <ShowItem :title="$t('USERS.gender')" :subtitle="singleUser?.gender?.name" />
              </b-col>
              <b-col lg="4" class="mb-5 showItem" v-if="singleUser && singleUser.roles">
                <ShowItem :title="$t('USERS.DEPARTMENT')" :listItems="singleUser.roles" />
              </b-col>
              <b-col lg="4" class="mb-5 showItem">
                <ShowItem :title="$t('USERS.ACTIVE')" :subtitle="singleUser?.status?.name" />
              </b-col>
              <b-col lg="12">
                <h3 class="mb-5">روابط التواصل الإجتماعي</h3>
              </b-col>
              <b-col lg="4" class="showItem">
                <ShowItem :title="$t('SOCIAL_MEDIA.FACEBOOK')" :subtitle="singleUser?.facebook" />
              </b-col>
              <b-col lg="4" class="showItem">
                <ShowItem :title="$t('SOCIAL_MEDIA.TWITTER')" :subtitle="singleUser?.twitter" />
              </b-col>
              <b-col lg="4" class="showItem">
                <ShowItem :title="$t('SOCIAL_MEDIA.LINKEDIN')" :subtitle="singleUser?.linkedin" />
              </b-col>
            </b-row>
          </b-col>
          <b-col lg="12">
            <ListItems
              class="px-0"
              :header-name="'قائمة الطلاب'"
              :fieldsList="fieldsList"
              :number-of-item="totalNumber"
              :table-items="singleUser.students"
              :v-search-model="userSearchWord"
              :loading="loading"
              :permission_delete="'delete-enrollment-students-parents-users'"
              :disableIt="true"
              @deleteItem="deleteItem($event)"
              @refetch="getStudentsForParent"
              :is-user-page="true"
              :show-sort-controls="false"
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
import {
  deleteStudentEnrollmentRequest,
  deleteStudentParentEnrollmentRequest,
  getStudentForParentUserRequest
} from "@/api/school-info";
import ListItems from "@/components/ListItems/index.vue";
import Modal from "@/components/Shared/Modal/index.vue";

export default {
  name: "index",
  components: {
    Modal,
    ListItems,
    ShowItem,
  },
  data() {
    return {
      singleUser: {},
      studentForParent:[],
      totalNumber: 0,
      loading: false,
      showModal: false,
      userSearchWord: "",
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
          key: "class.level.name",
          label: this.$i18n.t("schoolAdmin.level"),
        },
        {
          key: "class.name",
          label: this.$i18n.t("schoolAdmin.class"),
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
    };
  },
  methods:{
    getStudentsForParent(){
      this.ApiService(getStudentForParentUserRequest(this.$route.params.id)).then((response)=>{
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
        this.getStudentsForParent();
      });
      this.cancel();
    },
  },
  mounted() {
    // this.ApiService(getUsersSchoolAdminRequest(this.$route.params.id)).then((response) => {
    //   this.singleUser = response.data.data;
    // });
    this.getStudentsForParent()
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
