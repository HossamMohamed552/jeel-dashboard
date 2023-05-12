<template>
  <header>
    <div class="container-fluid custom-container">
      <div class="row">
        <div class="col-12">
          <div class="top">
            <div class="logo">
              <img src="@/assets/images/logo-white.png" alt="logo" title="geel logo">
            </div>
            <div class="notification-info-admin">
              <div class="notification">
                <div class="bill">
                  <img src="@/assets/images/icons/notification.svg" alt="notification" title="notification">
                </div>
                <span class="no-of-notification">3</span>
              </div>
              <div class="info-admin">
                <div class="name-role">
                  <p class="name">سعد بن عبد الرحمن الغامدي</p>
                  <p class="role">جيل أدمن</p>
                </div>
                <div class="user-image">
                  <img src="@/assets/images/icons/user.svg" alt="user" title="user">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </header>
</template>
<script>
export default {
  name: "index"
}
</script>
<style scoped lang="scss">
@import "./index";
</style>
