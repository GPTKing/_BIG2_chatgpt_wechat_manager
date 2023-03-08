<template>
  <div></div>
</template>
 
<script>
import { Loading } from 'element-ui'

let loadingInstance;
export default {
  data() {
    return {
      redirect: undefined,
    };
  },
  created() {
    loadingInstance = Loading.service({
      lock: true,
      text: "正在验证第三方应用账户数据，请稍候",
      spinner: "el-icon-loading",
      background: "rgba(0, 0, 0, 0.7)",
    })
     // 第三方登录回调参数
    this.source = this.$route.query.source;
    this.code = this.$route.query.code;
    this.state = this.$route.query.state;
    this.$store.dispatch("SocialLogin", {
      code: this.code,
      state: this.state,
      source: this.source
    }).then(() => {
      loadingInstance.close();
      this.$router.push({ path: this.redirect || "/" }).catch(()=>{});
    }).catch(() => {
      loadingInstance.close();
    });
  },
  methods: {
  },
};
</script>
 
<style rel="stylesheet/scss" lang="scss">
</style>