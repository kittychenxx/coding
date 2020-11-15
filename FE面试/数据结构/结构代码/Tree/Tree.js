// 二叉树
class Node {
    constructor(key) {
        this.key = key;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor() {
            this.root = null;
        }
        // 插入节点
    insert(key) {
        // 1.创建key节点
        const newNode = new Node(key);

        // 2.判断之前的树是否为空
        if (this.root === null) {
            this.root = newNode;
        } else {
            this.insertNode(this.root, newNode);
        }
    }

    insertNode(node, newNode) {
        if (newNode.key > node.key) {
            if (node.right === null) {
                node.right = newNode;
            } else {
                this.insertNode(node.right, newNode);
            }
        } else {
            if (node.left === null) {
                node.left = newNode;
            } else {
                this.insertNode(node.left, newNode);
            }
        }
    }

    // 先序遍历
    preOrderTraverse() {
        this.preOrderTraverseNode(this.root);
    }

    preOrderTraverseNode(node) {
        if (node === null) {
            return;
        }

        console.log(node.key);
        this.preOrderTraverseNode(node.left);
        this.preOrderTraverseNode(node.right);

    }

    // 中序遍历
    inOrderTraverse() {
        this.inOrderTraverseNode(this.root);
    }

    inOrderTraverseNode(node) {
        if (node === null) return;

        this.inOrderTraverseNode(node.left);
        console.log(node.key);
        this.inOrderTraverseNode(node.right);
    }

    // 后序遍历
    postOrderTraverse() {
        this.postOrderTraverseNode(this.root);
    }

    postOrderTraverseNode(node) {
        if (node === null) return;

        this.postOrderTraverseNode(node.left);
        this.postOrderTraverseNode(node.right);
        console.log(node.key);
    }

    // 获取最小值
    min() {
        let node = this.root;
        if (node === null) return null;
        while (node.left !== null) {
            node = node.left;
        }
        return node.key;
    }

    // 获取最大值
    max() {
        let node = this.root;
        if (node === null) return null;
        while (node.right !== null) {
            node = node.right;
        }
        return node.key;
    }

    // 获取特定的值
    search(key) {
        return this.searchNode(this.root, key);
    }

    searchNode(node, key) {
        // 1.判断node有没有值
        if (node === null) return false;
        // 2.判断搜索key和节点值的关系
        if (key < node.key) {
            return this.searchNode(node.left, key);
        } else if (key > node.key) {
            return this.searchNode(node.right, key);
        } else {
            return true;
        }
    }

    // 非递归的搜索方法
    search2(key) {
        let node = this.root;

        while (node !== null) {
            if (key < node.key) {
                node = node.left;
            } else if (key > node.key) {
                node = node.right;
            } else {
                return true;
            }
        }

        return false;
    }

    // 删除操作

    remove(key) {
        // 1.找到要删除的节点
        let current = this.root;
        let parent = null;
        let isLeftChild = true;

        // 2.开始查找
        while (current.key !== key) {
            parent = current;
            if (key < current.key) {
                isLeftChild = true;
                current = current.left;
            } else {
                isLeftChild = false;
                current = current.right;
            }

            if (current === null) return false;
        }

        // 情况1，删除叶子节点(无子节点)
        if (current.left === null && current.right === null) {
            if (current === this.root) {
                this.root = null;
            } else if (isLeftChild) {
                parent.left = null;
            } else {
                parent.right = null;
            }
        }

        // 情况2. 删除的节点只有一个子节点
        else if (current.right === null) { // 只有左子节点
            if (current === this.root) {
                this.root = this.left;
            } else if (isLeftChild) {
                parent.left = current.left;
            } else {
                parent.right = current.left;
            }
        } else if (current.left === null) { // 只有右子节点
            if (current === this.root) {
                this.root = this.right;
            } else if (isLeftChild) {
                parent.left = current.right;
            } else {
                parent.right = current.right;
            }
        } else {
            // 获取后继节点
            let successor = this.getSuccessor(current);

            if (this.root === current) {
                this.root = successor;
                successor.left = current.left;
            } else if (isLeftChild) {
                parent.left = successor;
            } else {
                parent.right = successor;
            }

            successor.left = current.left;
        }
        return true;
    }

    // 寻找后继(比要删除节点大一点点的节点)
    getSuccessor(delNode) {
        let successorParent = delNode;
        let successor = delNode;
        let current = delNode.right;

        // 寻找节点
        while (current !== null) {
            successorParent = successor;
            successor = current;
            current = current.left;
        }

        // 3.如果后继节点不是删除节点的右节点
        if (successor !== delNode.right) {
            successorParent.left = successor.right;
            successor.right = delNode.right;
        }

        return successor;
    }
}