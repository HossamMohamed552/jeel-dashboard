<template>
  <section class="container-fluid custom-container">
    <!------------------ st search box --------------->
    <div class="deep-search">
      <div class="header">
        <h4>{{ $t('BUTTONS.SEARCH') }}</h4>
        <div class="collapse-btn" v-if="visible" @click="visible = !visible">
          <span> - </span>
        </div>
        <div class="collapse-btn" v-else @click="visible = !visible">
          <span> + </span>
        </div>
      </div>
      <div class="search-content" v-if="visible">
        <b-row>
          <b-col cols="4" class="mb-2">
            <TextField
              v-model="searchValues.name"
              :label="$t('power_up_box.name')"
              :name="$t('power_up_box.name')"
              :placeholder="$t('power_up_box.name')"
            ></TextField>
          </b-col>

          <b-col cols="4" class="mb-2">
            <SelectSearch
              v-model="searchValues.level_id"
              :label="$t('power_up_box.level')"
              :name="$t('power_up_box.level')"
              :placeholder="$t('power_up_box.selectLevel')"
              :options="levels"
              :reduce="(option) => option.id"
              :get-option-label="(option) => option.name"
            ></SelectSearch>
          </b-col>
          <b-col cols="4" class="mb-2">
            <SelectSearch
              v-model="searchValues.term_id"
              :label="$t('power_up_box.term')"
              :name="$t('power_up_box.term')"
              :placeholder="$t('power_up_box.selectTerm')"
              :options="terms"
              :reduce="(option) => option.id"
              :get-option-label="(option) => option.name"
            ></SelectSearch>
          </b-col>
          <b-col cols="4" class="mb-2">
            <SelectSearch
              v-model="searchValues.country_id"
              :label="$t('power_up_box.country')"
              :name="$t('power_up_box.country')"
              :placeholder="$t('power_up_box.selectCountry')"
              :options="countries"
              :reduce="(option) => option.id"
              :get-option-label="(option) => option.name"
            ></SelectSearch>
          </b-col>
          <b-col cols="4" class="mb-2">
            <SelectSearch
              v-model="selectedType"
              :label="$t('power_up_box.type')"
              :name="$t('power_up_box.type')"
              :placeholder="$t('power_up_box.selectType')"
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
              {{ $t('BUTTONS.RECOVERY') }}
            </Button>
            <Button
              @click="handleSearch"
              :loading="loading"
              custom-class="submit-btn"
            >
              {{ $t('BUTTONS.SEARCH') }}
            </Button>
          </div>
        </b-row>
      </div>
    </div>
    <!------------------ nd search box --------------->
    <!------------------ st custom table section --------------->
    <ListItems
      :header-name="$t('power_up_box.powerUp')"
      :fieldsList="fieldsList"
      :table-items="powerUpBoxesList"
      :v-search-model="groupSearchWord"
      @detailItem="detailItem($event)"
      :number-of-item="totalNumber"
      @editItem="editItem($event)"
      @deleteItem="deleteItem($event)"
      :loading="loading"
      @refetch="getPowerUpBoxes"
      :permission_delete="'delete-power-up-boxes'"
      :permission_edit="'edit-power-up-boxes'"
      :permission_view="'show-power-up-boxes'"
    >
      <template #buttons>
        <Button
          :custom-class="'btn-add rounded-btn big-padding'"
          @click="goToAddPowerUpBox"
          v-if="user.permissions.includes(`add-power-up-boxes`)"
        >
          <img src="../../src/assets/images/icons/plus.svg"/>
          <span>{{ $t('power_up_box.add') }}</span>
        </Button>
      </template>
    </ListItems>
    <!------------------ nd custom table section --------------->
    <!------------------ st delete model --------------->
    <Modal
      :content-message="$t('power_up_box.delete')"
      :content-message-question="$t('power_up_box.confirm_delete')"
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
import {getPowerUpBoxesRequest, deletePowerUpBoxRequest} from "@/api/power-up-boxes";
import {mapGetters} from "vuex";
import SelectSearch from "@/components/Shared/SelectSearch/index.vue";
import TextField from "@/components/Shared/TextField/index.vue";
import {getAllCountryRequest} from "@/api/country";
import {getAllLevelsRequest} from "@/api/level";
import {getAllTermsRequest} from "@/api/term";

export default {
  name: "index",
  components: {TextField, SelectSearch, ListItems, Button, Modal},
  data() {
    return {
      loading: false,
      showModal: false,
      groupSearchWord: "",
      totalNumber: 0,
      powerUpBoxesList: [],
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
        }, {
          id: 3,
          name: "نقاط وعملات جيل",
        },
      ],
      selectedType: null,

      searchValues: {
        name: "",
        level_id: "",
        term_id: "",
        country_id: "",
        jeel_coins: false,
        jeel_xp: false,
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
              if (item.jeel_coins > 0 && item.jeel_xp > 0) {
                powerUpBoxType = "نقاط وعملات جيل";
              } else if (item.jeel_xp > 0) {
                powerUpBoxType = "نقاط";
              } else if (item.jeel_coins > 0) {
                powerUpBoxType = "عملات جيل";
              }

              return {
                id: item.id,
                name: item.name,
                level: item.level,
                country: item.country,
                term: item.term,
                type: powerUpBoxType,
                appear_after_missions: item.appear_after_missions + " مهام ",
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
    fieldsList() {
      return [
        {
          key: "vid",
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
      ]
    },
    ...mapGetters(["user"]),
  },
  mounted() {
    this.getPowerUpBoxes();
    this.getAllCountries();
    this.getAllLevels();
    this.getAllTerms();
  },
  watch: {
    selectedType: function () {
      this.searchValues.jeel_xp = false;
      this.searchValues.jeel_coins = false;

      if (this.selectedType === 1) {
        this.searchValues.jeel_xp = true;
      } else if (this.selectedType === 2) {
        this.searchValues.jeel_coins = true;
      } else if (this.selectedType === 3) {
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
