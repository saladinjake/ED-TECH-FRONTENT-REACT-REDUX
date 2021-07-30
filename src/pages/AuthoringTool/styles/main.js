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
	
	 height:1000px;

	   
	

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



/*-------- RESPONSIVO ---------*/
/*medium screen*/
	@media (max-width: 992px) {
		  div#menu-lateral {
		    position: absolute;
		    left: 0px;
		    margin-bottom: 15px;
		    bottom: 0;
		    top: 0;
        margin-top: 8.5em;
		  }

		  ul#menu-menu-lateral li.menu-item a {
		    font-size: 0.9em;
        line-height: 22px;
		  }


		  ul#menu-menu-lateral li >.sub-menu li > a {
		    padding-left: 10px;
		  }

		 
      ul#menu-menu-lateral li >.sub-menu li {
        padding: 5px;        
        width: 245px;        
      }
      
      #menu-lateral ul.menu li:hover > .sub-menu, #menu-lateral ul.menu li:focus-within > .sub-menu {
    display: inline-table;
    position: absolute;
    left: 14.5em;
    width: 100%;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 
    0 3px 1px -2px rgba(0,0,0,0.12), 
    0 1px 5px 0 rgba(0,0,0,0.2);
}

	}

  @media (max-width: 600px) {
    
    ul#menu-menu-lateral li {
        height: 55px;
        width: 55px;
		  }
    
    li.menu-item {
    background-color: grey;
}
    
    li.menu-item i.iconMenu {
    color: #fff;
}
    li.menu-item:hover i.iconMenu, li.menu-item:focus-within i.iconMenu {
    color: grey;
}
    
    ul#menu-menu-lateral li.menu-item a{
		    visibility: hidden;
        font-size: 1.2em;
        display: flex;
		  }
    i.left.iconMenu {
        font-size: 2.2em;
        left: 2px;
        visibility: visible;
    }
    
    i.right.iconMenu{
      display: none;
    }
   

		ul#menu-menu-lateral li:hover, ul#menu-menu-lateral li:focus-within {
		    background-color: #fff;
    width: 225px;
		}
    
    ul#menu-menu-lateral li:hover>a, ul#menu-menu-lateral li:focus-within>a {
        visibility: visible;
        line-height: 45px;
    }
            
      #menu-lateral ul.menu li:hover > .sub-menu, #menu-lateral ul.menu li:focus-within > .sub-menu {
        display:none;
    }    
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










		/*Navigations*/

`;
