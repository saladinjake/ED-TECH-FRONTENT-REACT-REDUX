//  //group class to be moved should have a class of hello-move-me eg all li's in the parent ul
//  //the base class  eg the ul should have aclass drag-sort-enable
//  //usage enableDragSort(parentulclass, groupClassforall_listitem)


export const  enableDragSortPositionUpdater = (listClass, groupClass) => {
  const sortableLists = document.getElementsByClassName(listClass);
  Array.prototype.map.call(sortableLists, (list) => {enableDragList(list, groupClass)});
}

// function enableDragList(list,groupClass) {
//   Array.prototype.map.call(list.children, (item) => {enableDragItem(item,groupClass)});
// }

// function enableDragItem(item,groupClass) {
//   //if condition is in group of the allowed class
//   let cls = Array.from(item.classList);
//   console.log(cls)
//   // if(cls.includes(groupClass) ) {
//     item.setAttribute('draggable', true)
//     item.ondrag = function(event){handleDrag(event)} 
//     item.ondragend = function(event) {handleDrop(event)}
//   // }
  
// }

// function handleDrag(event) {
//   const selectedItem = event.target,  
//   list = selectedItem.parentNode,
//   x = event.clientX,
//   y = event.clientY;
//   // const itemTitle = selectedItem.querySelectorAll(".section__name").innerHTML;

//   //section position tracker
//    var index;
//     for (let i in document.querySelectorAll("#js-parent .sections")){
//     if (document.querySelectorAll("#js-parent .sections")[i]==event.target){
//        index = parseInt(i) +1; 
//     }
//   }
//     let elementDetail={ 
//       title: selectedItem.getAttribute("data-name"),
//       position_id: index ,
//       course: selectedItem.getAttribute("data-belongs") 
//     };
//      // console.log(elementDetail);

//       //then update the api via


//     //subsection tracker
//     let sectionParent = event.target.parentElement;
//     console.log(sectionParent.nodeName)
//     //track pos only with in the parentof the sub section
//     for (let j in sectionParent.querySelectorAll(".subsections")){
//     if (sectionParent.querySelectorAll(".subsections")[j]==event.target)var index = j
//     }
//     let subsectionDetail={ 
//       title: selectedItem.getAttribute("data-name"),
//       position_id:index,
//       course: selectedItem.getAttribute("data-belongs") 
//     };
//     console.log(subsectionDetail)



//     // //lesson tracker
//     // let subsectionParent = event.target.parentElement;
//     // console.log(subsectionParent.querySelectorAll(".lessons").length)
//     // //track pos only with in the parentof the sub section
//     // for (let j in subsectionParent.querySelectorAll(".lessons")){
//     // if (subsectionParent.querySelectorAll(".lessons")[j]==event.target)var index = j
//     // }
//     // let lessonsDetail={ 
//     // title: selectedItem.getAttribute("data-name"),
//     //   position_id:index,
//     //   course: selectedItem.getAttribute("data-belongs") 
//     // };
//     // console.log(lessonsDetail)
    

   
 
//   let cls = selectedItem.classList;
//   cls = Array.from(cls);
//   // if(cls.includes('hello-move-me')){

//     selectedItem.classList.add('drag-sort-active');
//     let swapItem = document.elementFromPoint(x, y) === null ? selectedItem : document.elementFromPoint(x, y);
//     if (list === swapItem.parentNode) {
//       swapItem = swapItem !== selectedItem.nextSibling ? swapItem : swapItem.nextSibling;
//       list.insertBefore(selectedItem, swapItem);
//     }

//  // }
 
// }

// function handleDrop(item) {
//   item.target.classList.remove('drag-sort-active');
// }



// //usage here



export const enableDragSort = (listClass, groupClass) => {
  const sortableLists = document.getElementsByClassName(listClass);
  Array.prototype.map.call(sortableLists, (list) => {enableDragList(list, groupClass)});
}

function enableDragList(list,groupClass) {
  Array.prototype.map.call(list.children, (item) => {enableDragItem(item,groupClass)});
}

function enableDragItem(item,groupClass) {
  //if condition is in group of the allowed class
  let cls = Array.from(item.classList);
  console.log(cls)
  if(cls.includes(groupClass) ) {
    item.setAttribute('draggable', true)
    item.ondrag = function(event){handleDrag(event)} 
    item.ondragend = function(event) {handleDrop(event)}
   }
  
}

function handleDrag(item) {
  const selectedItem = item.target,  
  list = selectedItem.parentNode,
  x = item.clientX,
  y = item.clientY;
  const itemTitle = selectedItem.innerHTML;

  //section position tracker
  for (let i in document.querySelectorAll(".drag-sort-enable .sections")){
    if (document.querySelectorAll(".drag-sort-enable .sections")[i]==item.target){
      var index = parseInt(i) + 1; //position id as we drag down changes
      //only on drop on the right place should it update
    }
       
  }
  let elementDetail={ 
      title: selectedItem.getAttribute("data-name"),
      position_id: index,
      course: selectedItem.getAttribute("data-belongs") 
  };
  console.log(elementDetail)


    // //subsection tracker
    let sectionParent = item.target.parentElement.parentElement.parentElement;
    console.log(sectionParent.querySelectorAll(".subsection").length)
    //track pos only with in the parentof the sub section
    for (let j in sectionParent.querySelectorAll(".subsection")){
    if (sectionParent.querySelectorAll(".subsection")[j]==item.target)var index = j
    }
    let subsectionDetail={ 
      title: itemTitle,
      target :item.target,
      index:index,
    };
    console.log(subsectionDetail)



    // //lesson tracker
    // let subsectionParent = item.target.parentElement;
    // console.log(subsectionParent.querySelectorAll(".lessons").length)
    // //track pos only with in the parentof the sub section
    // for (let j in subsectionParent.querySelectorAll(".lessons")){
    // if (subsectionParent.querySelectorAll(".lessons")[j]==item.target)var index = j
    // }
    // let lessonsDetail={ 
    //   title: itemTitle,
    //   target :item.target,
    //   index:index,
    // };
    // console.log(lessonsDetail)
    

   
 
  let cls = selectedItem.classList;
  cls = Array.from(cls);
  if(cls.includes('hello-move-me')){

    selectedItem.classList.add('drag-sort-active');
    let swapItem = document.elementFromPoint(x, y) === null ? selectedItem : document.elementFromPoint(x, y);
    if (list === swapItem.parentNode) {
      swapItem = swapItem !== selectedItem.nextSibling ? swapItem : swapItem.nextSibling;
      list.insertBefore(selectedItem, swapItem);
    }

 }
 
}

function handleDrop(item) {
  item.target.classList.remove('drag-sort-active');
}
