<template>
  <div>
    <b-modal v-model="innerModal" class="custom-rounded" @hide="cancel()" centered title="BootstrapVue" hide-footer
             hide-header>
      <div class="all-content">
        <div class="flexContent">
          <div>
            <div class="text-center hold-icon">
              <img src="@/assets/images/icons/delete.svg">
            </div>
            <div class="text-center">
              <p class="confirm-message">{{ contentMessage }}</p>
              <p class="confirm-message-question">{{ contentMessageQuestion }}</p>
            </div>
          </div>

        </div>
        <template>
         <div class="controls">
           <Button :custom-class="'rounded-btn'" @click="cancelWithConfirm()">
             {{$t('GLOBAL_CONFIRM')}}
           </Button>
           <Button :custom-class="'rounded-btn transparent-btn'" @click="cancel()">
             {{$t('GLOBAL_CANCEL')}}
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
  components:{
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
    showModal: {
      type: Boolean,
      default: false
    },
    contentMessage: {
      type: String,
      default: ""
    },
    contentMessageQuestion:{
      type: String,
      default: ""
    }
  },
  methods: {
    cancel() {
      this.$emit('cancel', false)
    },
    cancelWithConfirm(){
      this.$emit('cancelWithConfirm', false)
    }
  }
}
</script>
<style scoped lang="scss">
@import "src/assets/style/scss/_mixin";
@import "./index";

</style>
