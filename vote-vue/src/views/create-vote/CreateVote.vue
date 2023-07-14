<template>
  <div class="create_vote">
    <div class="create_vote_title" @click="router.push('/home')">
      <van-icon name="arrow-left"/>
      <span class="create_vote_title_text">创建单选投票</span>
    </div>
    <div class="create_vote_content">
      <van-form @submit="onSubmit" :model="singleVote">
        <div class="creat_vote_content_top">
          <van-field 
            v-model="singleVote.title"
            name="title"
            placeholder="投票标题"
            size="large"
          />
          <van-field
            v-model="singleVote.desc"
            name="desc"
            placeholder="补充描述(选项)"
          />
          <div
            v-for="(option, index) of singleVote.options"
            :key="index"
            name="select"
            class="create_vote_content_top_select"
          >
            <van-button
              icon="minus"
              size="mini"
              color="#ff5454"
              @click="singleVote.options.splice(index, 1)"
            />
            <van-field v-model="singleVote.options[index]" placeholder="选填"/>
          </div>
          <div class="create_vote_content_top_select" @click="addOptions">
            <van-button icon="plus" size="mini" color="#1989fa"/>
            <van-field placeholder='添加选项' disabled/>
          </div>
        </div>
        <div class="create_vote_content_separation"></div>
        <div class="create_vote_content_middle">
          <van-cell title="截止日期" class="flex-center">
            <van-field
              v-model="currentDateFt"
              disabled @click="dateShow = true"
              class="create_vote_content_middle_dateshow"
            />
            <van-field
              v-model="currentTimeFt"
              disabled
              @click="timeShow = true"
              class="create_vote_content_middle_timeshow"
            />
          </van-cell>
          <van-popup position="bottom" v-model:show="dateShow">
            <van-date-picker
              v-model="currentDate"
              option-height="2rem"
              @confirm="dateShow = false"
              @cancel="dateShow = false"
              :formatter="dateFormatter"
            />
          </van-popup>
          <van-popup position="bottom" v-model:show="timeShow">
            <van-time-picker
              v-model="currentTime"
              option-height="2rem"
              @confirm="timeShow = false"
              @cancel="timeShow = false"
              :formatter="timeFormatter"
            />
          </van-popup>
          <van-cell title="匿名投票">
            <van-field name="anonmyous">
              <template #input>
                <van-switch v-model="singleVote.anonymous"/>
              </template>
            </van-field>
          </van-cell>
          <van-cell title="限制传播">
            <van-field name="limit">
              <template #input>
                <van-switch v-model="limit"/>
              </template>
            </van-field>
          </van-cell>
        </div>
        <div
          class="create_vote_content_bottom">
          <van-button
            type="primary"
            native-type="submit"
            class="create_vote_content_btn"
          >
            完成
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import useVoteStore from  '@/stores/vote/vote'
import router from '@/router'
import dayjs from 'dayjs'
import { storeToRefs } from 'pinia'
import { showDialog } from 'vant';
import 'vant/es/dialog/style'

interface ISingle {
  title: string
  desc: string,
  deadline: any,
  anonymous: boolean
  options: string[],
  multiple: boolean
}

const nowDate = dayjs().format('YYYY-MM-DD').split('-')
const nowTime = dayjs().format('HH-mm').split('-')
const currentDate = ref<any>(nowDate)
const currentTime = ref<any>(nowTime)
const currentDateFt = computed(() => {
  return currentDate.value.join('-')
})
const currentTimeFt = computed(() => {
  return currentTime.value.join(':')
}) 
const deadline = computed(() => {
  return currentDateFt.value + ' ' + currentTimeFt.value
})
const limit = ref<boolean>(false)
const dateShow = ref<boolean>(false)
const timeShow = ref<boolean>(false)
const timeFormatter = (type: string, option: any) => {
  if (type === 'hour') {
    option.text += '时'
  }
  if (type === 'minute') {
    option.text += '分'
  }
  return option
}
const dateFormatter = (type: string, option: any) => {
  if (type === 'year') {
    option.text += '年'
  }
  if (type === 'month') {
    option.text += '月'
  }
  if (type === 'day') {
    option.text += '日'
  }
  return option
}
const singleVote = reactive<ISingle>({
  title: '',
  desc: '',
  options: ['', ''],
  deadline: deadline,
  anonymous: false,
  multiple: false
})

const voteStore = useVoteStore()
const { voteId } = storeToRefs(voteStore)
console.log('voteId', voteId)
const onSubmit = () => {
  voteStore.postCreateVoteAction(singleVote)
  if (!voteId) {
    showDialog({
      message: '请登录！',
      theme: 'round-button',
      confirmButtonColor: '#1989fa'
    }).then(() => {
      router.push('/login')
    })
  } else {
    router.push(`/vote/${voteId}`)
  }
}

const addOptions = () => {
  singleVote.options.push('')
}

</script>

<style lang="less" scoped>
.create_vote{
  padding: 1rem;
  &_title {
    &_text {
      margin-left: 1rem;
    }
  }
  &_content {
    &_top {
      &_select {
        display: flex;
        justify-content: center;
        align-items: center;
        padding-left: 0.8rem;
      }
    }
    &_separation {
      background-color: #efefef;
      height: 1rem;
      margin: 0 -1rem 0 -1rem;
    }
    &_middle {
      margin-top: 2rem;
      &_dateshow {
        width: 15rem;
        padding: 0;
      }
      &_timeshow {
        padding: 0;
        margin-left: 2rem;
      }
      :deep(.van-cell) {
        display: flex;
        justify-content: center;
        align-items: center;
        &__value {
          display: flex;
          justify-content: end;
        }
      }
    }
    &_bottom {
      margin-top: 2rem;
      text-align: center;
    }
    &_btn {
      width: @button-width;
    }
  }
}
</style>