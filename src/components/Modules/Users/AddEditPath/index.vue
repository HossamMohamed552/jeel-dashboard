<template>
  <div class="add-edit-school">
    <div class="container-fluid custom-container">
      <div class="add-edit-school-form">
        <h3>{{ $route.params.id ? $t("PATH.EDIT") : $t("PATH.ADD_NEW") }}</h3>
        <validation-observer v-slot="{ invalid }" ref="addEditPathForm">
          <form @submit.prevent="onSubmit" class="mt-5">
            <b-row>
              <b-col lg="12" class="mb-3">
                <div class="hold-field">
                  <TextField
                    v-model="createPath.name"
                    :label="$t('PATH.Name')"
                    :name="$t('PATH.Name')"
                    :rules="'required|min:3|max:30'"
                  ></TextField>
                </div>
              </b-col>
              <b-col lg="12" class="mb-3">
                <div class="hold-field">
                  <b-form-group v-slot="{ ariaDescribedby }" class="description">
                    <TextAreaField v-model="createPath.description" :label="$t('PATH.Description')" :rules="'required|max:60'" rows="5" :name="$t('VIDEO.Description')"></TextAreaField>
                  </b-form-group>
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
                  :disabled="invalid || canNotSend"
                  custom-class="submit-btn"
                >
                  {{ $route.params.id ? $t("GLOBAL_EDIT") : $t("GLOBAL_SAVE") }}
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
import TextAreaField from "@/components/Shared/TextAreaField/index.vue";
import Button from "@/components/Shared/Button/index.vue";
import {getSingleLearningPathRequest} from "@/api/learningPath";
import Modal from "@/components/Shared/Modal/index.vue";


export default {
  components: {
    TextField,
    TextAreaField,
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
      createPath: {
        name: "",
        description: "",
      },
      defaultValue:{
        name: "",
        description: "",
      }
    };
  },
  computed:{
    canNotSend(){
      return (this.createPath.name === this.defaultValue.name) && (this.createPath.description === this.defaultValue.description)
    }
  },
  methods: {
    onSubmit() {
      this.$refs.addEditPathForm.validate().then((success) => {
        if (!success) return;
      });
      if (this.$route.params.id) {
        this.$emit('handleEditPath', this.createPath)
      } else {
        this.$emit('handleAddPath', this.createPath)
      }
    },
    handleCancel() {
      this.$emit("handleCancel");
    },
    getPathToEdit() {
      if (this.$route.params.id) {
        this.ApiService(getSingleLearningPathRequest(this.$route.params.id)).then((response) => {
          this.createPath.name = response.data.data.name
          this.defaultValue.name = response.data.data.name
          this.createPath.description = response.data.data.description
          this.defaultValue.description = response.data.data.description
        })
      }
    }
  },
  mounted() {
    this.getPathToEdit()
  }
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
