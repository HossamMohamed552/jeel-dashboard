export const TogglePasswordMixins = {
  data() {
    return {
      passwordIcon: "eye",
      passwordType: "password",
      confirmPasswordIcon: "eye",
      confirmPasswordType: "password",
      newPasswordIcon: "eye",
      newPasswordType: "password"
    }
  },
  methods: {
    hideShowPassword(type = "password") {
      if (type === "confirm") {
        this.confirmPasswordType = this.confirmPasswordType === "text" ? "password" : "text"
        this.confirmPasswordIcon = this.confirmPasswordIcon === "eye" ? "eye-slash" : "eye"
      } else if (type === "new") {
        this.newPasswordType = this.newPasswordType === "text" ? "password" : "text"
        this.newPasswordIcon = this.newPasswordIcon === "eye" ? "eye-slash" : "eye"
      } else {
        this.passwordType = this.passwordType === "text" ? "password" : "text"
        this.passwordIcon = this.passwordIcon === "eye" ? "eye-slash" : "eye"
      }
    }
  }
}
