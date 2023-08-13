import { extend } from "vee-validate";
import { required, email, numeric, image, size, max, max_value, regex } from "vee-validate/dist/rules";

extend("required", {
  ...required,
  message: "Required",
});

extend("email", {
  ...email,
  message: "Please enter a valid email",
});

extend("numeric", {
  ...numeric,
  message: "Please enter a valid number",
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
  message: "Seconds must be less than 60",
});

extend("size", {
  ...size,
  message: (_, value) => `File size must be below ${value.size / 1000} Mb`,
});
