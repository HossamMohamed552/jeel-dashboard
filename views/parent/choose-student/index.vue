<template>
  <div class="choose-student">
    <div class="content">
      <div class="my-children">
        <div class="icon">
          <img src="@/assets/images/icons/kids.svg">
        </div>
        <p class="my-children-paragraph">{{$t('PARENT.myChildren')}}</p>
      </div>
      <div class="student">
        <b-row>
          <b-col v-for="child in user.my_childerns">
            <div class="hold-student" @click="setChildId(child)">
              <div class="student-image">
                <img :src="child.image">
              </div>
              <p class="student-name">
                {{ child.name }}
              </p>
              <p class="student-class" v-if="child?.class && child?.class?.name">
                {{ child?.class.level.name }}
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
import {mapGetters} from "vuex";
export default{
  name: "choose-student",
  components: {CopyRight},
  computed:{
    ...mapGetters(['user'])
  },
  methods:{
    setChildId(child){
      this.$store.dispatch('setChild',child)
    }
  }
}
</script>
<style scoped lang="scss">
@import "index";
</style>
