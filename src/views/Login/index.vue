<template>
    <div id="login">
        <div class="login-wrap">
            <ul class="menu-tab">
                <li :class="{current:item.current}" v-for="(item, index) in menuTab" :key="index" @click="toggleMenu(item)">
                    {{item.txt}}:{{index}}
                    
                </li>
                
            </ul>
            <!--Element UI的自定义验证规则的表单--->
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm"  class="login-form" size="medium">
                <el-form-item prop="pass" class="item-form">
                    <label for="">邮箱</label>
                    <el-input type="text" v-model="ruleForm.pass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item  prop="checkPass" class="item-form">
                    <label for="">密码</label>
                    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" maxlength="20" minlength="6"></el-input>
                </el-form-item>

                <el-form-item  prop="checkPasses" class="item-form" v-show="model === 'register'">
                    <label for="">确认密码</label>
                    <el-input type="password" v-model="ruleForm.checkPasses" autocomplete="off" maxlength="20" minlength="6"></el-input>
                </el-form-item>

                <el-form-item prop="age" class="item-form">
                    <label for="">验证码</label>
                    <!-- <el-input v-model.number="ruleForm.age"></el-input> -->
                    <el-row :gutter="20">
                        <el-col :span="15">
                            <el-input v-model.number="ruleForm.age" maxlength="6" minlength="6"></el-input>
                        </el-col>
                        <el-col :span="5"><el-button type="success">获取验证码</el-button></el-col>
              
                    </el-row>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')" class="login-btn block"><b>提 交</b></el-button>
                    <!-- <el-button @click="resetForm('ruleForm')" class="block">重置</el-button> -->
                </el-form-item>
            </el-form>

        </div>
    </div>
</template>
<script>
import { stripscript } from '@/utils/validate'

export default {
    "name":"login",
    data(){
        //验证验证码！！！！！！

        var checkAge = (rule, value, callback) => {
        let reg = /^[0-9]{6}$/;

        if (!value) {
          return callback(new Error('验证码不能为空'));
        }
        else if (!reg.test(value)) {
          return callback(new Error('验证码长度应为6位数字'));
        }
        else {
          callback();
        }

      };

      //验证邮箱！！！！！！

      var validatePass = (rule, value, callback) => {
        var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;

        if (value === '') {
          callback(new Error('请输入邮箱'));
        } else if(!reg.test(value)) {
            callback(new Error('邮箱格式有误'));
        }else {
        //   if (this.ruleForm.checkPass !== '') {
        //     this.$refs.ruleForm.validateField('checkPass');
        //   }
          callback();
        }
      };

      //验证密码！！！！！！

      var validatePass2 = (rule, value, callback) => {
        //let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/
        let reg = /^.*(?=.{6,20})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/;
        
        //console.log(stripscript(value));
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if(!reg.test(value)){
            callback(new Error('确认密码必须包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符,且长度应为6-20位'));
        }else {
          callback();
        }
      };

        //校验确认密码！！！！！！

      var validatePasses = (rule, value, callback) => {
        let reg = /^.*(?=.{6,20})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/;
        //如果当前处理的是登录业务，则“确认密码”一栏不必填写内容，直接通过~！！！
        if(this.model === 'login'){
            callback();
        }
        //console.log(stripscript(value));
        if (value === '') {
          callback(new Error('请输入确认密码'));
        } else if(!reg.test(value)){
            callback(new Error('确认密码必须包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符,且长度应为6-20位'));
        }else if(value !== this.ruleForm.checkPass){
            callback(new Error('两次输入密码不一致!'));
        }else {
          callback();
        }
      };
        return {
            menuTab:[{"txt":"登录", "current":true, type:"login"},{"txt":"注册","current":false, type:"register"}],
            model: 'login',
            // isActive: true,
             ruleForm: {
                pass: '',
                checkPass: '',
                checkPasses: '',    //确认密码
                age: ''
                },
                rules: {
                pass: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                checkPass: [
                    { validator: validatePass2, trigger: 'blur' }
                ],
                checkPasses: [
                    { validator: validatePasses, trigger: 'blur' }
                ],
                age: [
                    { validator: checkAge, trigger: 'blur' }
                ]
                }
            
        }
    },
    methods:{
        toggleMenu(params){
            //先把全部的tab都消除current样式！！
            console.log(this);
            this.menuTab.forEach(element => {
                element.current = false
            });
            //再把被点击tab添加current样式！！！
            params.current = true

            //让“确认密码”一栏显示与否
            this.model = params.type
        },

        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                alert('submit!');
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },
    //   resetForm(formName) {
    //     this.$refs[formName].resetFields();
    //   }
        
    }
}
</script>
<style lang="scss" scoped>
#login{
    height:100vh;
    background-color: #344a5f;
}
.login-wrap{
    width:330px;
    margin:auto;
}
.menu-tab{
    padding-left:0px;
    text-align: center;
    li{
        width:88px;
        line-height:36px;
        display: inline-block;
        cursor: pointer;
        font-size: 14px;
        color: #fff;
        border-radius: 4px;
    }
    .current {
        background-color: rgba(0, 0,0,0.1);
    }
}
.login-form{
    margin-top:29px;
    .item-form{
        margin-bottom: 13px;
    }
}
.login-form label{
    display: block;
    font-size: 14px;
    color: #fff;
    margin-bottom: 3px;
}
.block{
    display: block;
    width:100%;
}
.login-btn{
    margin-top: 19px;
}
</style>