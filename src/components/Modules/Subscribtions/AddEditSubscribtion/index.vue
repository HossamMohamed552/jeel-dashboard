<template>
  <div class="add-edit-country">
    <div class="container-fluid custom-container">
      <div class="add-edit-country-form">
        <h3>
          {{ $route.params.id ? $t('subscription.edit') : $t('subscription.add') }}
        </h3>
        <validation-observer v-slot="{ invalid }" ref="addEditSubscribtionForm">
          <form @submit.prevent="onSubmit" class="mt-2">
            <b-row>
              <b-col lg="4" class="mt-3">
                <div class="hold-field">
                  <SelectSearch
                    v-model="formValues.school_group_id"
                    :label="$t('subscription.schoolGroup')"
                    :name="$t('subscription.schoolGroup')"
                    :placeholder="$t('subscription.selectSchoolGroup')"
                    :options="schoolGroups"
                    :reduce="(option) => option.id"
                    :get-option-label="(option) => option.name"
                    :rules="'required'"
                  ></SelectSearch>
                </div>
              </b-col>
              <b-col lg="4" class="mt-3">
                <div class="hold-field" v-if="countries">
                  <SelectSearch
                    v-model="formValues.country_id"
                    :label="$t('CHARACTER.country')"
                    :name="$t('CHARACTER.country')"
                    :placeholder="$t('GROUP.selectCountry')"
                    :options="countries"
                    :reduce="(option) => option.id"
                    :get-option-label="(option) => option.name"
                    :rules="'required'"
                  ></SelectSearch>
                </div>
              </b-col>
              <b-col lg="4" class="mt-3">
                <div class="hold-field">
                  <SelectSearch
                    v-model="formValues.school_id"
                    :label="$t('subscription.school')"
                    :name="$t('subscription.school')"
                    :placeholder="$t('subscription.chooseSchool')"
                    :options="schoolsList"
                    :reduce="(option) => option.id"
                    :get-option-label="(option) => option.name"
                    :rules="'required'"
                    :disabled="!formValues.school_group_id || !formValues.country_id"
                  ></SelectSearch>
                </div>
              </b-col>
              <b-col lg="4" class="mt-3">
                <div class="hold-field" v-if="schoolYearsList">
                  <SelectSearch
                    v-model="formValues.study_year_id"
                    :label="$t('subscription.studyYear')"
                    :name="$t('subscription.studyYear')"
                    :placeholder="$t('subscription.choosesStudyYear')"
                    :options="schoolYearsList"
                    :reduce="(option) => option.id"
                    :get-option-label="(option) => option.name"
                    :rules="'required'"
                  ></SelectSearch>
                </div>
              </b-col>
              <b-col lg="4" class="mt-3">
                <div class="hold-field" v-if="levelsList">
                  <SelectSearch
                    :multiple="true"
                    v-model="formValues.levels"
                    :label="$t('subscription.level')"
                    :name="$t('subscription.level')"
                    :placeholder="$t('subscription.selectLevel')"
                    :options="levelsList"
                    :reduce="(option) => option.id"
                    :get-option-label="(option) => option.name"
                    :rules="'required'"
                  ></SelectSearch>
                </div>
              </b-col>
              <b-col lg="4" class="mt-3">
                <div class="hold-field" v-if="terms">
                  <SelectSearch
                    :multiple="true"
                    v-model="formValues.terms"
                    :label="$t('subscription.term')"
                    :name="$t('subscription.term')"
                    :placeholder="$t('subscription.selectTerm')"
                    :options="terms"
                    :reduce="(option) => option.id"
                    :get-option-label="(option) => option.name"
                    :rules="'required'"
                    :disabled="formValues.levels.length === 0"
                  ></SelectSearch>
                </div>
              </b-col>
              <b-col lg="4" class="mb-3">
                <div class="hold-field">
                  <ValidationProvider rules="required">
                    <label>{{$t('subscription.start_subscription')}}<span><i class="fa-solid fa-asterisk"></i></span></label>
                    <date-picker
                      :placeholder="$t('subscription.selectStart_subscription')"
                      :disabled-date="disabledBeforeToday"
                      :lang="en"
                      v-model="formValues.start_subscription"
                      @change="changeDate"
                      valueType="format"
                    ></date-picker>
                    <p class="show-date" v-if="showDate">
                      {{ formValues.start_subscription }}
                    </p>
                  </ValidationProvider>
                </div>
              </b-col>
              <b-col lg="4" class="mb-3">
                <div class="hold-field">
                  <ValidationProvider rules="required">
                    <label>
                      {{$t('subscription.end_subscription')}}
                      <span><i class="fa-solid fa-asterisk"></i></span>
                    </label>
                    <date-picker
                      :placeholder="$t('subscription.selectEnd_subscription')"
                      :disabled-date="disabledBeforeToday"
                      :lang="en"
                      v-model="formValues.end_subscription"
                      @change="changeDate"
                      valueType="format"
                    ></date-picker>
                    <p class="show-date" v-if="showDate">
                      {{ formValues.end_subscription }}
                    </p>
                  </ValidationProvider>
                </div>
              </b-col>
              <b-col lg="4" class="mb-3">
                <ValidationProvider rules="required">
                  <label class="invisible mt-4">
                    تاريخ نهاية الاشتراك
                    <span><i class="fa-solid fa-asterisk"></i></span>
                  </label>
                  <b-form-checkbox v-model="formValues.clone">{{ $t('subscription.copy') }}</b-form-checkbox>
                </ValidationProvider>
              </b-col>
            </b-row>
            <b-row class="mt-4">
              <div class="package-calc">
                <h4>{{$t('subscription.price')}}</h4>
                <b-row>
                  <b-col lg="4" class="mt-3">
                    <div class="hold-field" v-if="packagesList">
                      <SelectSearch
                        v-model="formValues.package_id"
                        :label="$t('subscription.package')"
                        :name="$t('subscription.package')"
                        :placeholder="$t('subscription.package')"
                        :options="packagesList"
                        :reduce="(option) => option.id"
                        :get-option-label="(option) => option.name"
                        :rules="'required'"
                        @input="setSelectedPrice"
                      ></SelectSearch>
                    </div>
                  </b-col>
                  <b-col lg="4" class="mt-3">
                    <div class="hold-field discount-percentage">
                      <TextField
                        v-model="formValues.package_discount"
                        :label="$t('subscription.disPercentage')"
                        :name="$t('subscription.disPercentage')"
                        :placeholder="$t('subscription.enterDisPercentage')"
                        type="number"
                        :rules="'numeric|max_value:100'"
                        :disabled="!formValues.package_id"
                        @input="getFinalCost"
                      ></TextField>
                    </div>
                  </b-col>
                  <b-col lg="4" class="mt-3">
                    <div class="hold-field">
                      <TextField
                        v-model="discount_final"
                        :label="$t('subscription.finalResult')"
                        :name="$t('subscription.finalResult')"
                        :rules="'required'"
                        :disabled="true"
                      ></TextField>
                    </div>
                  </b-col>
                </b-row>
              </div>
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
import Button from "@/components/Shared/Button/index.vue";
import {getSingleSubscriptionsRequest} from "@/api/subscription.js";
import Modal from "@/components/Shared/Modal/index.vue";
import {getAllCountryRequest} from "@/api/country";
import SelectSearch from "@/components/Shared/SelectSearch/index.vue";
import {getCurrencyRequest} from "@/api/currency";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/locale/en";
import "vue2-datepicker/index.css";
import {getAllSchoolGroupRequest} from "@/api/schoolGroup";
import {getSchoolsRequest} from "@/api/school";
import {getSchoolYearRequest} from "@/api/school-year";
import {debounce} from "lodash";
import {getAllTermsRequest} from "@/api/term";
import {getPackagesRequest} from "@/api/packages.js";
import {getLevelsRequest} from "@/api/level";

