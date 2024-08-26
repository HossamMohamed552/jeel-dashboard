<template>
  <section class="container-fluid custom-container">
    <!------------------ st custom table section --------------->
    <ListItems
      :header-name="$t('content.list')"
      :fieldsList="fieldsList"
      :table-items="jeelStoreLibraryList"
      :v-search-model="groupSearchWord"
      @detailItem="detailItem($event)"
      :number-of-item="totalNumber"
      @editItem="editItem($event)"
      @deleteItem="deleteItem($event)"
      :loading="loading"
      :isRefresh="refresh"
      :showSearchInput="false"
      @refetch="getJeelStoreLibrary"
      :permission_delete="'delete-store-library'"
      :permission_edit="'edit-store-library'"
      :permission_view="'show-store-library'"
    >
      <template #buttons>
        <Button
          :custom-class="'btn-add rounded-btn big-padding'"
          @click="goToAddJeelStoreLibrary"
          v-if="user.permissions.includes(`add-store-library`)"
        >
          <img src="../../src/assets/images/icons/plus.svg" />
          <span>{{ $t('content.add')}}</span>
        </Button>
      </template>
    </ListItems>
    <!------------------ nd custom table section --------------->
    <!------------------ st delete model --------------->
    <Modal
      :content-message="$t('content.delete')"
      :content-message-question="$t('content.confirm_delete')"
      :showModal="showModal"
      @cancel="cancel($event)"
      :is-warning="true"
      @cancelWithConfirm="cancelWithConfirm($event)"
    />
    <Modal :content-message="$t('CONTROLS.delete_successfully')" :showModal="deleteModal" :is-success="true" />
    <!------------------ st delete model --------------->
  </section>
</template>
<script>
import Button from "@/components/Shared/Button/index.vue";
import ListItems from "@/components/ListItems/index.vue";
import Modal from "@/components/Shared/Modal/index.vue";
import { getJeelStoreLibraryRequest, deleteJeelStoreLibraryRequest } from "@/api/jeel-store-library";
import { mapGetters } from "vuex";
import SelectSearch from "@/components/Shared/SelectSearch/index.vue";
import TextField from "@/components/Shared/TextField/index.vue";

export default {
  name: "index",
  components: {TextField, SelectSearch, ListItems, Button, Modal },
  data() {
    return {
      loading: false,
      showModal: false,
      refresh: false,
      deleteModal: false,
      groupSearchWord: "",
      totalNumber: 0,
      jeelStoreLibraryList: [],
      itemId: 0,
    };
  },
  methods: {
    getJeelStoreLibrary(event) {
      this.loading = true;
      const params = event;
      this.ApiService(getJeelStoreLibraryRequest(params))
          .then((response) => {
            this.jeelStoreLibraryList = response.data.data.map(
                (item) => {
                  return {
                    id: item.id,
                    file_name: item.file_name,
                    "level.name": item.level.name,
                    gems: item.gems,
                    typeStoreLibrary: item.type.name,
                  };

                }
            );

            this.totalNumber = response.data.meta.total;
          })
          .finally(() => {
            this.loading = false;
          });
    },

    goToAddJeelStoreLibrary() {
      this.$router.push("/dashboard/jeel-store-library/add");
    },
    detailItem($event) {
      this.$router.push(`/dashboard/jeel-store-library/show/${$event}`);
    },
    editItem($event) {
      this.$router.push(`/dashboard/jeel-store-library/edit/${$event}`);
    },

    deleteItem($event) {
      this.itemId = $event;
      this.showModal = true;
    },
    cancel($event) {
      this.showModal = $event;
    },
    cancelWithConfirm() {
      this.ApiService(deleteJeelStoreLibraryRequest(this.itemId)).then(() => {
        this.deleteModal = true;
        this.getJeelStoreLibrary();
        this.refresh = true
        setTimeout(()=>{
          this.deleteModal = false
        },1500)
      });
      this.cancel();
    },

  },
  computed: {
    fieldsList(){
      return [
        {
          key: "vid",
          label: this.$i18n.t("TABLE_FIELDS.id"),
        },
        {
          key: "file_name",
          label: this.$i18n.t("content.name"),
        },
        {
          key: "level.name",
          label: this.$i18n.t("content.level"),
        },
        {
          key: "typeStoreLibrary",
          label: this.$i18n.t("content.type"),
        },
        {
          key: "gems",
          label: this.$i18n.t("content.gems"),
        },

        {
          key: "actions",
          label: this.$i18n.t("TABLE_FIELDS.actions"),
        },
      ]
    },
    ...mapGetters(["user"]),
  },
  mounted() {
    this.getJeelStoreLibrary();
  },
  watch:{
  },
};
</script>
<style scoped lang="scss">
@import "index";
</style>
