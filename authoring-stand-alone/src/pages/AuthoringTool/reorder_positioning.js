import $ from "jquery"
import { createAnyResource } from "services/authoring"
//  //group class to be moved should have a class of hello-move-me eg all li's in the parent ul
//  //the base class  eg the ul should have aclass drag-sort-enable
//  //usage enableDragSort(parentulclass, groupClassforall_listitem)

  let  sectionDetail={ 
      update: "section",
      name: "",
      position_id: "",
      course: "",
      id:"",
  };

   let  subsectionDetail={ 
      update: "subsections",
      name: "",
      position_id: "",
      course: "",
      id:"",
  };

   let  lessonDetail={ 
      update: "lessons",
      name: "",
      position_id: "",
      course: "",
      id:"",
  };




function validateFields(object, keys) {
    keys.forEach(function (k) {
        if (k in object) {
            console.log(k + ": " + object[k]);
            if (object[k] !== '') {
                console.log(k + " exists but is empty");
                return true
            }
            return false
        }
        console.log(k + " doesn't exist in object");
        return false
    });
}


export const  enableDragSortPositionUpdater = (listClass, groupClass) => {
  const sortableLists = document.getElementsByClassName(listClass);
  Array.prototype.map.call(sortableLists, (list) => {enableDragList(list, groupClass)});
}



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
  // console.log(cls)
  if(cls.includes(groupClass) ) {
    item.setAttribute('draggable', true)
    item.ondrag = function(event){handleDrag(event)} 
    item.ondragend = function(event) {handleDrop(event)}
   }
  
}


/****goal***/

 // 1 Elements
 //  2 Combinations
 //    Def. 2.1: Some definition
 //    Def. 2.2: Some definition
 //    Pro. 2.3  Some proposition
 //    Exm. 2.4: Some Example
 //    2.1 Permutations
 //    2.2 Sets
 //      Def. 2.2.1: Some definition
 //      Def. 2.2.2: Some definition
 //      Pro. 2.2.3  Some proposition
 //      Exm. 2.2.4: Some Example