export default {
  components: {
    SelectSearch,
    Modal,
    TextField,
    Button,
    DatePicker,
  },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
  watch:{
    "formValues.school_group_id"(){
      let params = {
        country_id : this.formValues.country_id,
        school_group_id : this.formValues.school_group_id,
        list_all: true
      }
      if (this.formValues.school_group_id && this.formValues.country_id){
        this.getSchools(params)
      }

    },
    "formValues.country_id"(){
      let params = {
        country_id : this.formValues.country_id,
        school_group_id : this.formValues.school_group_id,
      }
      if (this.formValues.school_group_id && this.formValues.country_id){
        this.getSchools(params)
      }
    },
  },
  data() {
    return {
      countries: [],
      schoolGroups: [],
      schoolsList: [],
      schoolYearsList: [],
      terms: [],
      levelsList: [],
      discount_final: "",
      packagesList: [],
      selectedPrice: 0,
      selectedCurrency: "",
      discountValueForUpdate: "",
      en: "en",
      showDate: true,
      formValues: {
        school_group_id: "",
        school_id: "",
        country_id: "",
        study_year_id: "",
        package_id: "",
        package_discount: "",
        price_after_discount: "",
        levels: [],
        terms: [],
        start_subscription: "",
        end_subscription: "",
        clone: false
      },
      subscribtionId: this.$route.params.id,
      currencyList: [],
    };
  },
  methods: {
    onSubmit() {
      this.$refs.addEditSubscribtionForm.validate().then((success) => {
        if (!success) return;
      });
      if (this.subscribtionId) {
        this.$emit("handleEditSubscribtion", this.formValues);
      } else {
        this.$emit("handleAddSubscribtion", this.formValues);
      }
    },
    changeDate() {
      this.showDate = false;
    },
    disabledBeforeToday(date) {
      return date < new Date(new Date().setHours(0, 0, 0, 0));
    },
    handleCancel() {
      this.$emit("handleCancel");
    },
    getSubscribtionToEdit() {
      if (this.subscribtionId) {
        this.ApiService(getSingleSubscriptionsRequest(this.subscribtionId))
          .then((response) => {
            const responseObj = response.data.data;
            this.formValues.country_id = responseObj.country.id;
            this.formValues.levels = responseObj.levels.map((item)=> item.id);
            this.formValues.package_id = responseObj.package.id;
            this.discountValueForUpdate = responseObj.package_discount;
            this.formValues.package_discount = responseObj.package_discount;
            this.formValues.price_after_discount =
              responseObj.price_after_discount;
            this.discount_final =
              responseObj.price_after_discount +
              " " +
              responseObj.package.currency.name;
            this.formValues.school_group_id = responseObj.school_group.id;
            this.formValues.school_id = responseObj.school.id;
            this.formValues.start_subscription = responseObj.start_subscription;
            this.formValues.end_subscription = responseObj.end_subscription;
            this.formValues.study_year_id = responseObj.study_year.id;
            this.formValues.terms = responseObj.terms.map((item)=> item.id);
          })
          .then(() => {
            setTimeout(() => {
              this.discountValueForUpdate = "";
            }, 5000)
          });
      }
    },
    getAllCountries() {
      this.ApiService(getAllCountryRequest()).then((response) => {
        this.countries = response.data.data;
      });
    },
    getCurrency() {
      this.ApiService(getCurrencyRequest({list_all:true})).then((response) => {
        this.currencyList = response.data.data;
      });
    },
    getAlSchoolGroups() {
      this.ApiService(getAllSchoolGroupRequest()).then((response) => {
        this.schoolGroups = response.data.data;
      });
    },
    getSchools: debounce(function (param) {
      this.ApiService(getSchoolsRequest(param)).then((response) => {
        this.schoolsList = response.data.data;
      });
    }, 500),
    getSchoolYears() {
      this.ApiService(getSchoolYearRequest({list_all:true})).then((response) => {
        this.schoolYearsList = response.data.data;
      });
    },
    getLevels() {
      this.ApiService(getLevelsRequest({list_all:true})).then((response) => {
        this.levelsList = response.data.data;
      });
    },
    getTerms() {
      this.ApiService(getAllTermsRequest()).then((response) => {
        this.terms = response.data.data;
      });
    },
    getPackages() {
      this.ApiService(getPackagesRequest({list_all:true})).then((response) => {
        this.packagesList = response.data.data;
      });
    },
    setSelectedPrice: debounce(function () {
      if (this.discountValueForUpdate == "")
        this.formValues.package_discount = "";
      const selectedPackageId = this.formValues.package_id;
      const packageObj = this.packagesList.find(
        (obj) => obj.id === selectedPackageId
      );
      this.selectedPrice = packageObj.price ? packageObj.price : 0;
      this.selectedCurrency = packageObj.currency.name;
      this.discount_final = this.selectedPrice + " " + this.selectedCurrency;
    }, 500),
    getFinalCost: debounce(function ($event) {
      if ($event <= 100){
        const currencyName = this.selectedCurrency;
        const price = this.selectedPrice;
        const discountPercentage = this.formValues.package_discount;
        const discountValue = (discountPercentage / 100) * price;
        const costAfterDiscount = price - discountValue;
        this.discount_final = costAfterDiscount + " " + currencyName;
        this.formValues.price_after_discount = costAfterDiscount;
      }
    }, 1000),
  },
  mounted() {
    if (this.subscribtionId) this.getSubscribtionToEdit();
    this.getAlSchoolGroups();
    this.getSchoolYears();
    this.getTerms();
    this.getPackages();
    this.getLevels();
    this.getAllCountries();
    this.getCurrency();
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
