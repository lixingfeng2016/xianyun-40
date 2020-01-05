<template>
  <div class="flight-item">
    <div @click="showRecommend=!showRecommend">
      <!-- 显示的机票信息 -->
      <el-row type="flex" align="middle" class="flight-info">
        <el-col :span="6">
          <span>{{data.airline_name}}</span>
          {{data.flight_no}}
        </el-col>
        <el-col :span="12">
          <el-row type="flex" justify="space-between" class="flight-info-center">
            <el-col :span="8" class="flight-airport">
              <strong>{{data.dep_time}}</strong>
              <span>{{data.org_airport_name}}{{data.org_airport_quay}}</span>
            </el-col>
            <el-col :span="8" class="flight-time">
              <span>{{rankTime}}</span>
            </el-col>
            <el-col :span="8" class="flight-airport">
              <strong>{{data.arr_time}}</strong>
              <span>{{data.dst_airport_name}}{{data.dst_airport_quay}}</span>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6" class="flight-info-right">
          ￥
          <span class="sell-price">{{data.seat_infos[0].org_settle_price_child}}</span>起
        </el-col>
      </el-row>
    </div>
    <div class="flight-recommend" v-if="showRecommend">
      <!-- 隐藏的座位信息列表 -->
      <el-row type="flex" justify="space-between" align="middle">
        <el-col :span="4">低价推荐</el-col>
        <el-col :span="20">
          <el-row
            type="flex"
            justify="space-between"
            align="middle"
            class="flight-sell"
            v-for="(item1,index) in data.seat_infos"
            :key="index"
          >
            <el-col :span="16" class="flight-sell-left">
              <span>{{item1.group_name}}</span>
              | {{item1.supplierName}}
            </el-col>
            <el-col :span="5" class="price">￥{{item1.org_settle_price}}</el-col>
            <el-col :span="3" class="choose-button">
              <el-button type="warning" size="mini" @click="handleChoose(data.id, item1.seat_xid)">选定</el-button>
              <p>剩余：{{item1.discount}}</p>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    rankTime() {
      // 取到出发时间和到达时间，转换成分钟
      const dep = this.data.dep_time.split(":");
      const arr = this.data.arr_time.split(":");
      const newdep = dep[0] * 60 + +dep[1];
      const newarr = arr[0] * 60 + +arr[1];

      //   进行相减,得到相差的时间
      let zhi =  newarr- newdep;

    //   如果到达时间小于出发时间，则加24小时
            if(zhi<0){
                zhi=newarr+24*60-newdep
            }

            return `${Math.floor(zhi/60)}时${zhi%60}分`
    }
  },
  props: {
    // 数据
    data: {
      type: Object,
      // 默认是空数组  防止数据还没传过来时报错
      default: {}
    }
  },
  data() {
    return {
      showRecommend: false // 列表默认收起
    };
  },
    methods: {
       handleChoose(id,seat_xid){
              this.$router.push({
                path: "/air/order", 
                query:{
                  id,
                  seat_xid
                }
              })
       }
    }
};
</script>

<style scoped lang="less">
.flight-item {
  border: 1px #ddd solid;
  margin-bottom: 10px;

  .flight-info {
    padding: 15px;
    cursor: pointer;

    > div {
      &:first-child,
      &:last-child {
        text-align: center;
      }
    }
  }

  .flight-info-center {
    padding: 0 30px;
    text-align: center;

    .flight-airport {
      strong {
        display: block;
        font-size: 24px;
        font-weight: normal;
      }
      span {
        font-size: 12px;
        color: #999;
      }
    }

    .flight-time {
      span {
        display: inline-block;
        padding: 10px 0;
        border-bottom: 1px #eee solid;
        color: #999;
      }
    }
  }

  .flight-info-right {
    .sell-price {
      font-size: 24px;
      color: orange;
      margin: 0 2px;
    }
  }
}

.flight-recommend {
  background: #f6f6f6;
  border-top: 1px #eee solid;
  padding: 0 20px;
  transition: all 1s;

  .flight-sell {
    border-bottom: 1px #eee solid;
    padding: 10px 0;

    &:last-child {
      border-bottom: none;
    }

    .flight-sell-left {
      font-size: 12px;
      span {
        color: green;
      }
    }

    .price {
      font-size: 20px;
      color: orange;
    }

    .choose-button {
      text-align: center;
      color: #666;
      button {
        display: block;
        width: 100%;
        margin-bottom: 5px;
      }
    }
  }
}
</style>