<template>
  <b-modal
    v-model="innerModal"
    class="custom-rounded"
    @hide="cancel()"
    size="lg"
    centered
    hide-header
    hide-footer
  >
    <div class="modal-header">
      <h4>تفاصيل السؤال</h4>
      <button type="button" class="close" @click="cancel()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <b-tabs content-class="mt-3">
        <b-tab title="معلومات السؤال" active>
          <b-row>
            <b-col lg="4">
              <ShowItem title="نمط السؤال" :subtitle="cloneQuestion?.question_type?.name" />
            </b-col>
            <b-col lg="4">
              <ShowItem
                title="نمط السؤال الفرعى"
                :subtitle="cloneQuestion?.sub_question_type?.name"
              />
            </b-col>
            <b-col lg="4">
              <ShowItem title="هدف السؤال" :subtitle="cloneQuestion?.sub_question_type?.name" />
            </b-col>
            <b-col lg="4">
              <ShowItem title="المسار" :subtitle="cloneQuestion?.sub_question_type?.name" />
            </b-col>
            <b-col lg="4">
              <ShowItem title="مخرجات التعلم" :subtitle="cloneQuestion?.sub_question_type?.name" />
            </b-col>
            <b-col lg="4">
              <ShowItem
                title="نوع المهارة اللغوية"
                :subtitle="cloneQuestion?.sub_question_type?.name"
              />
            </b-col>
            <b-col lg="4">
              <ShowItem title="المستوى" :subtitle="cloneQuestion?.sub_question_type?.name" />
            </b-col>
            <b-col lg="4">
              <ShowItem title="بلوم" :subtitle="cloneQuestion?.sub_question_type?.name" />
            </b-col>
            <b-col lg="4">
              <ShowItem title="اسلوب التعلم" :subtitle="cloneQuestion?.sub_question_type?.name" />
            </b-col>
          </b-row>
        </b-tab>
        <b-tab title="مراجعة السؤال"> </b-tab>
      </b-tabs>
    </div>
  </b-modal>
</template>

<script>
export default {
  data() {
    return {
      innerModal: false,
    };
  },
  methods: {
    cancel() {
      this.$emit("cancel", false);
    },
  },
  watch: {
    showModal(newVal) {
      this.innerModal = newVal;
    },
  },
};
</script>

<style lang="scss" scoped></style>
