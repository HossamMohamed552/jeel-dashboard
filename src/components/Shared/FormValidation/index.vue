<template>
  <div>
    <div
      v-if="showErrors"
      class="mb-3"
    >
<!--      <Alert :messages="errors" />-->
    </div>
    <ValidationObserver
      ref="observer"
      @submit.prevent="onSubmit()"
    >
      <slot />
    </ValidationObserver>
  </div>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showErrors: false,
      errors: []
    }
  },
  methods: {
    async onSubmit() {
      const isValid = await this.$refs.observer.validate()
      const errors = await this.$refs.observer.errors
      if (!isValid) {
        console.log("not valid")
        this.onInvalidSubmit(errors)
        return
      }
      this.handleResetForm()
      this.$emit("handleSubmit")
    },
    async onInvalidSubmit(errors) {
      this.errors = []
      for (const [, value] of Object.entries(errors)) {
        if (value.length) {
          this.errors.push(...value)
        }
      }
      this.showErrors = true
    },
    handleResetForm() {
      this.errors = []
      this.showErrors = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./index";
</style>
