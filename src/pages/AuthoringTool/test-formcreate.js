
import React , {Fragment, Component, useEffect } from "react"
import $ from "jquery"

const TestForm =  ({}) =>  {


        var contentType = "multipart/form-data"
	    window.drf = {
          csrfHeaderName: "X-CSRFTOKEN",
          csrfToken: "BflbcAqq5u5i8NdzTKBhUZmfFrYXlb1tZwq3EQPrUornyky8l9Vn2AKUJkfHXVR6"
        };

	  const getCookie = (name) => {
		  var cookieValue = null;

		  if (document.cookie && document.cookie != '') {
		    var cookies = document.cookie.split(';');

		    for (var i = 0; i < cookies.length; i++) {
		      var cookie = $.trim(cookies[i]);

		      // Does this cookie string begin with the name we want?
		      if (cookie.substring(0, name.length + 1) == (name + '=')) {
		        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
		        break;
		      }
		    }
		  }

		  return cookieValue;
		}

		const  csrfSafeMethod = (method) => {
		  // these HTTP methods do not require CSRF protection
		  return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
		}

		const sameOrigin = (url) => {
		  // test that a given url is a same-origin URL
		  // url could be relative or scheme relative or absolute
		  var host = document.location.host; // host + port
		  var protocol = document.location.protocol;
		  var sr_origin = '//' + host;
		  var origin = protocol + sr_origin;

		  // Allow absolute or scheme relative URLs to same origin
		  return (url == origin || url.slice(0, origin.length + 1) == origin + '/') ||
		    (url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') ||
		    // or any other URL that isn't scheme relative or absolute i.e relative.
		    !(/^(\/\/|http:|https:).*/.test(url));
		}

		

   const runAjaxSubmit = (e) => {
   	  e.preventDefault()
       var form = $('form')[0]; // You need to use standard javascript object here
       var formData = new FormData(form);

       // Attach file
       formData.append('filename', $('input[type=file]')[0].files[0]); 

       let target = document.getElementById("#form_elements")
       


	  var url = "http://gapslmsservices.herokuapp.com/lms/api/create/course/"  //+  form.attr('action');
	  var data;

	  var csrftoken = window.drf.csrfToken;

		$.ajaxSetup({
		  beforeSend: function(xhr, settings) {
		    if (!csrfSafeMethod(settings.type)  // && sameOrigin(settings.url)

		      ) {
		      // Send the token to same-origin, relative URLs only.
		      // Send the token only if the method warrants CSRF protection
		      // Using the CSRFToken value acquired earlier

            // xhr.setRequestHeader("Content-Disposition", 'attachment; filename=' + form[0].files.name);
            // xhr.overrideMimeType("multipart/form-data");
        
		      xhr.setRequestHeader(window.drf.csrfHeaderName, csrftoken);
		    }
		  }
		});

	  if (contentType) {
	    
	    if (contentType === 'multipart/form-data') {
	      if (!window.FormData) {
	        alert('Your browser does not support AJAX multipart form submissions');
	        return;
	      }


	      


	      contentType = false;
	      // data = new FormData(form[0]);


	      console.log(form[0])
	    } else {
	      contentType = 'application/x-www-form-urlencoded; charset=UTF-8'
	      data = form.serialize();
	    }
	  }


       // data = {
       // 	name: "A new Course here",
       // 	code:"10digitbit",
       // 	author:"097cd2bb-ae72-48e4-9a4d-1ebd2c05be03", // a given author id
       // 	institution:"cb85e4ff-6636-4201-8e9f-5a9259c936bf"




       // }

	  //make the post request
	  var ret = $.ajax({
		    url: url,
		    // method: "POST",
		    type:"POST",
		    data:formData,
		    // data: JSON.stringify(data),
		    // contentType: contentType,
		    contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
            processData: false, // NEEDED, DON'T OMIT THIS
		    
		    headers: {
		      'Accept': 'text/html; q=1.0, */*'
		    },
		  });

	  ret.always(function(data, textStatus, jqXHR) {
		    if (textStatus != 'success') {
		      jqXHR = data;
		      console.log(data)
		    }

		    var responseContentType = jqXHR.getResponseHeader("content-type") || "";

		    if (responseContentType.toLowerCase().indexOf('text/html') === 0) {
		      // replaceDocument(jqXHR.responseText);

		      // try {
		      //   // Modify the location and scroll to top, as if after page load.
		      //   window.history.replaceState({}, '', url);
		      //   window.scroll(0, 0);
		      // } catch (err) {
		      //   // History API not supported, so redirect.
		      //   window.location = url;
		      // }
		    } else {
		      // Not HTML content. We can't open this directly, so redirect.
		      // window.location = url;
		    }
		  });

		  return ret;
    }






	return (
      <Fragment>







    <div class="wrapper">
      
      

      <div class="container">
        
        

        <div id="content" role="main" aria-label="content">
          

            
              
                <div class="tabbable">
                  
                    
                  

                  <div class="">
                    
                      <div  id="post-object-form">
                        
                          <form id="form_elements" action="#" method="POST" enctype="multipart/form-data" class="form-horizontal" novalidate>
                            <fieldset>
                              <input type="hidden" name="csrfmiddlewaretoken" value="BflbcAqq5u5i8NdzTKBhUZmfFrYXlb1tZwq3EQPrUornyky8l9Vn2AKUJkfHXVR6" />
                              

  

  
    <div class="form-group ">
  
    <label class="col-sm-2 control-label ">
      Name
    </label>
  

  <div class="col-sm-10">
    <input name="name" class="form-control" type="text"  value="A new Course"  />

    

    
  </div>
</div>

  

  
    <div class="form-group ">
  
    <label class="col-sm-2 control-label ">
      Code
    </label>
  

  <div class="col-sm-10">
    <input name="code" class="form-control" type="text"  value="10digitbit" />

    

    
  </div>
</div>

  

  
    <div class="form-group ">
  
    <label class="col-sm-2 control-label ">
      Run
    </label>
  

  <div class="col-sm-10">
    <input name="run" class="form-control" type="text"  value="" />

    

    
  </div>
</div>

  

  
    <div class="form-group ">
  
    <label class="col-sm-2 control-label ">
      Card image
    </label>
  

  <div class="col-sm-10">
    <input name="card_image"  type="file"  value="" id="card_image" />
  </div>
</div>

  

  
    <div class="form-group ">
  
    <label class="col-sm-2 control-label ">
      Intro video
    </label>
  

  <div class="col-sm-10">
    <input name="intro_video"  type="file"  value="" />

    

    
  </div>
</div>

  

  
    <div class="form-group ">
  
    <label class="col-sm-2 control-label ">
      Description
    </label>
  

  <div class="col-sm-10">
    <input name="description" class="form-control" type="text"  value="" />

    

    
  </div>
</div>

  

  
    <div class="form-group ">
  
    <label class="col-sm-2 control-label ">
      Overview
    </label>
  

  <div class="col-sm-10">
    <textarea name="overview" class="form-control"  ></textarea>

    

    
  </div>
</div>

  

  
    <div class="form-group ">
  
    <label class="col-sm-2 control-label ">
      Learning expectation
    </label>
  

  <div class="col-sm-10">
    <textarea name="learning_expectation" class="form-control"  ></textarea>

    

    
  </div>
</div>

  

  
    <div class="form-group ">
  
    <label class="col-sm-2 control-label ">
      Curriculum
    </label>
  

  <div class="col-sm-10">
    <textarea name="curriculum" class="form-control"  ></textarea>

    

    
  </div>
</div>

  

  
    

<div class="form-group">
  
    <label class="col-sm-2 control-label ">
      Level
    </label>
  

  <div class="col-sm-10">
    <select class="form-control" name="level">
      
      
          
            <option value="1"  >Introductory</option>
          
      
          
            <option value="2"  >Intermediate</option>
          
      
          
            <option value="3"  >Advance</option>
          
      
    </select>

    

    
  </div>
</div>

  

  
    

<div class="form-group">
  
    <label class="col-sm-2 control-label ">
      Enrolment type
    </label>
  

  <div class="col-sm-10">
    <select class="form-control" name="enrolment_type">
      
      
          
            <option value="1"  >Open</option>
          
      
          
            <option value="2"  >By Invitation</option>
          
      
    </select>

    

    
  </div>
</div>

  

  
    <div class="form-group horizontal-checkbox ">
  
    <label class="col-sm-2 control-label ">
      Entrance exam required
    </label>
  

  <div class="col-sm-10">
    <input type="checkbox" name="entrance_exam_required" value="true" />

    

    
  </div>
</div>

  

  
    <div class="form-group ">
  
    <label class="col-sm-2 control-label ">
      Cost
    </label>
  

  <div class="col-sm-10">
    <input name="cost" class="form-control" type="number"  value="" />

    

    
  </div>
</div>

  

  
    <div class="form-group horizontal-checkbox ">
  
    <label class="col-sm-2 control-label ">
      Auditing
    </label>
  

  <div class="col-sm-10">
    <input type="checkbox" name="auditing" value="true" />

    

    
  </div>
</div>

  

  
    

<div class="form-group">
  
    <label class="col-sm-2 control-label ">
      Course pacing
    </label>
  

  <div class="col-sm-10">
    <select class="form-control" name="course_pacing">
      
      
          
            <option value="1"  >Instructor Lead</option>
          
      
          
            <option value="2"  >Self Paced</option>
          
      
    </select>

    

    
  </div>
</div>

  

  
    <div class="form-group ">
  
    <label class="col-sm-2 control-label ">
      Course start date time
    </label>
  

  <div class="col-sm-10">
    <input name="course_start_date_time" class="form-control" type="datetime-local"  value="" />

    

    
  </div>
</div>

  

  
    <div class="form-group ">
  
    <label class="col-sm-2 control-label ">
      Course end date time
    </label>
  

  <div class="col-sm-10">
    <input name="course_end_date_time" class="form-control" type="datetime-local"  value="" />

    

    
  </div>
</div>

  

  
    <div class="form-group ">
  
    <label class="col-sm-2 control-label ">
      Enrolment start date time
    </label>
  

  <div class="col-sm-10">
    <input name="enrolment_start_date_time" class="form-control" type="datetime-local"  value="" />

    

    
  </div>
</div>

  

  
    <div class="form-group ">
  
    <label class="col-sm-2 control-label ">
      Enrolment end date time
    </label>
  

  <div class="col-sm-10">
    <input name="enrolment_end_date_time" class="form-control" type="datetime-local"  value="" />

    

    
  </div>
</div>

  

  
    <div class="form-group ">
  
    <label class="col-sm-2 control-label ">
      Course language
    </label>
  

  <div class="col-sm-10">
    <input name="course_language" class="form-control" type="text"  value="" />

    

    
  </div>
</div>

  

  
    <div class="form-group ">
  
    <label class="col-sm-2 control-label ">
      Requirement hours per week
    </label>
  

  <div class="col-sm-10">
    <input name="requirement_hours_per_week" class="form-control" type="number"  value="" />

    

    
  </div>
</div>

  

  
    <div class="form-group ">
  
    <label class="col-sm-2 control-label ">
      Requirement no of week
    </label>
  

  <div class="col-sm-10">
    <input name="requirement_no_of_week" class="form-control" type="number"  value="" />

    

    
  </div>
</div>

  

  
    <div class="form-group ">
  
    <label class="col-sm-2 control-label ">
      Grace period after deadline
    </label>
  

  <div class="col-sm-10">
    <input name="grace_period_after_deadline" class="form-control" type="number"  value="" />

    

    
  </div>
</div>

  

  
    

<div class="form-group">
  
    <label class="col-sm-2 control-label ">
      Publication status
    </label>
  

  <div class="col-sm-10">
    <select class="form-control" name="publication_status">
      
      
          
            <option value="1"  >Draft (Never Published)</option>
          
      
          
            <option value="2"  >Published and Live</option>
          
      
          
            <option value="3"  >Draft Unpublished Changes</option>
          
      
          
            <option value="4"  >Visible to Staff Only</option>
          
      
    </select>

    

    
  </div>
</div>

  

  
    

<div class="form-group">
  
    <label class="col-sm-2 control-label ">
      Institution
    </label>
  

  <div class="col-sm-10">
    <select class="form-control" name="institution">
      
      
            <option value="cb85e4ff-6636-4201-8e9f-5a9259c936bf"  >UniLag</option>
          
      
          
            <option value="78b31745-7233-4857-ac5e-6a1c5080691a"  >Uniben</option>
          
      
          
            <option value="041eef28-9c99-4e7b-8652-e000c13a84d1"  >Harvard</option>
          
      
    </select>

    

    
  </div>
</div>

  

  
    

<div class="form-group">
  
    <label class="col-sm-2 control-label ">
      Author
    </label>
  

  <div class="col-sm-10">
    <select class="form-control" name="author" value="097cd2bb-ae72-48e4-9a4d-1ebd2c05be03">
      
      
          
            <option value="097cd2bb-ae72-48e4-9a4d-1ebd2c05be03"  selected>Johnsmith@lect.com</option>
          
      
          
            <option value="30007f4a-0826-4416-ab5e-3b6d236876ad"  >juwavictor@gmail.com</option>
          
      
          
            <option value="529c54d4-dacd-45ce-8f11-aae7e68fcdc3"  >Tarun.Khanna@gmail.com</option>
          
      
    </select>

    

    
  </div>
</div>

  

  
    




<div class="form-group">
  
    <label class="col-sm-2 control-label ">
      Prerequisite
    </label>
  

  <div class="col-sm-10">
    <select multiple  class="form-control" name="prerequisite" value="6a8c0445-8581-4f19-93a2-84fd3b7e1399" >
      
        
          <option value="6a8c0445-8581-4f19-93a2-84fd3b7e1399"  selected>Maths</option>
        
      
        
          <option value="d971e036-2846-4f6a-99e1-0fe9b64073ce"  >edx-course</option>
        
      
        
          <option value="a6149f65-fb7b-4b1d-b43e-1384d486e9c3"  >course1</option>
        
      
        
          <option value="fd3a6e73-e95b-4199-990b-553f15218276"  >Entrepreneurship in Emerging Economies</option>
        
      
        
          <option value="b2d94259-bcb7-4b66-83f3-e3cca787e29d"  >Data Science</option>
        
      
        
          <option value="a67d2e42-3580-461c-a6e8-40449da8ce10"  >testing</option>
        
      
        
          <option value="1a7fe6cd-1e40-4fc3-b71c-562bc80b8114"  >testing</option>
        
      
    </select>

    

    
  </div>
</div>

  

  
    




<div class="form-group">
  
    <label class="col-sm-2 control-label ">
      Authoring team
    </label>
  

  <div class="col-sm-10">
    <select multiple  class="form-control" name="authoring_team">
      
        
          <option value="097cd2bb-ae72-48e4-9a4d-1ebd2c05be03"  >Johnsmith@lect.com</option>
        
      
        
          <option value="30007f4a-0826-4416-ab5e-3b6d236876ad"  >juwavictor@gmail.com</option>
        
      
        
          <option value="529c54d4-dacd-45ce-8f11-aae7e68fcdc3"  >Tarun.Khanna@gmail.com</option>
        
      
    </select>

    

    
  </div>
</div>

  


                              <div class="form-actions">
                                <button onClick={(e) => {
                                	runAjaxSubmit(e)
                                }} class="btn btn-primary js-tooltip" title="Make a POST request on the Course Create resource">POST</button>
                              </div>
                            </fieldset>
                          </form>
                        
                      </div>
                    

                 </div>
                </div>
              

              
            
          
        </div>
      </div>
    </div>

    


      </Fragment>
    )
}


export default TestForm