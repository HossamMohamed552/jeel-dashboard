<template>
  <section class="container-fluid custom-container">
    <ListItems :header-name="'شارات جيل'" :fieldsList="fieldsList" :table-items="badgesList"
               :v-search-model="roleSearchWord" @detailItem="detailItem($event)"
               :number-of-item="totalNumber"
               @editItem="editItem($event)" @deleteItem="deleteItem($event)"
               :loading="loading" @refetch="getBadgesRequest" :permission_delete="'delete-badges'" :permission_edit="'edit-badges'" :permission_view="'show-badges'">
      <template #buttons>
        <Button :custom-class="'btn-add rounded-btn big-padding'" @click="goToAddBadge" v-if="user.permissions.includes(`add-badge`)">
          <img src="../../src/assets/images/icons/plus.svg">
          <span>إضافة شارة جديدة</span>
        </Button>
      </template>
    </ListItems>
    <Modal :content-message="'حذف شارة جيل'"
           :content-message-question="'هل انت متأكد من حذف شارة جيل'"
           :showModal="showModal"
           @cancel="cancel($event)"
           :is-warning="true"
           @cancelWithConfirm="cancelWithConfirm($event)"/>
  </section>
</template>
<script>
import Button from "@/components/Shared/Button/index.vue";
import ListItems from "@/components/ListItems/index.vue";
import Modal from "@/components/Shared/Modal/index.vue"
import { getBadgesRequest, deleteBadgeRequest } from "@/api/badge";
import {mapGetters} from "vuex";

export default {
  name: "index",
  components: {ListItems, Button, Modal},
  data() {
    return {
      loading: false,
      showModal: false,
      roleSearchWord: '',
      totalNumber: 0,
      badgesList: [],
      fieldsList: [
        {
          key: "id",
          label: this.$i18n.t("TABLE_FIELDS.id")
        },
        {
          key: "name",
          label: this.$i18n.t("TABLE_FIELDS.badge_name")
        },
        {
          key: "main_percentage",
          label: this.$i18n.t("TABLE_FIELDS.percentage_of")
        },
        {
          key: "max_percentage",
          label: this.$i18n.t("TABLE_FIELDS.percentage_to")
        },
        {
          key: "actions",
          label: this.$i18n.t("TABLE_FIELDS.actions")
        }
      ],
      itemId: 0,
    }
  },
  methods: {
    goToAddBadge() {
      this.$router.push('/dashboard/jeel-badge/add')
    },
    getBadges(event) {
      this.loading = true
      const params = event
      this.ApiService(getBadgesRequest(params)).then((response) => {
        this.badgesList = response.data.data
        this.totalNumber = response.data.meta.total
      }).finally(() => {
        this.loading = false;
      });
    },

    detailItem($event) {
      this.$router.push(`/dashboard/role/show/${$event}`)
    },
    editItem($event) {
      this.$router.push(`/dashboard/role/edit/${$event}`)
    },
    deleteItem($event) {
      this.itemId = $event
      this.showModal = true
    },
    cancel($event) {
      this.showModal = $event
    },
    cancelWithConfirm() {
      this.ApiService(deleteBadgeRequest(this.itemId)).then(() => {
        this.getBadges()
      })
      this.cancel()
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  mounted() {
    this.getBadges()
  }
}
</script>
<style scoped lang="scss">
@import "index";
</style>
