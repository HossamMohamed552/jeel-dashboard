<template>
  <div class="d-flex justify-content-between align-items-center mt-4">
    <div class="d-flex align-items-center">
      <b-pagination
        :value="currentPage"
        :total-rows="totalItems"
        :per-page="perPage"
        @input="onPageChange"
        class="custom-pagination"
        :hide-goto-end-buttons="true"
        next-class="next-btn"
        prev-class="prev-btn"
      />
      <div class="mb-2 number-of-data-shown">عرض {{ loadedCount }} من أصل {{ totalItems }}</div>
    </div>
    <b-form-select
      class="per-page-select"
      :value="selected"
      @input="changePerPage"
      :options="options"
    ></b-form-select>
  </div>
</template>

<script>
export default {
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    perPage: {
      type: Number,
      required: true,
    },
    totalItems: {
      type: Number,
      required: false,
    },
    loadedCount: {
      type: Number,
      required: 0,
    },
  },
  data() {
    return {
      selected: this.perPage,
      options: [5, 10, 20, 40],
    };
  },

  methods: {
    onPageChange(page) {
      this.$emit("changePage", page);
    },
    changePerPage(perPage) {
      this.$emit("changePerPage", perPage);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index";
</style>
