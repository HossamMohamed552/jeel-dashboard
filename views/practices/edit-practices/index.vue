<template>
  <div class="add-practice">
    <Modal :content-message="'تمت التعديل بنجاح'" :showModal="showModal" :is-success="true"/>
    <AddEditQuiz @handleEditQuiz="handleEditQuiz" @handleCancel="handleCancel"/>
  </div>
</template>
<script>
import Modal from "@/components/Shared/Modal/index.vue";
import AddEditQuiz from "@/components/Modules/Quizzes/AddEditQuiz/index.vue";
import {postQuizRequest} from "@/api/quiz";
import axios from "axios";
import VueCookies from "vue-cookies";

export default {
  name: "index",
  components: {Modal, AddEditQuiz},
  data() {
    return {
      showModal: false
    }
  },
  methods: {
    handleEditQuiz(quiz) {
      const formData = new FormData()
      formData.append('name',quiz.name);
      formData.append('description',quiz.description);
      formData.append('total_question',quiz.total_question);
      formData.append('type',quiz.type);
      formData.append('learning_path_id',quiz.learning_path_id);
      formData.append('level_id',quiz.level_id);
      formData.append('_method','PUT');
      for (let questions = 0; questions < quiz.questions.length;) {
        formData.append(`questions[${questions}]`, quiz.questions[questions].id);
        questions++
      }
      this.showModal = true
      axios.post(`/quizzes/${this.$route.params.id}`, formData, {
        headers: {
          Authorization: `Bearer ${VueCookies.get("token")}`,
          locale: 'ar',
          'Content-Type': 'multipart/form-data'
        }
      }).then(()=>{
        setTimeout(() => {
          this.showModal = false
        }, 3000)
        this.$router.push('/dashboard/practices')
      }).catch(()=>this.showModal = false)
    },
    handleCancel() {
      this.$router.push('/dashboard/practices')
    }
  }
}
</script>
<style scoped lang="scss">
@import "./index";
</style>
