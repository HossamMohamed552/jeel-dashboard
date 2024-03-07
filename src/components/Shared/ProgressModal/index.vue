<template>
  <div>
    <b-modal size="lg" centered  v-model="show" :no-close-on-backdrop="true" :clickToClose="false" hide-header hide-footer>
      <h3 style="margin-bottom: 8%;text-align: center;direction: rtl;word-break: break-all">{{`جاري رفع  ${title}`}}</h3>
      <b-progress :max="max" height="2rem">
        <b-progress-bar :value="value" :label="`${value}%`">
        </b-progress-bar>
      </b-progress>
      <Button :custom-class="'rounded-btn transparent-btn'" @click="showConfirm=true" style="margin-top: 8%;">
          {{$t('GLOBAL_CANCEL')}}
      </Button>
    </b-modal>

    <b-modal size="lg" centered  v-model="showConfirm" okTitle='نعم' cancelTitle="لا" title="" @ok="cancel()">
     هل تريد ايقاف الإضافة؟
    </b-modal>
  </div>

</template>

<script>
import Button from "@/components/Shared/Button/index.vue";

export default {
  props:{
    title:{
      required:true,
      default:'Video'
    },
    show:{
      required:true,
      default:false
    },
    value:{
      required:true,
      default:0
    },
    max:{
      default:100
    }
  },
  computed: {

  },
  methods: {
    cancel() {
      this.$emit('cancel', false)
    },
  },
  data() {
    return {
      showConfirm:false
    };
  },
  watch: {

  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
