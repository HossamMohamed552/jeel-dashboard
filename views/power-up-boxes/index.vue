<template>
  <section class="container-fluid custom-container">
    <!------------------ st search box --------------->
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
              <TextField
                  v-model="searchValues.name"
                  :label="'اسم الصندوق'"
                  :name="'اسم الصندوق'"
                  placeholder="أختر إسم المهمة"
              ></TextField>
          </b-col>

          <b-col cols="4">
            <div style="display: block;margin-top: 13px"></div>
            <SelectSearch
                v-model="searchValues.level_id"
                :label="'الصف الدراسى'"
                :name="'أختر الصف الدراسى'"
                placeholder="أختر الصف الدراسى"
                :options="levels"
                :reduce="(option) => option.id"
                :get-option-label="(option) => option.name"
            ></SelectSearch>
          </b-col>
          <b-col cols="4">

            <div style="display: block;margin-top: 13px"></div>
            <SelectSearch
                v-model="searchValues.term_id"
                :label="'الترم الدراسى'"
                :name="'أختر التيرم الدراسى'"
                placeholder="أختر الترم الدراسى"
                :options="terms"
                :reduce="(option) => option.id"
                :get-option-label="(option) => option.name"
            ></SelectSearch>
          </b-col>
          <b-col cols="4">
            <SelectSearch
                v-model="searchValues.country_id"
                label="الدولة"
                name="الدولة"
                placeholder="أختر الدولة"
                :options="countries"
                :reduce="(option) => option.id"
                :get-option-label="(option) => option.name"
            ></SelectSearch>
          </b-col>
          <b-col cols="4">
            <SelectSearch
                v-model="selectedType"
                label="النوع"
                name="النوع"
                placeholder="أختر النوع"
                :options="types"
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
    <!------------------ nd search box --------------->
    <!------------------ st custom table section --------------->
    <ListItems
      :header-name="'صناديق الطاقه'"
      :fieldsList="fieldsList"
      :table-items="powerUpBoxesList"
      :v-search-model="groupSearchWord"
      @detailItem="detailItem($event)"
      :number-of-item="totalNumber"
      @editItem="editItem($event)"
      @deleteItem="deleteItem($event)"
      :loading="loading"
      @refetch="getPowerUpBoxes"
      :permission_delete="'delete-badge'"
      :permission_edit="'edit-badge'"
      :permission_view="'show-badge'"
    >
      <template #buttons>
        <Button
          :custom-class="'btn-add rounded-btn big-padding'"
          @click="goToAddPowerUpBox"
          v-if="user.permissions.includes(`add-characters`)"
        >
          <img src="../../src/assets/images/icons/plus.svg" />
          <span>إضافة صندوق </span>
        </Button>
      </template>
    </ListItems>
    <!------------------ nd custom table section --------------->
    <!------------------ st delete model --------------->
    <Modal
      :content-message="'حذف صندوق الطاقة'"
      :content-message-question="'هل انت متأكد من حذف صندوق الطاقة'"
      :showModal="showModal"
      @cancel="cancel($event)"
      :is-warning="true"
      @cancelWithConfirm="cancelWithConfirm($event)"
    />
    <!------------------ st delete model --------------->
  </section>
</template>
<script>
import Button from "@/components/Shared/Button/index.vue";
import ListItems from "@/components/ListItems/index.vue";
import Modal from "@/components/Shared/Modal/index.vue";
import { getPowerUpBoxesRequest, deletePowerUpBoxRequest } from "@/api/power-up-boxes";
import { mapGetters } from "vuex";
import SelectSearch from "@/components/Shared/SelectSearch/index.vue";
import TextField from "@/components/Shared/TextField/index.vue";
import {getAllCountryRequest} from "@/api/country";
import {getAllLevelsRequest} from "@/api/level";
import {getAllTermsRequest} from "@/api/term";

