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
        :header-name="'قائمة الاصوات'"
        :showSortControls="false"
        :number-of-item="totalNumber"
        :tableItems="systemAudiosList"
        :fieldsList="fieldsList"
        :v-search-model="groupSearchWord"
        @detailItem="detailItem($event)"
        @editItem="editItem($event)"
        @deleteItem="deleteItem($event)"
        @refetch="getSystemAudios"
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
import { getSystemAudiosRequest } from "@/api/system-audios";
import { getSystemAudiosCategories } from "@/services/dropdownService";

export default {
  components: { ListItems, GenericForm, Button },
  data() {
    return {
      loading: false,
      collapsed: true,
      groupSearchWord: "",
      questionsList: [],
      systemAudiosList: [],
      totalNumber: 3,
      searchSchema: [
        {
          key: "category_id",
          label: "التصنيف",
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
          col: "6",
          listen: "id",
          value: "",
          type: "text",
          rules: "",
        },
      ],
      fieldsList: [
        { key: "id", label: "التسلسل" },
        { key: "category.name", label: "التصنيف" },
        { key: "name.ar", label: "الاسم بالعربية" },
        { key: "name.en", label: "الاسم بالانجليزية" },
        { key: "audio_ar", label: "الصوت بالعربية" },
        { key: "audio_en", label: "الصوت بالانجليزية" },
        { key: "actions", label: "الإجراء" },
      ],
    };
  },
  methods: {
    getSystemAudios(event) {
      this.loading = true;
      const params = event;
      this.ApiService(getSystemAudiosRequest(params))
        .then((response) => {
          this.systemAudiosList = response.data.data;
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
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },
    onSubmit(values) {
      this.getSystemAudios(values);
    },
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
