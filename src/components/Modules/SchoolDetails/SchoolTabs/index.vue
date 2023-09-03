<template>
  <section class="inner-routes px-0">
    <div class="taps">
      <div
        @click="activeTapStatus(1,'class')"
        :class="activeTap === 1 ? 'active' : ''"
        class="tap"
      >
        الصفوف الدراسية
      </div>
      <div
        @click="activeTapStatus(2,'staff')"
        :class="activeTap === 2 ? 'active' : ''"
        class="tap"
      >
        تسجيل الموظفين
      </div>
      <div @click="activeTapStatus(3,'student')" :class="activeTap === 3 ? 'active' : ''" class="tap">
        تسجيل الطلاب
      </div>
      <div @click="activeTapStatus(4,'schoolAdmin')" :class="activeTap === 4 ? 'active' : ''" class="tap">
        تسجيل المديرين
      </div>
    </div>
    <div class="content">
      <div class="row">
        <transition name="fade">
          <div class="col-12 px-0" v-if="activeTap === 1">
            <slot name="classes"></slot>
          </div>
          <div class="col-12 px-0" v-if="activeTap === 2">
            <slot name="staff-enroll"></slot>
          </div>
          <div class="col-12 px-0" v-if="activeTap === 3">
            <slot name="student-enroll"></slot>
          </div>
          <div class="col-12 px-0" v-if="activeTap === 4">
            <slot name="school-admin-enroll"></slot>
          </div>
        </transition>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: "index",
  data() {
    return {
      activeTap: 1,
    };
  },
  methods: {
    activeTapStatus(id, slot) {
      this.activeTap = id
      // window.localStorage.setItem('page', slot)
    }
  },
  beforeDestroy() {
    window.localStorage.setItem('page', '')
  }
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
