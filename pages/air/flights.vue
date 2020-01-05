<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <FlightsFilters :data="newflightsData" @setdatalist="setdatalist" />

        <!-- 航班头部布局 -->
        <FlightsListHead />

        <!-- 航班信息 -->
        <FlightsItem v-for="(item,index) in dataList" :key="index" :data="item" />

        <!-- 分页 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageIndex"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
        <FlightsAside />
      </div>
    </el-row>
  </section>
</template>

<script>
// import moment from "moment";
import FlightsListHead from "@/components/air/flightsListHead"; //机票信息头部
import FlightsItem from "@/components/air/flightsItem.vue"; //机票信息列表
import FlightsFilters from "@/components/air/flightsFilters.vue"; //机票信息列表
import FlightsAside from "@/components/air/flightsAside.vue"; //机票信息列表

export default {
  components: {
    FlightsListHead,
    FlightsItem,
    FlightsFilters,
    FlightsAside
  },
  data() {
    return {
      flightsData: {
        flights: [],
        info: {},
        options: {}
      }, // 航班总数据
      newflightsData: {
        flights: [],
        info: {},
        options: {}
      }, //flightsData数据改变时，把原来的数据存进去
      // dataList: [], // 航班列表数据，用于循环flightsItem组件，单独出来是因为要分页
      pageIndex: 1, //当前显示的页数
      pageSize: 5, //每页显示的条数
      total: 0 //总页码数
    };
  },
  computed: {
    dataList() {
      if (!this.flightsData.flights) return [];
      // this.pageIndex=1

      return this.flightsData.flights.slice(
        (this.pageIndex - 1) * this.pageSize,
        this.pageIndex * this.pageSize
      );
    }
  },
  watch: {
    $route() {
      // 获取机票数据
      this.$axios({
        url: "/airs",
        params: this.$route.query
      }).then(res => {
        // console.log(res);
        this.flightsData = res.data;
        this.newflightsData = { ...res.data };
        this.total = res.data.total;
        // this.setdatalist();
      });
    }
  },
  methods: {
    setdatalist(arr) {
      this.flightsData.flights = arr;
      this.total = arr.length;
      this.pageIndex = 1;
    },
    handleSizeChange(value) {
      // 切换条数的时候触发
      this.pageSize = value;
    },
    handleCurrentChange(value) {
      // 切换页码的时候触发
      // console.log(value);
      this.pageIndex = value;
    }
  },
  mounted() {
    // 获取机票数据
    this.$axios({
      url: "/airs",
      params: this.$route.query
    }).then(res => {
      // console.log(res);
      this.flightsData = res.data;
      this.newflightsData = { ...res.data };
      this.total = res.data.total;
      // this.setdatalist();
    });
  }
};
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>