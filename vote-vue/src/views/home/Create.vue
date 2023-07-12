<template>
  <div class="create">
    <router-link to="/create-vote">
     <van-button type="primary" class="create_single">
       单选投票
     </van-button>
    </router-link>
    <router-link to="/create-vote?multiple=1">
      <van-button type="primary" class="create_multiple">
        多选投票
      </van-button>
    </router-link>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.create{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 100rem;

  &_single {
    width: @button-width;
  }

  &_multiple {
    width: @button-width;
  }
}
</style>