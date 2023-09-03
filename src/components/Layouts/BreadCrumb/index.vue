<template>
  <nav class="breadcrumb py-0">
    <div class="container-fluid custom-container d-flex justify-content-between align-items-center px-0">
      <div class="navigation-section d-flex justify-content-between align-items-center">
        <img src="@/assets/images/icons/home.png" class="icon"
             @click="$router.push('/dashboard/home')">
        <div class="ml-3">
          <ul class="d-flex justify-content-center align-items-center">
            <li v-for="(item, index) in breadcrumbItems" :key="index" class="router-link"
                :class="index+1 === breadcrumbItems.length? 'last-link':''">
              <span
                v-if="!(item.routerName === 'main' || item.routerName === 'dashboard')  && item.preLabel"
                class="separator">/</span>
              <router-link v-if="item.preLink" :to="item.preLink">{{ item.preLabel }}</router-link>
              <span
                v-if="!(item.routerName === 'main' || item.routerName === 'dashboard')  && !(item.label && item.label === '')"
                class="separator">/</span>
              <router-link
                :to="item.link.includes(':id') || item.link.includes(':levelId') || item.link.includes(':pathId') || item.link.includes(':missionId') ? item.link.replace(/:id|:levelId|:pathId|:missionId/gi, (matched) => mapObj[matched]): item.link">
                {{ item.label }}
              </router-link>
            </li>
          </ul>
          <p class="my-0 currentRoute" v-if="currentRoute && !(currentRoute.name === 'main')">
            {{ currentRoute.meta.breadcrumb }}</p>
        </div>
      </div>
      <div class="navigation-back" v-if="currentRoute && !(currentRoute.name === 'main')"
           @click="$router.back()">
        <span>{{ $t('BACK') }}</span>
        <img src="@/assets/images/icons/left-arrow.png" class="icon back">
      </div>
    </div>
  </nav>
</template>
<script>
import id from "vue2-datepicker/locale/es/id";

export default {
  name: "index",
  data() {
    return {
      currentRoute: null,

    }
  },
  computed: {
    mapObj() {
      return {
        ':id': this.$route.params.id,
        ':levelId': this.$route.params.levelId,
        ':pathId': this.$route.params.pathId,
        ':missionId': this.$route.params.missionId,
      }
    },
    breadcrumbItems() {
      const matchedRoutes = this.$route.matched
      console.log('matchedRoutes', matchedRoutes)
      return matchedRoutes.map(route => ({
        preLabel: route.meta.preLabel,
        preLink: route.meta.preLink,
        label: route.meta.breadcrumb,
        link: route.path,
        routerName: route.name
      }));
    }
  },
  updated() {
    this.currentRoute = this.$route
  }
}
</script>
<style scoped lang="scss">
@import "index";
</style>
