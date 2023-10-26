function findAllPossibleMoves(start) {
  //start is 2d array [x, y]
  let x = start[0];
  let y = start[1];
  let moves = [];

  //Moves along x-axis
  if (x-2 >= 0) {
    if (y-1 >= 0) {
      moves.push([x-2, y-1]);
    }

    if (y + 1 <= 7) {
      moves.push([x-2, y+1]);
    }
  }
  else if (x+2 <= 7) {
    if (y-1 >= 0) {
      moves.push([x+2, y-1]);
    }

    if (y + 1 <= 7) {
      moves.push([x+2, y+1]);
    }
  }

  //Moves along y-axis
  if (y-2 >= 0) {
    if (x-1 >= 0) {
      moves.push([x-1, y-2]);
    }

    if (x+1 <= 7) {
      moves.push([x+1, y-2]);
    }
  }
  else if (y+2 <= 7) {
    if (x-1 >= 0) {
      moves.push([x-1, y+2]);
    }

    if (x+1 <= 7) {
      moves.push([x+1, y+2]);
    }
  }

  let moveNodes = [];
  for (let i = 0; i < moves.length; i++) {
    let node = Node(moves[i]);
    moveNodes.push(node);
  }

  return moveNodes;
}


var Node = (coordinate=null, parentNode=null, childrenArr=[]) => {
  return {
    coordinate: coordinate,
    parentNode: parentNode,
    childrenArr: childrenArr,
  };
}

var TreeActions = {
  addNode(parentNode, childNode) {
    if (this.root === null) {
      this.root = parentNode;
    } else {
      if (childNode !== null) {
        node.parentNode = parentNode;
        parentNode.childrenArr.push(childNode);
      }  
    }
  },

  getShortestPath(startNode, leafNode) {
    let movesArr = [];

    if (leafNode === null) {
      return null;
    } else {
      movesArr.push(leafNode);
      while (leafNode.parentNode != null && leafNode.parentNode != startNode) {
        movesArr.push(leafNode.parentNode);
        leafNode = leafNode.parentNode;
      }
    }

    return movesArr;
  },

  // buildTree(startNode, endNode) makes a tree that has all possible moves until it reached the end
  buildTree(startNode, endNode) {
    let nodeQueue = [];
    nodeQueue.push(startNode);

    while (nodeQueue.length != 0) {
      if (nodeQueue[0].coordinate[0] == endNode.coordinate[0] && nodeQueue[0].coordinate[1] == endNode.coordinate[1]) {
        return nodeQueue[0];
      }

      let possibleMoves = findAllPossibleMoves(nodeQueue[0].coordinate);
      nodeQueue[0].childrenArr = possibleMoves;

      for (let i = 0; i < possibleMoves.length; i++) {
        possibleMoves[i].parentNode = nodeQueue[0];
        nodeQueue.push(possibleMoves[i]);
      } 

      nodeQueue.shift();
    }
  },
  
  printMoves(startNode, endNode) {
    let movesArr = this.getShortestPath(startNode, endNode);
    if (movesArr.length == 1) {
      console.log(`From ${startNode.coordinate} to ${endNode.coordinate}, you'll make it in 0 move. You're already at the destination.`);
      return;
    }
    console.log(`From ${startNode.coordinate} to ${endNode.coordinate}, you'll make it in ${movesArr.length} moves. Here's your path:`);
    console.log(startNode.coordinate);
    for (let i = 0; i < movesArr.length; i++) {
      console.log(movesArr.pop().coordinate);
    }
    console.log(endNode.coordinate);
  }
}

var Tree = (root=null) => {
  let tree = Object.create(TreeActions);
  tree.root = null;
  if (root !== null) {
    tree.addNode(Node(root), null);
  }

  return tree;
}


//test
var myNode = Node([3,3]);
//console.log(myNode);
var myEndNode = Node([4,3]);

var myTree = Tree([3,3]);
//console.log(myTree);
var myLeaf = myTree.buildTree(myTree.root, myNode);
//console.log(myLeaf);
myTree.printMoves(myTree.root, myLeaf);

var myLeaf_2 = myTree.buildTree(myTree.root, myEndNode);
//console.log(myLeaf_2);

myTree.printMoves(myTree.root, myLeaf_2);
