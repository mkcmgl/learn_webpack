import sum from './js/sum';
import count from './js/count';
import "./css/index.css"
import "./less/index.less"
import "./sass/index.scss"
import "../src/css/iconfont.css"
import { add } from "../src/js/math"
console.log(count(1, 2));

console.log(sum(1, 2, 3, 4));
if (module.hot) {
    module.hot.accept("./js/count")
    module.hot.accept("./js/sum")
}