<template>
  <div class="home-category">
    <ul class="menu">
      <li v-for="item in menuList" :key="item.id">
        <RouterLink :to="`/category/${item.id}`">{{ item.name }}</RouterLink>
        <template v-if="item.children">
          <RouterLink
            v-for="sub in item.children"
            :key="sub.id"
            :to="`/category/sub/${sub.id}`"
          >
            {{ sub.name }}
          </RouterLink>
        </template>
      </li>
    </ul>
  </div>
   <!-- 弹层 -->
    <div class="layer">
      <h4>分类推荐 <small>根据您的购买或浏览记录推荐</small></h4>
      <ul>
        <li v-for="i in 9" :key="i">
          <RouterLink to="/">
            <img src="https://yanxuan-item.nosdn.127.net/5a115da8f2f6489d8c71925de69fe7b8.png" alt="">
            <div class="info">
              <p class="name ellipsis-2">【定金购】严选零食大礼包（12件）</p>
              <p class="desc ellipsis">超值组合装，满足馋嘴欲</p>
              <p class="price"><i>¥</i>100.00</p>
            </div>
          </RouterLink>
        </li>
      </ul>
    </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { useStore } from 'vuex'
export default {
  name: 'HomeCategory',
  setup () {
    const store = useStore()
    // 最终使用的数据=9个分类（）+ 1个品牌
    const brand = reactive({
      id: 'brand',
      name: '品牌',
      children: [
        {
          id: 'brand-children',
          name: '品牌推荐'
        }
      ]
    })
    const menuList = computed(() => {
      //  得到9个分类且每个一级分类下的子分类只有两个
      const list = store.state.category.list.map(item => {
        return {
          id: item.id,
          name: item.name,
          children: item.children && item.children.slice(0, 2),
          goods: item.goods
        }
      })
      list.push(brand)
      return list
    })
    return { menuList }
  }
}
</script>

<style scoped lang="less">
.home-category {
  width: 250px;
  height: 500px;
  background: rgba(0, 0, 0, 0.8);
  position: relative;
  z-index: 99;
  .menu {
    li {
      padding-left: 40px;
      height: 50px;
      line-height: 50px;
      &:hover {
        background: @xtxColor;
      }
      a {
        margin-right: 4px;
        color: #fff;
        &:first-child {
          font-size: 16px;
        }
      }
    }
  }
}
</style>
