<template>
  <div>
    <b-modal v-model="innerModal" class="custom-rounded" @hide="cancel()" centered
             title="BootstrapVue" hide-footer hide-header>
      <div class="all-content">
        <div class="flexContent">
          <div>
            <div class="text-center hold-icon">
              <img src="@/assets/images/icons/email.png" v-show="isVerify">
              <img src="@/assets/images/icons/badge.png" v-show="isVerifyCheck">
              <img src="@/assets/images/icons/delete.svg" v-show="isWarning || isFailed">
              <img src="@/assets/images/icons/reuse.png" v-show="isUsed">
              <img src="@/assets/images/icons/alarm.png" v-show="alarm">
              <img src="@/assets/images/icons/success.svg" v-show="isSuccess">
            </div>
            <div class="text-center">
              <p class="confirm-message" v-if="contentMessage">{{ contentMessage }}</p>
              <p class="confirm-message-question" v-if="contentMessageQuestion">
                {{ contentMessageQuestion }}</p>
            </div>
          </div>
        </div>
        <template>
          <div class="controls" v-if="isWarning">
            <Button :custom-class="'rounded-btn'" @click="cancelWithConfirm()">
              {{ $t('GLOBAL_CONFIRM') }}
            </Button>
            <Button :custom-class="'rounded-btn transparent-btn'" @click="cancel()">
              {{ $t('GLOBAL_CANCEL') }}
            </Button>
          </div>
          <div class="controls mt-3" style="justify-content: center;" v-if="isUsed || alarm">
            <Button :custom-class="'rounded-btn'" @click="cancelWithConfirm()">
              {{ $t('GLOBAL_AGREE') }}
            </Button>
          </div>
          <div class="controls mt-3" style="justify-content: center;" v-if="isFailed">
            <Button :custom-class="'rounded-btn transparent-btn'" @click="cancel()">
              {{ $t('GLOBAL_CANCEL') }}
            </Button>
          </div>
          <div class="d-flex justify-content-center align-items-center mt-5" v-if="isVerify">
            <Button :custom-class="'rounded-btn'" @click="cancelWithConfirm()">
              {{ $t('verifyEmail') }}
            </Button>
          </div>
          <div class="d-flex justify-content-center align-items-center mt-5" v-if="isVerifyCheck">
            <Button :custom-class="'rounded-btn'" @click="cancelWithConfirm()">
              {{ $t('close') }}
            </Button>
          </div>
        </template>
      </div>
    </b-modal>
  </div>
</template>
<script>
import Button from "@/components/Shared/Button/index.vue";

export default {
  name: "index",
  components: {
    Button
  },
  data() {
    return {
      innerModal: false,
    }
  },
  watch: {
    showModal(newVal) {
      this.innerModal = newVal
    }
  },
  props: {
    isSuccess: {
      type: Boolean,
      default: false
    },
    isWarning: {
      type: Boolean,
      default: false
    },
    isVerify: {
      type: Boolean,
      default: false
    },
    isVerifyCheck: {
      type: Boolean,
      default: false
    },
    isFailed: {
      type: Boolean,
      default: false
    },
    isUsed: {
      type: Boolean,
      default: false
    },
    alarm: {
      type: Boolean,
      default: false
    },
    showModal: {
      type: Boolean,
      default: false
    },
    contentMessage: {
      type: String,
      default: ""
    },
    contentMessageQuestion: {
      type: String,
      default: ""
    }
  },
  methods: {
    cancel() {
      this.$emit('cancel', false)
    },
    cancelWithConfirm() {
      this.$emit('cancelWithConfirm', false)
    }
  }
}
</script>
<style scoped lang="scss">
@import "src/assets/style/scss/_mixin";
@import "./index";

</style>
