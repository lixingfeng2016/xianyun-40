<template>
  <div class="draft-box">
    <!-- <div> -->
    <h4 class="draft-title">草稿箱({{drafts.length}})</h4>
    <div class="draft-list" v-for="(item,index) in drafts" :key="index">
      <div class="draft-item">
        <span class="title">{{item.title}}</span>
        <!-- 图标 -->
        <i class="iconfont el-icon-edit" style="cursor: pointer" @click="setwenben(index)"></i>
        <p style="color:#999" v-if="item.data">{{item.data}}</p>
      </div>

      <!-- </div> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drafts: []
    };
  },
  mounted() {
    setTimeout(() => {
      this.drafts = this.$store.state.post.draft;
      // console.log(this.drafts);
    }, 1);
  },
  methods: {
      setwenben(index){
            this.$emit('setwenben',this.drafts[index])
      }
  }
};
</script>

<style lang='less' scoped>
.draft-box {
  border: 1px solid #ddd;
  padding: 10px;
  .draft-title {
    margin-bottom: 10px;
    font-weight: 400;
    color: #666;
  }
  .title {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
  }
  i {
    &:hover {
      color: orange;
    }
  }
}
</style>