<template>
  <div class="add-country">
    <Modal :content-message="'تمت الإضافة بنجاح'" :showModal="showModal" :is-success="true" />
    <AddEditLesson
      :loading="loading"
      @addLessons="handleAddLessons($event)"
      @handleCancel="handleCancel"
    />
  </div>
</template>
<script>
import AddEditLesson from "@/components/Modules/Lessons/AddEditLesson/index.vue";
import Modal from "@/components/Shared/Modal/index.vue";
import {postAddLessonRequest} from "@/api/lessons";
export default {
  name: "index",
  components: { Modal, AddEditLesson },
  data() {
    return {
      loading: false,
      showModal: false,
    };
  },
  methods: {
    handleAddLessons($event) {
      this.loading = true;
      this.ApiService(postAddLessonRequest($event))
        .then((response) => {
          this.loading = false;
          this.showModal = true;
          setTimeout(() => {
            this.showModal = false;
          }, 3000);
        })
        .then(() => {
          this.$router.push("/dashboard/lessons");
        }).catch(()=>{
        this.loading = false;
      })
    },
    handleCancel() {
      this.$router.push("/dashboard/lessons");
    },
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
