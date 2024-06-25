<template>
  <div>
    <Modal :content-message="$t('CONTROLS.add_successfully')" :showModal="showModal"
           :is-success="true"/>
    <Modal :content-message="$t('CONTROLS.already_exists')" :showModal="showModalFailed"
           :isUsed="true"
           @cancelWithConfirm="showModalFailed=false"/>
    <AddEditAchievement
      :loading="loading"
      @editAchievement="editAchievement($event)"/>
  </div>
</template>
<script>
import AddEditAchievement from "@/components/Modules/Achievement/AddEditAchievement/index.vue";
import {postAchievementRequest, putEditAchievementRequest} from "@/api/achievement";
import ApiService from "@/api/ApiService";
import Modal from "@/components/Shared/Modal/index.vue";

export default {
  name: "index",
  components: {Modal, AddEditAchievement},
  data() {
    return {
      loading: false,
      showModal: false,
      showModalFailed: false,
    }
  },
  methods: {
    editAchievement($event) {
      this.loading = true;
      ApiService(putEditAchievementRequest(this.$route.params.id,$event)).then(() => {
        this.loading = false;
        this.showModal = true;
        setTimeout(() => {
          this.showModal = false;
          this.$router.push("/dashboard/achievements");
        }, 1500);
      })
        .catch((error) => {
          this.showModalFailed = !!error.response.data.errors.includes('قيمة الحقل الاسم مُستخدمة من قبل');
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
}
</script>

<style scoped lang="scss">

</style>
