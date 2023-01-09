import sum from './js/sum';
import "./css/index.css"
import "./less/index.less"
import "./sass/index.scss"
import "../src/css/iconfont.css"
import { add } from "../src/js/math"
import "core-js";
console.log(count(1, 2));

console.log(sum(1, 2, 3, 4));
if (module.hot) {
    module.hot.accept("./js/sum")
}
document.getElementById("btn").onclick = function() {
    // import 动态导入：会将动态导入的文件代码分割（拆分成单独模块），在需要使用的时候自动加载
    import ( /*webpackChunkName:"math_count"*/ "./js/count")
    .then((res) => {
            console.log("模块加载成功", res.default(2, 1));
        })
        .catch((err) => {
            console.log("模块加载失败", err);
        });
};

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("/service-worker.js")
            .then((registration) => {
                console.log("SW registered: ", registration);
            })
            .catch((registrationError) => {
                console.log("SW registration failed: ", registrationError);
            });
    });
}