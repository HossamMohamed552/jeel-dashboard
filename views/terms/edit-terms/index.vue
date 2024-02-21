  <template>
  <div class="edit-term">
    <Modal :content-message="'تم التعديل بنجاح'"
           :showModal="showModal"
           :is-success="true"/>
    <Modal :content-message="'هذا السجل موجود من قبل'" :showModal="showModalFailed" :isUsed="true"
           @cancelWithConfirm="showModalFailed=false"/>
    <AddEditTerms
      :loading="loading"
      @handleEditTerm="handleEditTerm($event)"
      @handleCancel="handleCancel"
    />
  </div>
</template>
<script>

import AddEditTerms from "@/components/Modules/Users/AddEditTerms/index.vue";
import Modal from "@/components/Shared/Modal/index.vue";
import {putTermsRequest} from "@/api/term";
export default {
  name: "index",
  components:{Modal, AddEditTerms},
  data(){
    return{
      loading: false,
      showModal: false,
      showModalFailed: false,
    }
  },
  methods:{
    handleEditTerm($event) {
      this.loading = true
      this.ApiService(putTermsRequest(this.$route.params.id,$event)).then(() => {
        this.loading = false
        this.showModal = true;
      }).then(() => {
        this.$router.push("/dashboard/terms");
      }).catch((error) => {
        this.showModalFailed = !!error.response.data.errors.includes('قيمة الحقل الإسم مُستخدمة من قبل');
      }).finally(() => {
        this.loading = false;
      });
    },
    handleCancel() {
      this.$router.push("/dashboard/terms");
    },
  }
}
</script>
<style scoped lang="scss">
</style>
