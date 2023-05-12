<template>
  <b-modal
    :id="name"
    hide-footer
    @hide="$emit('onHideConfirmation')"
    :title="title"
  >
    <div>
      <div class="modal-body">
        <div class="modal-body py-3">
          <h4 class="message">
            {{ message }}
          </h4>
        </div>
      </div>
      <div class="actions text-right">
        <Button
          v-if="hideCancelButton"
          color="light-dark"
          @click="onCancel"
          :custom-class="`mx-1 ${confirmClass}`"
        >
          {{ cancelTitle }}
        </Button>

        <Button
          v-if="hideConfirmButton"
          :custom-class="`mx-1 ${confirmClass}`"
          @click="onConfirm"
          :loading="isConfirmationLoading"
          color="danger"
        >
          {{ confirmTitle }}
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
      default: 'confirmation-modal',
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
      default: 'Cancel',
    },
    confirmTitle: {
      type: String,
      default: 'Delete',
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
      default: 'btn-outline-danger',
    },
    confirmClass: {
      type: String,
      default: '',
    },
  },

  methods: {
    onConfirm() {
      this.$emit('onConfirm');
    },

    onCancel() {
      this.$emit('onCancel');
    },
  },
};
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
