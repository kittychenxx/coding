// 平衡树，任意节点左右2侧层数高差小于等于1
// 对于平衡二叉树,插入和查找的效率是O(logN)
// 对于非平衡树,相当于是一个链表,查找效率变成了O(N)

// 红黑树的性质：
// 1、节点是红色或黑色
// 2、根节点是黑色
// 3、每个叶子节点都是黑色的空节点(nil节点)
// 4、每个红色节点的两个子节点都是黑色(每个叶子到根的所有路径上不能有两个连续的红色的节点)
// 5、从任一节点到其每个叶子的所有路径都包含相同数目的黑色节点