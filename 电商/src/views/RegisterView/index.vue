<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>
        注册新用户
        <span class="go"
          >我有账号，去 <router-link to="/login">登陆</router-link>
        </span>
      </h3>
      <el-form
        ref="ruleFormRef"
        :model="user"
        status-icon
        :rules="rules"
        class="demo-ruleForm"
      >
        <el-form-item label="手机号" prop="phone" class="item">
          <el-input v-model="user.phone" />
        </el-form-item>
        <el-form-item label="验证码" prop="code" class="item">
          <el-input v-model="user.code" />
          <el-button @click="getCode()" color="#626aef" plain
            >获取验证码</el-button
          >
        </el-form-item>
        <el-form-item label="密码" prop="password" class="item">
          <el-input
            v-model="user.password"
            type="password"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="确认密码" prop="confirm" class="item">
          <el-input v-model="user.confirm" type="password" autocomplete="off" />
        </el-form-item>

        <el-checkbox
          label="同意协议并注册《尚品汇用户协议》"
          name="type"
          :checked="user.agree"
        />
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)"
            >注册</el-button
          >
          <el-button @click="resetForm(ruleFormRef)">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号</div>
    </div>
  </div>
</template>
<script setup lang="ts" name="RegisterView">
import { useRouter } from "vue-router";
import useStore from "@/stores";
import type { Register } from "@/types/user";
import type { FormInstance } from "element-plus";

const ruleFormRef = ref<FormInstance>();
const router = useRouter();
const store = useStore();
let user: Register = reactive({
  code: "",
  phone: "",
  password: "",
  confirm: "",
  agree: true,
});
console.log({ ...user });

({ ...user } = user);

const checkPhone = (_: any, value: string, callback: any) => {
  if (!value) {
    return callback(new Error("请输入手机号"));
  }
  setTimeout(() => {
    if (value.length !== 11) {
      callback(new Error("手机号必须为11位"));
    } else {
      callback();
    }
  }, 1000);
};
const checkCode = (_: any, value: string, callback: any) => {
  if (!value) {
    return callback(new Error("请输入验证码"));
  } else {
    callback();
  }
};
const validatePass = (_: any, value: string, callback: any) => {
  if (value === "") {
    callback(new Error("请输入密码"));
  } else {
    if (user.password !== "") {
      if (!ruleFormRef.value) return;
      ruleFormRef.value.validateField("checkPassword", () => null);
    }
    callback();
  }
};
const validatePass2 = (_: any, value: string, callback: any) => {
  if (value === "") {
    callback(new Error("请再一次输入密码"));
  } else if (value !== user.password) {
    callback(new Error("两次密码不相同"));
  } else {
    callback();
  }
};
const rules = reactive({
  password: [{ validator: validatePass, trigger: "blur" }],
  confirm: [{ validator: validatePass2, trigger: "blur" }],
  phone: [{ validator: checkPhone, trigger: "blur" }],
  code: [{ validator: checkCode, trigger: "blur" }],
});

const getCode = async () => {
  try {
    await store.user.getCode(user.phone);
    user.code = store.user.code;
  } catch (error: any) {
    alert("请先输入手机号");
  }
};
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
      await store.user.getRegister({
        phone: user.phone,
        password: user.password,
        code: user.code,
      });
      router.push("/login");
    } else {
      alert("请输入有效的信息");
      return false;
    }
  });
};
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>

<style lang="less" scoped>
.register-container {
  .register {
    width: 1200px;
    height: 445px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;

    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }
    .demo-ruleForm {
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 423px;
      justify-content: space-around;
      .item {
        width: 400px;
        button {
          width: 80px;
          height: 30px;
          position: absolute;
          left: 344px;
        }
      }
    }
    .controls {
      text-align: center;
      position: relative;

      input {
        vertical-align: middle;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .btn {
      text-align: center;
      line-height: 36px;
      margin: 17px 0 0 55px;
      button {
        outline: none;
        width: 270px;
        height: 36px;
        background: #e1251b;
        color: #fff !important;
        display: inline-block;
        font-size: 16px;
      }
    }
  }

  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }
}
</style>
