<template>
  <div class="login">
    <!-- <form :model="formAccount" class="login_content">
      <label>用户名：
        <input type="text" v-model="formAccount.name" class="login_content_name"/>
      </label>
      <label>密&nbsp;&nbsp;&nbsp;&nbsp;码：
        <input type="password" v-model="formAccount.password" class="login_content_password"/>
      </label>
      <div class="login_content_btnwrapper">
        <button type="submit" @click="login">登录</button>
      </div>
    </form> -->
    <van-form @submit="login" :model="formAccount" class="login_content">
      <van-cell-group inset>
        <van-field
          v-model="formAccount.name"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="formAccount.password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script lang="ts" setup>
import useLoginStore from '@/stores/login/login';
import { reactive, ref } from 'vue'

interface ILogin {
  name: string
  password: string
}

const formAccount = reactive<ILogin>({
  name: '',
  password: ''
})

const loginStore = useLoginStore()

const login = () => {
    const name = formAccount.name
    const password = formAccount.password
    loginStore.postLoginAction({name, password})
}

</script>

<style lang="less" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 70%;

  &_content {
    display: flex;
    flex-direction: column;
    
    &_name {
      margin: 10px 0 10px 0;
    }
    
    &_password {
      margin: 10px 0 10px 0;
    }

    &_btnwrapper {
      text-align: center;
    }
  }
}

</style>