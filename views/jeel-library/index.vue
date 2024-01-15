<template>
  <section class="container-fluid custom-container">
    <!------------------ st custom table section --------------->
    <ListItems
      :header-name="'مكتبة جيل'"
      :fieldsList="fieldsList"
      :table-items="jeelLibraryList"
      :v-search-model="groupSearchWord"
      @detailItem="detailItem($event)"
      :number-of-item="totalNumber"
      @editItem="editItem($event)"
      @deleteItem="deleteItem($event)"
      :loading="loading"
      @refetch="getJeelLibrary"
      :permission_delete="'delete-prize-library'"
      :permission_edit="'edit-prize-library'"
      :permission_view="'show-prize-library'"
    >
      <template #buttons>
        <Button
          :custom-class="'btn-add rounded-btn big-padding'"
          @click="goToItemToJeelLibrary"
          v-if="user.permissions.includes(`add-prize-library`)"
        >
          <img src="../../src/assets/images/icons/plus.svg" />
          <span>إضافة عنصر للمكتبة </span>
        </Button>
      </template>
    </ListItems>
    <!------------------ nd custom table section --------------->
    <!------------------ st delete model --------------->
    <Modal
      :content-message="'حذف عنصر من المكتبة'"
      :content-message-question="'هل انت متأكد من حذف صندوق الطاقة'"
      :showModal="showModal"
      @cancel="cancel($event)"
      :is-warning="true"
      @cancelWithConfirm="cancelWithConfirm($event)"
    />
    <!------------------ st delete model --------------->
  </section>
</template>
<script>
import Button from "@/components/Shared/Button/index.vue";
import ListItems from "@/components/ListItems/index.vue";
import Modal from "@/components/Shared/Modal/index.vue";
import { getJeelLibraryRequest, deleteJeelLibraryRequest } from "@/api/jeel-library";
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
      groupSearchWord: "",
      totalNumber: 0,
      jeelLibraryList: [],
      fieldsList: [
        {
          key: "id",
          label: this.$i18n.t("TABLE_FIELDS.id"),
        },
        {
          key: "level",
          label: this.$i18n.t("TABLE_FIELDS.jeel_library_level"),
        },
        {
          key: "type",
          label: this.$i18n.t("TABLE_FIELDS.jeel_library_type"),
        },
        {
          key: "name",
          label: this.$i18n.t("TABLE_FIELDS.jeel_library_name"),
        },
        {
          key: "actions",
          label: this.$i18n.t("TABLE_FIELDS.actions"),
        },
      ],
      itemId: 0,
    };
  },
  methods: {
    getJeelLibrary(event) {
      this.loading = true;
      const params = event;
      this.ApiService(getJeelLibraryRequest(params))
          .then((response) => {
            this.jeelLibraryList = response.data.data.map((item) => {
              return {
                id: item.id,
                level: item.level,
                type: item.type.name,
                name: item.file_name,
              };
            });

            this.totalNumber = response.data.meta.total;
          })
          .finally(() => {
            this.loading = false;
          });
    },

    goToItemToJeelLibrary() {
      this.$router.push("/dashboard/jeel-library/add");
    },
    detailItem($event) {
      this.$router.push(`/dashboard/jeel-library/show/${$event}`);
    },
    editItem($event) {
      this.$router.push(`/dashboard/jeel-library/edit/${$event}`);
    },

    deleteItem($event) {
      this.itemId = $event;
      this.showModal = true;
    },
    cancel($event) {
      this.showModal = $event;
    },
    cancelWithConfirm() {
      this.ApiService(deleteJeelLibraryRequest(this.itemId)).then(() => {
        this.getJeelLibrary();
      });
      this.cancel();
    },

  },
  computed: {
    ...mapGetters(["user"]),
  },
  mounted() {
    this.getJeelLibrary();
  },
};
</script>
<style scoped lang="scss">
@import "index";
</style>
