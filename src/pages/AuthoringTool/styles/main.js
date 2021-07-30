import styled from "styled-components"
export const Styles =styled.div`
    .main-work-bench{
    	float:right;
    }

    .authoring-sidebar{
     width:300px;
     background:#fff;
     float:left;
     overflow: hidden;
	 transition: all .3s ease-in;
	
	 height:800px;
	 background:#fff;

	   
	

   }


   /*Nav Layout */

/*---------- vertical icon menu ----------*/
div#menu-lateral {
  position: relative;
  max-width: 280px;  
  padding-top: 2.5em;
   font-family:"0pen Sans"; 
}

li.menu-item {
  background-color: #fff;
  margin:15px;
   font-family:"0pen Sans"; 
}


li.menu-item i.iconMenu {
  color: #000;
  margin-right:15px;
    
}

li.menu-item i{
	margin-right:15px;
}

li.menu-item:hover, li.menu-item:focus-within {
  background-color: white;
   font-family:"0pen Sans"; 
}
li.menu-item:hover i.iconMenu, li.menu-item:focus-within i.iconMenu {
  color: grey;
  
}
ul#menu-menu-lateral li {
  
  padding: 0.5rem;
   font-family:"0pen Sans"; 
}

ul#menu-menu-lateral li a {
  font-size: 1.2em;
  color: #fff;
  height: 100%;
  width: 100%; 
  font-family:"0pen Sans"; 
}

ul#menu-menu-lateral li:hover, ul#menu-menu-lateral li:focus-within{
  background-color: #fff;
  font-family:"0pen Sans"; 
}

ul#menu-menu-lateral li:hover >a, ul#menu-menu-lateral li:focus-within>a{
  color: #fff;
  font-family:"0pen Sans"; 
}

#menu-lateral ul.menu .sub-menu {
  display: none;
}


#menu-lateral ul.menu li:hover > .sub-menu, #menu-lateral ul.menu li:focus-within > .sub-menu {    
    display: inline-table;
    position: relative;
    width: 100%;
    font-family:"0pen Sans"; 
}


ul#menu-menu-lateral li >.sub-menu li > a{
  font-size: 1em;
  color: grey;
  font-family:"0pen Sans"; 
}

ul#menu-menu-lateral li >.sub-menu li{
  background-color: #fff;  
}

ul#menu-menu-lateral li >.sub-menu li:hover, ul#menu-menu-lateral li >.sub-menu li:focus-within{
  background-color: rgba(8,23,200);
  font-family:"0pen Sans"; 
}

ul#menu-menu-lateral li >.sub-menu li:hover > a, ul#menu-menu-lateral li >.sub-menu li:focus-within > a{
  color: #fff;
}

ul#menu-menu-lateral li >.sub-menu li:last-child{
  border-bottom: none;
  font-family:"0pen Sans"; 
}

ul#menu-menu-lateral li.hover i.right.iconMenu {
  -ms-transform: rotate(180deg);
  -webkit-transform: rotate(180deg);
  transform: rotate(180deg);
  color:grey;
  font-family:"0pen Sans"; 
}


i.iconMenu {
  color: #000;
  margin:5px;
}








	/**graphs */


	.bx--graph-header {
			font-weight: 300;
			font-size: 24px;
		}

		.overlay {
			fill: #3d70b2;
			opacity: .1;
			display: none;
			pointer-events: none;
		}

		.line {
			stroke-width: 2;
			stroke: #FF00FF;
			fill: none;
			pointer-events: none;
		}

		.axis path {
			stroke: #5A6872;
		}

		.tick line {
			stroke: #5A6872;
		}

		.tick text {
			fill: #5A6872;
		}

		.graph-container {
			position: relative;
		}

		.tooltip {
			font-weight: 700;
			padding-left: 1rem 2rem;
			background-color: #fff;
			position: absolute;
			box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .1); 
			border: 1px solid #DFE3E6;
			padding: .25rem .5rem;
			pointer-events: none;
			display: none;
			 
			&:after {
				content: '';
				top: 100%;
				left: 50%;
				transform: translateX(-50%);
				position: absolute;
				width: 0; 
				height: 0; 
				border-left: 5px solid transparent;
				border-right: 5px solid transparent;
				border-top: 5px solid #fff;
			}
		}

		.y path {
			display: none;
		}

		.label {
			font-size: 10px;
			font-weight: 700;
			fill: #5A6872;
			text-anchor: middle;
		}


		.padded{
      padding:10px;
		}

		.padded-down{
			margin:30px;
		}








		/*search box filter inputs*/

.dropdown-container, .instructions {
  width: 200px;
  margin: 20px auto 0;
  font-size: 14px;
  font-family: sans-serif;
  overflow: auto;
}

.instructions {
  width: 100%;
  text-align: center;
}

.dropdown-button {
  float: left;
  width: 100%;
  
  padding: 10px 12px;
  cursor: pointer;
  border: 1px solid lightgray;
  box-sizing: border-box;
}
.dropdown-button .dropdown-label, .dropdown-button .dropdown-quantity {
  float: left;
}
.dropdown-button .dropdown-quantity {
  margin-left: 4px;
}
.dropdown-button .fa-search {
  float: right;
}

.dropdown-list {
  float: left;
  width: 100%;
  border: 1px solid lightgray;
  border-top: none;
  box-sizing: border-box;
  padding: 10px 12px;
}
.dropdown-list input[type=search] {
  padding: 5px 0;
}
.dropdown-list ul {
  margin: 10px 0;
  max-height: 200px;
  overflow-y: auto;
}
.dropdown-list ul input[type=checkbox] {
  position: relative;
  top: 2px;
}






		/*Navigations course form wizard*/


		/***** Top content *****/

.top-content { padding: 40px 0 170px 0;background:#fff; }

.top-content .text { color: #fff; }
.top-content .text h1 { color: #fff; }
.top-content .description { margin: 20px 0 10px 0; }
.top-content .description p { opacity: 0.8; }
.top-content .description a { color: #fff; }
.top-content .description a:hover, 
.top-content .description a:focus { border-bottom: 1px dotted #fff; }

.form-box { padding-top: 40px; }

.f1 {
	padding: 25px; background: #fff;
	-moz-border-radius: 4px; -webkit-border-radius: 4px; border-radius: 4px;
}
.f1 h3 { margin-top: 0; margin-bottom: 5px; text-transform: uppercase; }

.f1-steps { overflow: hidden; position: relative; margin-top: 20px; }

.f1-progress { position: absolute; top: 24px; left: 0; width: 100%; height: 1px; background: #ddd; }
.f1-progress-line { position: absolute; top: 0; left: 0; height: 1px; background: #f35b3f; }

.f1-step { position: relative; float: left; width: 33.333333%; padding: 0 5px; }

.f1-step-icon {
	display: inline-block; width: 40px; height: 40px; margin-top: 4px; background: #ddd;
	font-size: 16px; color: #fff; line-height: 40px;
	-moz-border-radius: 50%; -webkit-border-radius: 50%; border-radius: 50%;
}
.f1-step.activated .f1-step-icon {
	background: #fff; border: 1px solid #f35b3f; color: #f35b3f; line-height: 38px;
}
.f1-step.active .f1-step-icon {
	width: 48px; height: 48px; margin-top: 0; background: #f35b3f; font-size: 22px; line-height: 48px;
}

.f1-step p { color: #ccc; }
.f1-step.activated p { color: #f35b3f; }
.f1-step.active p { color: #f35b3f; }

.f1 fieldset { display: none; text-align: left; }

.f1-buttons { text-align: right; }

.f1 .input-error { border-color: #f35b3f; }


input[type="text"], 
input[type="password"], 
textarea, 
textarea.form-control {
	height: 44px;
    margin: 0;
    padding: 0 20px;
    vertical-align: middle;
    background: #fff;
    border: 1px solid #ddd;
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    font-weight: 300;
    line-height: 44px;
    color: #888;
    -moz-border-radius: 4px; -webkit-border-radius: 4px; border-radius: 4px;
    -moz-box-shadow: none; -webkit-box-shadow: none; box-shadow: none;
    -o-transition: all .3s; -moz-transition: all .3s; -webkit-transition: all .3s; -ms-transition: all .3s; transition: all .3s;
}

textarea, 
textarea.form-control {
	height: 90px;
	padding-top: 8px;
	padding-bottom: 8px;
	line-height: 30px;
}

input[type="text"]:focus, 
input[type="password"]:focus, 
textarea:focus, 
textarea.form-control:focus {
	outline: 0;
	background: #fff;
    border: 1px solid #ccc;
    -moz-box-shadow: none; -webkit-box-shadow: none; box-shadow: none;
}

input[type="text"]:-moz-placeholder, input[type="password"]:-moz-placeholder, 
textarea:-moz-placeholder, textarea.form-control:-moz-placeholder { color: #888; }

input[type="text"]:-ms-input-placeholder, input[type="password"]:-ms-input-placeholder, 
textarea:-ms-input-placeholder, textarea.form-control:-ms-input-placeholder { color: #888; }

input[type="text"]::-webkit-input-placeholder, input[type="password"]::-webkit-input-placeholder, 
textarea::-webkit-input-placeholder, textarea.form-control::-webkit-input-placeholder { color: #888; }

label { font-weight: 300; }


button.btn.btn-next,
button.btn.btn-next:focus,
button.btn.btn-next:active:focus, button.btn.btn-next.active:focus { background: #f35b3f; }

button.btn.btn-submit,
button.btn.btn-submit:focus,
button.btn.btn-submit:active:focus, button.btn.btn-submit.active:focus { background: #f35b3f; }

button.btn.btn-previous,
button.btn.btn-previous:focus,
button.btn.btn-previous:active:focus, button.btn.btn-previous.active:focus { background: #bbb; }

/***** Media queries *****/

@media (min-width: 992px) and (max-width: 1199px) {}

@media (min-width: 768px) and (max-width: 991px) {}

@media (max-width: 767px) {
	
	// .navbar { padding-top: 0; }
	// .navbar.navbar-no-bg { background: #333; background: rgba(51, 51, 51, 0.9); }
	// .navbar-brand { height: 60px; margin-left: 15px; }
	// .navbar-collapse { border: 0; }
	// .navbar-toggle { margin-top: 12px; }
	
	.top-content { padding: 40px 0 110px 0; }

}

@media (max-width: 415px) {
	
	
	.f1 { padding-bottom: 20px; }
	.f1-buttons button { margin-bottom: 5px; }

}


`;
