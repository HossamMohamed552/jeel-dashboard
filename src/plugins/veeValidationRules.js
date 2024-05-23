import {configure, extend, localize} from "vee-validate";
import * as rules from "vee-validate/dist/rules";
import ar from "@/locales/ar-rules.json";
import en from "@/locales/en-rules.json";

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

extend("urlLink", {
  message:
    localStorage.getItem("lang") === "ar" ? "من فضلك أدخل رابط صحيح" : "من فضلك أدخل رابط صحيح",
  validate: (value) => {
    const urlRegex = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/
    return urlRegex.test(value)
  },
});

extend("verify_password", {
  message: "كلمه المرور يجب أن تحتوى على 8 الأسئلةالأقل (حرف كبير و حرف صغير ورقم واحد و حرف مختلف  (! @ # $ % ^ & * إلخ))  ",
  validate: (value) => {
    const passwordRegex = /^(?=.*[a-z]{1,})(?=.*[A-Z]{1,})(?=.*[0-9]{1,})(?=.*[!@#\$%\^&\*]).{8,}$/
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
