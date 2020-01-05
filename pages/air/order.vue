<template>
    <div class="container">
        <el-row type="flex" justify="space-between">
            <!-- 订单表单 -->
            <div class="main">
                <OrderForm :data="infoData"/>
            </div>

            <!-- 侧边栏 -->
            <div class="aside">
                  <OrderAside :data="infoData"/>        
            </div>
        </el-row>
    </div>
</template>

<script>
import OrderForm from '@/components/air/orderForm'
import OrderAside from '@/components/air/orderAside'
export default {
    components: {
        OrderForm,
        OrderAside
    },
    data () {
        return {
            infoData:{
                insurances: [] ,// 初始化保险数据
                seat_infos:{}
            }
        }
    },
    mounted () {
        const {id,seat_xid}=this.$route.query
        this.$axios({
            url:`/airs/${id}`,
            params:{
                seat_xid
            }
        }).then(res=>{
            // console.log(res);
            this.infoData=res.data
            // console.log(this.infoData);
            
            
        })
    }
    
}
</script>

<style lang="less" scoped>
    .container{
        width:1000px;
        margin:20px auto;
    }
    
    /*aside*/
    .aside{
        width: 350px;
        height: fit-content;
        border:1px #ddd solid;
    }
</style>