class TreeBuilder{
	constructor(parentResponseObj,  dataChildResponse=[]){
	  this.root =  {
	    name: parentResponseObj.name,

        _id: parentResponseObj.id,
        position_id: parentResponseObj.position,
        children: [],  //childeren of the parent response in question
        ...parentResponseObj

	  }
	  this.dataChildResponse = dataChildResponse

	  this.tree = {
	     root: this.root
	  };

	  this.htmlOutput =  "";

	}

	// Traverse data and build the tree
	//ke tracker usage
	/*
	* buildTree(this.tree,"course") //"course" , "section" //"subsection" //"lesson"
	* rootNode = this.tree.root
	root_id = this.root._id
	**/
	buildTree = function(tree, keyTracker="course") {
	    for (var i = 0; i < this.dataChildResponse.length; i++) {
	        var elem = this.dataChildResponse[i];
	        if (elem[keyTracker] != this.root._id){
	        	console.log("some not tackled..."+  elem[keyTracker] + " "+ keyTracker)
	            continue;
	        }else {
	        
	        	
		        elem["children"] = [];
		        
		        // var rootId = elem.pare.id;
		        var parent = this.getParent( this.tree.root, this.root._id);
		        
		        parent.children.push(elem);
		        
		        // Debug info
		        console.log("Elem: " + elem.name + " with parent_id: " + elem[keyTracker]);
		        console.log("Got parent with name: " + parent._id);
	        }
	        
	    }

	    console.log(this.root)
	}

	findObjectById = (root, keyTracker, id) => {
	    if (root.children) {
	        for (var k in root.children) {
	            if (root.children[k][keyTracker] == id) {
	                return root.children[k];
	            }
	            else if (root.children.length) {
	                return this.findObjectById(root.children[k], id);
	            }
	        }
	    }
    }

	// Get parent of node (recursive)
	getParent = function (rootNode, rootId) {
	    if (rootNode._id === rootId)
	        return rootNode;
	    for (var i = 0; i < rootNode.children.length; i++) {
	        var child = rootNode.children[i];
	        if (child._id === rootId) return child;

	        if (child.children.length > 0)
	            var childResult = this.getParent(child, rootId);

	        if (childResult != null) return childResult;
	    }
	    return null;
	};

	



	// Print the tree

   buildOutput = function(node,keyTracker) {
    console.log(node);
    this.htmlOutput = this.htmlOutput + "<div class='card-box col-md-12'><ul>";
    this.htmlOutput = this.htmlOutput + `<li style='background:#000;color:#fff' id="${node[keyTracker]}">`;
   this.htmlOutput = this.htmlOutput + node.name + " is the parent node of id " + node.id;  // the parent
    this.htmlOutput = this.htmlOutput + "</li>";

    // console.log(node)
    for (var i = 0; i < node.children.length; i++){
       
       this.htmlOutput = this.htmlOutput + `<ul><li style='background:#eaeaea' id="${node.children[i][keyTracker]}">`;
       this.htmlOutput = this.htmlOutput + node.children[i].name + " is the child node of id " + node.children[i].id  // the child
       this.htmlOutput = this.htmlOutput + "</li></ul>";
    }

    this.htmlOutput = this.htmlOutput + "</ul></div>";
    
    return this.htmlOutput;
   }


   appendContent = (content) =>{
    this.htmlOutput += `<li>${content}</li>`
    return this.htmlOutput  // enable chaining
   }

   done(){
   	return this.htmlOutput
   }
}


//thi finds and append data to object
//usage
// var bla = findObjectById(nestedObj, 111);

// console.log(bla);
// bla.children.push({
//         name: "child x",
//         id: 1111,
//         children: []
// });
// console.log(nestedObj);

// export const  findObjectById = (root, id) => {
//     if (root.children) {
//         for (var k in root.children) {
//             if (root.children[k].id == id) {
//                 return root.children[k];
//             }
//             else if (root.children.length) {
//                 return findObjectById(root.children[k], id);
//             }
//         }
//     }
// };



//complete usage
//say u fetch the root data that has another fetch by the root id
// course = getCourse(courseId)  //{id:"", info:[...]}
//say section and subsections are in different tables but i need to order the results in highrachy



//let sections = getSection(courseId); [{},{},...section N] // each sections have subsections tied to each of them
//now i want to fetch all subsections of each section and place in highrachy
// sections.forEach(section=>{
// 	subsections = getSubsections(section.id)
// 	//then i buid the highrachy format
// 	let TreeObj = new TreeBuilder(section,subsection);
// 	TreeObj.buildTree(Tree.tree)
// 	let result = TreeObj.printTree(Tree.tree.root)
// 	console.log(result);
//     //$("#tree").html(htmlStr);
// })

export default TreeBuilder