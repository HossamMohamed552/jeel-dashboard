<template>
  <div class="add-edit-school">
    <Modal
      :content-message="'تم التعديل بنجاح'"
      :showModal="showModal"
      :is-success="true"
    />
    <div class="container-fluid custom-container">
      <div class="add-edit-school-form">
        <h3>نقاط المستوى</h3>
        <validation-observer
          v-slot="{ invalid }"
          ref="addEditQuestionDifficultyPointsForm"
        >
          <form @submit.prevent="onSubmit" class="mt-2">
            <b-row>
              <b-col lg="4" class="mt-3">
                <div class="hold-field">
                  <TextField
                    v-model="xp"
                    label="عدد نقاط المستوى"
                    name="عدد نقاط المستوى"
                    placeholder="ادخل عدد نقاط المستوى"
                    type="number"
                    min="0"
                    :rules="'required'"
                    :disabled="!edit"
                  ></TextField>
                </div>
              </b-col>
              <b-col v-if="!edit" lg="4" class="hold-btns-form-xp">
                <div>
                  <Button custom-class="submit-btn" @click="edit = true">
                    {{ $t("GLOBAL_EDIT") }}
                  </Button>
                </div>
              </b-col>
              <b-col v-else lg="4" class="hold-btns-form-xp">
                <div>
                  <Button
                    @click="handleCancel"
                    custom-class="cancel-btn margin"
                  >
                    {{ $t("GLOBAL_CANCEL") }}
                  </Button>
                  <Button
                    type="submit"
                    :loading="loading"
                    :disabled="invalid"
                    custom-class="submit-btn"
                  >
                    {{ $t("GLOBAL_SAVE") }}
                  </Button>
                </div>
              </b-col>
            </b-row>
          </form>
        </validation-observer>
      </div>
    </div>
  </div>
</template>

<script>
import { getLevelXPRequest, putLevelXPRequest } from "@/api/system-settings.js";
import Modal from "@/components/Shared/Modal/index.vue";
import TextField from "@/components/Shared/TextField/index.vue";
import Button from "@/components/Shared/Button/index.vue";

export default {
  components: {
    TextField,
    Button,
    Modal,
  },
  data() {
    return {
      loading: false,
      xpItem: {},
      xp: 0,
      edit: false,
      showModal: false,
    };
  },
  mounted() {
    this.getLevels();
  },
  methods: {
    getLevels() {
      this.loading = true;
      this.ApiService(getLevelXPRequest())
        .then((response) => {
          if (response.data) {
            this.xpItem = response.data.data[0];
            this.xp = this.xpItem.xp;
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    onSubmit() {
      this.loading = true;
      this.ApiService(putLevelXPRequest(this.xpItem.id, { xp: this.xp }))
        .then((response) => {
          this.showModal = true;
          this.edit = false
          this.getLevels();
          setTimeout(() => {
            this.showModal = false;
          }, 3000);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleCancel() {
      this.getLevels();
      this.edit = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
