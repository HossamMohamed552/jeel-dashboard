<template>
  <div class="stepper">
    <div class="stepper-steps">
      <div class="step-item align-steps" v-for="(step, index) in steps" :key="index">
        <div class="">
          <div class="d-flex justify-content-start align-items-center">
            <span class="stepper-step-img stepper-step" :class="{ active: index === currentStep, completed: index < currentStep }">{{ step.icon }}</span>
            <div class="progress" :class="{ active: index === currentStep, completed: index < currentStep }"></div>
          </div>
          <div class="stepper-step-title fs-14 mt-2" :class="{ active: index === currentStep, completed: index < currentStep }">{{ step.title }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    steps: {
      type: Array,
      required: true,
      default: () => [],
    },
    currentStep: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  computed: {
    progressWidth() {
      const completedSteps = this.steps.slice(0, this.currentStep);
      const stepWidth = 100 / (this.steps.length - 1);
      return `${completedSteps.length * stepWidth}%`;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
