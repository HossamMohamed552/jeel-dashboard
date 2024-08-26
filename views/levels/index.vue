<template>
  <section class="container-fluid custom-container">
    <ListItems
      :header-name="$t('LEVEL.levels')"
      :number-of-item="totalNumber"
      :tableItems="levelsList"
      :fieldsList="fieldsList"
      :v-search-model="groupSearchWord"
      :isRefresh="refresh"
      @detailItem="detailItem($event)"
      @editItem="editItem($event)"
      @deleteItem="deleteItem($event)"
      @refetch="getLevels"
      :loading="loading"
      :permission_delete="'delete-levels'"
      :permission_edit="'edit-levels'"
      :permission_view="'show-levels'"
    >
      <template #buttons>
        <Button
          :custom-class="'btn-add rounded-btn big-padding'"
          @click="goToAddLevel"
          v-if="user.permissions.includes(`add-levels`)"
        >
          <img src="@/assets/images/icons/plus.svg"/>
          <span>{{ $t('LEVEL.ADD_NEW') }}</span>
        </Button>
      </template>
    </ListItems>
    <Modal
      :content-message="$t('LEVEL.delete_level')"
      :content-message-question="$t('LEVEL.confirm_delete_level')"
      :showModal="showModal"
      @cancel="cancel($event)"
      :is-warning="true"
      @cancelWithConfirm="cancelWithConfirm($event)"
    />
    <Modal :content-message="$t('can_not_delete')"
           :showModal="showModalFailed" :alarm="true"
           @cancelWithConfirm="showModalFailed=false"/>
    <Modal :content-message="$t('CONTROLS.delete_successfully')" :showModal="deleteModal" :is-success="true" />
  </section>
</template>

<script>
import Button from "@/components/Shared/Button/index.vue";
import ListItems from "@/components/ListItems/index.vue";
import {deleteLevelRequest, getLevelsRequest} from "@/api/level";
import Modal from "@/components/Shared/Modal/index.vue";
import {mapGetters} from "vuex";

export default {
  components: {Modal, ListItems, Button},
  data() {
    return {
      loading: false,
      showModal: false,
      showModalFailed: false,
      groupSearchWord: "",
      levelsList: [],
      totalNumber: 0,
      refresh: false,
      deleteModal: false,
    };
  },
  computed: {
    fieldsList(){
      return  [
        {key: "vid", label: this.$i18n.t("TABLE_FIELDS.id")},
        {key: "name", label: this.$i18n.t("LEVEL.name")},
        {key: "actions", label: this.$i18n.t("TABLE_FIELDS.actions")},
      ]
    },
    ...mapGetters(["user"]),
  },
  methods: {
    goToAddLevel() {
      this.$router.push("/dashboard/levels/add");
    },
    getLevels(event) {
      this.loading = true;
      this.ApiService(getLevelsRequest(event))
        .then((response) => {
          this.levelsList = response.data.data;
          this.totalNumber = response.data.meta.total;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    detailItem($event) {
      this.$router.push(`/dashboard/levels/show/${$event}`);
    },
    editItem($event) {
      this.$router.push(`/dashboard/levels/edit/${$event}`);
    },
    deleteItem($event) {
      this.itemId = $event;
      this.showModal = true;
    },
    cancel($event) {
      this.showModal = $event;
    },
    cancelWithConfirm() {
      this.ApiService(deleteLevelRequest(this.itemId)).then(() => {
        this.deleteModal = true;
        this.getLevels();
        this.refresh = true
        setTimeout(()=>{
          this.deleteModal = false
        },1500)
      }).catch((error) => {
        this.showModalFailed = error.response.data.code === 23000;
      }).finally(() => {
        this.cancel();
      })
    },
  },
  mounted() {
    this.getLevels();
  },
};
</script>

<style scoped lang="scss">
@import "./index";
</style>
