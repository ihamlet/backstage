<template>
    <el-container>
        <el-aside width="12%">
            <el-row class="tac">
                <el-col>
                    <el-menu :default-active="element.active" :router='element.router' class="el-menu-vertical-demo">
                        <el-menu-item index="/Commodity/ProductList">
                            <span slot="title">商品列表</span>
                        </el-menu-item>
                        <el-menu-item index="2">
                            <span slot="title">商品分类</span>
                        </el-menu-item>
                        <el-menu-item index="3">
                            <span slot="title">商品评论</span>
                        </el-menu-item>
                        <el-menu-item index="4">
                            <span slot="title">商品品牌</span>
                        </el-menu-item>
                        <el-menu-item index="5">
                            <span slot="title">商品类型</span>
                        </el-menu-item>
                        <el-menu-item index="6">
                            <span slot="title">商品回收站</span>
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
    name:'Commodity',
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
<style>
</style>
