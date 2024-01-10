<template>
  <div class="add-edit-school">
    <div class="container-fluid custom-container">
      <div class="add-edit-school-form">
        <h3>{{ $t("QUESTION_DIFFICULTY_POINTS_EDIT") }}</h3>
        <validation-observer
          v-slot="{ invalid }"
          ref="addEditQuestionDifficultyPointsForm"
        >
          <form @submit.prevent="onSubmit" class="mt-2">
            <b-row>
              <b-col lg="4" class="mt-3">
                <div class="hold-field">
                  <TextField
                    v-model="points.name"
                    label="اسم مستوى السؤال"
                    name="اسم مستوى السؤال"
                    placeholder="ادخل اسم مستوى السؤال"
                    :rules="'required'"
                  ></TextField>
                </div>
              </b-col>
              <b-col lg="4" class="mt-3">
                <div class="hold-field">
                  <TextField
                    v-model="points.grade_points"
                    label="عدد النقاط"
                    name="عدد النقاط"
                    placeholder="ادخل عدد النقاط"
                    type="number"
                    min="0"
                    :rules="'required'"
                  ></TextField>
                </div>
              </b-col>
            </b-row>
            <b-row>
              <div class="hold-btns-form">
                <Button @click="handleCancel" custom-class="cancel-btn margin">
                  {{ $t("GLOBAL_CANCEL") }}
                </Button>
                <Button
                  type="submit"
                  :loading="loading"
                  :disabled="invalid"
                  custom-class="submit-btn"
                >
                  {{ $t("GLOBAL_EDIT") }}
                </Button>
              </div>
            </b-row>
          </form>
        </validation-observer>
      </div>
    </div>
  </div>
</template>
<script>
import TextField from "@/components/Shared/TextField/index.vue";
import Button from "@/components/Shared/Button/index.vue";
import { getSingleQuestionDifficltyRequest } from "@/api/question-difficulty";
import Modal from "@/components/Shared/Modal/index.vue";

export default {
  components: {
    TextField,
    Button,
    Modal,
  },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      points: {
        name: '',
        grade_points: "",
      },
    };
  },
  methods: {
    onSubmit() {
      this.$refs.addEditQuestionDifficultyPointsForm
        .validate()
        .then((success) => {
          if (!success) return;
        });

      this.$emit("handleEditQuestionDifficultyPoints", this.points);
    },
    handleCancel() {
      this.$emit("handleCancel");
    },
    getQuestionDifficultyPointsToEdit() {
      if (this.$route.params.id) {
        this.ApiService(
          getSingleQuestionDifficltyRequest(this.$route.params.id)
        ).then((response) => {
          this.points.name = response.data.data.name;
          this.points.grade_points = response.data.data.grade_points;
        });
      }
    },
  },
  mounted() {
    this.getQuestionDifficultyPointsToEdit();
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
