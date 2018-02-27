


# react diff算法
用来计算dom中真正变化的部分，然后渲染。它是virtual dom的加速器，优化整个react页面渲染的基础，性能的保障。
## 传统diff算法
计算一棵树转换成另一棵树的最少操作，时间复杂度为o(n^3)，这根本用不成，所以需要优化diff算法




# 优化diff算法
## diff策略
- Web ui中跨层级的节点移动较少，忽略不计（tree diff）
- 拥有相同类的两个组件生成相似的结构，不同类的组件生成不同类的结构（component diff）
- 同层级的一组子节点，通过id区分（element diff）

## tree diff
两棵树只会对同一层次的节点进行比较，如果发现节点不存在，则该节点与其子节点会被完全删除。
不会再做比较。
因此React 官方建议不要进行 DOM 节点跨层级的操作。
> 通过updateChildren，只需一次遍历，就能完成整个dom树的比较

## component diff
如果是同一类型组件，则继续比较tree。如果不是，则该组件为dirty component从而替换整个组件下的所有子节点。可以通过shouldComponentUpdate来帮助diff判断
> 虽然当两个 component 是不同类型但结构相似时，React diff 会影响性能，但正如 React 官方博客所言：不同类型的 component 是很少存在相似 DOM tree 的机会，因此这种极端因素很难在实现开发过程中造成重大影响的。

## element diff
React diff 提供了三种节点操作，分别为：INSERT_MARKUP（插入）、MOVE_EXISTING（移动）和 REMOVE_NODE（删除），然而当只是ABCD-->BCDA这种移动的时候，增加删除未免太过复杂，所以添加唯一 key 进行区分，虽然只是小小的改动，性能上却发生了翻天覆地的变化
> 通过updateChildren，只需一次遍历，就能完成整个dom树的比较






# diff算法
## 运行结果
结果是渲染出了一个虚拟dom，界面刷新时，react通过diff算法实现从上一个渲染到下一个渲染的最小步数

## diff优化
见上

## 渲染
当在组件调用setState时，React会将其标记为脏组件，react会查看所有的脏组件并重新渲染他们，看看可能有的渲染情况

- 子树渲染
当组件调用setState时，react将重建其子节点的虚拟dom。所以我们一般不在根节点调用该方法



