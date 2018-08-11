<template>
    <el-container>
        <el-header>Header</el-header>
        <el-main>
            <el-row type="flex" class="row-bg" justify="center">
                <el-col :span="6">
                    <h1>注 册</h1>
                    <div class="grid-content bg-purple">
                        <el-form ref="form" status-icon :model="form" :rules="rules" :ref="ruleForm" label-width="100px" label-position="top">
                            <el-form-item prop="phone">
                                <el-input placeholder="请输入手机号" v-model="form.phone" autofocus='true'/>
                            </el-form-item>
                            <el-form-item prop="pass">
                                <el-input placeholder="请输入密码" type='password' v-model="form.pass" auto-complete="off" />
                            </el-form-item>
                            <el-form-item prop="checkPass">
                                <el-input placeholder="确认密码" type='password' v-model="form.checkPass" auto-complete="off" />
                            </el-form-item>
                            <el-form-item>
                                <el-button :style="{width:'100%'}" type="primary" @click="submitForm('ruleForm')" :loading="isloading">立即注册</el-button>
                            </el-form-item>
                           <el-form-item>
                                已有账号？ <el-button type="text" @click="toLogin">立即登录</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-col>
            </el-row>
        </el-main>
        <el-footer>Footer</el-footer>
    </el-container>
</template>
<script>
export default {
    name:'Login',
    data () {
        const validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'))
            } else {
                if (this.form.checkPass !== '') {
                    this.$refs.ruleForm.validateField('checkPass')
                }
                callback()
            }
        }

        const validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'))
            } else if (value !== this.form.pass) {
                callback(new Error('两次输入密码不一致!'))
            } else {
                callback()
            }
        }

        return {
            isloading: false,
            ruleForm:'ruleForm',
            form:{
                phone:'',
                pass:'',
                checkPass:''
            },
            rules: {
                phone: [
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    { pattern: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/, message: '您的手机号输入有误',trigger: 'blur' }
                ],
                pass: [
                    { validator: validatePass, trigger: 'blur' },
                    { min: 6,message: '密码不能小于6位数', trigger: 'blur' }
                ],
                checkPass: [
                    { validator: validatePass2, trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.isloading = true
                    const User = {
                        phone: this.form.phone,
                        password: this.form.pass
                    }
                    this.$store.commit('RequestData',User)
                    this.$store.dispatch('Register')
                    setTimeout(()=>{
                        const code = this.$store.state.RegisterData.code
                        const message = this.$store.state.RegisterData.message
                        if(code == 409 || code == 500) {
                            this.$message.error(message)
                        }
                        if(code == 200) {
                            this.$message({
                                message: message,
                                type: 'success'
                            })
                        }
                        if(code == 200 || code == 409){
                            this.$router.replace('/Login')
                        }
                        this.isloading = false
                    },500)
                } else {
                    this.$message.error('请检查账号密码输入是否有误')
                    return false
                }
            })
        },
        toLogin(){
            this.$router.push('/Login')
        }
    }
}
</script>

<style scoped>
h1 {
    text-align: center;
}
</style>
