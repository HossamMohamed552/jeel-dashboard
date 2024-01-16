<template>
  <section class="container-fluid custom-container">
    <!------------------ st custom table section --------------->
    <ListItems
      :header-name="'مكتبة الشراء'"
      :fieldsList="fieldsList"
      :table-items="jeelStoreLibraryList"
      :v-search-model="groupSearchWord"
      @detailItem="detailItem($event)"
      :number-of-item="totalNumber"
      @editItem="editItem($event)"
      @deleteItem="deleteItem($event)"
      :loading="loading"
      @refetch="getJeelStoreLibrary"
      :permission_delete="'delete-badge'"
      :permission_edit="'edit-badge'"
      :permission_view="'show-badge'"
    >
      <template #buttons>
        <Button
          :custom-class="'btn-add rounded-btn big-padding'"
          @click="goToAddJeelStoreLibrary"
          v-if="user.permissions.includes(`add-characters`)"
        >
          <img src="../../src/assets/images/icons/plus.svg" />
          <span>إضافة محتوى </span>
        </Button>
      </template>
    </ListItems>
    <!------------------ nd custom table section --------------->
    <!------------------ st delete model --------------->
    <Modal
      :content-message="'حذف محتوى '"
      :content-message-question="'هل انت متأكد من حذف محتوى'"
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
      groupSearchWord: "",
      totalNumber: 0,
      jeelStoreLibraryList: [],
      fieldsList: [
        {
          key: "id",
          label: this.$i18n.t("TABLE_FIELDS.id"),
        },
        {
          key: "name",
          label: "اسم المحتوى",
        },
        {
          key: "level",
          label: "الصف الدراسى",
        },
        {
          key: "type",
          label: "نوع المحتوى",
        },
        {
          key: "gems",
          label: "عدد الجيمز",
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
    getJeelStoreLibrary(event) {
      this.loading = true;
      const params = event;
      this.ApiService(getJeelStoreLibraryRequest(params))
          .then((response) => {
            this.jeelStoreLibraryList = response.data.data.map(
                (item) => {
                  return {
                    id: item.id,
                    name: item.file_name,
                    level: item.level,
                    gems: item.gems,
                    type: item.type.name,
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
        this.getJeelStoreLibrary();
      });
      this.cancel();
    },

  },
  computed: {
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
