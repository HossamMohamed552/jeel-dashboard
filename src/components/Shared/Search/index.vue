<template>
  <div>
    <div class="search-container">
      <div class="container">
        <h3 class="app-main-title" v-if="title">
          {{ title }}
        </h3>
        <div class="search-body">
          <div class="row align-items-center">
            <div class="col-md-6 form-border">
              <div class="d-flex align-items-center">
                <b-icon icon="search" class="text-primary"></b-icon>
                <TextField
                  class="w-100"
                  :placeholder="$t('GLOBAL_SEARCH')"
                  v-model="form.search"
                />
              </div>
            </div>
            <div class="col-md-2 form-border">
              <SelectSearch
                value=""
                :options="[]"
                :placeholder="$t('TALENT.ROLE')"
                v-model="form.role"
              />
            </div>
            <div class="col-md-2 form-border">
              <SelectSearch
                value=""
                :options="[]"
                :placeholder="$t('TALENT.COUNTRY')"
                v-model="form.country"
              />
            </div>
            <div class="col-md-2">
              <button
                class="btn btn-text text-primary p-0"
                @click="handleShowMoreFilters"
              >
                <b-icon icon="funnel"></b-icon>
                {{ $t("GLOBAL_MORE") }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      form: {
        search: null,
        country: null,
        role: null,
      },
    };
  },
  methods: {
    handleShowMoreFilters() {
      this.$emit("handleShowMoreFilters");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index";
</style>
