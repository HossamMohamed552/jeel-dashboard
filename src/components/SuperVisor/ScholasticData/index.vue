<template>
  <b-row class="divider">
    <b-col>
      <ShowItem :title="$t('schoolAdmin.school')" :subtitle="scholasticData.school.name"/>
    </b-col>
    <b-col>
      <ShowItem :title="$t('schoolAdmin.studyYear')" :subtitle="scholasticData.studyYear.name"/>
    </b-col>
    <b-col>
      <ShowItem :title="$t('schoolAdmin.level')" :subtitle="scholasticData.level.name"/>
    </b-col>
    <b-col>
      <ShowItem :title="$t('schoolAdmin.className')" :subtitle="scholasticData.name"/>
    </b-col>
  </b-row>
</template>
<script>
import ShowItem from "@/components/Shared/ShowItem/index.vue";

export default {
  name: "index",
  components: {ShowItem},
  props: {
    scholasticData: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>
<style scoped lang="scss">

</style>
