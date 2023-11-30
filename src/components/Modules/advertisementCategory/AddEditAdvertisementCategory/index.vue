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
                  v-model="adObject.teacher_id"
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
import {getBloomCategoryByIdRequest} from "@/api/bloom.js";
import Modal from "@/components/Shared/Modal/index.vue";
import SelectField from "@/components/Shared/SelectField/index.vue";
import {mapGetters} from "vuex";
import {getLevelsRequest} from "@/api/level";
import SelectSearch from "@/components/Shared/SelectSearch/index.vue";
import {getAllTeachersRequest} from "@/api/user";
import te from "vue2-datepicker/locale/es/te";

export default {
  components: {
    SelectSearch,
    SelectField,
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
      adObject: {
        level_id: "",
        teacher_id: "",
        name: "",
        slug: "",
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
      if (this.bloomTypeId) {
        this.$emit("editBloomCategory", this.formValues);
      } else {
        this.$emit("handleAddAdCategory", this.formValues);
      }
    },
    handleCancel() {
      this.$emit("handleCancel");
    },
    getBloomCategoryById() {
      if (this.bloomTypeId) {
        this.ApiService(getBloomCategoryByIdRequest(this.bloomTypeId)).then((response) => {
          this.formValues = response.data.data;
        });
      }
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
    this.getBloomCategoryById();
    this.getLevelsBySchoolId();
    this.getAllTeachers()
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
