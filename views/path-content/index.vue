<template>
  <div class="custom-container">
    <ListItems
      :tableItems="pathsList" :fieldsList="fieldsList"
      @detailItem="detailItem($event)"
      @editItem="editItem($event)" @deleteItem="deleteItem($event)"
      :loading="loading"
      :showSortControls="false"
    >
    </ListItems>
  </div>
</template>
<script>
import axios from "axios";
import {getPathContentRequest} from "@/api/path-content";
import Button from "@/components/Shared/Button/index.vue";
import ListItems from "@/components/ListItems/index.vue";
import {getLevelsRequest} from "@/api/level";

export default {
  name: "index",
  components: {ListItems, Button},
  data() {
    return {
      pathsList: [],
      loading: false,
      showModal: false,
      groupSearchWord: "",
      fieldsList: [
        {key: "id", label: "التسلسل"},
        {key: "name", label: "اسم المرحلة"},
        {key: "allowEdit", label: "إمكانيه التعديل"},
        {key: "edit", label: "تعديل"},
      ],
    }
  },
  methods: {
    deleteItem($event) {
      this.itemId = $event
      this.showModal = true
    },
    detailItem($event) {
      this.$router.push(`/dashboard/levels/show/${$event}`)
    },
    editItem($event) {
      this.$router.push(`/dashboard/levels/edit/${$event}`)
    },
    getLevels(event) {
      this.loading = true
      const params = event
      this.ApiService(getLevelsRequest(params)).then((response) => {
        this.levelsList = response.data.data
        this.totalNumber = response.data.meta.total
      }).finally(() => {
        this.loading = false;
      });
    }
  },
  mounted() {
    this.loading = true
    this.ApiService(getPathContentRequest(this.$route.params.id)).then((response) => {
      this.loading = false
      this.pathsList = response.data.data
    })
  }
}
</script>
<style scoped lang="scss">
@import "./index";
</style>
