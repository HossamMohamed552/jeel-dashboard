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
              :label="'اسم الشخصية'"
              :name="'اسم الشخصية'"
              placeholder="أختر إسم الشخصية"
            ></TextField>
          </b-col>

          <b-col cols="4" class="mt-3">
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
          <b-col cols="4" class="mt-3">
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
              v-model="characterSelected"
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
    <ListItems
      :header-name="'قائمة شخصيات الشراء'"
      :fieldsList="fieldsList"
      :table-items="charactersList"
      :v-search-model="groupSearchWord"
      @detailItem="detailItem($event)"
      :number-of-item="totalNumber"
      @editItem="editItem($event)"
      @deleteItem="deleteItem($event)"
      :loading="loading"
      :showSearchInput="false"
      @refetch="getcharacters"
      :permission_delete="'delete-characters'"
      :permission_edit="'edit-characters'"
      :permission_view="'show-characters'"
    >
      <template #buttons>
        <Button
          :custom-class="'btn-add rounded-btn big-padding'"
          @click="goToAddCharacter"
          v-if="user.permissions.includes(`add-characters`)"
        >
          <img src="../../src/assets/images/icons/plus.svg" />
          <span>إضافة شخصية جديدة </span>
        </Button>
      </template>
    </ListItems>
    <Modal
      :content-message="'حذف الشخصية'"
      :content-message-question="'هل انت متأكد من حذف الشخصية'"
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
import Modal from "@/components/Shared/Modal/index.vue";
import { getCharactersRequest, deleteCharacterRequest } from "@/api/jeel-store-character";
import {getStoreCharacterTypeRequest} from "@/api/system";
import { mapGetters } from "vuex";
import SelectSearch from "@/components/Shared/SelectSearch/index.vue";
import TextField from "@/components/Shared/TextField/index.vue";
import {getAllCountryRequest} from "@/api/country";
import {getAllLevelsRequest} from "@/api/level";

export default {
  name: "index",
  components: {TextField, SelectSearch, ListItems, Button, Modal },
  data() {
    return {

      /*********** st search box variables ******************/
      countries: [],
      levels: [],
      terms: [],
      types: [],
      characterSelected: null,
      searchValues: {
        name: "",
        level_id: "",
        term_id: "",
        country_id: "",
        character_type: [],
      },
      visible: false,
      /*********** nd search box variables ******************/
      loading: false,
      showModal: false,
      groupSearchWord: "",
      totalNumber: 0,
      charactersList: [],
      fieldsList: [
        {
          key: "id",
          label: this.$i18n.t("TABLE_FIELDS.id"),
        },
        {
          key: "name",
          label: this.$i18n.t("TABLE_FIELDS.character_name"),
        },
        {
          key: "level",
          label: this.$i18n.t("TABLE_FIELDS.term"),
        },
        {
          key: "country",
          label: this.$i18n.t("TABLE_FIELDS.countryName"),
        },
        {
          key: "gems",
          label: this.$i18n.t("TABLE_FIELDS.gems_num"),
        },
        {
          key: "actions",
          label: this.$i18n.t("TABLE_FIELDS.actions"),
        },
      ],
      itemId: 0,
    };
  },
  methods: {
    goToAddCharacter() {
      this.$router.push("/dashboard/jeel-store-character/add");
    },
    getcharacters(event) {
      this.loading = true;
      const params = event;
      this.ApiService(getCharactersRequest(params))
        .then((response) => {
          this.charactersList = response.data.data;
          this.totalNumber = response.data.meta.total;
        })
        .finally(() => {
          this.loading = false;
        });
    },

    detailItem($event) {
      this.$router.push(`/dashboard/jeel-store-character/show/${$event}`);
    },
    editItem($event) {
      this.$router.push(`/dashboard/jeel-store-character/edit/${$event}`);
    },
    deleteItem($event) {
      this.itemId = $event;
      this.showModal = true;
    },
    cancel($event) {
      this.showModal = $event;
    },
    cancelWithConfirm() {
      this.ApiService(deleteCharacterRequest(this.itemId)).then(() => {
        this.getcharacters();
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
    getCharcterType() {
      this.ApiService(getStoreCharacterTypeRequest()).then((response) => {
        this.types = response.data.data;
      });
    },
    handleSearch() {
      const searchValues = this.searchValues;
      this.getcharacters(searchValues);
    },
    handleResetSearch() {
      this.searchValues = {
        name: "",
        level_id: "",
        country_id: "",
        type_id: "",
      };
      const searchValues = this.searchValues;
      this.getcharacters(searchValues);
    },
    /*********** nd search box variables ******************/


  },
  computed: {
    ...mapGetters(["user"]),
  },
  watch: {
    characterSelected(val) {
      this.searchValues.character_type = []
      if(isNaN(val)){
        this.searchValues.character_type.push(val[0].id)
      }else{
        this.searchValues.character_type.push(val)
      }
    },
  },
  mounted() {
    this.getcharacters();
    this.getAllCountries();
    this.getCharcterType();
    this.getAllLevels();
  },
};
</script>
<style scoped lang="scss">
@import "index";
</style>
