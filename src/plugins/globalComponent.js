import Vue from "vue";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import TextField from "@/components/Shared/TextField";
import TextAreaField from "@/components/Shared/TextAreaField";
import SelectField from "@/components/Shared/SelectField";
import CheckboxField from "@/components/Shared/CheckboxField";
import Button from "@/components/Shared/Button";
import Confirmation from "@/components/Shared/Confirmation";
import Pagination from "@/components/Shared/Pagination";

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
};

Object.entries(components).forEach(([name, component]) => {
  Vue.component(name, component);
});
