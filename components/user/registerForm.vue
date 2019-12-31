<template>
  <el-form :model="form" ref="form" :rules="rules" class="form">
    <el-form-item class="form-item" prop="username">
      <el-input placeholder="用户名手机" v-model="form.username"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="captcha">
      <el-input placeholder="验证码" v-model="form.captcha">
        <template slot="append">
          <el-button @click="handleSendCaptcha">发送验证码</el-button>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="nickname">
      <el-input placeholder="你的名字" v-model="form.nickname"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="password">
      <el-input placeholder="密码" type="password" v-model="form.password"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="twopassword">
      <el-input placeholder="确认密码" type="password" v-model="form.twopassword"></el-input>
    </el-form-item>

    <el-button class="submit" type="primary" @click="handleRegSubmit">注册</el-button>
  </el-form>
</template>

<script>
export default {
  data() {
    // 账户名
    var validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号码"));
      } else {
        let reg = /^(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
        if (reg.test(value)) {
          callback();
        } else {
          callback(new Error("请输入正确的手机号码"));
        }
      }
    };

    // 验证码
    var validateCaptcha = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else if (value !== this.captcha2) {
        callback(new Error("你输入验证码有误"));
      } else {
        callback();
      }
    };

    // 名字验证
    var validateNickname = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输名字"));
      } else {
        let reg = /^[A-Za-z0-9_\-\u4e00-\u9fa5]{1,8}$/;
        if (reg.test(value)) {
          callback();
        } else {
          callback(new Error("请输1-8个数字或字母或中文"));
        }
      }
    };

    // 密码验证
    var validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输密码"));
      } else {
        let reg = /^\w{6,16}$/;
        if (reg.test(value)) {
          callback();
        } else {
          callback(new Error("请输6-16位数字或字母"));
        }
      }
    };

    // 第二次密码验证
    var validateTwopassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入确认密码"));
      } else if (value === this.form.password) {
        callback();
      } else {
        callback(new Error("两次输入密码不一致!"));
      }
    };
    return {
      captcha2: "", //返回的验证码
      // 表单数据
      form: {
        username: "",
        nickname: "",
        captcha: "",
        password: "",
        twopassword: "" //第二次密码
      },
      // 表单规则
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }], //用户手机号验证
        captcha: [{ validator: validateCaptcha, trigger: "blur" }], //验证码验证
        nickname: [{ validator: validateNickname, trigger: "blur" }], //用户名字验证
        password: [{ validator: validatePassword, trigger: "blur" }], //密码验证
        twopassword: [{ validator: validateTwopassword, trigger: "blur" }] //第二次密码验证
      }
    };
  },
  methods: {
    // 发送验证码
    handleSendCaptcha() {
      if(!this.form.username){
        this.$confirm('手机号码不能为空', '提示', {
            confirmButtonText: '确定',
            showCancelButton: false,
            type: 'warning'
        })
        return;
      }
       
      // 发送请求
      this.$store.dispatch("user/validate", this.form.username).then(res => {
        if (res === false) {
          this.$message.success("发送验证码失败，请重试");
        } else {
          this.captcha2 = res; //把返回的验证码存进变量
          this.$alert(res, "验证码", {
            confirmButtonText: "确定"
            // callback: action => {
            //   this.$message({
            //     type: 'info',
            //     message: `action: ${ action }`
            //   });
            // }
          });
        }
      });
    },

    // 注册
    handleRegSubmit() {
      console.log(this.form);
      this.$refs.form.validate(valid => {
        if (valid) {
           const {twopassword, ...props} = this.form;
          this.$axios({
            url: "/accounts/register",
            method: "POST",
            data: props
          })
            .then(res => {
              console.log(res);
              this.$message.success('注册成功')
              this.$emit('click')
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          // console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.form {
  padding: 25px;
}

.form-item {
  margin-bottom: 20px;
}

.form-text {
  font-size: 12px;
  color: #409eff;
  text-align: right;
  line-height: 1;
}

.submit {
  width: 100%;
  margin-top: 10px;
}
</style>