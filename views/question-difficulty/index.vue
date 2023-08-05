<template>
  <section class="container-fluid custom-container">
    <ListItems
      :header-name="'قائمة صعوبة السؤال'"
      :number-of-item="totalNumber"
      :tableItems="questionDifficultyList"
      :fieldsList="fieldsList"
      :v-search-model="groupSearchWord"
      @detailItem="detailItem($event)"
      @editItem="editItem($event)"
      @deleteItem="deleteItem($event)"
      @refetch="getQuestionDifficulty"
      :loading="loading"
      :is-delete="false"
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
      fieldsList: [
        { key: "id", label: "التسلسل" },
        { key: "name", label: "اسم الصعوبة" },
        { key: "slug", label: "الرمز" },
        { key: "grade_points", label: "النقاط" },
        { key: "actions", label: "الإجراء" },
      ],
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
  mounted() {
    this.getQuestionDifficulty();
  },
};
</script>

<style scoped lang="scss">
@import "./index";
</style>