function handleDrag(item) {
  let selectedItem = item.target,  
  list = selectedItem.parentNode,
  x = item.clientX,
  y = item.clientY;
  const itemTitle = selectedItem.innerHTML;

    let url = "", data = null;


  //section position tracker
  for (let i in document.querySelectorAll(".drag-sort-enable .sections")){
    if (document.querySelectorAll(".drag-sort-enable .sections")[i]==item.target){
      var index = parseInt(i) + 1; //position id as we drag down changes
      //only on drop on the right place should it update
       sectionDetail={ 
            update: "section",
            name: selectedItem.getAttribute("data-name"),
            position_id: index,
            course: selectedItem.getAttribute("data-belongs"),
            id:selectedItem.getAttribute("data-idx"),
            target: selectedItem
        };

      
    } else{
      //amongst others then update their new positions as it has been affected
      //if no change was made then leave as is
       let eachSections = document.querySelectorAll(".drag-sort-enable .sections")[i];
      
      
      if(eachSections.id !=="undefined" && eachSections.id!== null && eachSections.id?.length>0 ){


       let otherSectionsDetail={ 
            update: "section",
            name: $("#" + eachSections.id).attr("data-name"),
            position_id: parseInt(i) + 1,
            course: $("#" + eachSections.id).attr("data-belongs"),
            id:$("#" + eachSections.id).attr("data-idx"),
           
         };

       

        //perform an update ops quickly for other positions that have been affected
        //or pushed by the dom operation on the dragged item


       let url = `/lms/api/update/section/${otherSectionsDetail.id}/`
       let data = makeFormFromObjectData(otherSectionsDetail); // this form dont exsist in the dom. just created in space
       createAnyResource("PATCH",url, data)

       
       //update the title name with the position id of the new data
       eachSections.querySelector(".tits").innerHTML =  otherSectionsDetail.name + " "+ otherSectionsDetail.position_id
       eachSections.setAttribute("data-pos",otherSectionsDetail.position_id) // 

      }
      // console.log()
    }   
  }
  //done with reordering sections and updating position id
  


    // //subsection tracker      let rootSectionBloc = $(el).parent().parent().parent()
  
    let sectionParent = item.target.parentElement.parentElement.parentElement;
    //track pos only with in the parentof the sub section
    for (let j in sectionParent.querySelectorAll(".subsections")){
        if (sectionParent.querySelectorAll(".subsections")[j]==item.target){
          var index = parseInt(j) + 1 //position id
          selectedItem = item.target;
          subsectionDetail={ 
           update: "subsections",
           name: selectedItem.getAttribute("data-name"),
            position_id: index,
            course: selectedItem.getAttribute("data-parent-id"),
            section:selectedItem.getAttribute("data-parent-id"),
            id:selectedItem.getAttribute("data-idx"),
          };
        console.log(subsectionDetail)

      } else{
      //amongst others then update their new positions as it has been affected
      //if no change was made then leave as is
       let eachsubSections = sectionParent.querySelectorAll(".subsections")[j];
      if(eachsubSections.id !=="undefined" && eachsubSections.id!== null && eachsubSections.id?.length>0 ){
       let othersubSectionsDetail={ 
            update: "subsections",
            name: $("#" + eachsubSections.id).attr("data-name"),
            position_id: parseInt(j) + 1,
            course: $("#" + eachsubSections.id).attr("data-belongs"),
            id:$("#" + eachsubSections.id).attr("data-idx"),
           
         };

        console.log("here are the other sections that needs update of their new position id")
        console.log(othersubSectionsDetail)
        //perform an update ops quickly for other positions that have been affected
        //or pushed by the dom operation on the dragged item
       let url = `/lms/api/update/subsection/${othersubSectionsDetail.id}/`
       let data = makeFormFromObjectData(othersubSectionsDetail); // this form dont exsist in the dom. just created in space
       createAnyResource("PATCH",url, data)
       //update the title name with the position id of the new data
       eachsubSections.querySelector(".title_sub").innerHTML =  othersubSectionsDetail.name + " "+ othersubSectionsDetail.position_id
       eachsubSections.setAttribute("data-pos",othersubSectionsDetail.position_id) // 

      }
      // console.log()
    }
  
  }
    
  // // // //lesson tracker
  let subsectionParent = item.target.parentElement.parentElement.parentElement;
    //track pos only with in the parentof the sub section
  for (let j in subsectionParent.querySelectorAll(".lessons")){
    if (subsectionParent.querySelectorAll(".lessons")[j]==item.target){
      var index = parseInt(j) + 1
      lessonDetail={ 
         update: "lessons",
         name: selectedItem.getAttribute("data-name"),
        position_id: index,
        course: selectedItem.getAttribute("data-parent-id"),
        subsection: selectedItem.getAttribute("data-parent-id"),
        id:selectedItem.getAttribute("data-idx"), 
      };
     


    }
  }

  //now handle those component movements
    







    // let lessonParent = item.target.parentElement.parentElement.parentElement.parentElement;
    // //track pos only with in the parentof the sub section
    // for (let j in lessonParent.querySelectorAll(".components")){
    //    if (lessonParent.querySelectorAll(".components")[j]==item.target){
    //     var index = parseInt(j) + 1

    //         sectionDetail={ 
    //            update: "components",
    //            title: selectedItem.getAttribute("data-name"),
    //           position_id: index,
    //           course: selectedItem.getAttribute("data-parent-id"),
    //           id:selectedItem.getAttribute("data-idx"), 
    //         };
    //    }
    // }
    
   



    

   
 
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
  //save position to the databases imediately drop checks all requirements
  let url = "", data = null;
  let selectedItem = item.target;

//handles only item dropped

//reordering of other items in the haystack are updated above the code section of the drag event

 

  console.log("update the database positioning id")
  console.log(sectionDetail)


  if( (sectionDetail?.id!=="" && sectionDetail?.id.length> 0 && sectionDetail?.course!=="") && (sectionDetail?.course!==null && sectionDetail?.course!=="undefined") ){
    //update position id on drag and drop for sections
    if(sectionDetail?.course!=="" || sectionDetail?.course!==null || sectionDetail?.course!=="undefined" ){
       sectionDetail.course = sectionDetail.course;
       sectionDetail.position_id = sectionDetail.position_id 
       url = `/lms/api/update/section/${sectionDetail.id}/`
       data = makeFormFromObjectData(sectionDetail); // this form dont exsist in the dom. just created in space
       createAnyResource("PATCH",url, data)

       
       //update the title name with the position id of the new data

       selectedItem.querySelector(".tits").innerHTML =  sectionDetail.name + " "+ sectionDetail.position_id
       selectedItem.setAttribute("data-pos",sectionDetail.position_id) // 
       //maintained in case user does not reload the page
      }

  }else if(subsectionDetail.update=="subsections"){
    if(subsectionDetail?.section!=="" || subsectionDetail?.section!==null || subsectionDetail?.section!=="undefined" ){
      
       //update position id on drag and drop for subsections
       url = `/lms/api/update/subsection/${sectionDetail.id}/`
       data = makeFormFromObjectData(sectionDetail); // creates an invisible form for post with a patch update attr
       createAnyResource("PATCH",url, data) 
       selectedItem.querySelector(".title_sub").innerHTML =  subsectionDetail.name + " "+ subsectionDetail.position_id
       selectedItem.setAttribute("data-pos",subsectionDetail.position_id)
       //maintained during resons for none reload pages
     }
  }else if(lessonDetail.update=="lessons"){
    //update position id on drag and drop for lessons

    url = `/lms/api/update/lesson/${lessonDetail.id}/`
       data = makeFormFromObjectData(lessonDetail); // creates an invisible form for post with a patch update attr
       createAnyResource("PATCH",url, data) 
       selectedItem.querySelector(".title_sub").innerHTML =  lessonDetail.name + " "+ sectionDetail.position_id
       selectedItem.setAttribute("data-pos",lessonDetail.position_id)
       //maintained during resons for none reload pages

  }

  //switch will be used for components base due to variations
  //switch(sectionDetail.update){
    
    // case "html-component":

    //    sectionDetail.lesson = sectionDetail.course;
    //    delete sectionDetail.course;

    //    url = `/section/update/${sectionDetail.id}`
    //    data = makeFormFromObjectData(sectionDetail);
    //    createAnyResource("PATCH",url, data)
    //  case "video-component":
    //  sectionDetail.lesson = sectionDetail.course;
    //    delete sectionDetail.course;
    //    url = `/section/update/${sectionDetail.id}`
    //    data = makeFormFromObjectData(sectionDetail);
    //    createAnyResource("PATCH",url, data)
    //  case "discussion-component":
    //  sectionDetail.lesson = sectionDetail.course;
    //    delete sectionDetail.course;
    //    url = `/discussion-component/update/${sectionDetail.id}`
    //    data = makeFormFromObjectData(sectionDetail);
    //    createAnyResource("PATCH",url, data)
    //  case "problem-component":
    //  sectionDetail.lesson = sectionDetail.course;
    //    delete sectionDetail.course;
    //    url = `/discussion-component/update/${sectionDetail.id}`
    //    data = makeFormFromObjectData(sectionDetail);
    //    createAnyResource("PATCH",url, data)
    //    break;
  //}
}




function makeFormFromObjectData(data,url){
  let dynamicform = $('<form/>', { action: url, method: 'PATCH',enctype: "application/x-www-form-urlencoded" })
  Object.keys(data).forEach(key => {
    // /smart work
    dynamicform.append(
      $('<input>', { type: 'hidden', 
                     id: key , 
                     name: key, 
                     value: data[key]
        })
     )
  })

    return dynamicform;
}