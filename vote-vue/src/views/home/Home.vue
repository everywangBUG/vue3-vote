<template>
  <div class="home">
    <router-view></router-view>
    <div class="home_select">
      <router-link to="/home/create" class="home_select_newlink active">
        <van-button icon="plus" />
        <span >新建</span>
      </router-link>
      <router-link to="/home/me" class="home_select_mylink active">
        <van-icon name="manager" size="2rem"/>
        <span>我的</span>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
</script>

<style lang="less" scoped>
@import url(../../assets/less/common.less);
.home {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;

  &_select {
    display: flex;
    justify-content: space-around;
    width: 100vw;

    &_newlink {
      .my_newlink_flex();

      span {
        .span_title();
      }
    }

    &_mylink {
      justify-content: end;
      align-items: center;
      width: 3rem;
      i {
        color: @gray-color;
      }
      .my_newlink_flex();
      
      span {
        .span_title();
      }
    }

    .active {
      color: @primary-color;
    }
  }
}
</style>