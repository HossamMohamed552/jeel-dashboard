<template>
  <div class="add-school-admin">
    <AddEditSchoolAdmin :schoolId="schoolId"/>
  </div>
</template>
<script>
import Modal from "@/components/Shared/Modal/index.vue";
import AddEditSchoolAdmin from "@/components/Modules/SchoolAdmin/AddEditSchoolAdmin/index.vue";
export default {
  name: "index",
  components: {Modal,AddEditSchoolAdmin},
  data(){
    return{
      schoolId: localStorage.getItem('currentSchoolId'),
    }
  },
}
</script>
<style scoped lang="scss">

</style>
