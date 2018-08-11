<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html,
body,
#app,
.wrap {
    height: 100%;
}

body {
    padding: 0;
    margin: 0;
}

.el-container {
    height: 100%;
}

.el-header {
    border-bottom: 1px solid #dcdfe6;
}

.el-aside {
    border-right: 1px solid #e4e7ed;
}

.el-menu {
    border-right: none;
}
</style>