export default {
  name: "index",
  components: {TextField, SelectSearch, ListItems, Button, Modal },
  data() {
    return {
      loading: false,
      showModal: false,
      groupSearchWord: "",
      totalNumber: 0,
      powerUpBoxesList: [],
      fieldsList: [
        {
          key: "id",
          label: this.$i18n.t("TABLE_FIELDS.id"),
        },
        {
          key: "name",
          label: this.$i18n.t("TABLE_FIELDS.power_up_box_name"),
        },
        {
          key: "level",
          label: this.$i18n.t("TABLE_FIELDS.power_up_box_level"),
        },
        {
          key: "country",
          label: this.$i18n.t("TABLE_FIELDS.power_up_box_country"),
        },
        {
          key: "type",
          label: this.$i18n.t("TABLE_FIELDS.power_up_box_type"),
        },
        {
          key: "appear_after_missions",
          label: this.$i18n.t("TABLE_FIELDS.power_up_box_appear_after_missions"),
        },
        {
          key: "actions",
          label: this.$i18n.t("TABLE_FIELDS.actions"),
        },
      ],
      itemId: 0,

      /*********** st search box variables ******************/
      countries: [],
      levels: [],
      terms: [],
      types: [
        {
          id: 1,
          name: "نقاط",
        },
        {
          id: 2,
          name: "عملات جيل ",
        },{
          id: 3,
          name: "نقاط وعملات جيل",
        },
      ],
      selectedType:null,

      searchValues: {
        name: "",
        level_id: "",
        term_id: "",
        country_id: "",
        jeel_coins:false,
        jeel_xp:false,
      },
      visible: false,
      /*********** nd search box variables ******************/
    };
  },
  methods: {
    getPowerUpBoxes(event) {
      this.loading = true;
      const params = event;
      this.ApiService(getPowerUpBoxesRequest(params))
          .then((response) => {
            // this.powerUpBoxesList = response.data.data;
            this.powerUpBoxesList = response.data.data.map(
                (item) => {
                  let powerUpBoxType = "";
                  if (item.jeel_coins > 0 && item.jeel_xp > 0 ){
                    powerUpBoxType = "نقاط وعملات جيل";
                  }
                  else if (item.jeel_xp > 0 ){powerUpBoxType = "نقاط";}
                  else if (item.jeel_coins >0){ powerUpBoxType = "عملات جيل";}

                  return {
                    id: item.id,
                    name: item.name,
                    level: item.level,
                    country: item.country,
                    term: item.term,
                    type: powerUpBoxType,
                    appear_after_missions: item.appear_after_missions+" مهام ",
                  };

                }
            );

            this.totalNumber = response.data.meta.total;
          })
          .finally(() => {
            this.loading = false;
          });
    },

    goToAddPowerUpBox() {
      this.$router.push("/dashboard/power-up-boxes/add");
    },
    detailItem($event) {
      this.$router.push(`/dashboard/power-up-boxes/show/${$event}`);
    },
    editItem($event) {
      this.$router.push(`/dashboard/power-up-boxes/edit/${$event}`);
    },

    deleteItem($event) {
      this.itemId = $event;
      this.showModal = true;
    },
    cancel($event) {
      this.showModal = $event;
    },
    cancelWithConfirm() {
      this.ApiService(deletePowerUpBoxRequest(this.itemId)).then(() => {
        this.getPowerUpBoxes();
      });
      this.cancel();
    },

    /*********** st search box variables ******************/
    getAllCountries() {
      this.ApiService(getAllCountryRequest()).then((response) => {
        this.countries = response.data.data;
      });
    },
    getAllLevels() {
      this.ApiService(getAllLevelsRequest()).then((response) => {
        this.levels = response.data.data;
      });
    },
    getAllTerms() {
      this.ApiService(getAllTermsRequest()).then((response) => {
        this.terms = response.data.data;
      });
    },
    handleSearch() {
      const searchValues = this.searchValues;
      this.getPowerUpBoxes(searchValues);
    },
    handleResetSearch() {
      this.searchValues = {
        name: "",
        level_id: "",
        term_id: "",
        country_id: "",
        type_id: "",
      };
      const searchValues = this.searchValues;
      this.getPowerUpBoxes(searchValues);
    },
    /*********** nd search box variables ******************/
  },
  computed: {
    ...mapGetters(["user"]),
  },
  mounted() {
    this.getPowerUpBoxes();
    this.getAllCountries();
    this.getAllLevels();
    this.getAllTerms();
  },
  watch:{
    selectedType:function()
    {
      this.searchValues.jeel_xp = false;
      this.searchValues.jeel_coins = false;

      if (this.selectedType === 1)
      {
        this.searchValues.jeel_xp = true;
      }
      else if (this.selectedType === 2){
        this.searchValues.jeel_coins = true;
      }
      else if (this.selectedType === 3){
        this.searchValues.jeel_xp = true;
        this.searchValues.jeel_coins = true;
      }
    },
  },
};
</script>
<style scoped lang="scss">
@import "index";
</style>
