<template>
  <section class="login">
    <LoginComponent @handleLogin="handleLogin($event)" :loading="loading"/>
    <Modal
      :content-message="'يتم إرسال التحقيق إلى بريدك الإلكترونى'"
      :showModal="showModalVerify"
      :is-verify="true"
      @cancelWithConfirm="cancelWithConfirm($event)"
    />
    <Modal
      :content-message="'برجاء التاكد من بريدك الإلكترونى'"
      :showModal="showModalVerifyCheck"
      :is-verify-check="true"
      @cancelWithConfirm="cancelWithConfirmCheck($event)"
    />
  </section>
</template>

<script>
import Login from "@/components/LoginAdmin/index.vue";
import CopyRight from "@/components/Shared/CopyRight/index.vue";
import {postLoginRequest, postVerifyRequest} from "@/api/register";
import {mapActions} from "vuex";
import Modal from "@/components/Shared/Modal/index.vue";
import LoginComponent from "@/components/LoginAdmin/index.vue";

export default {
  name: "login",
  components: {
    LoginComponent,
    Modal,
    Login,
    CopyRight,
  },
  data() {
    return {
      test:'',
      loading: false,
      showModalVerify: false,
      showModalVerifyCheck: false,
      email:""
    };
  },
  methods: {
    ...mapActions(["setUser", "show"]),
    showModal() {
      this.show();
    },
    handleLogin($event) {
      this.loading = true;
      this.email = $event.email
      this.ApiService(postLoginRequest($event))
        .then((response) => {
          response.data.code === 200 ? (this.loading = false) : (this.loading = true);
          let payload = {};
          payload.user = response.data.data.user;
          payload.token = response.data.data.token_data;
          this.showModal();
          this.setUser(payload);
        })
        .catch((error) => {
          this.loading = false;
          if (error.response.status === 403) {
            this.showModalVerify = true
          }
        });
    },
    cancelWithConfirm(){
      this.ApiService(postVerifyRequest({email: this.email})).then((response) => {
        this.showModalVerify = false
      }).then(()=>{
        this.showModalVerifyCheck = true
      })
    },
    cancelWithConfirmCheck(){
      this.showModalVerifyCheck = false
    }
  },
};
</script>

<style scoped lang="scss">
@import "./index";
</style>
