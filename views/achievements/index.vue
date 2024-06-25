<template>
  <section class="container-fluid custom-container">
    <ListItems
      :header-name="$t('achievements.achievements')"
      :fieldsList="fieldsList"
      :number-of-item="totalNumber"
      :table-items="achievements"
      :v-search-model="achievementsSearchWord"
      :loading="loading"
      @detailItem="detailItem($event)"
      @editItem="editItem($event)"
      @deleteItem="deleteItem($event)"
      @refetch="getAchievements"
      :permission_delete="'delete-achievements'"
      :permission_edit="'edit-achievements'"
      :permission_view="'show-achievements'"
    >
      <template #buttons>
        <Button
          :custom-class="'btn-add rounded-btn big-padding'"
          @click="goToAddAchievement"
          v-if="user.permissions.includes(`add-achievements`)"
        >
          <img src="@/assets/images/icons/plus.svg"/>
          <span>{{ $t('achievements.ADD') }}</span>
        </Button>
      </template>
    </ListItems>
    <Modal
      :content-message="$t('achievements.delete_achievement')"
      :content-message-question="$t('achievements.confirm_delete_achievement')"
      :showModal="showModal"
      @cancel="cancel($event)"
      :is-warning="true"
      @cancelWithConfirm="cancelWithConfirm($event)"
    />
    <Modal :content-message="$t('can_not_delete')"
           :showModal="showModalFailed" :alarm="true"
           @cancelWithConfirm="showModalFailed=false"/>
  </section>
</template>
<script>
import ListItems from "@/components/ListItems/index.vue";
import Button from "@/components/Shared/Button/index.vue";
import {mapGetters} from "vuex";
import ApiService from "@/api/ApiService";
import {deleteAchievementRequest, getAchievementRequest} from "@/api/achievement";
import Modal from "@/components/Shared/Modal/index.vue";

export default {
  name: "index",
  components: {Modal, Button, ListItems},
  data() {
    return {
      loading: false,
      showModal: false,
      showModalFailed: false,
      achievementsSearchWord: "",
      achievements: [],
      totalNumber: 0,
      itemId: 0,
    };
  },
  methods:{
    goToAddAchievement(){
      this.$router.push('/dashboard/achievement/add')
    },
    getAchievements(event){
      this.loading = true;
      ApiService(getAchievementRequest(event)).then((response)=>{
        this.achievements = response.data.data
        this.totalNumber = response.data.meta.total
        this.loading = false;
      })
    },
    detailItem($event){
      this.$router.push(`/dashboard/achievement/show/${$event}`)
    },
    editItem($event){
      this.$router.push(`/dashboard/achievement/edit/${$event}`)
    },
    deleteItem($event){
      this.itemId = $event;
      this.showModal = true;
    },
    cancel($event) {
      this.showModal = $event;
    },
    cancelWithConfirm() {
      this.ApiService(deleteAchievementRequest(this.itemId)).then(() => {
        this.getAchievements();
      }).catch((error) => {
        this.showModalFailed = error.response.data.code === 23000;
      }).finally(() => {
        this.cancel();
      })
    },
  },
  computed: {
    fieldsList() {
      return [
        {
          key: "vid",
          label: this.$i18n.t("TABLE_FIELDS.id"),
        },
        {
          key: "name",
          label: this.$i18n.t("achievements.name"),
        },
        {
          key: "interaction.name",
          label: this.$i18n.t("achievements.interactionType"),
        },
        {
          key: "start_date",
          label: this.$i18n.t("achievements.startDate"),
        },
        {
          key: "end_date",
          label: this.$i18n.t("achievements.endDate"),
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
    this.getAchievements()
  }
}
</script>
<style scoped lang="scss">

</style>
