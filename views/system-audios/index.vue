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
              <validation-observer v-slot="{ invalid }" ref="schoolsUsersSearch">
                <GenericForm
                  :schema="searchSchema"
                  @onSubmit="onSubmit"
                  @handleCancel="handleCancel"
                  :loading="loading"
                  :IsAudio="true"
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
        :header-name="$t('systemAudio.systemAudio')"
        :showSortControls="false"
        :number-of-item="totalNumber"
        :tableItems="systemAudiosList"
        :fieldsList="fieldsList"
        :v-search-model="groupSearchWord"
        :showSearchInput="false"
        @detailItem="detailItem($event)"
        @editItem="editItem($event)"
        @refetch="getSystemAudios($event)"
        :loading="loading"
        :permission_edit="'edit-system-audio'"
        :permission_view="'show-system-audio'"
      />
    </div>
  </section>
</template>

<script>
import ListItems from "@/components/ListItems/index.vue";
import Button from "@/components/Shared/Button/index.vue";
import GenericForm from "@/components/Shared/GenericForm";
import {getSystemAudiosRequest} from "@/api/system-audios";
import {getSystemAudiosCategories} from "@/services/dropdownService";

export default {
  components: {ListItems, GenericForm, Button},
  data() {
    return {
      loading: false,
      collapsed: true,
      groupSearchWord: "",
      questionsList: [],
      systemAudiosList: [],
      totalNumber: null,
      searchSchema: [
        {
          key: "category_id",
          label: "التصنيف",
          labelEn: "category",
          col: "6",
          listen: "id",
          type: "select",
          optionValue: "name",
          options: [],
          deselectFromDropdown: true,
          value: "",
          rules: "",
        },
        {
          key: "name",
          label: "الاسم",
          labelEn: "name",
          col: "6",
          listen: "id",
          value: "",
          type: "text",
          rules: "",
        },
      ],
      searchWithPagination:{}
    };
  },
  methods: {
    getSystemAudios($event) {
      this.loading = true;
      const params = {...$event, ...this.searchWithPagination};
      this.ApiService(getSystemAudiosRequest(params))
        .then((response) => {
          this.systemAudiosList = response.data.data;
          this.totalNumber = response.data.meta.total
        })
        .finally(() => {
          this.loading = false;
        });
    },
    detailItem($event) {
      this.$router.push({
        name: "show-system-audios",
        params: {
          id: $event,
        },
      });
    },
    editItem($event) {
      this.$router.push({
        name: "edit-system-audios",
        params: {
          id: $event,
        },
      });
    },
    handleCancel() {
      this.searchSchema.map((field) => (field.value = ""));
      this.searchWithPagination = {}
      this.getSystemAudios();
    },
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },
    onSubmit(values) {
      this.searchWithPagination = values;
      this.getSystemAudios();
    },
  },
  computed: {
    fieldsList() {
      return [
        {key: "vid", label: this.$i18n.t('TABLE_FIELDS.id')},
        {key: "category.name", label: this.$i18n.t('systemAudio.category')},
        {key: "name.ar", label: this.$i18n.t('systemAudio.arName')},
        {key: "name.en", label: this.$i18n.t('systemAudio.enName')},
        {key: "audio_ar", label: this.$i18n.t('systemAudio.arAudio')},
        {key: "audio_en", label: this.$i18n.t('systemAudio.enAudio')},
        {key: "actions", label: this.$i18n.t('TABLE_FIELDS.actions')},
      ]
    }
  },
  mounted() {
    this.getSystemAudios();
    getSystemAudiosCategories(this.searchSchema, "category_id");
  },
};
</script>

<style scoped lang="scss">
@import "./index";
</style>
