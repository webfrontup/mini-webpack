<template>
  <div class="home">
    <h3 class="h3s">Hello {{ name }} from my Vue.js page, built with Webpack 4!</h3>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    }
  }
};
</script>
<style lang="scss" scoped>
@import '../../../assets/css/home.scss';
.home {
  .h3s {
    font-size: 36px;
  }
}
</style>
<style lang="less" scoped>
@import '../../../assets/css/home.less';
.home {
  .h3s {
    font-size: 36px;
  }
}
</style>

