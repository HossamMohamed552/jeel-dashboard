import { configure, extend, localize } from "vee-validate";
import * as rules from "vee-validate/dist/rules";
import ar from "@/locales/ar-rules.json";
import en from "@/locales/en-rules.json";
import { urlRegex, passwordRegex } from "@/helpers";
for (const rule in rules) {
  extend(rule, rules[rule]);
}

configure({
  generateMessage: localize({
    en,
    ar,
  }),
});
localize(localStorage.getItem("lang") || "ar");

extend("url", {
  message:
    localStorage.getItem("lang") === "ar" ? "من فضلك ادخل رابط صحيح" : "Please enter a valid URL",
  validate: (value) => {
    return urlRegex.test(value);
  },
});

extend("verify_password", {
  message:
    localStorage.getItem("lang") === "ar"
      ? "كلمه المرور يجب أن تحتوى على 8 حروف على الأقل (حرف كبير و حرف صغير ورقم واحد و حرف مختلف  (! @ # $ % ^ & * إلخ))  "
      : "The Password must contain at least 8 characters (1 uppercase letter, 1 lowercase letter, 1 number , and one special character (! @ # $ % ^ & * etc))",
  validate: (value) => {
    return passwordRegex.test(value);
  },
});

extend("greaterThanZero", {
  message:
    localStorage.getItem("lang") === "ar"
      ? " {_field_} يجب ان يكون أكبر من 0"
      : "The {_field_} field must be grater than zero.",
  validate: (value) => {
    if (value > 0) return true;
    return false;
  },
});
