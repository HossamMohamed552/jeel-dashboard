import Vue from "vue";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import TextField from "@/components/Shared/TextField";
import TextAreaField from "@/components/Shared/TextAreaField";
import SelectField from "@/components/Shared/SelectField";
import CheckboxField from "@/components/Shared/CheckboxField";
import Button from "@/components/Shared/Button";
import Confirmation from "@/components/Shared/Confirmation";
import Pagination from "@/components/Shared/Pagination";
import Toast from "@/components/Shared/Toast/index.vue";
import GeneralModal from "@/components/Shared/GeneralModal/index.vue";
import VideoPlayer from "@/components/Shared/VideoPlayer/VideoPlayer";
const components = {
  ValidationProvider,
  ValidationObserver,
  TextField,
  TextAreaField,
  SelectField,
  CheckboxField,
  Button,
  Confirmation,
  Pagination,
  Toast,
  GeneralModal,
  VideoPlayer,
};

Object.entries(components).forEach(([name, component]) => {
  Vue.component(name, component);
});
