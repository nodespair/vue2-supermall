<template>
  <div id="home">
      <nav-bar class="home-nav">
        <div slot="center">
          购物街
        </div>
      </nav-bar>
      <home-swiper :banners="banners"/>
      <home-recommend-view :recommends="recommends"/>
  </div>
</template>

<script>
import NavBar from 'common/navbar/NavBar';
import HomeSwiper from './childComps/HomeSwiper.vue'
import HomeRecommendView from './childComps/HomeRecommendView.vue'

import { getGomeMultidata } from 'network/home'



export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommendView
  },
  data(){
    return {
      banners: [],
      recommends: []
    }
  },
  created() {
    // 1.请求多个数据
    getGomeMultidata().then(res => {
      // console.log(res.data);
     this.banners = res.data.banner.list;
     this.recommends = res.data.recommend.list;
    })
  }
}
</script>

<style scoped>
.home-nav{
  background-color: var(--color-tint);
  color: white;
}
</style>