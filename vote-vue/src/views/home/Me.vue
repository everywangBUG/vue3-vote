<template>
  <div class="me">
    <div class="me_my">
      <span>我的</span>
    </div>
    <div class="me_user">
      <img :src="avatar" class="me_user_avatar"/>
      <span class="me_user_name">{{name}}</span>
    </div>
    <div class="me_select">
      <van-cell title="我的投票" @click="router.push(`/vote/${voteId}`)" is-link/>
      <van-cell title="个人设置" is-link/>
      <van-cell title="反馈建议" is-link/>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from '@/router/index'
import useLoginStore from '@/stores/login/login';
import useVoteStore from '@/stores/vote/vote';
import { storeToRefs } from 'pinia';

const useLoginInfo = useLoginStore()
const { userLoginInfo } = storeToRefs(useLoginInfo)
const voteStore = useVoteStore()
const { voteId } = storeToRefs(voteStore)
const { avatar, name } = userLoginInfo.value
</script>

<style lang="less" scoped>
.me{
  height: 100rem;
  padding: 1rem;
  background-color: #f3f4f8;
  &_user {
    display: flex;
    align-items: center;
    margin: 2rem 0rem 2rem 0;
    
    &_avatar {
      height: 3rem;
      width: 3rem;
      margin-left: 2rem;
      border-radius: 1.5rem;
    }
    &_name {
      margin-left: 1rem;
    }
  }
  &_select {
    margin: 0 -1rem 0 -1rem;
  }
}
</style>