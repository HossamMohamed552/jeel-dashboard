<template>
  <div class="add-practice">
    <Modal :content-message="'تمت الإضافة بنجاح'" :showModal="showModal" :is-success="true"/>
    <AddEditQuiz @handleAddQuiz="handleAddQuiz" @handleCancel="handleCancel"/>
  </div>
</template>
<script>
import Modal from "@/components/Shared/Modal/index.vue";
import AddEditQuiz from "@/components/Modules/Quizzes/AddEditQuiz/index.vue";

export default {
  name: "index",
  components: {Modal, AddEditQuiz},
  data() {
    return {
      showModal: false
    }
  },
  methods: {
    handleAddQuiz(data) {
      console.log(data)
    },
    handleCancel() {
      this.$router.push('/dashboard/practices')
    }
  }
}
</script>
<style scoped lang="scss">

</style>
