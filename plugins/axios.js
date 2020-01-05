import {Message} from "element-ui"
export default function({$axios, redirect}){
    $axios.onError(err => {
        const {statusCode, message} = err.response.data;  //err.response是原生方法，可以打印出错误信息  statusCode是状态码，message是返回的信息提示
        
        // 还未使用
        if(statusCode === 401 || statusCode === 403){
            Message.warning({message: "请先登录"});
            redirect("/user/login");  //重定向到登录页
        }

        if(statusCode === 400){
            Message.warning({message});
        }
    })
}     
