//observe
function observe(obj, vm) {
    Object.keys(obj).forEach(function (key) {
        defineReactive(vm, key, obj[key]);
    });
}

//劫持数据变化
function defineReactive(obj, key, val) {

    let dep = new Dep();

    Object.defineProperty(obj, key, {
        get: function () {
            //添加订阅者的 watcher 到主题对象 Dep
            if (Dep.target) {
                dep.addSub(Dep.target);
            }

            return val;
        },
        set: function (newVal) {
            if (newVal === val) {
                return;
            }
            val = newVal;

            //作为发布者发出通知
            dep.notify();
        }
    });
}

//DOM
function nodeToFragment(node, vm) {

    let flag = document.createDocumentFragment();

    let child;

    while (child = node.firstChild) {

        compile(child, vm);
        flag.append(child);
    }

    return flag;
}

//compile
function compile(node, vm) {
    let reg = /\{\{(.*)\}\}/;
    //节点类型为元素
    if (node.nodeType === 1) {
        let attr = node.attributes;

        //解析属性
        for (let i in attr) {
            if (attr[i].nodeName === 'v-model') {
                var name = attr[i].nodeValue;

                node.addEventListener('input', function (e) {
                    vm[name] = e.target.value;
                });
                node.value = vm[name];
                node.removeAttribute('v-model');
            }
        }
        new Watcher(vm, node, name, 'input');
    }

    //节点类型为text
    if (node.nodeType === 3) {
        if (reg.test(node.nodeValue)) {

            //获取匹配到的字符串
            let name = RegExp.$1;
            name = name.trim();

            //将data的值给赋给此node
            // node.nodeValue = vm[name];
            new Watcher(vm, node, name, 'text');
        }
    }
}

//发布订阅模式 model = >view
function Watcher(vm, node, name, nodeType) {
    Dep.target = this;

    this.name = name;
    this.node = node;
    this.vm = vm;
    this.nodeType = nodeType;
    this.update();
    Dep.target = null;
}

Watcher.prototype = {
    update: function () {

        this.get();
        if (this.nodeType === 'text') {
            this.node.nodeValue = this.value;
        }
        if (this.nodeType === 'input') {
            this.node.value = this.value;
        }
    },
    get: function () {
        //触发相应属性的get
        this.value = this.vm[this.name];
    }
};

function Dep() {
    this.subs = [];
}

Dep.prototype = {
    addSub: function (sub) {
        this.subs.push(sub);
    },

    notify: function () {
        this.subs.forEach(function (sub) {
            sub.update();
        });
    }
};

function Vue(options) {
    this.data = options.data;

    let data = this.data;

    observe(data, this);

    let id = options.el;
    let dom = nodeToFragment(document.getElementById(id), this);

    document.getElementById(id).appendChild(dom);
}


let vm = new Vue({
    el: 'app',
    data: {
        text: 'hello world'
    }
});
