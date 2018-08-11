<template>
    <el-container>
        <el-aside width="12%">
            <el-row class="tac">
                <el-col>
                    <el-menu :default-active="element.active" :router='element.router' class="el-menu-vertical-demo">
                        <el-menu-item index="/">
                            <span slot="title">商店信息</span>
                        </el-menu-item>
                        <el-menu-item index="/StoreInfo/BasicSettings">
                            <span slot="title">基础设置</span>
                        </el-menu-item>
                        <el-menu-item index="3">
                            <span slot="title">显示设置</span>
                        </el-menu-item>
                        <el-menu-item index="4">
                            <span slot="title">短信设置</span>
                        </el-menu-item>
                    </el-menu>
                </el-col>
            </el-row>
        </el-aside>
        <el-container>
            <el-main>
                <router-view/>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
export default {
    name:'Basic',
    data () {
        return {
            element:{
                active: '',
                router: true
            }    
        }
    },
    mounted(){
       this.element.active = this.$route.fullPath
    }
}
</script>
<style scoped>

</style>
