import type { FormInstance, FormRules } from "element-plus";
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive({
  name: "Hello",
  region: "",
  count: "",
  date1: "",
  date2: "",
  delivery: false,
  type: [],
  resource: "",
  desc: "",
});

const rules = reactive<FormRules>({
  phone: [
    { required: true, message: "请输入手机号", trigger: "blur" },
    { min: 11, max: 11, message: "请输入正确的手机号", trigger: "blur" },
  ],
  password: [
    {
      required: true,
      message: "请输入密码",
      trigger: "change",
    },
  ],
  count: [
    {
      required: true,
      message: "Please select Activity count",
      trigger: "change",
    },
  ],
  date1: [
    {
      type: "date",
      required: true,
      message: "Please pick a date",
      trigger: "change",
    },
  ],
  date2: [
    {
      type: "number",
      required: true,
      message: "Please pick a time",
      trigger: "change",
    },
  ],
});
