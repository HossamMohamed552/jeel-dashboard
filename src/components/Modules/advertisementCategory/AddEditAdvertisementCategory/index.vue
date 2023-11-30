<template>
  <div class="add-edit-country">
    <div class="container-fluid custom-container">
      <div class="add-edit-country-form">
        <h3>
          {{ adId ? $t("BLOOM.EDIT") : $t("ads.ADD") }}
        </h3>
        <validation-observer v-slot="{ invalid }" ref="addEditSchoolTyeForm">
          <form @submit.prevent="onSubmit" class="mt-5">
            <b-row>
              <b-col lg="4">
                <SelectSearch
                  v-model="adObject.level_id"
                  :label="$t('ads.superLevel')"
                  :name="$t('ads.superLevel')"
                  :options="levels"
                  :reduce="(option) => option.id"
                  :get-option-label="(option) => option.name"
                  :rules="'required'"
                  :deselectFromDropdown="true"
                ></SelectSearch>
              </b-col>
              <b-col lg="4">
                <SelectSearch
                  v-model="adObject.users"
                  :label="$t('ads.superTeachersTo')"
                  :name="$t('ads.superTeachersTo')"
                  :options="teachers"
                  :reduce="(option) => option.id"
                  :get-option-label="(option) => option.name"
                  :rules="'required'"
                  multiple
                  :deselectFromDropdown="true"
                ></SelectSearch>
              </b-col>
              <b-col lg="4">
                <div class="hold-field">
                  <TextField
                    v-model="adObject.subject"
                    :label="$t('ads.subject')"
                    :name="$t('ads.subject')"
                    :rules="'required|min:3|max:30'"
                  ></TextField>
                </div>
              </b-col>
              <b-col lg="12" class="mb-3">
                <div class="hold-field">
                  <TextAreaField
                    v-model="adObject.description"
                    :label="$t('ads.superDescription')"
                    :name="$t('ads.superDescription')"
                    :rules="'required|min:20'"
                  ></TextAreaField>
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
                  {{ adId ? $t("GLOBAL_EDITAd") : $t("GLOBAL_SEND") }}
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
import Modal from "@/components/Shared/Modal/index.vue";
import SelectField from "@/components/Shared/SelectField/index.vue";
import {mapGetters} from "vuex";
import {getLevelsRequest} from "@/api/level";
import SelectSearch from "@/components/Shared/SelectSearch/index.vue";
import {getAllTeachersRequest} from "@/api/user";
export default {
  components: {
    SelectSearch,
    SelectField,
    Modal,
    TextField,
    TextAreaField,
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
      adObject: {
        level_id: "",
        users: "",
        subject: "",
        description: "",
        school_id : ""
      },
      levels: [],
      teachers: [],
      adId: this.$route.params.id,
    };
  },
  methods: {
    onSubmit() {
      this.$refs.addEditSchoolTyeForm.validate().then((success) => {
        if (!success) return;
      });
      if (this.adId) {
        this.$emit("editAdCategory", this.adObject);
      } else {
        this.$emit("handleAddAdCategory", this.adObject);
      }
    },
    handleCancel() {
      this.$emit("handleCancel");
    },
    getLevelsBySchoolId() {
      this.ApiService(getLevelsRequest({school_id: this.user.school.id})).then((response) => {
        this.levels = response.data.data
      })
    },
    getAllTeachers(){
      this.ApiService(getAllTeachersRequest(this.user.school.id)).then((response)=>{
        this.teachers = response.data.data
      })
    }
  },
  computed: {
    ...mapGetters(["user"]),
  },
  mounted() {
    this.adObject.school_id = this.user.school.id
    this.getLevelsBySchoolId();
    this.getAllTeachers()
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
