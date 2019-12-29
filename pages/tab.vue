<template>
  <div>
      <div>
          <span v-for="(item,index) in ['新闻','体育','娱乐']" :key="index" @click="dianji(index)" :class="{red:num===index}">{{item}}</span>
          
      </div>
      <div v-if="num===0">
          <ul>
              <li>普通新闻1</li>
              <li>普通新闻2</li>
              <li>普通新闻3</li>
          </ul>
      </div>
       <div v-else-if="num===1">
          <ul>
              <li>体育新闻1</li>
              <li>体育新闻2</li>
              <li>体育新闻3</li>
          </ul>
      </div>
      <div v-else-if="num===2">
          <ul>
              <li>娱乐新闻1</li>
              <li>娱乐新闻2</li>
              <li>娱乐新闻3</li>
          </ul>
      </div>
  </div>
</template>

<script>
export default {
    data () {
        return {
            num:0
        }
    },
    methods: {
       dianji(index){
        //    console.log(111);
           
           this.num=index
       }
    }
}
</script>

<style lang='less' scoped>

.red{
    color: red
}

</style>