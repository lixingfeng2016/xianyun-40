<template>
  <div>
    <div class="periphery">
      <div
        class="leftlist"
        :class="{activeda:vif===index}"
        @mouseover="Popout(index)"
        @mouseout="rightshow(index)"
        v-for="(item,index) in aities"
        :key="index"
      >
        <span>{{item.type}}</span>
        <span class="el-icon-arrow-right"></span>

        <!-- 右侧的隐藏部分 -->
        <div class="position" v-show="vif===index">
          <div
            class="positiontwo"
            :class="{activexiao:vif===index1}"
            v-for="(item1,index1) in item.children"
            :key="index1"
          >
            <i class="num1">{{index1+1}}</i>
            <span class="num2" @click="searchcity(item1.city)">{{item1.city}}</span>
            <span style="color:black" class="num3" @click="searchcity(item1.city)">{{item1.desc}}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 推荐城市 -->
    <div class="recommend">
      <h4>推荐城市</h4>
      <a href="#" @click="clickrecommend">
        <img src="http://157.122.54.189:9093/images/pic_sea.jpeg" alt/>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      vif: "",
      aities: []
    };
  },
  methods: {
    Popout(index) {
      this.vif = index;
    },
    rightshow(index) {
      this.vif = "";
    },
    searchcity(city) {
      // console.log(city);
      this.vif = "";
      this.$emit("searchsmall", city);
    },
    clickrecommend(){
       this.$emit("searchsmall");
    }
  },
  mounted() {
    this.$axios({
      url: "/posts/cities"
    }).then(res => {
      // console.log(res);
      this.aities = res.data.data;
    });
  }
};
</script>

<style scoped lang='less'>
.periphery {
  margin: 0;
  padding: 0;

  border: 1px solid #ddd;
  border-right: none;
  position: relative;

  .leftlist {
    padding: 0 20px;
    border-bottom: 1px solid #ddd;
    border-right: 1px solid #ddd;
    background-color: #fff;

    line-height: 40px;
    font-size: 14px;
    &:last-child {
      border-bottom: none;
    }
    .el-icon-arrow-right {
      float: right;
      line-height: 40px;
    }
    .position {
      position: absolute;
      background-color: #fff;
      top: -1px;
      right: -349px;
      width: 350px;
      z-index: 2;

      border: 1px solid #ddd;
      border-left: none;
      line-height: 37px;
      .positiontwo {
        padding: 0 20px;
        border-left: 1px solid #ddd;
        &.activexiao {
          // color: #ffa584;
          border-left: none;
        }
        .num1 {
          color: orange;
          font-size: 24px;
          font-style: italic;
        }
        .num2 {
          margin: 0 8px;
          &:hover {
            cursor: pointer;
            text-decoration: underline;
          }
        }
        .num3 {
          color: black;
          &:hover {
            cursor: pointer;
            text-decoration: underline;
          }
        }
      }
    }
  }
  .activeda {
    color: #ffa584;
    border-right: none;
  }
}
.recommend {
  width: 260px;
  margin-top: 20px;
  h4 {
    font-weight: 400;
    padding-bottom: 10px;
    border-bottom: 1px solid #ddd;
    margin-bottom: 10px;
  }
  a {
    display: block;
    img {
      width: 100%;
      display: block;
    }
  }
}
</style>