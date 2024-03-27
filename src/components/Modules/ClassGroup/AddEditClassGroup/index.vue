<template>
  <div class="add-edit-country">
    <div class="container-fluid custom-container">
      <div class="add-edit-country-form">
        <h3>
          {{ classGroupId ? $t("classGroup.EDIT") : $t("classGroup.ADD") }}
        </h3>
        <validation-observer v-slot="{ invalid }" ref="addEditClassGroupForm">
          <form @submit.prevent="onSubmit" class="mt-5">
            <b-row>
              <b-col lg="4" class="mb-3">
                <div class="hold-field">
                  <TextField
                    v-model="formValues.name"
                    :label="$t('classGroup.classGroup_name')"
                    :name="$t('classGroup.classGroup_name')"
                    :placeholder="$t('classGroup.classGroup_name_PLACEHOLDER')"
                    :rules="'required|max:100'"
                  ></TextField>
                </div>
              </b-col>
              <b-col lg="4" class="mb-3">
                <div class="hold-field">
                  <SelectSearch
                    v-model="formValues.class_id"
                    :label="$t('classGroup.class')"
                    :name="$t('classGroup.class')"
                    :placeholder="$t('classGroup.class_PLACEHOLDER')"
                    :options="classes"
                    :get-option-label="(option) => option.name"
                    :reduce="(option) => option.id"
                    :rules="'required'"
                    @input="setIdFromOutSide"
                    :disabled="!!classFromDetailId"
                  />
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
                  {{ classGroupId ? $t("GLOBAL_EDIT") : $t("GLOBAL_SAVE") }}
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
import Modal from "@/components/Shared/Modal/index.vue";
import SelectSearch from "@/components/Shared/SelectSearch/index.vue";
import {getClassForTeacherRequest, getClassGroupIdByIdRequest} from "@/api/teacher-module";
export default {
  components: {
    SelectSearch,
    Modal,
    TextField,
    Button,
  },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      formValues: {
        name: "",
        class_id: null
      },
      classes: [],
      classGroupId: this.$route.params.id,
      showModal: false,
    };
  },
  methods: {
    getClasses() {
      this.ApiService(getClassForTeacherRequest({list_all: true})).then((response) => {
        this.classes = response.data.data
      }).then(()=>{
        this.setIdFromOutSide()
      })
    },
    setIdFromOutSide(){
      if (this.classFromDetailId) {
        this.formValues.class_id = Number(this.classFromDetailId)
      }
    },
    onSubmit() {
      this.$refs.addEditClassGroupForm.validate().then((success) => {
        if (!success) return;
      });
      if (this.classGroupId) {
        this.$emit("handleEditClassGroup", this.formValues);
      } else {
        this.$emit("handleAddClassGroup", this.formValues);
      }
    },
    handleCancel() {
      this.$emit("handleCancel");
    },
    getClassGroupById() {
      if (this.classGroupId) {
        this.ApiService(getClassGroupIdByIdRequest(this.classGroupId)).then((response) => {
          this.formValues.name = response.data.data.name;
          this.formValues.class_id = response.data.data.class.id;
        })
      }
    },
  },
  computed: {
    classFromDetailId(){
      return this.$store.getters.classFromDetailId
    }
  },
  destroyed() {
    this.$store.commit('SET_CLASS_ID', null)
  },
  mounted() {
    this.getClasses()
    this.getClassGroupById()

  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
