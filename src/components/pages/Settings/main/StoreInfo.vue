<template>
    <el-row :gutter="20">
        <el-col :span="8">
            <el-form ref="form" :model="form" label-width="100px">
                <el-form-item label="站点logo：">
                    <el-upload class="avatar-uploader" :action="pushLogo" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <img v-if="form.LogoUrl" :src="form.LogoUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="商店名称：">
                    <el-input v-model="form.name" placeholder='请填写商店名称'></el-input>
                </el-form-item>
                <el-form-item label="商店标题：">
                    <el-input v-model="form.title" placeholder='商店的标题将显示在浏览器的标题栏'></el-input>
                </el-form-item>
                <el-form-item label="商店描述：">
                    <el-input v-model="form.description" placeholder='请填写描述'></el-input>
                </el-form-item>
                <el-form-item label="商店关键字：">
                    <el-input v-model="form.keyword" placeholder='请填写关键字，多个请用半角（,）隔开'></el-input>
                </el-form-item>
                <el-form-item label="商店地址：">
                    <el-cascader :options="options" v-model="form.location.area" placeholder='选择市-县-区' :separator='separator' :props="props" change-on-select />
                </el-form-item>
                <el-form-item label="详细地址：">
                    <el-input v-model="form.location.address" placeholder='请填写详细地址（街道、楼、栋、门牌）'></el-input>
                </el-form-item>
                <el-form-item label="客服QQ：">
                    <el-input v-model="form.QQ" placeholder='请填写QQ号，多个请用半角（,）隔开'></el-input>
                </el-form-item>
                <el-form-item label="邮件地址：">
                    <el-input v-model="form.eamll" placeholder='请填写邮箱地址'></el-input>
                </el-form-item>
                 <el-form-item label="关闭站点：">
                    <el-switch v-model="form.switch.Site" active-text="是" active-color="#ff4949" inactive-text="否" inactive-color="#13ce66" />
                </el-form-item>
                <el-form-item label="关闭注册：">
                    <el-switch v-model="form.switch.registered" active-text="是" active-color="#ff4949" inactive-text="否" inactive-color="#13ce66" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="addStoreInfo">立即创建</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>
<script>
import { regionData } from 'element-china-area-data'
import axios from 'axios'

export default {
    name:'StoreInfo',
    data () {
        return {
            options:regionData,  
            props: {
                value: 'label'
            },
            separator:'-',
            pushLogo:'http://localhost:3000/api/add/StoreLogo/'+ this.$store.getters.UserID,
            form: {
                LogoUrl:'',
                name:'',
                title:'',
                description:'',
                keyword:'',
                QQ:'',
                eamll:'',
                location:{
                    area:[],
                    address:''
                },
                switch:{
                    Site: false,
                    registered: false
                }
            }
        }
    },
    watch: {
        '$route': 'fetchData'
    },
    created () {
        axios.get('http://localhost:3000/api/info/' + this.$store.getters.UserID)
        .then(res => {
            console.log(res)
            // this.form = res.data.StoreInfo
            if(res.data.StoreInfo){
                this.form = res.data.StoreInfo
            }
        })
        .catch(err => {
            console.log(err)
        })
    },
    methods: {
      handleAvatarSuccess(res, file) {
        this.form.LogoUrl = URL.createObjectURL(file.raw)
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg'
        const isGIF = file.type === 'image/gif'
        const isPNG = file.type === 'image/png'
        const isBMP = file.type === 'image/bmp'
        const isSVG = file.type === 'image/svg'

        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isJPG && !isGIF && !isPNG && !isBMP && !isSVG) {
          this.$message.error('上传logo图片 jpeg/gif/png/bmp/svg 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传logo图片不能大于 2MB!')
        }
        return (isJPG || isBMP || isGIF || isPNG || isSVG) && isLt2M
      },
      addStoreInfo(){
          axios.put('http://localhost:3000/api/info/' + this.$store.getters.UserID,{StoreInfo:this.form})       
            .then(res => {
                 console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
      }
    }
}
</script>
<style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409eff;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>

