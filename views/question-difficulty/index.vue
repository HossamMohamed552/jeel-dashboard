<template>
  <section class="container-fluid custom-container">
    <ListItems
      :header-name="$t('questionDifficulty.list')"
      :number-of-item="totalNumber"
      :tableItems="questionDifficultyList"
      :fieldsList="fieldsList"
      :v-search-model="groupSearchWord"
      @detailItem="detailItem($event)"
      @editItem="editItem($event)"
      @deleteItem="deleteItem($event)"
      @refetch="getQuestionDifficulty"
      :loading="loading"
      :permission_edit="'edit-questionDifficulty'"
      :permission_view="'show-questionDifficulty'"
      :showSortControls="false"
    />
  </section>
</template>

<script>
import ListItems from "@/components/ListItems/index.vue";
import { getQuestionDifficultyRequest } from "@/api/question-difficulty";

export default {
  components: { ListItems },
  data() {
    return {
      loading: false,
      groupSearchWord: "",
      questionsList: [],
      questionDifficultyList: [],
      totalNumber: 3,
    };
  },
  methods: {
    getQuestionDifficulty(event) {
      this.loading = true;
      const params = event;
      this.ApiService(getQuestionDifficultyRequest(params))
        .then((response) => {
          this.questionDifficultyList = response.data.data;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    detailItem($event) {
      this.$router.push(`/dashboard/question-difficulty/show/${$event}`);
    },
    editItem($event) {
      this.$router.push(`/dashboard/question-difficulty/edit/${$event}`);
    },
  },
  computed:{
    fieldsList(){
      return  [
        { key: "vid", label: this.$i18n.t('TABLE_FIELDS.id') },
        { key: "name", label: this.$i18n.t('questionDifficulty.name') },
        { key: "grade_points", label: this.$i18n.t('questionDifficulty.grade_points') },
        { key: "actions", label: this.$i18n.t('TABLE_FIELDS.actions') },
      ]
    }
  },
  mounted() {
    this.getQuestionDifficulty();
  },
};
</script>

<style scoped lang="scss">
@import "./index";
</style>
