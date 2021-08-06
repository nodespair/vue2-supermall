<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <scroll class="content" ref="scroll">
      <home-swiper :banners="banners" />
      <home-recommend-view :recommends="recommends" />
      <featurn-view />
      <tab-control
        class="tab-control"
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
      />

      <goods-list :goods="showGoods" />
    </scroll>
    <back-top @click.native="backClick"/>
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper.vue";
import HomeRecommendView from "./childComps/HomeRecommendView.vue";
import FeaturnView from "./childComps/FeatureView.vue";

import NavBar from "common/navbar/NavBar";
import TabControl from "content/tabControl/TabControl";
import GoodsList from "content/goods/GoodsList.vue";
import GoodsListItem from "content/goods/GoodsListItem.vue";
import Scroll from "common/scroll/Scroll";
import BackTop from "content/backTop/BackTop"

import { getGomeMultidata, getHomeGoods } from "network/home";

export default {
  name: "Home",
  components: {
    HomeSwiper,
    HomeRecommendView,
    FeaturnView,
    NavBar,
    TabControl,
    GoodsList,
    GoodsListItem,
    Scroll,
    BackTop
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  created() {
    // 1.请求多个数据
    this.getGomeMultidata();
    // 2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  methods: {
    // 事件监听相关的方法
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
    },

    // 网络请求相关的方法
    getGomeMultidata() {
      getGomeMultidata().then((res) => {
        // console.log(res.data);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
      });
    },
    // 页面上下滑动效果
    backClick(){
      this.$refs.scroll.scrollTo(0,0)
    }
  },
};
</script>

<style scoped>
#home {
  padding-top: 44px;
  height: 100vh;
}
.home-nav {
  background-color: var(--color-tint);
  color: white;

  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9999;
}
.tab-control {
  /* position: sticky; */
  top: 44px;
  z-index: 999;
}
.content {
  height: calc(100% - 49px);
  overflow: hidden;

}
</style>