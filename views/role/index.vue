<template>
  <section class="container-fluid custom-container">
    <ListItems :header-name="''" :fieldsList="fieldsList" :table-items="rolesList"
               :v-search-model="roleSearchWord" @detailItem="detailItem($event)"
               @editItem="editItem($event)" @deleteItem="deleteItem($event)">
      <template #buttons>
        <Button :custom-class="'btn-add rounded-btn big-padding'" @click="goToAddRole">
          <img src="@/assets/images/icons/plus.svg">
          <span>إضافة صلاحية جديدة</span>
        </Button>
      </template>
    </ListItems>
    <Modal :content-message="'حذف الصلاحية'"
           :content-message-question="'هل انت متأكد من حذف الصلاحية'"
           :showModal="showModal"
           @cancel="cancel($event)"
           @cancelWithConfirm="cancelWithConfirm($event)"/>
  </section>
</template>
<script>
import Button from "@/components/Shared/Button/index.vue";
import ListItems from "@/components/ListItems/index.vue";
import Modal from "@/components/Shared/Modal"
import {getRolesRequest} from "@/api/role";
import {deleteRoleRequest} from "@/api/role";
import router from "@/router";

export default {
  name: "index",
  components: {ListItems, Button, Modal},
  data() {
    return {
      showModal: false,
      roleSearchWord: '',
      rolesList: [],
      fieldsList: [
        {
          key: "id",
          label: this.$i18n.t("TABLE_FIELDS.id")
        },
        {
          key: "name",
          label: this.$i18n.t("TABLE_FIELDS.name")
        },
        {
          key: "description",
          label: this.$i18n.t("TABLE_FIELDS.description")
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
    goToAddRole(){
      this.$router.push('/dashboard/role/add')
    },
    getRoles(){
      this.ApiService(getRolesRequest()).then((response) => {
        this.rolesList = response.data.data
      })
    },
    searchBy($event) {
      console.log('$event', $event)
    },
    detailItem($event) {
      console.log('detailItem', $event)
    },
    editItem($event) {
      console.log('editItem', $event)
    },
    deleteItem($event) {
      console.log('deleteItem', $event)
      this.itemId = $event
      this.showModal = true
    },
    cancel($event) {
      this.showModal = $event
    },
    cancelWithConfirm() {
      this.ApiService(deleteRoleRequest(this.itemId))
      this.cancel()
      this.getRoles()
    }
  },
  mounted() {
    this.getRoles()
  }
}
</script>
<style scoped lang="scss">
@import "./index";
</style>
