<template>
  <div class="choose-student">
    <div class="content">
      <div class="my-children">
        <div class="icon">
          <img src="@/assets/images/icons/mother-and-son.png">
        </div>
        <p class="my-children-paragraph">{{$t('PARENT.myChildren')}}</p>
      </div>
      <div class="student">
        <b-row>
          <b-col>
            <div class="hold-student" @click="$router.push('/')">
              <div class="student-image">
                <img src="@/assets/images/icons/user-avatar.png">
              </div>
              <p class="student-name">
                student-name
              </p>
              <p class="student-class">
                student-class
              </p>
            </div>
          </b-col>
          <b-col>
            <div class="hold-student" @click="$router.push('/')">
              <div class="student-image">
                <img src="@/assets/images/icons/user-avatar.png">
              </div>
              <p class="student-name">
                student-name
              </p>
              <p class="student-class">
                student-class
              </p>
            </div>
          </b-col>
          <b-col>
            <div class="hold-student"  @click="$router.push('/')">
              <div class="student-image">
                <img src="@/assets/images/icons/user-avatar.png">
              </div>
              <p class="student-name">
                student-name
              </p>
              <p class="student-class">
                student-class
              </p>
            </div>
          </b-col>
        </b-row>

      </div>
    </div>
    <CopyRight class="copyright"/>
  </div>
</template>
<script>
import CopyRight from "@/components/Shared/CopyRight/index.vue";
export default{
  name: "choose-student",
  components: {CopyRight},
}
</script>
<style scoped lang="scss">
@import "index";
</style>
