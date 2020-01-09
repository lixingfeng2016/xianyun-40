<template>
  <div class="boss">
    <div class="el-row is-justify-space-between el-row--flex">
      <!-- 左边仓库 -->
      <div class="main">
        <h2>发表新攻略</h2>
        <p>分享你的个人游记，让更多人看到哦</p>

        <!-- 标题输入框 -->
        <el-input v-model="form.title" placeholder="请输入标题"></el-input>

        <!-- 富文本框  -->
        <VueEditor :config="config" ref="vueEditor" />

        <!-- 选择城市 -->
        <el-form ref="form" :model="form">
          <el-form-item label="选择城市:">
            <el-col :span="6">
              <el-input v-model="form.playCity" placeholder="请搜索游玩城市"></el-input>
            </el-col>
          </el-form-item>
        </el-form>

        <el-button type="primary" size="small" @click="issueArticle">发布</el-button>
        <span class="draft">
          或者
          <span class="aa" @click="setdraft">保存到草稿</span>
        </span>
      </div>

      <!-- 右边仓库 -->
      <div class="aside">
        <Draft @setwenben="setwenben" />
      </div>
    </div>
  </div>
</template>

<script>
import "quill/dist/quill.snow.css";
let VueEditor;

if (process.browser) {
  VueEditor = require("vue-word-editor").default;
}

import Draft from "@/components/post/draft";
export default {
  components: {
    VueEditor,
    Draft
  },
  data() {
    return {
      form: {
        title: "", //游记标题
        playCity: "" // 游玩城市
      },

      config: {
        // 上传图片的配置
        uploadImage: {
          url: "http://127.0.0.1:1337/upload",
          name: "files",
          // res是结果，insert方法会把内容注入到编辑器中，res.data.url是资源地址
          uploadSuccess(res, insert) {
            insert("http://127.0.0.1:1337" + res.data[0].url);
          }
        },

        // 上传视频的配置
        uploadVideo: {
          url: "http://127.0.0.1:1337/upload",
          name: "files",
          uploadSuccess(res, insert) {
            insert("http://127.0.0.1:1337" + res.data[0].url);
          }
        }
      }
    };
  },
  methods: {
    // 发布文章
    issueArticle() {
      var quill = this.$refs.vueEditor.editor.root.innerHTML;
      const {token} =this.$store.state.user.userInfo
      if(!token){
        this.$message.error('请登录再发布');
        
        return
      } 
      this.$axios({
        url: "/posts",
        method: "POST",
        data: {
          content: quill,
          title: this.form.title,
          city: this.form.playCity
        },
        headers:{ Authorization:`Bearer ${token}`}
      
      }).then(res=>{
        this.$message.success('发布成功')
        // console.log(res);
        
      })
      this.form.title = "";
      this.form.playCity = "";
      var quil = this.$refs.vueEditor.editor;
      quil.clipboard.dangerouslyPasteHTML("");
    },
    // 格式化时间
    formatDateTime(inputTime) {
      var date = new Date(inputTime);
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      var h = date.getHours();
      h = h < 10 ? "0" + h : h;
      var minute = date.getMinutes();
      var second = date.getSeconds();
      minute = minute < 10 ? "0" + minute : minute;
      second = second < 10 ? "0" + second : second;
      return y + "-" + m + "-" + d;
    },
    // 存到草稿
    setdraft() {
      // console.log(this.title);
      // console.log(this.formatDateTime(new Date()));

      var quill = this.$refs.vueEditor.editor.root.innerHTML;
      this.$store.commit("post/setDrafts", {
        title: this.form.title,
        article: quill,
        city: this.form.playCity,
        data: this.formatDateTime(new Date())
      });
      this.form.title = "";
      this.form.playCity = "";
      var quil = this.$refs.vueEditor.editor;
      quil.clipboard.dangerouslyPasteHTML("");
    },
    // 点击草稿编辑
    setwenben(data) {
      this.form.title = data.title;
      this.form.playCity = data.city;
      var quill = this.$refs.vueEditor.editor;
      quill.clipboard.dangerouslyPasteHTML(data.article);
    }
  }
};
</script>

<style lang='less' scoped>
.boss {
  width: 1000px;
  margin: 0 auto;
  padding: 20px 0;
}
.main {
  width: 750px;
  h2 {
    font-weight: 400;
    font-size: 22px;
    margin-bottom: 10px;
  }
  p {
    font-size: 12px;
    color: #999;
    margin-bottom: 10px;
  }
  .el-input {
    margin-bottom: 20px;
  }
  /deep/.ql-editor.ql-blank {
    height: 400px;
  }
  .draft {
    margin-left: 10px;
    font-size: 14px;
    .aa {
      color: orange;
      &:hover {
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }
}
.aside {
  width: 200px;
}
</style>