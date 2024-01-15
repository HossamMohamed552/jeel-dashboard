<template>
  <section class="container-fluid custom-container">
    <ListItems
      :header-name="'قائمة الشخصيات'"
      :fieldsList="fieldsList"
      :table-items="charactersList"
      :v-search-model="groupSearchWord"
      @detailItem="detailItem($event)"
      :number-of-item="totalNumber"
      @editItem="editItem($event)"
      @deleteItem="deleteItem($event)"
      :loading="loading"
      @refetch="getcharacters"
      :permission_delete="'delete-prize-characters'"
      :permission_edit="'edit-prize-characters'"
      :permission_view="'show-prize-characters'"
    >
      <template #buttons>
        <Button
          :custom-class="'btn-add rounded-btn big-padding'"
          @click="goToAddCharacter"
          v-if="user.permissions.includes(`add-prize-characters`)"
        >
          <img src="../../src/assets/images/icons/plus.svg" />
          <span>إضافة شخصية جديدة </span>
        </Button>
      </template>
    </ListItems>
    <Modal
      :content-message="'حذف الشخصية'"
      :content-message-question="'هل انت متأكد من حذف الشخصية'"
      :showModal="showModal"
      @cancel="cancel($event)"
      :is-warning="true"
      @cancelWithConfirm="cancelWithConfirm($event)"
    />
  </section>
</template>
<script>
import Button from "@/components/Shared/Button/index.vue";
import ListItems from "@/components/ListItems/index.vue";
import Modal from "@/components/Shared/Modal/index.vue";
import { getCharactersRequest, deleteCharacterRequest } from "@/api/character";
import { mapGetters } from "vuex";

export default {
  name: "index",
  components: { ListItems, Button, Modal },
  data() {
    return {
      loading: false,
      showModal: false,
      groupSearchWord: "",
      totalNumber: 0,
      charactersList: [],
      fieldsList: [
        {
          key: "id",
          label: this.$i18n.t("TABLE_FIELDS.id"),
        },
        {
          key: "name",
          label: this.$i18n.t("TABLE_FIELDS.character_name"),
        },
        {
          key: "image",
          label: this.$i18n.t("TABLE_FIELDS.character_logo"),
        },
        {
          key: "country",
          label: this.$i18n.t("TABLE_FIELDS.countryName"),
        },
        {
          key: "chracter_type",
          label: this.$i18n.t("TABLE_FIELDS.character_type"),
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
    goToAddCharacter() {
      this.$router.push("/dashboard/characters/add");
    },
    getcharacters(event) {
      this.loading = true;
      const params = event;
      this.ApiService(getCharactersRequest(params))
        .then((response) => {
          this.charactersList = response.data.data;
          this.totalNumber = response.data.meta.total;
        })
        .finally(() => {
          this.loading = false;
        });
    },

    detailItem($event) {
      this.$router.push(`/dashboard/characters/show/${$event}`);
    },
    editItem($event) {
      this.$router.push(`/dashboard/characters/edit/${$event}`);
    },
    deleteItem($event) {
      this.itemId = $event;
      this.showModal = true;
    },
    cancel($event) {
      this.showModal = $event;
    },
    cancelWithConfirm() {
      this.ApiService(deleteCharacterRequest(this.itemId)).then(() => {
        this.getcharacters();
      });
      this.cancel();
    },
  },
  computed: {
    ...mapGetters(["user"]),
  },
  mounted() {
    this.getcharacters();
  },
};
</script>
<style scoped lang="scss">
@import "index";
</style>
