<template>
  <div>
      我是代理测试页面
      <div>
          <wd-button type="default" @click.native="sendtest()">测试按钮</wd-button>
      </div>
      <div>
        <wd-button type="default" @click.native="testproxy()">测试按钮2</wd-button>
      </div>
  </div>
</template>
<script>
import axios from 'axios'
import utils from '../util/util'

export default {
  data() {
      return {
          
      }
  },
  methods: {
    sendtest() {
      console.log('faqingqiu')
      axios({
        method: 'GET',
        url: '/core/bpms/getuserlist',
        headers: {'sessionKey':'123456'}
      })  
    },
    testproxy() {
      utils.sendRequest({
        url: utils.getApi('getdictbytype'),
        method: 'GET',
        data: {},
        callback: function(res) {
          console.log(res)
        }
      })
    }
  },
  mounted() {
    
  }
}
</script>
<style>
  
</style>
