<template>
  <section class="container-fluid custom-container">
    <!------------------ st custom table section --------------->
    <ListItems
      :header-name="'مجموعة جيمز'"
      :fieldsList="fieldsList"
      :table-items="jeelGamesList"
      :v-search-model="groupSearchWord"
      @detailItem="detailItem($event)"
      :number-of-item="totalNumber"
      @editItem="editItem($event)"
      @deleteItem="deleteItem($event)"
      :loading="loading"
      @refetch="getJeelStoreGames"
      :permission_delete="'delete-badge'"
      :permission_edit="'edit-badge'"
      :permission_view="'show-badge'"
    >
      <template #buttons>
        <Button
          :custom-class="'btn-add rounded-btn big-padding'"
          @click="goToAddJeelStoreGames"
          v-if="user.permissions.includes(`add-characters`)"
        >
          <img src="../../src/assets/images/icons/plus.svg" />
          <span>إضافة مجموعه </span>
        </Button>
      </template>
    </ListItems>
    <!------------------ nd custom table section --------------->
    <!------------------ st delete model --------------->
    <Modal
      :content-message="'حذف مجموعه '"
      :content-message-question="'هل انت متأكد من حذف مجموعه'"
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
import { getJeelStoreGamesRequest, deleteJeelStoreGamesRequest } from "@/api/jeel-store-games";
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
      jeelGamesList: [],
      fieldsList: [
        {
          key: "id",
          label: this.$i18n.t("TABLE_FIELDS.id"),
        },
        {
          key: "name",
          label: "اسم المجموعة",
        },
        {
          key: "level",
          label: "الصف الدراسى",
        },
        {
          key: "country",
          label: "عدد الجيمز",
        },
        {
          key: "type",
          label: "عدد العملات",
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
    getJeelStoreGames(event) {
      this.loading = true;
      const params = event;
      this.ApiService(getJeelStoreGamesRequest(params))
          .then((response) => {
            // this.jeelGamesList = response.data.data;
            this.jeelGamesList = response.data.data.map(
                (item) => {
                  let powerUpBoxType = "";
                  if (item.jeel_coins > 0 && item.jeel_xp > 0 ){
                    powerUpBoxType = "نقاط وعملات جيل";
                  }
                  else if (item.jeel_xp > 0 ){powerUpBoxType = "نقاط";}
                  else if (item.jeel_coins >0){ powerUpBoxType = "عملات جيل";}

                  return {
                    id: item.id,
                    name: item.name,
                    level: item.level,
                    country: item.country,
                    term: item.term,
                    type: powerUpBoxType,
                    appear_after_missions: item.appear_after_missions+" مهام ",
                  };

                }
            );

            this.totalNumber = response.data.meta.total;
          })
          .finally(() => {
            this.loading = false;
          });
    },

    goToAddJeelStoreGames() {
      this.$router.push("/dashboard/jeel-store-games/add");
    },
    detailItem($event) {
      this.$router.push(`/dashboard/jeel-store-games/show/${$event}`);
    },
    editItem($event) {
      this.$router.push(`/dashboard/jeel-store-games/edit/${$event}`);
    },

    deleteItem($event) {
      this.itemId = $event;
      this.showModal = true;
    },
    cancel($event) {
      this.showModal = $event;
    },
    cancelWithConfirm() {
      this.ApiService(deleteJeelStoreGamesRequest(this.itemId)).then(() => {
        this.getJeelStoreGames();
      });
      this.cancel();
    },

  },
  computed: {
    ...mapGetters(["user"]),
  },
  mounted() {
    this.getJeelStoreGames();
  },
  watch:{
  },
};
</script>
<style scoped lang="scss">
@import "index";
</style>
