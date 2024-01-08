<template>
  <b-modal
    :id="id"
    :content-class="contentClass"
    class="success-modal"
    hide-footer
    :hide-header="hideHeader"
    :size="size"
    centered
    @hide="handleCloseModal()"
  >
    <template v-slot:modal-header="{ close }">
      <span>{{ title }}</span>
      <b-icon
        class="close-modal-icon"
        icon="x"
        @click="close"
      />
    </template>
    <div :class="$i18n.locale == 'en' ? '' : 'rtl'">
      <div class="w-100">
        <slot name="modalBody" />
      </div>
    </div>
  </b-modal>
</template>
<script>
export default {
  props: {
    id: {
      type: String,
      required: true
    },
    size: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    hideHeader:{
      type: Boolean,
      default: false
    },
    contentClass: {
      type: String,
      default: ""
    }
  },
  methods: {
    handleCloseModal() {
      this.$emit("closeModal")
      this.$bvModal.hide(this.id)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
