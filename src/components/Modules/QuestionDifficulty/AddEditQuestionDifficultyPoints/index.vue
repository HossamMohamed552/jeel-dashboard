<template>
  <div class="add-edit-school">
    <div class="container-fluid custom-container">
      <div class="add-edit-school-form">
        <h3>{{ $t("QUESTION_DIFFICULTY_POINTS_EDIT") }}</h3>
        <validation-observer v-slot="{ invalid }" ref="addEditQuestionDifficultyPointsForm">
          <form @submit.prevent="onSubmit" class="mt-5">
            <b-row>
              <b-col lg="5" class="px-0 mb-3">
                <div class="hold-field">
                  <TextField
                    v-model="points.grade_points"
                    :label="$t('GRADE_POINTS')"
                    :name="$t('GRADE_POINTS')"
                    type="number"
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
import {getSingleQuestionDifficltyRequest} from "@/api/question-difficulty";
import Modal from "@/components/Shared/Modal/index.vue";


export default {
  components: {
    TextField,
    Button,
    Modal
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
        grade_points: ""
      },
    };
  },
  methods: {
    onSubmit() {
      this.$refs.addEditQuestionDifficultyPointsForm.validate().then((success) => {
        if (!success) return;
      });

        this.$emit('handleEditQuestionDifficultyPoints', this.points)

    },
    handleCancel() {
      this.$emit("handleCancel");
    },
    getQuestionDifficultyPointsToEdit() {
      if (this.$route.params.id) {
        this.ApiService(getSingleQuestionDifficltyRequest(this.$route.params.id)).then((response) => {
          this.points.grade_points = response.data.data.grade_points
        })
      }
    }
  },
  mounted() {
    this.getQuestionDifficultyPointsToEdit()
  }
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
