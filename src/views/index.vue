<template>
  <div class="app-container home">
    <el-row :gutter="20">
      <el-col :sm="24" :lg="24">
        <blockquote class="text-warning" style="font-size: 14px">
          智能对话->用户激活中进行激活
          <br/>
          <el-link
            href="https://www.aliyun.com/minisite/goods?userCode=brki8iof"
            type="primary"
            target="_blank"
          >激活码购买地址 : https://www.aliyun.com/minisite/goods?userCode=brki8iof
          </el-link>
          <h4 class="text-danger">
            <el-link
              href="https://www.aliyun.com/minisite/goods?userCode=brki8iof"
              type="danger"
              target="_blank"
            >使用教程(包含配置到程序) : https://www.aliyun.com/minisite/goods?userCode=brki8iof
            </el-link>
          </h4>

          <h4 >
            <el-link
              href="https://www.aliyun.com/minisite/goods?userCode=brki8iof"
              type="warn"
              target="_blank"
            >注意 : 此激活码为时间激活码,用于开发者向外提供使用（也可以个人使用，避免单独购买key产生的余额不足问题）。
            </el-link>
          </h4>
        </blockquote>

        <hr/>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :sm="24" :lg="12" style="padding-left: 20px">
        <h2>微信小程序AI智能对话</h2>
        <p>
      一款很优秀的java程序ai智能对话

        </p>
        <p>
          <b>当前版本:</b> <span>v{{ version }}</span>
        </p>
        <p>
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-cloudy"
            plain
            @click="goTarget('https://gitee.com/e0cia/chatgpt_wechat_font')"
          >访问码云
          </el-button
          >
          <el-button
            size="mini"
            icon="el-icon-s-home"
            plain
            @click="goTarget('https://ext.dcloud.net.cn/plugin?id=11009')"
          >访问Dcloud
          </el-button
          >
        </p>
      </el-col>

<!--      <el-col :sm="24" :lg="12" style="padding-left: 50px">-->
<!--        <el-row>-->
<!--          <el-col :span="12">-->
<!--            <h2>技术选型</h2>-->
<!--          </el-col>-->
<!--        </el-row>-->
<!--        <el-row>-->
<!--          <el-col :span="6">-->
<!--            <h4>后端技术</h4>-->
<!--            <ul>-->
<!--              <li>SpringBoot</li>-->
<!--              <li>Spring Security</li>-->
<!--              <li>JWT</li>-->
<!--              <li>MyBatis</li>-->
<!--              <li>Druid</li>-->
<!--              <li>Fastjson</li>-->
<!--              <li>...</li>-->
<!--            </ul>-->
<!--          </el-col>-->
<!--          <el-col :span="6">-->
<!--            <h4>前端技术</h4>-->
<!--            <ul>-->
<!--              <li>Vue</li>-->
<!--              <li>Vuex</li>-->
<!--              <li>Element-ui</li>-->
<!--              <li>Axios</li>-->
<!--              <li>Sass</li>-->
<!--              <li>Quill</li>-->
<!--              <li>...</li>-->
<!--            </ul>-->
<!--          </el-col>-->
<!--        </el-row>-->
<!--      </el-col>-->
    </el-row>
    <el-divider/>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="12" :lg="8">
        <el-card class="update-log">
          <div slot="header" class="clearfix">
            <span>联系信息</span>
          </div>
          <div class="body">
            <p>
              <i class="el-icon-user-solid"></i> QQ群：
<!--              <s>满104748341</s>-->
              <a href="https://qm.qq.com/cgi-bin/qm/qr?k=r9wUrNxH5gX-EdMMdN4cVOt8MyQV2MnL&jump_from=webapi&authKey=UHRma7Iwg1U6UtlS9tWVEfhcU0WaNJuwRW3H1NHNDQjIkIvCpjC/RdNwFaMjxF3W" target="_blank">
              575451625</a
            >
            </p>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="8">
        <el-card class="update-log">
          <div slot="header" class="clearfix">
            <span>更新日志</span>
          </div>
          <el-collapse accordion>
		  
		     <el-collapse-item title="v3.0（更新较大,需要重置数据库）">
              <ol>
                <li>优化小程序聊天界面,以及更新好看样式</li>
                <li>更新小程序续答模式,可以进行聊天</li>
                <li>更新重置话题功能</li>
				 <li>更新小程序更新检测</li>
                <li>增加后台管理系统页面（大更新,可后台直接操作数据,无需数据库操作）</li>
                <li>后台多个key管理（过期自动检测,自动更换）</li>
              </ol>
            </el-collapse-item>
		  
		  
            <el-collapse-item title="v1.0">
              <ol>
                <li>问答类型,一问一答模式</li>
                <li>对话模式,和机器人消息对话</li>
                <li>对对话内容做了敏感词检测</li>
              </ol>
            </el-collapse-item>

            <el-collapse-item title="v1.0.1">
              <ol>
                <li>教程视频:B站视频教程-小白可搭建</li>
              </ol>
            </el-collapse-item>
          </el-collapse>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="8">
        <el-card class="update-log">
          <div slot="header" class="clearfix">
            <span>捐赠支持</span>
          </div>
          <div class="body">
<!--            <img-->
<!--              src="https://oscimg.oschina.net/oscnet/up-d6695f82666e5018f715c41cb7ee60d3b73.png"-->
<!--              alt="donate"-->
<!--              width="100%"-->
<!--            />-->
            <span style="display: inline-block; height: 30px; line-height: 30px"
            >你可以请作者喝杯咖啡表示鼓励</span
            >
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import md5 from 'js-md5';
import axios from 'axios'
export default {
  name: 'Index',
  data() {
    return {
      // 版本号
      version: '1.0.1',
    }
  },
  created() {

  },
  methods: {
    goTarget(e){
      window.location.href=e;
    }
  }
}
</script>

<style scoped lang="scss">
.home {
  blockquote {
    padding: 10px 20px;
    margin: 0 0 20px;
    font-size: 17.5px;
    border-left: 5px solid #eee;
  }

  hr {
    margin-top: 20px;
    margin-bottom: 20px;
    border: 0;
    border-top: 1px solid #eee;
  }

  .col-item {
    margin-bottom: 20px;
  }

  ul {
    padding: 0;
    margin: 0;
  }

  font-family: "open sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 13px;
  color: #676a6c;
  overflow-x: hidden;

  ul {
    list-style-type: none;
  }

  h4 {
    margin-top: 0px;
  }

  h2 {
    margin-top: 10px;
    font-size: 26px;
    font-weight: 100;
  }

  p {
    margin-top: 10px;

    b {
      font-weight: 700;
    }
  }

  .update-log {
    ol {
      display: block;
      list-style-type: decimal;
      margin-block-start: 1em;
      margin-block-end: 1em;
      margin-inline-start: 0;
      margin-inline-end: 0;
      padding-inline-start: 40px;
    }
  }
}
</style>

