<template>
  <div>
    <ul class="app-header-nav">
      <li class="home"><RouterLink to="/">首页</RouterLink></li>
      <li>
        <a href="#">美食</a>
        <div class="layer">
        <ul>
          <li v-for="i in 10" :key="i">
            <a href="#">
              <img src="http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/img/category%20(4).png" alt="">
              <p>果干</p>
            </a>
          </li>
        </ul>
      </div>
      </li>
      <li><a href="#">餐厨</a></li>
      <li><a href="#">艺术</a></li>
      <li><a href="#">电器</a></li>
      <li><a href="#">居家</a></li>
      <li><a href="#">洗护</a></li>
      <li><a href="#">孕婴</a></li>
      <li><a href="#">服装</a></li>
      <li><a href="#">杂货</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'AppHeaderNav'
}
</script>
<style scoped lang="less">
.app-header-nav {
  width: 820px;
  display: flex;
  justify-content: space-around;
  padding-left: 40px;
  li {
    margin-right: 40px;
    width: 38px;
    text-align: center;
    a {
      font-size: 16px;
      line-height: 32px;
      height: 32px;
      display: inline-block;
    }
    &:hover {
      a {
        color: @xtxColor;
        border-bottom: 1px solid @xtxColor;
      }
    }
  }
}
// 二级类目弹层

</style>
