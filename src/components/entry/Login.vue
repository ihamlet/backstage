<template>
    <el-container>
        <el-header>Header</el-header>
        <el-main>
            <el-row type="flex" class="row-bg" justify="center">
                <el-col :span="6">
                    <h1>登 陆</h1>
                    <div class="grid-content bg-purple">
                        <el-form ref="form" status-icon :model="form" :rules="rules" :ref="ruleForm" label-width="100px" label-position="top">
                            <el-form-item prop="phone">
                                <el-input placeholder="请输入手机号" v-model="form.phone" autofocus='true'/>
                            </el-form-item>
                            <el-form-item prop="pass">
                                <el-input placeholder="请输入密码" type='password' v-model="form.pass" auto-complete="off" />
                            </el-form-item>
                            <el-form-item>
                                <el-button :style="{width:'100%'}" type="primary" @click="submitForm('ruleForm')" :loading="isloading">登陆后台</el-button>
                            </el-form-item>
                            <el-form-item>
                                没有账号？ <el-button type="text" @click="toRegister">立即注册</el-button>
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
    name:'Register',
    data () {
        return {
            ruleForm:'ruleForm',
            isloading: false,
            form:{
                phone:'',
                pass:''
            },
            rules: {
                phone: [
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    { pattern: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/, message: '您的手机号输入有误',trigger: 'blur' }
                ],
                pass:[
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6,message: '密码不能小于6位数', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        submitForm(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.isloading = true
                    const User = {
                        phone: this.form.phone,
                        password: this.form.pass
                    }
                    this.$store.commit('RequestData',User)
                    this.$store.dispatch('Login')
                    setTimeout(()=>{
                        const code = this.$store.state.SendData.code
                        const message = this.$store.state.SendData.message
                        if(code == 400) {
                            this.$message.error(message)
                            this.$router.replace('/Register')
                        }
                        if(code == 200) {
                            this.$message({
                                message: message,
                                type: 'success'
                            })
                            this.$router.replace('/')
                        }
                        this.isloading = false
                    },500)
                } else {
                    this.$message.error('请检查账号密码输入是否有误')
                    return false;
                }
            })
        },
        toRegister(){
            this.$router.push('/Register')
        }
    }
}
</script>
<style>
h1{
    text-align: center;
}
</style>