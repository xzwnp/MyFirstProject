import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from "./router";
import {
    Button,
    Input,
    Form,
    FormItem,
    RadioGroup,
    Radio,
    Alert,
    Table,
    TableColumn,
    Dialog,
    Tag,
    TimeSelect,
    Popover
} from 'element-ui';

Vue.config.productionTip = false
Vue.prototype.$ELEMENT = {size: 'medium', zIndex: 3000};

//注册全局变量

Vue.use(VueAxios, axios)
Vue.use(Button);
Vue.use(Input);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Alert);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Dialog);
Vue.use(Tag);
Vue.use(TimeSelect);
Vue.use(Popover);
// 引入elementUI
import {Message} from 'element-ui';
//由于Message组件并没有install 方法供Vue来操作的，是直接返回的，因此按照官方文档单独引入的方法是
//会报错的，需要给 Message 添加 install 方法
Message.install = function (Vue) {
    Vue.prototype.$message = Message
}
Vue.use(Message)//消息提示

new Vue({
    render: h => h(App),
    router,
    axios,
    data() {
        return {
            //说明：0：未登录 1：普通用户模式 666：管理员模式
            isLogin: 0,
            user: null,
            baseAPI: "http://localhost:8081/example/api/",
            userAPI: "http://localhost:8081/example/api/user/",
            adminAPI: "http://localhost:8081/example/api/admin/",
        }
    },
    methods: {
        jump(routerPath) {
            this.$router.push({path: routerPath})
        },

    },
    computed: {
        getNickName() {
            if (this.user == null) {
                return "您还未登录";
            } else {
                if (this.isLogin === 1) {
                    return this.user.nickName + ",欢迎";
                } else {
                    return "管理员,欢迎";
                }
            }

        }
    }
}).$mount('#app')
