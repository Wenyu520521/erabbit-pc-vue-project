<template>
  <div class="home-category">
    <!-- 商品 -->
    <ul class="menu">
      <li
        v-for="item in menuList"
        :key="item.id"
        @mouseenter="categoryId = item.id"
      >
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
    <!-- 品牌 -->
    <ul>
      <li class="brand" v-for="i in 6" :key="i">
        <RouterLink to="/">
          <img
            src="http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/brand_goods_1.jpg"
            alt=""
          />
          <div class="info">
            <p class="place"><i class="iconfont icon-dingwei"></i>北京</p>
            <p class="name ellipsis">DW</p>
            <p class="desc ellipsis-2">DW品牌闪购</p>
          </div>
        </RouterLink>
      </li>
    </ul>
    <!-- 弹层 @mouseenter传id-->
    <div class="layer">
      <h4>分类推荐 <small>根据您的购买或浏览记录推荐</small></h4>
      <ul v-if="currCategory && currCategory.goods">
        <li v-for="item in currCategory.goods" :key="item.id">
          <RouterLink to="/">
            <img :src="item.picture" alt="" />
            <div class="info">
              <p class="name ellipsis-2">{{ item.name }}</p>
              <p class="desc ellipsis">{{ item.desc }}</p>
              <p class="price"><i>¥</i>{{ item.price }}</p>
            </div>
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { computed, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { findBrand } from '@api/home'
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
      ],
      // 品牌列表
      brands: []
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

    // 通过id找到当前商品
    const categoryId = ref(null)
    const currCategory = computed(() => {
      return menuList.value.find(item => item.id === categoryId.value)
    })

    // 获取品牌数据
    findBrand().then(data => {
      brand.brands = data.result
    })

    return { menuList, categoryId, currCategory }
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
  .layer {
    width: 990px;
    height: 500px;
    background: rgba(255, 255, 255, 0.8);
    position: absolute;
    left: 250px;
    top: 0;
    display: none;
    padding: 0 15px;
    h4 {
      font-size: 20px;
      font-weight: normal;
      line-height: 80px;
      small {
        font-size: 16px;
        color: #666;
      }
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        width: 310px;
        height: 120px;
        margin-right: 15px;
        margin-bottom: 15px;
        border: 1px solid #eee;
        border-radius: 4px;
        background: #fff;
        &:nth-child(3n) {
          margin-right: 0;
        }
        a {
          display: flex;
          width: 100%;
          height: 100%;
          align-items: center;
          padding: 10px;
          &:hover {
            background: #e3f9f4;
          }
          img {
            width: 95px;
            height: 95px;
          }
          .info {
            padding-left: 10px;
            line-height: 24px;
            width: 190px;
            .name {
              font-size: 16px;
              color: #666;
            }
            .desc {
              color: #999;
            }
            .price {
              font-size: 22px;
              color: @priceColor;
              i {
                font-size: 16px;
              }
            }
          }
        }
      }
    }
  }
  &:hover {
    .layer {
      display: block;
    }
  }
}
</style>
