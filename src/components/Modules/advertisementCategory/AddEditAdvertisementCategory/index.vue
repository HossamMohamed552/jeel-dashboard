<template>
  <div class="add-edit-country">
    <div class="container-fluid custom-container">
      <div class="add-edit-country-form">
        <h3>
          {{ adId ? $t("ads.EDIT") : $t("ads.ADD") }}
        </h3>
        <validation-observer v-slot="{invalid}" ref="addEditSchoolTyeForm">
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
                  @input="setSendToFromOutSide"
                  @option:selected="selectAll($event)"
                ></SelectSearch>
              </b-col>
              <b-col lg="4">
                <div class="hold-field">
                  <TextField
                    v-model="adObject.subject"
                    :label="$t('ads.subject')"
                    :name="$t('ads.subject')"
                    :rules="'required|min:3|max:100'"
                  ></TextField>
                </div>
              </b-col>
              <b-col lg="12" class="mb-3">
                <div class="hold-field">
                  <TextAreaField
                    v-model="adObject.description"
                    :label="$t('ads.superDescription')"
                    :name="$t('ads.superDescription')"
                    :rules="'required|min:50'"
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
import {getLevelsForSuperVisorDropDownRequest} from "@/api/level";
import SelectSearch from "@/components/Shared/SelectSearch/index.vue";
import {getAnnouncementByIdRequest} from "@/api/announcement";
import {getAllTeachersForSuperVisorRequest} from "@/api/user";
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
        users: [],
        subject: "",
        description: "",
        school_id: "",
      },
      levels: [],
      teachers: [],
      adId: this.$route.params.id,
    };
  },
  methods: {
    setSendToFromOutSide(){
      if (this.teacherId){
        this.adObject.users = this.teacherId
      }
    },
    selectAll($event) {
      if ($event.map(item => item.id).includes(1000000)) {
        const selectAllFilter = $event.filter((item) => {
          return item.id === 1000000
        })
        setTimeout(() => {
          this.adObject.users = []
          this.adObject.users = [selectAllFilter[0].id]
        }, 300)
      }
    },
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
      this.ApiService(getLevelsForSuperVisorDropDownRequest()).then((response) => {
        this.levels = response.data.data;
      });
    },
    getAllTeachers() {
      this.ApiService(getAllTeachersForSuperVisorRequest()).then((response) => {
        this.teachers = response.data.data;
        this.teachers.unshift({id: 1000000, name: "كل المدرسين"})
      });
    },
  },
  computed: {
    ...mapGetters(["user", "teacherId"]),
  },
  mounted() {
    this.adObject.school_id = this.user.school.id;
    this.getLevelsBySchoolId();
    this.getAllTeachers();
    if (this.adId) {
      this.ApiService(getAnnouncementByIdRequest(this.adId)).then((response) => {
        this.adObject.level_id = response.data.data.level.id;
        this.adObject.users = response.data.data.teachers.map((item) => {
          return item.id;
        });
        this.adObject.subject = response.data.data.subject;
        this.adObject.description = response.data.data.description;
      });
    }
  },
  destroyed() {
    this.$store.commit("SET_TEACHER_ID", null);
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
