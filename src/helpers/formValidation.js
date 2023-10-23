import {extend} from "vee-validate";
import {
  required,
  email,
  numeric,
  image,
  size,
  max,
  max_value,
  regex
} from "vee-validate/dist/rules";

extend("required", {
  ...required,
});

extend("email", {
  ...email,
  message: "Please enter a valid email",
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

extend("size", {
  ...size,
  message: (_, value) => `File size must be below ${value.size / 1000} Mb`,
});
extend('audio', {
  validate(value) {
    const extension = value.name.split('.').pop().toLowerCase();
    const audioExtensions = ['mp3', 'wav', 'ogg']
    if (audioExtensions.includes(extension)) {
      return true
    }
    return 'التسجيل الصوتى يجب ان يكون صوت';
  }
})
