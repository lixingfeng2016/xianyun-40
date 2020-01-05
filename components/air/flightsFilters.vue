<template>
  <div class="filters">
    <el-row type="flex" class="filters-top" justify="space-between" align="middle">
      <el-col :span="8">
        单程：
        {{data.info.departCity}} - {{data.info.destCity}}
        /
        {{data.info.departDate}}
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="airport" placeholder="起飞机场">
          <el-option
            v-for="(item, index) in data.options.airport"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="flightTimes" placeholder="起飞时间">
          <el-option
            v-for="(item, index) in data.options.flightTimes"
            :key="index"
            :label="`${item.from}:00 - ${item.to}:00`"
            :value="`${item.from},${item.to}`"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="company" placeholder="航空公司">
          <el-option
            v-for="(item, index) in data.options.company"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="airSize" placeholder="机型">
          <el-option
            v-for="(item, index) in flightSize"
            :key="index"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <div class="filter-cancel">
      筛选：
      <el-button type="primary" round plain size="mini" @click="handleFiltersCancel">撤销</el-button>
    </div>
    <span>{{filtersdata}}</span>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    filtersdata() {
      let arr = this.data.flights.filter(item => {
        let valid = true;
        // 判断出发机场是否一致
        if (this.airport && this.airport !== item.org_airport_name) {
          valid = false;
        }

        // 起飞时间
        if (this.flightTimes) {
          const [from, to] = this.flightTimes.split(",");

          const state = +item.dep_time.split(":")[0];

          if (state < from || state >= to) {
            valid = false;
          }
        }

        // 航空公司
        if (this.company && this.company !== item.airline_name) {
          valid = false;
        }

        // 机型大小
        if (this.airSize && this.airSize !== item.plane_size) {
          valid = false;
        }

        return valid;
      });
      this.$emit("setdatalist", arr);
      return "";
    }
  },
  data() {
    return {
      airport: "", // 机场
      flightTimes: "", // 出发时间
      company: "", // 航空公司
      airSize: "", // 机型大小
      // 飞机的大小
      flightSize: [
        { label: "大", value: "L" },
        { label: "中", value: "M" },
        { label: "小", value: "S" }
      ]
    };
  },
  methods: {
    //     // 选择机场时候触发
    //     handleAirport(value) {
    //       console.log(this.data);
    //       let arr = this.data.flights.filter(v => {
    //         return v.org_airport_name === value;
    //       });
    //       this.$emit("setdatalist", arr);
    //     },

    //     // 选择出发时间时候触发
    //     handleFlightTimes(value) {},

    //     // 选择航空公司时候触发
    //     handleCompany(value) {},

    //     // 选择机型时候触发
    //     handleAirSize(value) {},

    // 撤销条件时候触发
    handleFiltersCancel() {
      this.airport = "";
      this.flightTimes = "";
      this.company = "";
      this.airSize = "";
    }
  }
};
</script>

<style scoped lang="less">
.filters {
  margin-bottom: 20px;
}

.filters-top {
  > div {
    /deep/ .el-select {
      margin-left: 10px;
    }
  }
}

.filter-cancel {
  margin-top: 10px;
}
</style>