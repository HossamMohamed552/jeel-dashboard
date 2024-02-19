<template>
  <section class="container-fluid custom-container">
    <div class="collapse-search">
      <div class="collapse-search__header">
        <h2 class="heading">{{ $t("BUTTONS.SEARCH") }}</h2>
        <button class="collapsed" @click="toggleCollapsed">
          <i :class="collapsed ? 'fas fa-minus' : 'fas fa-plus'"></i>
        </button>
      </div>
      <div :class="collapsed ? '' : 'collapsed'" class="collapse-search__body">
        <div class="hold-fields">
          <b-row>
            <b-col lg="12">
              <validation-observer v-slot="{ invalid }" ref="seasonalMissionSearch">
                <GenericForm
                  :schema="seasonalMissionSchema"
                  @handleCancel="handleCancel"
                  @onSubmit="onSubmit"
                  @handleInput="handleInput"
                  :loading="loading"
                  :submitButton="$t('BUTTONS.SEARCH')"
                  :cancelButton="$t('BUTTONS.RECOVERY')"
                  :invalid="invalid"
                ></GenericForm>
              </validation-observer>
            </b-col>
          </b-row>
        </div>
      </div>
    </div>
    <div class="collapse-search listing">
      <ListItems
        class="seasonal-mission-custom-list-item"
        :header-name="'قائمة المهام الموسمية'"
        :number-of-item="totalNumber"
        :tableItems="seasonalMission"
        :fieldsList="fieldsList"
        :v-search-model="groupSearchWord"
        @detailItem="detailItem($event)"
        @editItem="editItem($event)"
        @deleteItem="deleteItem($event)"
        @refetch="getSeasonalMission"
        :loading="loading"
        :permission_delete="'delete-seasonal-missions'"
        :permission_edit="'edit-seasonal-missions'"
        :permission_view="'show-seasonal-missions'"
      >
        <!-- todo tooo check the permission above and for the button -->
        <template #buttons>
          <Button
            :custom-class="'btn-add rounded-btn big-padding'"
            @click="goToAddSeasonalMission"
            v-if="user.permissions.includes(`add-seasonal-missions`)"
          >
            <!--  -->
            <img src="@/assets/images/icons/plus.svg" alt="seasonal" />
            <span>إضافة مهمة موسمية</span>
          </Button>
        </template>
      </ListItems>
      <Modal
        :content-message="'حذف المجموعة'"
        :content-message-question="'هل انت متأكد من حذف المجموعة '"
        :showModal="showModal"
        @cancel="cancel($event)"
        :is-warning="true"
        @cancelWithConfirm="cancelWithConfirm($event)"
      />
    </div>
  </section>
</template>

<script>
import GenericForm from "@/components/Shared/GenericForm";
import Button from "@/components/Shared/Button/index.vue";
import ListItems from "@/components/ListItems/index.vue";
import { getSeasonalMissionRequest, deleteSeasonalMissionRequest } from "@/api/seasonal-mission.js";
import Modal from "@/components/Shared/Modal/index.vue";
import { mapGetters } from "vuex";
import _ from "lodash";
import {
  getAllSeasonalMissionGroups,
  getALLCountries,
  getAllLevels,
} from "@/services/dropdownService";

export default {
  components: { Modal, ListItems, Button, GenericForm },
  data() {
    return {
      loading: false,
      showModal: false,
      collapsed: true,
      groupSearchWord: "",
      seasonalMission: [],
      totalNumber: null,
      fieldsList: [
        { key: "id", label: "التسلسل" },
        { key: "logo", label: "اسم الموسم" },
        { key: "name", label: "اسم المجموعة" },
        { key: "grade", label: "الصف الدراسي" },
        { key: "date", label: "تاريخ البداية" },
        { key: "actions", label: "الإجراء" },
      ],
      seasonalMissionSchema: [
        {
          key: "name",
          label: "اسم المهمة",
          col: "4",
          listen: "id",
          value: "",
          type: "text",
          rules: "",
          placeholder: "إدخل اسم المهمة",
        },
        {
          key: "seasonal_mission_group_id",
          label: "اسم المجموعة",
          col: "4",
          listen: "id",
          type: "select",
          optionValue: "name",
          options: [],
          deselectFromDropdown: true,
          value: "",
          rules: "",
          placeholder: "إختار اسم المجموعة",
        },
        {
          key: "country_id",
          col: "4",
          listen: "id",
          type: "select",
          optionValue: "name",
          label: "الدولة",
          options: [],
          deselectFromDropdown: true,
          value: "",
          rules: "",
        },
        {
          key: "level_id",
          col: "4",
          listen: "id",
          type: "select",
          optionValue: "name",
          label: "الصف الدراسي",
          options: [],
          deselectFromDropdown: true,
          value: "",
          rules: "",
        },
      ],
    };
  },
  methods: {
    handleCancel() {
      this.seasonalMissionSchema.map((field) => (field.value = ""));
      this.getSeasonalMission();
    },
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },
    onSubmit(values) {
      this.loading = true;
      this.getSeasonalMission(values);
    },
    handleInput: _.debounce(function (key, value) {
      console.log(key, value);
    }, 300),
    goToAddSeasonalMission() {
      this.$router.push("/dashboard/seasonal-mission/add");
    },
    getSeasonalMission(event) {
      this.loading = true;
      const params = event;
      this.ApiService(getSeasonalMissionRequest(params))
        .then((response) => {
          this.seasonalMission = response.data.data;
          this.totalNumber = response.data.meta.total;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    detailItem($event) {
      this.$router.push(`/dashboard/seasonal-mission/show/${$event}`);
    },
    editItem($event) {
      this.$router.push(`/dashboard/seasonal-mission/edit/${$event}`);
    },
    deleteItem($event) {
      this.itemId = $event;
      this.showModal = true;
    },
    cancel($event) {
      this.showModal = $event;
    },
    cancelWithConfirm() {
      this.ApiService(deleteSeasonalMissionRequest(this.itemId)).then(() => {
        this.getSeasonalMission();
      });
      this.cancel();
    },
  },
  computed: {
    ...mapGetters(["user"]),
  },
  mounted() {
    this.getSeasonalMission();
    getAllSeasonalMissionGroups(this.seasonalMissionSchema, "seasonal_mission_group_id");
    getALLCountries(this.seasonalMissionSchema, "country_id");
    getAllLevels(this.seasonalMissionSchema, "level_id");
  },
};
</script>

<style scoped lang="scss">
@import "./index";
</style>
