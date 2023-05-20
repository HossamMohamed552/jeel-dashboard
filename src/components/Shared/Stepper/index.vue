<template>
  <div class="stepper">
    <div class="stepper-progress">
      <div class="progress-bar" :style="{ width: progressWidth }" />
    </div>
    <div class="stepper-steps">
      <div class="step-item" v-for="(step, index) in steps" :key="index">
        <div
          class="stepper-step"
          :class="{ active: index === currentStep, completed: index < currentStep }"
        >
          <div class="stepper-step-img">
            <!-- <img :src="require(`@/assets/images/icons/${step.icon}.svg`)" alt="" /> -->
          <span>{{step.icon}}</span>
          </div>
        </div>
        <div
          class="stepper-step-title fs-14 text-center mt-2"
          :class="{ active: index === currentStep, completed: index < currentStep }"
        >
          {{ step.title }}
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
