#### 实现双向绑定的方法：

发布者-订阅者模式: 一般通过sub, pub的方式实现数据和视图的绑定监听，更新数据方式通常做法是 vm.set('property', value)

这种方式现在毕竟太low了，我们更希望通过 vm.property = value 这种方式更新数据，同时自动更新视图，于是有了下面两种方式

脏值检查: angular.js 是通过脏值检测的方式比对数据是否有变更，来决定是否更新视图，最简单的方式就是通过 setInterval() 定时轮询检测数据变动，当然Google不会这么做，angular只有在指定的事件触发时进入脏值检测，大致如下：

* DOM事件，譬如用户输入文本，点击按钮等。( ng-click )

* XHR响应事件 ( $http )

* 浏览器Location变更事件 ( $location )

* Timer事件( $timeout , $interval )

* 执行 $digest() 或 $apply()

数据劫持: vue.js 则是采用数据劫持结合发布者-订阅者模式的方式，通过Object.defineProperty()来劫持各个属性的setter，getter，在数据变动时发布消息给订阅者，触发相应的监听回调。

#### 实践
要实现mvvm的双向绑定，就必须要实现以下几点：
1、实现一个数据监听器Observer，能够对数据对象的所有属性进行监听，如有变动可拿到最新值并通知订阅者
2、实现一个指令解析器Compile，对每个元素节点的指令进行扫描和解析，根据指令模板替换数据，以及绑定相应的更新函数
3、实现一个Watcher，作为连接Observer和Compile的桥梁，能够订阅并收到每个属性变动的通知，执行指令绑定的相应回调函数，从而更新视图
4、mvvm入口函数，整合以上三者

##### 任务拆分：
1、输入框以及文本节点与 data 中的数据绑定

2、输入框内容变化时，data 中的数据同步变化。即 view => model 的变化。

3、data 中的数据变化时，文本节点的内容同步变化。即 model => view 的变化。

细节部分：
一、DocumentFragment
 DocumentFragment（文档片段）可以看作节点容器，它可以包含多个子节点，当我们将它插入到 DOM 中时，只有它的子节点会插入目标节点，所以把它看作一组节点的容器。
 使用 DocumentFragment 处理节点，速度和性能远远优于直接操作 DOM。
 Vue 进行编译时，就是将挂载目标的所有子节点劫持（真的是劫持，通过 append 方法，DOM 中的节点会被自动删除）到 DocumentFragment 中，经过一番处理后，再将 DocumentFragment 整体返回插入挂载目标。

 createDocumentFragment()方法创建了一虚拟的节点对象，节点对象包含所有属性和方法。

 当你想提取文档的一部分，改变，增加，或删除某些内容及插入到文档末尾可以使用createDocumentFragment() 方法。

 你也可以使用文档的文档对象来执行这些变化，但要防止文件结构被破坏，createDocumentFragment() 方法可以更安全改变文档的结构及节点。

二、DOM节点的nodeName、nodeValue 以及 nodeType

nodeName 属性含有某个节点的名称。

* 元素节点的 nodeName 是标签名称
* 属性节点的 nodeName 是属性名称
* 文本节点的 nodeName 永远是 #text
* 文档节点的 nodeName 永远是 #document

nodeValue
对于文本节点，nodeValue 属性包含文本。

对于属性节点，nodeValue 属性包含属性值。

nodeValue 属性对于文档节点和元素节点是不可用的。


nodeType:
元素element	   =>   1
属性attr       =>	2
文本text       =>	3
注释comments	   =>    8
文档document   =>	9