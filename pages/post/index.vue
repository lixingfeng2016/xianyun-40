<template>
  <div class="container">
    <!-- 左边的列表 -->
    <div class="left">
      <IndexLeft @searchsmall="searchRecommend" />
    </div>

    <!-- 右边的列表 -->
    <div class="right">
      <!-- 头部 -->
      <div>
        <div class="search-bar el-row is-justify-space-between is-align-middle el-row--flex">
          <input
            type="text"
            placeholder="请输入想去的地方，比如：'广州'"
            v-model="searchInput"
            @keyup.enter="searchArticle(searchInput)"
          />
          <i class="el-icon-search" @click="searchArticle"></i>
        </div>
      </div>
      <!-- 推荐 -->
      <div class="search-recommend">
        <em style="margin-right:5px">推荐:</em>
        <span
          v-for="(item,index) in ['广州','上海','北京']"
          :key="index"
          @click="searchRecommend(item)"
        >{{item}}</span>
      </div>
      <!-- 热门推荐 -->
      <div class="post-title el-row is-justify-space-between is-align-middle el-row--flex">
        <h4>推荐攻略</h4>
        <!-- <nuxt-link></nuxt-link> -->
        <el-button type="primary" @click="$router.push({path:'/post/create'})">
          <i class="el-icon-edit"></i>
          <span>写游记</span>
        </el-button>
      </div>

      <!-- 列表 -->
      <div class="post-list" v-for="(item,index) in articleList" :key="index">
        <!-- 列表1 -->
        <div class="post-item" v-if="item.images.length>=3">
          <h4>
            <a :href="'post/detail?id='+item.id">{{item.title}}</a>
          </h4>
          <p>
            <a :href="'/post/detail?id='+item.id">{{item.summary}}</a>
          </p>

          <!-- 图片 -->
          <div class="card-images el-row is-justify-space-between is-align-middle el-row--flex">
            <a :href="'/post/detail?id='+item.id">
              <img :src="item.images[0]" alt />
            </a>
            <a :href="'/post/detail?id='+item.id">
              <img :src="item.images[1]" alt />
            </a>
            <a :href="'/post/detail?id='+item.id">
              <img :src="item.images[2]" alt />
            </a>
          </div>
          <!-- 定位 个人信息 -->
          <div class="post-info el-row is-justify-space-between el-row--flex">
            <!-- 定位 -->
            <div class="post-info-left el-row is-align-middle el-row--flex">
              <span>
                <i class="el-icon-location-outline"></i>
                {{item.cityName}}
              </span>
              <!-- 个人信息 -->
              <div class="post-user el-row is-align-middle el-row--flex">
                by
                <a href="/post/user">
                  <img :src="$axios.defaults.baseURL+item.account.defaultAvatar" alt />
                </a>
                <a href="/post/user">
                  <span>{{item.account.nickname}}</span>
                </a>
              </div>
              <span>
                <i class="el-icon-view"></i>
                <span>{{item.watch}}</span>
              </span>
            </div>
            <span class="post-info-right">{{item.like}}</span>
          </div>
        </div>

        <!-- 列表2 -->
        <div class="post-item" v-else-if="item.images.length===0">
          <h4>
            <a :href="'post/detail?id='+item.id">{{item.title}}</a>
          </h4>
          <p>
            <a :href="'/post/detail?id='+item.id">{{item.summary}}</a>
          </p>
          <!-- 定位 个人信息 -->
          <div class="post-info el-row is-justify-space-between el-row--flex">
            <!-- 定位 -->
            <div class="post-info-left el-row is-align-middle el-row--flex">
              <span>
                <i class="el-icon-location-outline"></i>
                {{item.cityName}}
              </span>
              <!-- 个人信息 -->
              <div class="post-user el-row is-align-middle el-row--flex">
                by
                <a href="/post/user">
                  <img :src="$axios.defaults.baseURL+item.account.defaultAvatar" alt />
                </a>
                <a href="/post/user">
                  <span>{{item.account.nickname}}</span>
                </a>
              </div>
              <span>
                <i class="el-icon-view"></i>
                <span>{{item.watch}}</span>
              </span>
            </div>
            <span class="post-info-right">{{item.like}}</span>
          </div>
        </div>

        <!-- 列表3 -->
        <div
          class="post-item image-text el-row is-justify-space-between is-align-middle el-row--flex"
          v-else
        >
          <!-- 左边的列表 -->
          <div class="post-cover el-row is-align-middle">
            <a :href="'/post/detail?id='+item.id">
              <img :src="item.images[0]" alt />
            </a>
          </div>

          <!-- 右边的列表 -->
          <div class="post-content">
            <h4>
              <a :href="'/post/detail?id='+item.id">{{item.title}}</a>
            </h4>
            <p>
              <a :href="'/post/detail?id='+item.id">{{item.summary}}</a>
            </p>
            <div class="post-info el-row is-justify-space-between el-row--flex">
              <!-- 定位 -->
              <div class="post-info-left el-row is-align-middle el-row--flex">
                <span>
                  <i class="el-icon-location-outline"></i>
                  {{item.cityName}}
                </span>
                <!-- 个人信息 -->
                <div class="post-user el-row is-align-middle el-row--flex">
                  by
                  <a href="/post/user">
                    <img :src="$axios.defaults.baseURL+item.account.defaultAvatar" alt />
                  </a>
                  <a href="/post/user">
                    <span>{{item.account.nickname}}</span>
                  </a>
                </div>
                <span>
                  <i class="el-icon-view"></i>
                  <span>{{item.watch}}</span>
                </span>
              </div>
              <span class="post-info-right">{{item.like}}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 底部分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageindex"
        :page-sizes="[3, 6, 10, 15]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import IndexLeft from "@/components/post/indexLeft";
