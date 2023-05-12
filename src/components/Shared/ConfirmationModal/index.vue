<template>
  <b-modal :id="name" hide-footer @hide="$emit('onHideConfirmation')" size="lg">
    <template v-slot:modal-header="{ close }">
      <b-icon class="close-modal-icon" icon="x" @click="close"></b-icon>
    </template>
    <div>
      <div
        class="modal-body text-center"
        :class="$i18n.locale == 'en' ? '' : 'rtl'"
      >
        <img
          v-if="showDangerImage"
          class="reomve-img"
          src="@/assets/images/remove-img.svg"
          alt=""
        />

        <h5 class="title">
          {{ title }}
        </h5>
        <h6 class="message">
          {{ message }}
        </h6>
      </div>
      <div class="actions text-center">
        <Button
          v-if="hideCancelButton"
          color="light-dark"
          @click="onCancel"
          :custom-class="`mx-1 min-w-118 ${confirmClass}`"
        >
          {{ cancelTitle ? cancelTitle : $t("GLOBAL_CANCEL") }}
        </Button>

        <Button
          v-if="hideConfirmButton"
          :custom-class="`mx-1 min-w-118 ${confirmClass}`"
          @click="onConfirm"
          :loading="isConfirmationLoading"
          color="danger"
        >
          {{ confirmTitle ? confirmTitle : $t("GLOBAL_REMOVE") }}
        </Button>
      </div>
    </div>
  </b-modal>
</template>
<script>
export default {
  props: {
    // name "id" modal
    name: {
      type: String,
      default: "confirmation-modal",
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    cancelTitle: {
      type: String,
      default: "",
    },
    confirmTitle: {
      type: String,
      default: "",
    },
    isConfirmationLoading: {
      type: Boolean,
      default: false,
    },
    hideCancelButton: {
      type: Boolean,
      default: true,
    },
    hideConfirmButton: {
      type: Boolean,
      default: true,
    },
    cancelClass: {
      type: String,
      default: "btn-outline-danger",
    },
    confirmClass: {
      type: String,
      default: "",
    },
    showDangerImage: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    onConfirm() {
      this.$emit("onConfirm");
    },

    onCancel() {
      this.$emit("onCancel");
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
