<template>
  <div class="content">
    <div class="login-form">
      <div class="login-form__logo">
        <img src="@/assets/images/logo.svg">
      </div>
      <validation-observer v-slot="{ invalid }" ref="loginForm">
        <form @submit.prevent="onSubmit">
          <div class="hold-field">
            <TextField v-model="user.email"  :label="$t('AUTH.email')" :name="'email'"
                       :rules="'required|email'"></TextField>
          </div>
          <div class="hold-field">
            <TextField v-model="user.password" :label="$t('AUTH.password')" :name="'password'"
                       :rules="'required'"
                       type="password"></TextField>
          </div>
          <div class="hold-field remember-me">
            <CheckboxField value="rememberMe" :name="$t('AUTH.rememberMe')"></CheckboxField>
            <router-link to="/forget-password">{{ $t('AUTH.forgetPassword') }}</router-link>
          </div>
          <div class="hold-button">
            <Button type="submit"
                    :d-block="true"
                    :loading="loading"
                    :disabled="invalid"
                    custom-class="w-100 d-block submit-btn">
              {{ $t("AUTH.login") }}
            </Button>
          </div>
        </form>
      </validation-observer>
    </div>
    <div class="login-form__help">
      <span>{{ $t('AUTH.help') }}</span>
    </div>
    <CopyRight/>
  </div>

</template>

<script>
import FormValidation from "@/components/Shared/FormValidation/index.vue";
import TextField from "@/components/Shared/TextField/index.vue";
import Button from "@/components/Shared/Button/index.vue";
import CheckboxField from "@/components/Shared//CheckboxField"
import CopyRight from "@/components/Shared/CopyRight/index.vue";

export default {
  components: {
    CopyRight,
    FormValidation,
    TextField,
    Button,
    CheckboxField
  },
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      user: {
        email: '',
        password: ''
      }
    }
  },
  methods:{
    onSubmit() {
      this.$refs.loginForm.validate().then((success)=>{
        if (!success){
          return;
        }
        this.$emit("handleLogin", this.user)
        this.user.email = this.user.password = '';
        this.$nextTick(() => {
          this.$refs.loginForm.reset();
        });
      })
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./index";
</style>