export default {
  components: {
    IndexLeft
  },
  data() {
    return {
      articleList: [],
      pagesize: 3,
      pageindex: 1,
      total: 0,
      searchInput: ""
    };
  },
  mounted() {
    this.articleLists();
  },
  methods: {
    // 文章列表获取
    articleLists(city) {
      this.$axios({
        url: "/posts",
        params: {
          city,
          _start: (this.pageindex - 1) * this.pagesize,
          _limit: this.pagesize
        }
      }).then(res => {
        // console.log(res);
        this.total = res.data.total;

        this.articleList = res.data.data;
      });
    },
    // 搜索
    searchArticle() {
      this.articleLists(this.searchInput.trim());
    },
    // 推荐搜索
    searchRecommend(item) {
      this.searchInput = item;
      this.articleLists(item);
    },

    // 子组件事件
    // searchsmall(city){
    //   this.articleLists(city)
    // },

    // 分页
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pagesize = val;
      this.articleLists();
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.pageindex = val;
      this.articleLists();
    }
  }
};
</script>


<style lang='less' scoped>
.container {
  width: 1000px;
  padding: 20px 0;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  .left {
    // border: 1px solid #eee;
    width: 260px;
    // height: 400px;
  }
  .right {
    // border: 1px solid #eee;
    width: 700px;
    // height: 400px;
    .search-bar {
      width: 100%;
      box-sizing: border-box;
      height: 40px;
      line-height: 40px;
      border: 3px solid orange;
      input {
        flex: 1;
        padding: 0 20px;
        line-height: 40px;
        outline: none;
        border: none;
        background: none;
      }
      i {
        font-size: 24px;
        color: orange;
        font-weight: 700;
        margin-right: 10px;
        cursor: pointer;
      }
    }
    .search-recommend {
      padding: 10px 0;
      font-size: 12px;
      color: #666;
      span {
        margin-right: 10px;
        &:hover {
          color: orange;
          text-decoration: underline;
          cursor: pointer;
        }
      }
    }
    // 推荐攻略
    .post-title {
      padding-bottom: 10px;
      border-bottom: 1px solid #eee;
      position: relative;
      h4 {
        font-weight: 400;
        font-size: 18px;
        color: orange;
        &::after {
          display: block;
          content: "";
          width: 72px;
          height: 2px;
          background: orange;
          position: absolute;
          bottom: 0;
          left: 0;
        }
      }
    }

    // 列表
    .post-item {
      width: 100%;
      padding: 20px 0;
      border-bottom: 1px solid #eee;
      h4 {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-bottom: 15px;
        font-weight: 400;
        font-size: 18px;
        &:hover {
          color: orange;
        }
      }
      p {
        margin-bottom: 15px;
        line-height: 1.5;
        font-size: 14px;
        height: 63px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
      }
      .card-images {
        margin: 15px 0;
        a {
          img {
            width: 220px;
            height: 150px;
            display: block;
            object-fit: cover;
          }
        }
      }
    }

    // 定位
    .post-info {
      justify-content: space-between;
      .post-info-left {
        font-size: 12px;
        color: #999;
        span {
          margin-right: 10px;
        }
      }
      .post-user {
        margin-right: 10px;
        a {
          color: orange;
          img {
            display: block;
            width: 16px;
            height: 16px;
            border-radius: 100px;
            margin: 5px;
          }
        }
      }
    }

    .post-info-right {
      color: orange;
    }
  }

  // 列表2
  .post-item {
    width: 100%;
    padding: 20px 0;
    border-bottom: 1px solid #eee;

    .post-cover {
      width: 220px;
      height: 150px;
      overflow: hidden;
      flex-shrink: 0;
      margin-right: 10px;
      a {
        img {
          display: block;
          width: 100%;
          height: 100%;
          -o-object-fit: cover;
          object-fit: cover;
        }
      }
      h4 {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-bottom: 15px;
        font-weight: 400;
        font-size: 18px;
        &:hover {
          color: orange;
        }
      }
      p {
        margin-bottom: 15px;
        line-height: 1.5;
        font-size: 14px;
        height: 63px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        a {
          color: #666;
        }
      }
    }

    .post-content {
      width: 470px;
    }
  }
}
</style>