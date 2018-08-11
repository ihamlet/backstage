<template>
    <el-container>
        <el-header>
            <el-row type="flex" class="row-bg" justify="end">
                <el-menu :default-active="element.active" :router='element.router' class="el-menu-demo" mode="horizontal">
                    <el-menu-item index="/">
                        <span>商店设置</span>
                    </el-menu-item>
                    <el-menu-item index="/Commodity/ProductList">
                        <span>商品管理</span>
                    </el-menu-item>
                </el-menu>
            </el-row>
        </el-header>

        <router-view/>
    </el-container>
</template>
<script>
export default {
    name:'Layout',
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
