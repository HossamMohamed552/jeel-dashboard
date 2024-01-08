<template>
  <section class="container-fluid custom-container">
    <ListItems :header-name="'قائمة الفصول'" :number-of-item="totalNumber"
               :tableItems="classesList" :fields-list="fieldsList" :v-search-model="groupSearchWord" @detailItem="detailItem($event)"
               @editItem="editItem($event)" @deleteItem="deleteItem($event)"
               @refetch="getClasses"
               :loading="loading"
               :permission_delete="'delete-classes'"
               :permission_edit="'edit-classes'"
               :permission_view="'show-classes'"
               />
  </section>
</template>
<script>
import ListItems from "@/components/ListItems/index.vue";
import {deleteClassRequest, getClassRequest} from "@/api/class";

export default {
  name: "index",
  components: {ListItems},
  data() {
    return {
      loading: false,
      showModal: false,
      groupSearchWord: "",
      classesList: [],
      totalNumber: null,
      fieldsList: [
        {key: "id", label: "التسلسل"},
        {key: "name", label: this.$i18n.t('TABLE_FIELDS.name')},
        {key: "term", label: this.$i18n.t('TABLE_FIELDS.superTerm')},
        {key: "students_count", label: this.$i18n.t('TABLE_FIELDS.students_count')},
        {key: "actions", label: "الإجراء"},
      ],
    }
  },
  methods: {
    getClasses(event) {
      this.loading = true
      const params = !event ? { per_page: 10 } : event;
      this.ApiService(getClassRequest(params)).then((response) => {
        this.classesList = response.data.data
        this.totalNumber = response.data.meta.total
      }) .finally(() => {
        this.loading = false;
      });
    },
    detailItem($event) {
      this.$router.push(`/dashboard/super-class/show/${$event}`)
    },
    editItem($event) {
      this.$router.push(`/dashboard/super-class/edit/${$event}`)
    },
    deleteItem($event) {
      this.itemId = $event
      this.showModal = true
    },
    cancel($event) {
      this.showModal = $event
    },
    cancelWithConfirm() {
      this.ApiService(deleteClassRequest(this.itemId)).then(() => {
        this.getClasses()
      })
      this.cancel()
    }
  },
  mounted() {
    this.getClasses()
  }
}
</script>
<style scoped lang="scss">
@import "./index";
</style>
