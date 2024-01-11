<template>
  <section class="container-fluid custom-container">
    <div class="deep-search">
      <div class="header">
        <h4>البحث</h4>
        <div class="collapse-btn" v-if="visible" @click="visible = !visible">
          <span> - </span>
        </div>
        <div class="collapse-btn" v-else @click="visible = !visible">
          <span> + </span>
        </div>
      </div>
      <div class="search-content" v-if="visible">
        <b-row>
          <b-col cols="4">
            <SelectSearch
              v-model="searchValues.school_group_id"
              :label="$t('TABLE_FIELDS.school_group')"
              :name="$t('TABLE_FIELDS.school_group')"
              placeholder="أختر إسم المجموعة"
              :options="schoolGroupOptions"
              :reduce="(option) => option.id"
              :get-option-label="(option) => option.name"
            ></SelectSearch>
          </b-col>
          <b-col cols="4">
            <SelectSearch
              v-model="searchValues.school_id"
              :label="$t('TABLE_FIELDS.school')"
              :name="$t('TABLE_FIELDS.school')"
              placeholder="أختر المدرسة"
              :options="schoolsOptions"
              :reduce="(option) => option.id"
              :get-option-label="(option) => option.name"
            ></SelectSearch>
          </b-col>
          <b-col cols="4">
            <SelectSearch
              v-model="searchValues.study_year_id"
              label="العام الدراسي"
              name="العام الدراسي"
              placeholder="أختر العام الدراسي"
              :options="schoolYearsOptions"
              :reduce="(option) => option.id"
              :get-option-label="(option) => option.name"
            ></SelectSearch>
          </b-col>
        </b-row>
        <b-row>
          <div class="actions">
            <Button
              @click="handleResetSearch"
              custom-class="cancel-btn margin"
              :loading="loading"
            >
              إستعادة
            </Button>
            <Button
              @click="handleSearch"
              :loading="loading"
              custom-class="submit-btn"
            >
              بحث
            </Button>
          </div>
        </b-row>
      </div>
    </div>
    <ListItems
      :header-name="'قائمة الإشتراكات'"
      :fieldsList="fieldsList"
      :number-of-item="totalNumber"
      :table-items="subscriptionsList"
      @detailItem="detailItem($event)"
      @editItem="editItem($event)"
      @deleteItem="deleteItem($event)"
      @refetch="getSubscriptions"
      :loading="loading"
      :permission_delete="'delete-subscription'"
      :permission_edit="'edit-subscription'"
      :permission_view="'show-subscription'"
      :showSortControls="false"
    >
      <template #buttons>
        <Button
          :custom-class="'btn-add rounded-btn big-padding'"
          @click="goToAddSubscription"
          v-if="user.permissions.includes(`add-subscription`)"
        >
          <img src="@/assets/images/icons/plus.svg" />
          <span>تسجيل إشتراك</span>
        </Button>
      </template>
    </ListItems>
    <Modal
      :content-message="'حذف الإشتراك'"
      :content-message-question="'هل انت متأكد من حذف الإشتراك'"
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
import { deleteSubscriptionsRequest, getSubscriptionsRequest } from "@/api/subscription.js";
import Modal from "@/components/Shared/Modal/index.vue";
import { mapGetters } from "vuex";
import SelectSearch from "@/components/Shared/SelectSearch/index.vue";
import { getAllSchoolGroupRequest } from "@/api/schoolGroup";
import { getSchoolsRequest } from "@/api/school";
import { getSchoolYearRequest } from "@/api/school-year";

export default {
  components: { Modal, ListItems, Button, SelectSearch },
  computed: {
    ...mapGetters(["user"]),
  },
  data() {
    return {
      loading: false,
      showModal: false,
      subscriptionsList: [],
      totalNumber: 0,
      fieldsList: [
        {
          key: "id",
          label: this.$i18n.t("TABLE_FIELDS.id"),
        },
        {
          key: "country.name",
          label: "الدولة",
        },
        {
          key: "school.name",
          label: "اسم المدرسة",
        },
        {
          key: "study_year.name",
          label: "العام الدراسي",
        },
        {
          key: "start_subscription",
          label: "تاريخ بداية الإشتراك",
        },
        {
          key: "actions",
          label: this.$i18n.t("TABLE_FIELDS.actions"),
        },
      ],
      itemId: 0,
      schoolGroupOptions: [],
      schoolsOptions: [],
      schoolYearsOptions: [],
      searchValues: {
        school_group_id: "",
        school_id: "",
        study_year_id: "",
      },
      visible: false,
    };
  },
  methods: {
    goToAddSubscription() {
      this.$router.push("/dashboard/subscription/add");
    },
    getSubscriptions(event) {
      this.loading = true;
      this.ApiService(getSubscriptionsRequest(event))
        .then((response) => {
          this.subscriptionsList = response.data.data;
          this.totalNumber = response.data.meta.total;
        })
        .finally(() => {
          this.loading = false;
        });
    },

    detailItem($event) {
      this.$router.push(`/dashboard/subscription/show/${$event}`);
    },
    editItem($event) {
      this.$router.push(`/dashboard/subscription/edit/${$event}`);
    },
    deleteItem($event) {
      this.itemId = $event;
      this.showModal = true;
    },
    cancel($event) {
      this.showModal = $event;
    },
    cancelWithConfirm() {
      this.ApiService(deleteSubscriptionsRequest(this.itemId)).then(() => {
        this.getSubscriptions();
      });
      this.cancel();
    },
    getSchoolGroups() {
      this.ApiService(getAllSchoolGroupRequest()).then((response) => {
        this.schoolGroupOptions = response.data.data;
      });
    },
    getSchools() {
      this.ApiService(getSchoolsRequest()).then((response) => {
        this.schoolsOptions = response.data.data;
      });
    },
    getSchoolYears() {
      this.ApiService(getSchoolYearRequest()).then((response) => {
        this.schoolYearsOptions = response.data.data;
      });
    },
    handleSearch() {
      const searchValues = this.searchValues;
      this.getSubscriptions(searchValues);
    },
    handleResetSearch() {
      this.searchValues = {
        school_group_id: "",
        school_id: "",
        study_year_id: "",
      };
      const searchValues = this.searchValues;
      this.getSubscriptions(searchValues);
    },
  },
  mounted() {
    this.getSubscriptions();
    this.getSchoolGroups();
    this.getSchools();
    this.getSchoolYears();
  },
};
</script>

<style scoped lang="scss">
@import "./index";
</style>
