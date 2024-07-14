import {extend} from "vee-validate";
import i18n from "@/plugins/i18n";
import moment from "moment";
import {
  required,
  email,
  numeric,
  image,
  size,
  max,
  max_value,
  regex,
} from "vee-validate/dist/rules";

extend("required", {
  ...required,
});

extend("email", {
  ...email,
  message: "يرجى إدخال البريد الإلكتروني الصحيح",
});

extend("numeric", {
  ...numeric,
});

extend("image", {
  ...image,
  message: "Please upload a valid image format",
});

extend("max", {
  ...max,
});
extend("regex", {
  ...regex,
});
extend("max_value", {
  ...max_value,
});

extend("afterDate", {
  validate(value, {compareValue}) {
    const enteredDate = moment(value, "DD-MM-YYYY");
    const comparisonDate = moment(compareValue, "DD-MM-YYYY");
    if (moment(enteredDate).isAfter(comparisonDate)) {
      return true;
    }
    return `يرجى إدخال بعد تاريخ ${compareValue}`;
  },
  params: ["compareValue"],
});
extend("size", {
  ...size,
  message: (_, value) => `File size must be below ${value.size / 1000} Mb`,
});
extend("audio", {
  validate(value) {
    const extension = value.name.split(".").pop().toLowerCase();
    const audioExtensions = ["mp3", "wav", "ogg"];
    if (audioExtensions.includes(extension)) {
      return true;
    }
    return "التسجيل الصوتي يجب ان يكون صوت";
  },
});
extend('select-three-or-less', {
  validate: (value) => {
    return value.length <= 3
  },
  message: i18n.locale === 'ar' ? "يجب ان لا يكون عدد الاختيارات اكثر من 3" : "The number of choices must not be more than 3"
})
