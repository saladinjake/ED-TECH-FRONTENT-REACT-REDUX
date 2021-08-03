import React, { useEffect, Fragment }from "react"
import { Col, Container, Row } from "react-bootstrap"
// import { Styles } from "./styles/sidebar.js"
import "./styles/authoring.css";
import "./styles/main.css"

import  $ from "jquery"




export const FormWizard = () => {
	return (
        <div className="content-page">
                <div className="content">
                    
                    <div className="row ">
    <div className="col-xl-12">
        <div className="card">
            <div className="card-body">
                <h4 className="page-title"> <i className="mdi mdi-apple-keyboard-command title_icon"></i> Add new course</h4>
            </div> 
        </div>
    </div>
</div>

<div className="row">
    <div className="col-xl-12">
        <div className="card">
            <div className="card-body">

                <h4 className="header-title mb-3">Course adding form                    <a href="#/user/courses" className="alignToTitle btn btn-outline-secondary btn-rounded btn-sm"> <i className=" mdi mdi-keyboard-backspace"></i> Back to course list</a>
                </h4>

                <div className="row">
                    <div className="col-xl-12">
                        <form className="required-form" action="#/user/course_actions/add" method="post" enctype="multipart/form-data">
                            <div id="basicwizard">

                                <ul className="nav nav-pills nav-justified form-wizard-header mb-3">
                                    <li className="nav-item">
                                        <a href="#basic" data-toggle="tab" className="nav-link rounded-0 pt-2 pb-2 active">
                                            <i className="mdi mdi-fountain-pen-tip mr-1"></i>
                                            <span className="d-none d-sm-inline">Basic</span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#requirements" data-toggle="tab" className="nav-link rounded-0 pt-2 pb-2">
                                            <i className="mdi mdi-bell-alert mr-1"></i>
                                            <span className="d-none d-sm-inline">Requirements</span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#outcomes" data-toggle="tab" className="nav-link rounded-0 pt-2 pb-2">
                                            <i className="mdi mdi-camera-control mr-1"></i>
                                            <span className="d-none d-sm-inline">Outcomes</span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#pricing" data-toggle="tab" className="nav-link rounded-0 pt-2 pb-2">
                                            <i className="mdi mdi-currency-cny mr-1"></i>
                                            <span className="d-none d-sm-inline">Pricing</span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#media" data-toggle="tab" className="nav-link rounded-0 pt-2 pb-2">
                                            <i className="mdi mdi-library-video mr-1"></i>
                                            <span className="d-none d-sm-inline">Media</span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#seo" data-toggle="tab" className="nav-link rounded-0 pt-2 pb-2">
                                            <i className="mdi mdi-tag-multiple mr-1"></i>
                                            <span className="d-none d-sm-inline">Seo</span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#finish" data-toggle="tab" className="nav-link rounded-0 pt-2 pb-2">
                                            <i className="mdi mdi-checkbox-marked-circle-outline mr-1"></i>
                                            <span className="d-none d-sm-inline">Finish</span>
                                        </a>
                                    </li>
                                </ul>

                                <div className="tab-content b-0 mb-0">
                                    <div className="tab-pane active" id="basic">
                                        <div className="row justify-content-center">
                                            <div className="col-xl-8">
                                                <div className="form-group row mb-3">
                                                    <label className="col-md-2 col-form-label" for="course_title">Course title <span className="required">*</span> </label>
                                                    <div className="col-md-10">
                                                        <input type="text" className="form-control" id="course_title" name="title" placeholder="Enter course title" required="">
                                                    </div>
                                                </div>
                                                <div className="form-group row mb-3">
                                                    <label className="col-md-2 col-form-label" for="short_description">Short description</label>
                                                    <div className="col-md-10">
                                                        <textarea name="short_description" id="short_description" className="form-control"></textarea>
                                                    </div>
                                                </div>
                                                <div className="form-group row mb-3">
                                                    <label className="col-md-2 col-form-label" for="description">Description</label>
                                                    <div className="col-md-10">
                                                        <textarea name="description" id="description" className="form-control" style={{display: "none"}}></textarea><div className="note-editor note-frame card"><div className="note-dropzone">  <div className="note-dropzone-message"></div></div>
                                                        <div className="note-toolbar card-header" role="toolbar" style={{position: "relative", top: "0px", width: "100%"}}>
                                                        <div className="note-btn-group btn-group note-style">
                                                        <div className="note-btn-group btn-group">
                                                        <button type="button" className="note-btn btn btn-light btn-sm dropdown-toggle" role="button" tabindex="-1" data-toggle="dropdown" title="" aria-label="Style" data-original-title="Style"><i className="note-icon-magic"></i></button><div className="dropdown-menu dropdown-style" role="list" aria-label="Style"><a className="dropdown-item" href="#" data-value="p" role="listitem" aria-label="p"><p>Normal</p></a><a className="dropdown-item" href="#" data-value="blockquote" role="listitem" aria-label="[object Object]"><blockquote className="blockquote">Blockquote</blockquote></a><a className="dropdown-item" href="#" data-value="h1" role="listitem" aria-label="h1"><h1>Header 1</h1></a><a className="dropdown-item" href="#" data-value="h2" role="listitem" aria-label="h2"><h2>Header 2</h2></a><a className="dropdown-item" href="#" data-value="h3" role="listitem" aria-label="h3"><h3>Header 3</h3></a><a className="dropdown-item" href="#" data-value="h4" role="listitem" aria-label="h4"><h4>Header 4</h4></a><a className="dropdown-item" href="#" data-value="h5" role="listitem" aria-label="h5"><h5>Header 5</h5></a><a className="dropdown-item" href="#" data-value="h6" role="listitem" aria-label="h6"><h6>Header 6</h6></a></div></div></div><div className="note-btn-group btn-group note-font"><button type="button" className="note-btn btn btn-light btn-sm note-btn-bold" role="button" tabindex="-1" title="" aria-label="Bold (CTRL+B)" data-original-title="Bold (CTRL+B)"><i className="note-icon-bold"></i></button><button type="button" className="note-btn btn btn-light btn-sm note-btn-underline" role="button" tabindex="-1" title="" aria-label="Underline (CTRL+U)" data-original-title="Underline (CTRL+U)"><i className="note-icon-underline"></i></button><button type="button" className="note-btn btn btn-light btn-sm" role="button" tabindex="-1" title="" aria-label="Remove Font Style (CTRL+\)" data-original-title="Remove Font Style (CTRL+\)"><i className="note-icon-eraser"></i></button></div><div className="note-btn-group btn-group note-fontname"><div className="note-btn-group btn-group"><button type="button" className="note-btn btn btn-light btn-sm dropdown-toggle" role="button" tabindex="-1" data-toggle="dropdown" title="" aria-label="Font Family" data-original-title="Font Family"><span className="note-current-fontname" style={{fontFamily: "sans-serif"}}>sans-serif</span></button><div className="dropdown-menu note-check dropdown-fontname" role="list" aria-label="Font Family"><a className="dropdown-item" href="#" data-value="Arial" role="listitem" aria-label="Arial">
                                                        <i className="note-icon-menu-check"></i> 
                                                        <span style={{fontFamily: "Arial"}}>Arial</span></a>
                                                        <a className="dropdown-item" href="#" data-value="Arial Black" role="listitem" aria-label="Arial Black"><i className="note-icon-menu-check"></i> 
                                                        <span style={{fontFamily: "Arial Black"}}>Arial Black</span></a><a className="dropdown-item" href="#" data-value="Comic Sans MS" role="listitem" aria-label="Comic Sans MS"><i className="note-icon-menu-check"></i>
                                                         <span style={{ fontFamily: "Comic Sans MS"}}>Comic Sans MS</span></a><a className="dropdown-item" href="#" data-value="Courier New" role="listitem" aria-label="Courier New"><i className="note-icon-menu-check"></i> 
                                                         <span style={{fontFamily: "Courier New"}}>Courier New</span></a><a className="dropdown-item" href="#" data-value="Helvetica" role="listitem" aria-label="Helvetica"><i className="note-icon-menu-check"></i>
                                                          <span style=fontFamily: "Helvetica"}}>Helvetica</span></a>
                                                          <a className="dropdown-item" href="#" data-value="Impact" role="listitem" aria-label="Impact"><i className="note-icon-menu-check"></i> 
                                                          <span style={{fontFamily: "Impact"}}>Impact</span></a><a className="dropdown-item" href="#" data-value="Tahoma" role="listitem" aria-label="Tahoma"><i className="note-icon-menu-check"></i>
                                                           <span style={{fontFamily: "Tahoma"}}>Tahoma</span></a><a className="dropdown-item" href="#" data-value="Times New Roman" role="listitem" aria-label="Times New Roman"><i className="note-icon-menu-check"></i> 
                                                           <span style={{fontFamily: "Times New Roman"}}>Times New Roman</span></a><a className="dropdown-item" href="#" data-value="Verdana" role="listitem" aria-label="Verdana"><i className="note-icon-menu-check"></i>
                                                            <span style={{fontFamily: "Verdana"}}>Verdana</span></a></div></div></div><div className="note-btn-group btn-group note-color"><div className="note-btn-group btn-group note-color note-color-all"><button type="button" className="note-btn btn btn-light btn-sm note-current-color-button" role="button" tabindex="-1" title="" aria-label="Recent Color" data-original-title="Recent Color" data-backcolor="#FFFF00">
                                                            <i className="note-icon-font note-recent-color" style={{backgroundColor: "rgb(255, 255, 0)"}}></i></button><button type="button" className="note-btn btn btn-light btn-sm dropdown-toggle" role="button" tabindex="-1" data-toggle="dropdown" title="" aria-label="More Color" data-original-title="More Color"></button><div className="dropdown-menu" role="list"><div className="note-palette">  <div className="note-palette-title">Background Color</div>  <div>    <button type="button" className="note-color-reset btn btn-light" data-event="backColor" data-value="inherit">Transparent    </button>  </div>  <div className="note-holder" data-event="backColor"><div className="note-color-palette"><div className="note-color-row">
                                                            <button type="button" className="note-color-btn" style={{backgroundColor:"#000000"}} data-event="backColor" data-value="#000000" title="" aria-label="Black" data-toggle="button" tabindex="-1" data-original-title="Black"></button>
                                                            <button type="button" className="note-color-btn" style={{backgroundColor:"#424242"}} data-event="backColor" data-value="#424242" title="" aria-label="Tundora" data-toggle="button" tabindex="-1" data-original-title="Tundora"></button>
                                                            <button type="button" className="note-color-btn" style={{backgroundColor:"#636363"}} data-event="backColor" data-value="#636363" title="" aria-label="Dove Gray" data-toggle="button" tabindex="-1" data-original-title="Dove Gray"></button>
                                                            <button type="button" className="note-color-btn" style={{backgroundColor:"#9C9C94"}} data-event="backColor" data-value="#9C9C94" title="" aria-label="Star Dust" data-toggle="button" tabindex="-1" data-original-title="Star Dust"></button>
                                                            <button type="button" className="note-color-btn" style={{backgroundColor:"#CEC6CE"}} data-event="backColor" data-value="#CEC6CE" title="" aria-label="Pale Slate" data-toggle="button" tabindex="-1" data-original-title="Pale Slate"></button>
                                                            <button type="button" className="note-color-btn" style={{backgroundColor:"#EFEFEF" }} data-event="backColor" data-value="#EFEFEF" title="" aria-label="Gallery" data-toggle="button" tabindex="-1" data-original-title="Gallery"></button>
                                                            <button type="button" className="note-color-btn" style={{ backgroundColor:"#F7F7F7" }} data-event="backColor" data-value="#F7F7F7" title="" aria-label="Alabaster" data-toggle="button" tabindex="-1" data-original-title="Alabaster"></button>
                                                            <button type="button" className="note-color-btn" style={{ backgroundColor:"#FFFFFF" }} data-event="backColor" data-value="#FFFFFF" title="" aria-label="White" data-toggle="button" tabindex="-1" data-original-title="White"></button></div><div className="note-color-row">
                                                            <button type="button" className="note-color-btn" style={{ backgroundColor:"#FF0000" }} data-event="backColor" data-value="#FF0000" title="" aria-label="Red" data-toggle="button" tabindex="-1" data-original-title="Red"></button>
                                                            <button type="button" className="note-color-btn" style={{ backgroundColor:"#FF9C00" }} data-event="backColor" data-value="#FF9C00" title="" aria-label="Orange Peel" data-toggle="button" tabindex="-1" data-original-title="Orange Peel"></button>
                                                            <button type="button" className="note-color-btn" style={{ backgroundColor: "#FFFF00" }} data-event="backColor" data-value="#FFFF00" title="" aria-label="Yellow" data-toggle="button" tabindex="-1" data-original-title="Yellow"></button>
                                                            <button type="button" className="note-color-btn" style={{ backgroundColor:"#00FF00" }} data-event="backColor" data-value="#00FF00" title="" aria-label="Green" data-toggle="button" tabindex="-1" data-original-title="Green"></button>
                                                            <button type="button" className="note-color-btn" style={{ backgroundColor: "#00FFFF" }} data-event="backColor" data-value="#00FFFF" title="" aria-label="Cyan" data-toggle="button" tabindex="-1" data-original-title="Cyan"></button>
                                                            <button type="button" className="note-color-btn" style={{backgroundColor:"#0000FF" }} data-event="backColor" data-value="#0000FF" title="" aria-label="Blue" data-toggle="button" tabindex="-1" data-original-title="Blue"></button>
                                                            <button type="button" className="note-color-btn" style={{ backgroundColor:"#9C00FF" }} data-event="backColor" data-value="#9C00FF" title="" aria-label="Electric Violet" data-toggle="button" tabindex="-1" data-original-title="Electric Violet"></button>
                                                            <button type="button" className="note-color-btn" style={{ backgroundColor:"#FF00FF" }} data-event="backColor" data-value="#FF00FF" title="" aria-label="Magenta" data-toggle="button" tabindex="-1" data-original-title="Magenta"></button></div><div className="note-color-row">
                                                            <button type="button" className="note-color-btn" style={{ backgroundColor:"#F7C6CE" }} data-event="backColor" data-value="#F7C6CE" title="" aria-label="Azalea" data-toggle="button" tabindex="-1" data-original-title="Azalea"></button>
                                                            <button type="button" className="note-color-btn" style={{ backgroundColor:"#FFE7CE" }} data-event="backColor" data-value="#FFE7CE" title="" aria-label="Karry" data-toggle="button" tabindex="-1" data-original-title="Karry"></button>
                                                            <button type="button" className="note-color-btn" style={{ backgroundColor:"#FFEFC6" }} data-event="backColor" data-value="#FFEFC6" title="" aria-label="Egg White" data-toggle="button" tabindex="-1" data-original-title="Egg White"></button>
                                                            <button type="button" className="note-color-btn" style={{ backgroundColor:"#D6EFD6" }} data-event="backColor" data-value="#D6EFD6" title="" aria-label="Zanah" data-toggle="button" tabindex="-1" data-original-title="Zanah"></button>
                                                            <button type="button" className="note-color-btn" style={{ backgroundColor:"#CEDEE7" }} data-event="backColor" data-value="#CEDEE7" title="" aria-label="Botticelli" data-toggle="button" tabindex="-1" data-original-title="Botticelli"></button>
                                                            <button type="button" className="note-color-btn" style={{ backgroundColor:"#CEE7F7" }} data-event="backColor" data-value="#CEE7F7" title="" aria-label="Tropical Blue" data-toggle="button" tabindex="-1" data-original-title="Tropical Blue"></button>
                                                            <button type="button" className="note-color-btn" style={{backgroundColor:"#D6D6E7" }} data-event="backColor" data-value="#D6D6E7" title="" aria-label="Mischka" data-toggle="button" tabindex="-1" data-original-title="Mischka"></button>
                                                            <button type="button" className="note-color-btn" style={{ backgroundColor:"#E7D6DE" }} data-event="backColor" data-value="#E7D6DE" title="" aria-label="Twilight" data-toggle="button" tabindex="-1" data-original-title="Twilight"></button></div><div className="note-color-row">
                                                            <button type="button" className="note-color-btn" style={{ backgroundColor:"#E79C9C" }} data-event="backColor" data-value="#E79C9C" title="" aria-label="Tonys Pink" data-toggle="button" tabindex="-1" data-original-title="Tonys Pink"></button>
                                                            <button type="button" className="note-color-btn" style={{ backgroundColor: "#FFC69C" }} data-event="backColor" data-value="#FFC69C" title="" aria-label="Peach Orange" data-toggle="button" tabindex="-1" data-original-title="Peach Orange"></button>
                                                            <button type="button" className="note-color-btn" style={{ backgroundColor:"#FFE79C" }} data-event="backColor" data-value="#FFE79C" title="" aria-label="Cream Brulee" data-toggle="button" tabindex="-1" data-original-title="Cream Brulee"></button>
                                                            <button type="button" className="note-color-btn" style={{ backgroundColor:"#B5D6A5" }} data-event="backColor" data-value="#B5D6A5" title="" aria-label="Sprout" data-toggle="button" tabindex="-1" data-original-title="Sprout"></button>
                                                            <button type="button" className="note-color-btn" style={{ backgroundColor:"#A5C6CE" }} data-event="backColor" data-value="#A5C6CE" title="" aria-label="Casper" data-toggle="button" tabindex="-1" data-original-title="Casper"></button>
                                                            <button type="button" className="note-color-btn" style={{ backgroundColor:"#9CC6EF"  }} data-event="backColor" data-value="#9CC6EF" title="" aria-label="Perano" data-toggle="button" tabindex="-1" data-original-title="Perano"></button>
                                                            <button type="button" className="note-color-btn" style={{ backgroundColor:"#B5A5D6" }} data-event="backColor" data-value="#B5A5D6" title="" aria-label="Cold Purple" data-toggle="button" tabindex="-1" data-original-title="Cold Purple"></button>
                                                            <button type="button" className="note-color-btn" style={{ backgroundColor:"#D6A5BD" }} data-event="backColor" data-value="#D6A5BD" title="" aria-label="Careys Pink" data-toggle="button" tabindex="-1" data-original-title="Careys Pink"></button></div><div className="note-color-row">
                                                            <button type="button" className="note-color-btn" style= {{ backgroundColor:"#E76363" }} data-event="backColor" data-value="#E76363" title="" aria-label="Mandy" data-toggle="button" tabindex="-1" data-original-title="Mandy"></button>
                                                            <button type="button" className="note-color-btn" style={{ backgroundColor:"#F7AD6B" }} data-event="backColor" data-value="#F7AD6B" title="" aria-label="Rajah" data-toggle="button" tabindex="-1" data-original-title="Rajah"></button>
                                                            <button type="button" className="note-color-btn" style={{ backgroundColor:"#FFD663" }} data-event="backColor" data-value="#FFD663" title="" aria-label="Dandelion" data-toggle="button" tabindex="-1" data-original-title="Dandelion"></button>
                                                            <button type="button" className="note-color-btn" style={{ backgroundColor:"#94BD7B" }} data-event="backColor" data-value="#94BD7B" title="" aria-label="Olivine" data-toggle="button" tabindex="-1" data-original-title="Olivine"></button>
                                                            <button type="button" className="note-color-btn" style={{ backgroundColor:"#73A5AD" }} data-event="backColor" data-value="#73A5AD" title="" aria-label="Gulf Stream" data-toggle="button" tabindex="-1" data-original-title="Gulf Stream"></button>
                                                            <button type="button" className="note-color-btn" style={{ backgroundColor:"#6BADDE" }} data-event="backColor" data-value="#6BADDE" title="" aria-label="Viking" data-toggle="button" tabindex="-1" data-original-title="Viking"></button>
                                                            <button type="button" className="note-color-btn" style={{ backgroundColor:"#8C7BC6" }} data-event="backColor" data-value="#8C7BC6" title="" aria-label="Blue Marguerite" data-toggle="button" tabindex="-1" data-original-title="Blue Marguerite"></button>
                                                            <button type="button" className="note-color-btn" style={{backgroundColor:"#C67BA5" }} data-event="backColor" data-value="#C67BA5" title="" aria-label="Puce" data-toggle="button" tabindex="-1" data-original-title="Puce"></button></div><div className="note-color-row">
                                                            <button type="button" className="note-color-btn" style={{ backgroundColor:"#CE0000" }} data-event="backColor" data-value="#CE0000" title="" aria-label="Guardsman Red" data-toggle="button" tabindex="-1" data-original-title="Guardsman Red"></button>
                                                            <button type="button" className="note-color-btn" style={{ backgroundColor:"#E79439" }} data-event="backColor" data-value="#E79439" title="" aria-label="Fire Bush" data-toggle="button" tabindex="-1" data-original-title="Fire Bush"></button>
                                                            <button type="button" className="note-color-btn" style={{ backgroundColor:"#EFC631" }} data-event="backColor" data-value="#EFC631" title="" aria-label="Golden Dream" data-toggle="button" tabindex="-1" data-original-title="Golden Dream"></button>
                                                            <button type="button" className="note-color-btn" style={{ backgroundColor:"#6BA54A" }} data-event="backColor" data-value="#6BA54A" title="" aria-label="Chelsea Cucumber" data-toggle="button" tabindex="-1" data-original-title="Chelsea Cucumber"></button>
                                                            <button type="button" className="note-color-btn" style={{ backgroundColor:"#4A7B8C" }}  data-event="backColor" data-value="#4A7B8C" title="" aria-label="Smalt Blue" data-toggle="button" tabindex="-1" data-original-title="Smalt Blue"></button>
                                                            <button type="button" className="note-color-btn" style={{ backgroundColor:"#3984C6" }} data-event="backColor" data-value="#3984C6" title="" aria-label="Boston Blue" data-toggle="button" tabindex="-1" data-original-title="Boston Blue"></button>
                                                            <button type="button" className="note-color-btn" style={{ backgroundColor:"#634AA5" }}  data-event="backColor" data-value="#634AA5" title="" aria-label="Butterfly Bush" data-toggle="button" tabindex="-1" data-original-title="Butterfly Bush"></button>
                                                            <button type="button" className="note-color-btn" style={{ backgroundColor:"#A54A7B" }} data-event="backColor" data-value="#A54A7B" title="" aria-label="Cadillac" data-toggle="button" tabindex="-1" data-original-title="Cadillac"></button></div><div className="note-color-row">
                                                            <button type="button" className="note-color-btn" style={{ backgroundColor:"#9C0000" }} data-event="backColor" data-value="#9C0000" title="" aria-label="Sangria" data-toggle="button" tabindex="-1" data-original-title="Sangria"></button>
                                                            <button type="button" className="note-color-btn" style={{ backgroundColor:"#B56308" }} data-event="backColor" data-value="#B56308" title="" aria-label="Mai Tai" data-toggle="button" tabindex="-1" data-original-title="Mai Tai"></button>
                                                            <button type="button" className="note-color-btn" style={{ backgroundColor:"#BD9400" }} data-event="backColor" data-value="#BD9400" title="" aria-label="Buddha Gold" data-toggle="button" tabindex="-1" data-original-title="Buddha Gold"></button>
                                                            <button type="button" className="note-color-btn" style={{ backgroundColor:"#397B21" }} data-event="backColor" data-value="#397B21" title="" aria-label="Forest Green" data-toggle="button" tabindex="-1" data-original-title="Forest Green"></button>
                                                            <button type="button" className="note-color-btn" style={{ backgroundColor:"#104A5A" }} data-event="backColor" data-value="#104A5A" title="" aria-label="Eden" data-toggle="button" tabindex="-1" data-original-title="Eden"></button>
                                                            <button type="button" className="note-color-btn" style={{ backgroundColor:"#085294" }} data-event="backColor" data-value="#085294" title="" aria-label="Venice Blue" data-toggle="button" tabindex="-1" data-original-title="Venice Blue"></button><button type="button" className="note-color-btn" style="background-color:#311873" data-event="backColor" data-value="#311873" title="" aria-label="Meteorite" data-toggle="button" tabindex="-1" data-original-title="Meteorite"></button><button type="button" className="note-color-btn" style="background-color:#731842" data-event="backColor" data-value="#731842" title="" aria-label="Claret" data-toggle="button" tabindex="-1" data-original-title="Claret"></button></div><div className="note-color-row"><button type="button" className="note-color-btn" style="background-color:#630000" data-event="backColor" data-value="#630000" title="" aria-label="Rosewood" data-toggle="button" tabindex="-1" data-original-title="Rosewood"></button><button type="button" className="note-color-btn" style="background-color:#7B3900" data-event="backColor" data-value="#7B3900" title="" aria-label="Cinnamon" data-toggle="button" tabindex="-1" data-original-title="Cinnamon"></button><button type="button" className="note-color-btn" style="background-color:#846300" data-event="backColor" data-value="#846300" title="" aria-label="Olive" data-toggle="button" tabindex="-1" data-original-title="Olive"></button><button type="button" className="note-color-btn" style="background-color:#295218" data-event="backColor" data-value="#295218" title="" aria-label="Parsley" data-toggle="button" tabindex="-1" data-original-title="Parsley"></button><button type="button" className="note-color-btn" style="background-color:#083139" data-event="backColor" data-value="#083139" title="" aria-label="Tiber" data-toggle="button" tabindex="-1" data-original-title="Tiber"></button><button type="button" className="note-color-btn" style="background-color:#003163" data-event="backColor" data-value="#003163" title="" aria-label="Midnight Blue" data-toggle="button" tabindex="-1" data-original-title="Midnight Blue"></button><button type="button" className="note-color-btn" style="background-color:#21104A" data-event="backColor" data-value="#21104A" title="" aria-label="Valentino" data-toggle="button" tabindex="-1" data-original-title="Valentino"></button><button type="button" className="note-color-btn" style="background-color:#4A1031" data-event="backColor" data-value="#4A1031" title="" aria-label="Loulou" data-toggle="button" tabindex="-1" data-original-title="Loulou"></button></div></div></div>  <div>    <button type="button" className="note-color-select btn" data-event="openPalette" data-value="backColorPicker">Select    </button>    <input type="color" id="backColorPicker" className="note-btn note-color-select-btn" value="#FFFF00" data-event="backColorPalette">  </div>  <div className="note-holder-custom" id="backColorPalette" data-event="backColor"><div className="note-color-palette"><div className="note-color-row"><button type="button" className="note-color-btn" style="background-color:#FFFFFF" data-event="backColor" data-value="#FFFFFF" title="" aria-label="#FFFFFF" data-toggle="button" tabindex="-1" data-original-title="#FFFFFF"></button><button type="button" className="note-color-btn" style="background-color:#FFFFFF" data-event="backColor" data-value="#FFFFFF" title="" aria-label="#FFFFFF" data-toggle="button" tabindex="-1" data-original-title="#FFFFFF"></button><button type="button" className="note-color-btn" style="background-color:#FFFFFF" data-event="backColor" data-value="#FFFFFF" title="" aria-label="#FFFFFF" data-toggle="button" tabindex="-1" data-original-title="#FFFFFF"></button><button type="button" className="note-color-btn" style="background-color:#FFFFFF" data-event="backColor" data-value="#FFFFFF" title="" aria-label="#FFFFFF" data-toggle="button" tabindex="-1" data-original-title="#FFFFFF"></button><button type="button" className="note-color-btn" style="background-color:#FFFFFF" data-event="backColor" data-value="#FFFFFF" title="" aria-label="#FFFFFF" data-toggle="button" tabindex="-1" data-original-title="#FFFFFF"></button><button type="button" className="note-color-btn" style="background-color:#FFFFFF" data-event="backColor" data-value="#FFFFFF" title="" aria-label="#FFFFFF" data-toggle="button" tabindex="-1" data-original-title="#FFFFFF"></button><button type="button" className="note-color-btn" style="background-color:#FFFFFF" data-event="backColor" data-value="#FFFFFF" title="" aria-label="#FFFFFF" data-toggle="button" tabindex="-1" data-original-title="#FFFFFF"></button><button type="button" className="note-color-btn" style="background-color:#FFFFFF" data-event="backColor" data-value="#FFFFFF" title="" aria-label="#FFFFFF" data-toggle="button" tabindex="-1" data-original-title="#FFFFFF"></button></div></div></div></div><div className="note-palette">  <div className="note-palette-title">Foreground Color</div>  <div>    <button type="button" className="note-color-reset btn btn-light" data-event="removeFormat" data-value="foreColor">Reset to default    </button>  </div>  <div className="note-holder" data-event="foreColor"><div className="note-color-palette"><div className="note-color-row"><button type="button" className="note-color-btn" style="background-color:#000000" data-event="foreColor" data-value="#000000" title="" aria-label="Black" data-toggle="button" tabindex="-1" data-original-title="Black"></button><button type="button" className="note-color-btn" style="background-color:#424242" data-event="foreColor" data-value="#424242" title="" aria-label="Tundora" data-toggle="button" tabindex="-1" data-original-title="Tundora"></button><button type="button" className="note-color-btn" style="background-color:#636363" data-event="foreColor" data-value="#636363" title="" aria-label="Dove Gray" data-toggle="button" tabindex="-1" data-original-title="Dove Gray"></button><button type="button" className="note-color-btn" style="background-color:#9C9C94" data-event="foreColor" data-value="#9C9C94" title="" aria-label="Star Dust" data-toggle="button" tabindex="-1" data-original-title="Star Dust"></button><button type="button" className="note-color-btn" style="background-color:#CEC6CE" data-event="foreColor" data-value="#CEC6CE" title="" aria-label="Pale Slate" data-toggle="button" tabindex="-1" data-original-title="Pale Slate"></button><button type="button" className="note-color-btn" style="background-color:#EFEFEF" data-event="foreColor" data-value="#EFEFEF" title="" aria-label="Gallery" data-toggle="button" tabindex="-1" data-original-title="Gallery"></button><button type="button" className="note-color-btn" style="background-color:#F7F7F7" data-event="foreColor" data-value="#F7F7F7" title="" aria-label="Alabaster" data-toggle="button" tabindex="-1" data-original-title="Alabaster"></button><button type="button" className="note-color-btn" style="background-color:#FFFFFF" data-event="foreColor" data-value="#FFFFFF" title="" aria-label="White" data-toggle="button" tabindex="-1" data-original-title="White"></button></div><div className="note-color-row"><button type="button" className="note-color-btn" style="background-color:#FF0000" data-event="foreColor" data-value="#FF0000" title="" aria-label="Red" data-toggle="button" tabindex="-1" data-original-title="Red"></button><button type="button" className="note-color-btn" style="background-color:#FF9C00" data-event="foreColor" data-value="#FF9C00" title="" aria-label="Orange Peel" data-toggle="button" tabindex="-1" data-original-title="Orange Peel"></button><button type="button" className="note-color-btn" style="background-color:#FFFF00" data-event="foreColor" data-value="#FFFF00" title="" aria-label="Yellow" data-toggle="button" tabindex="-1" data-original-title="Yellow"></button><button type="button" className="note-color-btn" style="background-color:#00FF00" data-event="foreColor" data-value="#00FF00" title="" aria-label="Green" data-toggle="button" tabindex="-1" data-original-title="Green"></button><button type="button" className="note-color-btn" style="background-color:#00FFFF" data-event="foreColor" data-value="#00FFFF" title="" aria-label="Cyan" data-toggle="button" tabindex="-1" data-original-title="Cyan"></button><button type="button" className="note-color-btn" style="background-color:#0000FF" data-event="foreColor" data-value="#0000FF" title="" aria-label="Blue" data-toggle="button" tabindex="-1" data-original-title="Blue"></button><button type="button" className="note-color-btn" style="background-color:#9C00FF" data-event="foreColor" data-value="#9C00FF" title="" aria-label="Electric Violet" data-toggle="button" tabindex="-1" data-original-title="Electric Violet"></button><button type="button" className="note-color-btn" style="background-color:#FF00FF" data-event="foreColor" data-value="#FF00FF" title="" aria-label="Magenta" data-toggle="button" tabindex="-1" data-original-title="Magenta"></button></div><div className="note-color-row"><button type="button" className="note-color-btn" style="background-color:#F7C6CE" data-event="foreColor" data-value="#F7C6CE" title="" aria-label="Azalea" data-toggle="button" tabindex="-1" data-original-title="Azalea"></button><button type="button" className="note-color-btn" style="background-color:#FFE7CE" data-event="foreColor" data-value="#FFE7CE" title="" aria-label="Karry" data-toggle="button" tabindex="-1" data-original-title="Karry"></button><button type="button" className="note-color-btn" style="background-color:#FFEFC6" data-event="foreColor" data-value="#FFEFC6" title="" aria-label="Egg White" data-toggle="button" tabindex="-1" data-original-title="Egg White"></button><button type="button" className="note-color-btn" style="background-color:#D6EFD6" data-event="foreColor" data-value="#D6EFD6" title="" aria-label="Zanah" data-toggle="button" tabindex="-1" data-original-title="Zanah"></button><button type="button" className="note-color-btn" style="background-color:#CEDEE7" data-event="foreColor" data-value="#CEDEE7" title="" aria-label="Botticelli" data-toggle="button" tabindex="-1" data-original-title="Botticelli"></button><button type="button" className="note-color-btn" style="background-color:#CEE7F7" data-event="foreColor" data-value="#CEE7F7" title="" aria-label="Tropical Blue" data-toggle="button" tabindex="-1" data-original-title="Tropical Blue"></button><button type="button" className="note-color-btn" style="background-color:#D6D6E7" data-event="foreColor" data-value="#D6D6E7" title="" aria-label="Mischka" data-toggle="button" tabindex="-1" data-original-title="Mischka"></button><button type="button" className="note-color-btn" style="background-color:#E7D6DE" data-event="foreColor" data-value="#E7D6DE" title="" aria-label="Twilight" data-toggle="button" tabindex="-1" data-original-title="Twilight"></button></div><div className="note-color-row"><button type="button" className="note-color-btn" style="background-color:#E79C9C" data-event="foreColor" data-value="#E79C9C" title="" aria-label="Tonys Pink" data-toggle="button" tabindex="-1" data-original-title="Tonys Pink"></button><button type="button" className="note-color-btn" style="background-color:#FFC69C" data-event="foreColor" data-value="#FFC69C" title="" aria-label="Peach Orange" data-toggle="button" tabindex="-1" data-original-title="Peach Orange"></button><button type="button" className="note-color-btn" style="background-color:#FFE79C" data-event="foreColor" data-value="#FFE79C" title="" aria-label="Cream Brulee" data-toggle="button" tabindex="-1" data-original-title="Cream Brulee"></button><button type="button" className="note-color-btn" style="background-color:#B5D6A5" data-event="foreColor" data-value="#B5D6A5" title="" aria-label="Sprout" data-toggle="button" tabindex="-1" data-original-title="Sprout"></button><button type="button" className="note-color-btn" style="background-color:#A5C6CE" data-event="foreColor" data-value="#A5C6CE" title="" aria-label="Casper" data-toggle="button" tabindex="-1" data-original-title="Casper"></button><button type="button" className="note-color-btn" style="background-color:#9CC6EF" data-event="foreColor" data-value="#9CC6EF" title="" aria-label="Perano" data-toggle="button" tabindex="-1" data-original-title="Perano"></button><button type="button" className="note-color-btn" style="background-color:#B5A5D6" data-event="foreColor" data-value="#B5A5D6" title="" aria-label="Cold Purple" data-toggle="button" tabindex="-1" data-original-title="Cold Purple"></button><button type="button" className="note-color-btn" style="background-color:#D6A5BD" data-event="foreColor" data-value="#D6A5BD" title="" aria-label="Careys Pink" data-toggle="button" tabindex="-1" data-original-title="Careys Pink"></button></div><div className="note-color-row"><button type="button" className="note-color-btn" style="background-color:#E76363" data-event="foreColor" data-value="#E76363" title="" aria-label="Mandy" data-toggle="button" tabindex="-1" data-original-title="Mandy"></button><button type="button" className="note-color-btn" style="background-color:#F7AD6B" data-event="foreColor" data-value="#F7AD6B" title="" aria-label="Rajah" data-toggle="button" tabindex="-1" data-original-title="Rajah"></button><button type="button" className="note-color-btn" style="background-color:#FFD663" data-event="foreColor" data-value="#FFD663" title="" aria-label="Dandelion" data-toggle="button" tabindex="-1" data-original-title="Dandelion"></button><button type="button" className="note-color-btn" style="background-color:#94BD7B" data-event="foreColor" data-value="#94BD7B" title="" aria-label="Olivine" data-toggle="button" tabindex="-1" data-original-title="Olivine"></button><button type="button" className="note-color-btn" style="background-color:#73A5AD" data-event="foreColor" data-value="#73A5AD" title="" aria-label="Gulf Stream" data-toggle="button" tabindex="-1" data-original-title="Gulf Stream"></button><button type="button" className="note-color-btn" style="background-color:#6BADDE" data-event="foreColor" data-value="#6BADDE" title="" aria-label="Viking" data-toggle="button" tabindex="-1" data-original-title="Viking"></button><button type="button" className="note-color-btn" style="background-color:#8C7BC6" data-event="foreColor" data-value="#8C7BC6" title="" aria-label="Blue Marguerite" data-toggle="button" tabindex="-1" data-original-title="Blue Marguerite"></button><button type="button" className="note-color-btn" style="background-color:#C67BA5" data-event="foreColor" data-value="#C67BA5" title="" aria-label="Puce" data-toggle="button" tabindex="-1" data-original-title="Puce"></button></div><div className="note-color-row"><button type="button" className="note-color-btn" style="background-color:#CE0000" data-event="foreColor" data-value="#CE0000" title="" aria-label="Guardsman Red" data-toggle="button" tabindex="-1" data-original-title="Guardsman Red"></button><button type="button" className="note-color-btn" style="background-color:#E79439" data-event="foreColor" data-value="#E79439" title="" aria-label="Fire Bush" data-toggle="button" tabindex="-1" data-original-title="Fire Bush"></button><button type="button" className="note-color-btn" style="background-color:#EFC631" data-event="foreColor" data-value="#EFC631" title="" aria-label="Golden Dream" data-toggle="button" tabindex="-1" data-original-title="Golden Dream"></button><button type="button" className="note-color-btn" style="background-color:#6BA54A" data-event="foreColor" data-value="#6BA54A" title="" aria-label="Chelsea Cucumber" data-toggle="button" tabindex="-1" data-original-title="Chelsea Cucumber"></button><button type="button" className="note-color-btn" style="background-color:#4A7B8C" data-event="foreColor" data-value="#4A7B8C" title="" aria-label="Smalt Blue" data-toggle="button" tabindex="-1" data-original-title="Smalt Blue"></button><button type="button" className="note-color-btn" style="background-color:#3984C6" data-event="foreColor" data-value="#3984C6" title="" aria-label="Boston Blue" data-toggle="button" tabindex="-1" data-original-title="Boston Blue"></button><button type="button" className="note-color-btn" style="background-color:#634AA5" data-event="foreColor" data-value="#634AA5" title="" aria-label="Butterfly Bush" data-toggle="button" tabindex="-1" data-original-title="Butterfly Bush"></button><button type="button" className="note-color-btn" style="background-color:#A54A7B" data-event="foreColor" data-value="#A54A7B" title="" aria-label="Cadillac" data-toggle="button" tabindex="-1" data-original-title="Cadillac"></button></div><div className="note-color-row"><button type="button" className="note-color-btn" style="background-color:#9C0000" data-event="foreColor" data-value="#9C0000" title="" aria-label="Sangria" data-toggle="button" tabindex="-1" data-original-title="Sangria"></button><button type="button" className="note-color-btn" style="background-color:#B56308" data-event="foreColor" data-value="#B56308" title="" aria-label="Mai Tai" data-toggle="button" tabindex="-1" data-original-title="Mai Tai"></button><button type="button" className="note-color-btn" style="background-color:#BD9400" data-event="foreColor" data-value="#BD9400" title="" aria-label="Buddha Gold" data-toggle="button" tabindex="-1" data-original-title="Buddha Gold"></button><button type="button" className="note-color-btn" style="background-color:#397B21" data-event="foreColor" data-value="#397B21" title="" aria-label="Forest Green" data-toggle="button" tabindex="-1" data-original-title="Forest Green"></button><button type="button" className="note-color-btn" style="background-color:#104A5A" data-event="foreColor" data-value="#104A5A" title="" aria-label="Eden" data-toggle="button" tabindex="-1" data-original-title="Eden"></button><button type="button" className="note-color-btn" style="background-color:#085294" data-event="foreColor" data-value="#085294" title="" aria-label="Venice Blue" data-toggle="button" tabindex="-1" data-original-title="Venice Blue"></button><button type="button" className="note-color-btn" style="background-color:#311873" data-event="foreColor" data-value="#311873" title="" aria-label="Meteorite" data-toggle="button" tabindex="-1" data-original-title="Meteorite"></button><button type="button" className="note-color-btn" style="background-color:#731842" data-event="foreColor" data-value="#731842" title="" aria-label="Claret" data-toggle="button" tabindex="-1" data-original-title="Claret"></button></div><div className="note-color-row"><button type="button" className="note-color-btn" style="background-color:#630000" data-event="foreColor" data-value="#630000" title="" aria-label="Rosewood" data-toggle="button" tabindex="-1" data-original-title="Rosewood"></button><button type="button" className="note-color-btn" style="background-color:#7B3900" data-event="foreColor" data-value="#7B3900" title="" aria-label="Cinnamon" data-toggle="button" tabindex="-1" data-original-title="Cinnamon"></button><button type="button" className="note-color-btn" style="background-color:#846300" data-event="foreColor" data-value="#846300" title="" aria-label="Olive" data-toggle="button" tabindex="-1" data-original-title="Olive"></button><button type="button" className="note-color-btn" style="background-color:#295218" data-event="foreColor" data-value="#295218" title="" aria-label="Parsley" data-toggle="button" tabindex="-1" data-original-title="Parsley"></button><button type="button" className="note-color-btn" style="background-color:#083139" data-event="foreColor" data-value="#083139" title="" aria-label="Tiber" data-toggle="button" tabindex="-1" data-original-title="Tiber"></button><button type="button" className="note-color-btn" style="background-color:#003163" data-event="foreColor" data-value="#003163" title="" aria-label="Midnight Blue" data-toggle="button" tabindex="-1" data-original-title="Midnight Blue"></button><button type="button" className="note-color-btn" style="background-color:#21104A" data-event="foreColor" data-value="#21104A" title="" aria-label="Valentino" data-toggle="button" tabindex="-1" data-original-title="Valentino"></button><button type="button" className="note-color-btn" style="background-color:#4A1031" data-event="foreColor" data-value="#4A1031" title="" aria-label="Loulou" data-toggle="button" tabindex="-1" data-original-title="Loulou"></button></div></div></div>  <div>    <button type="button" className="note-color-select btn" data-event="openPalette" data-value="foreColorPicker">Select    </button>    <input type="color" id="foreColorPicker" className="note-btn note-color-select-btn" value="#000000" data-event="foreColorPalette">  <div className="note-holder-custom" id="foreColorPalette" data-event="foreColor"><div className="note-color-palette"><div className="note-color-row"><button type="button" className="note-color-btn" style="background-color:#FFFFFF" data-event="foreColor" data-value="#FFFFFF" title="" aria-label="#FFFFFF" data-toggle="button" tabindex="-1" data-original-title="#FFFFFF"></button><button type="button" className="note-color-btn" style="background-color:#FFFFFF" data-event="foreColor" data-value="#FFFFFF" title="" aria-label="#FFFFFF" data-toggle="button" tabindex="-1" data-original-title="#FFFFFF"></button><button type="button" className="note-color-btn" style="background-color:#FFFFFF" data-event="foreColor" data-value="#FFFFFF" title="" aria-label="#FFFFFF" data-toggle="button" tabindex="-1" data-original-title="#FFFFFF"></button><button type="button" className="note-color-btn" style="background-color:#FFFFFF" data-event="foreColor" data-value="#FFFFFF" title="" aria-label="#FFFFFF" data-toggle="button" tabindex="-1" data-original-title="#FFFFFF"></button><button type="button" className="note-color-btn" style="background-color:#FFFFFF" data-event="foreColor" data-value="#FFFFFF" title="" aria-label="#FFFFFF" data-toggle="button" tabindex="-1" data-original-title="#FFFFFF"></button><button type="button" className="note-color-btn" style="background-color:#FFFFFF" data-event="foreColor" data-value="#FFFFFF" title="" aria-label="#FFFFFF" data-toggle="button" tabindex="-1" data-original-title="#FFFFFF"></button><button type="button" className="note-color-btn" style="background-color:#FFFFFF" data-event="foreColor" data-value="#FFFFFF" title="" aria-label="#FFFFFF" data-toggle="button" tabindex="-1" data-original-title="#FFFFFF"></button><button type="button" className="note-color-btn" style="background-color:#FFFFFF" data-event="foreColor" data-value="#FFFFFF" title="" aria-label="#FFFFFF" data-toggle="button" tabindex="-1" data-original-title="#FFFFFF"></button></div></div></div></div></div></div></div></div><div className="note-btn-group btn-group note-para"><button type="button" className="note-btn btn btn-light btn-sm" role="button" tabindex="-1" title="" aria-label="Unordered list (CTRL+SHIFT+NUM7)" data-original-title="Unordered list (CTRL+SHIFT+NUM7)"><i className="note-icon-unorderedlist"></i></button><button type="button" className="note-btn btn btn-light btn-sm" role="button" tabindex="-1" title="" aria-label="Ordered list (CTRL+SHIFT+NUM8)" data-original-title="Ordered list (CTRL+SHIFT+NUM8)"><i className="note-icon-orderedlist"></i></button><div className="note-btn-group btn-group"><button type="button" className="note-btn btn btn-light btn-sm dropdown-toggle" role="button" tabindex="-1" data-toggle="dropdown" title="" aria-label="Paragraph" data-original-title="Paragraph"><i className="note-icon-align-left"></i></button><div className="dropdown-menu" role="list"><div className="note-btn-group btn-group note-align"><button type="button" className="note-btn btn btn-light btn-sm" role="button" tabindex="-1" title="" aria-label="Align left (CTRL+SHIFT+L)" data-original-title="Align left (CTRL+SHIFT+L)"><i className="note-icon-align-left"></i></button><button type="button" className="note-btn btn btn-light btn-sm" role="button" tabindex="-1" title="" aria-label="Align center (CTRL+SHIFT+E)" data-original-title="Align center (CTRL+SHIFT+E)"><i className="note-icon-align-center"></i></button><button type="button" className="note-btn btn btn-light btn-sm" role="button" tabindex="-1" title="" aria-label="Align right (CTRL+SHIFT+R)" data-original-title="Align right (CTRL+SHIFT+R)"><i className="note-icon-align-right"></i></button><button type="button" className="note-btn btn btn-light btn-sm" role="button" tabindex="-1" title="" aria-label="Justify full (CTRL+SHIFT+J)" data-original-title="Justify full (CTRL+SHIFT+J)"><i className="note-icon-align-justify"></i></button></div><div className="note-btn-group btn-group note-list"><button type="button" className="note-btn btn btn-light btn-sm" role="button" tabindex="-1" title="" aria-label="Outdent (CTRL+[)" data-original-title="Outdent (CTRL+[)"><i className="note-icon-align-outdent"></i></button><button type="button" className="note-btn btn btn-light btn-sm" role="button" tabindex="-1" title="" aria-label="Indent (CTRL+])" data-original-title="Indent (CTRL+])"><i className="note-icon-align-indent"></i></button></div></div></div></div><div className="note-btn-group btn-group note-table"><div className="note-btn-group btn-group"><button type="button" className="note-btn btn btn-light btn-sm dropdown-toggle" role="button" tabindex="-1" data-toggle="dropdown" title="" aria-label="Table" data-original-title="Table"><i className="note-icon-table"></i></button><div className="dropdown-menu note-table" role="list" aria-label="Table"><div className="note-dimension-picker">  <div className="note-dimension-picker-mousecatcher" data-event="insertTable" data-value="1x1" style="width: 10em; height: 10em;"></div>  <div className="note-dimension-picker-highlighted"></div>  <div className="note-dimension-picker-unhighlighted"></div></div><div className="note-dimension-display">1 x 1</div></div></div></div><div className="note-btn-group btn-group note-insert"><button type="button" className="note-btn btn btn-light btn-sm" role="button" tabindex="-1" title="" aria-label="Link (CTRL+K)" data-original-title="Link (CTRL+K)"><i className="note-icon-link"></i></button><button type="button" className="note-btn btn btn-light btn-sm" role="button" tabindex="-1" title="" aria-label="Picture" data-original-title="Picture"><i className="note-icon-picture"></i></button><button type="button" className="note-btn btn btn-light btn-sm" role="button" tabindex="-1" title="" aria-label="Video" data-original-title="Video"><i className="note-icon-video"></i></button></div><div className="note-btn-group btn-group note-view"><button type="button" className="note-btn btn btn-light btn-sm btn-fullscreen" role="button" tabindex="-1" title="" aria-label="Full Screen" data-original-title="Full Screen"><i className="note-icon-arrows-alt"></i></button><button type="button" className="note-btn btn btn-light btn-sm btn-codeview" role="button" tabindex="-1" title="" aria-label="Code View" data-original-title="Code View"><i className="note-icon-code"></i></button><button type="button" className="note-btn btn btn-light btn-sm" role="button" tabindex="-1" title="" aria-label="Help" data-original-title="Help"><i className="note-icon-question"></i></button></div></div><div className="note-editing-area"><div className="note-handle"><div className="note-control-selection"><div className="note-control-selection-bg"></div><div className="note-control-holder note-control-nw"></div><div className="note-control-holder note-control-ne"></div><div className="note-control-holder note-control-sw"></div><div className="note-control-sizing note-control-se"></div><div className="note-control-selection-info"></div></div></div><textarea className="note-codable" role="textbox" aria-multiline="true"></textarea><div className="note-editable card-block" contenteditable="true" role="textbox" aria-multiline="true" style="height: 230px;"><p><br></p></div></div><output className="note-status-output" aria-live="polite"></output><div className="note-statusbar" role="status">  <output className="note-status-output" aria-live="polite"></output>  <div className="note-resizebar" role="seperator" aria-orientation="horizontal" aria-label="Resize">    <div className="note-icon-bar"></div>    <div className="note-icon-bar"></div>    <div className="note-icon-bar"></div>  </div></div><div className="modal link-dialog" aria-hidden="false" tabindex="-1" role="dialog" aria-label="Insert Link"><div className="modal-dialog">  <div className="modal-content">    <div className="modal-header">      <h4 className="modal-title">Insert Link</h4>      <button type="button" className="close" data-dismiss="modal" aria-label="Close" aria-hidden="true">×</button>    </div>    <div className="modal-body"><div className="form-group note-form-group"><label className="note-form-label">Text to display</label><input className="note-link-text form-control note-form-control note-input" type="text"></div><div className="form-group note-form-group"><label className="note-form-label">To what URL should this link go?</label><input className="note-link-url form-control note-form-control note-input" type="text" value="http://"></div><div className="form-check sn-checkbox-open-in-new-window"><label className="form-check-label"> <input role="checkbox" type="checkbox" className="form-check-input" checked="" aria-label="Open in new window" aria-checked="true"> Open in new window</label></div></div>    <div className="modal-footer"><input type="button" href="#" className="btn btn-primary note-btn note-btn-primary note-link-btn" value="Insert Link" disabled=""></div>  </div></div></div><div className="modal" aria-hidden="false" tabindex="-1" role="dialog" aria-label="Insert Image"><div className="modal-dialog">  <div className="modal-content">    <div className="modal-header">      <h4 className="modal-title">Insert Image</h4>      <button type="button" className="close" data-dismiss="modal" aria-label="Close" aria-hidden="true">×</button>    </div>    <div className="modal-body"><div className="form-group note-form-group note-group-select-from-files"><label className="note-form-label"></label><input className="note-image-input note-form-control note-input" type="hidden" name="files" accept="image/*" multiple="multiple"></div><div className="form-group note-group-image-url" style="overflow:auto;"><label className="note-form-label">Image URL</label><input className="note-image-url form-control note-form-control note-input  col-md-12" type="text"></div></div>    <div className="modal-footer"><input type="button" href="#" className="btn btn-primary note-btn note-btn-primary note-image-btn" value="Insert Image" disabled=""></div>  </div></div></div><div className="modal" aria-hidden="false" tabindex="-1" role="dialog" aria-label="Insert Video"><div className="modal-dialog">  <div className="modal-content">    <div className="modal-header">      <h4 className="modal-title">Insert Video</h4>      <button type="button" className="close" data-dismiss="modal" aria-label="Close" aria-hidden="true">×</button>    </div>    <div className="modal-body"><div className="form-group note-form-group row-fluid"><label className="note-form-label">Video URL <small className="text-muted">(YouTube, Vimeo, Vine, Instagram, DailyMotion or Youku)</small></label><input className="note-video-url form-control note-form-control note-input" type="text"></div></div>    <div className="modal-footer"><input type="button" href="#" className="btn btn-primary note-btn note-btn-primary note-video-btn" value="Insert Video" disabled=""></div>  </div></div></div><div className="modal" aria-hidden="false" tabindex="-1" role="dialog" aria-label="Help"><div className="modal-dialog">  <div className="modal-content">    <div className="modal-header">      <h4 className="modal-title">Help</h4>      <button type="button" className="close" data-dismiss="modal" aria-label="Close" aria-hidden="true">×</button>    </div>    <div className="modal-body" style="max-height: 300px; overflow: scroll;"><div className="help-list-item"></div><label style="width: 180px; margin-right: 10px;"><kbd>ENTER</kbd></label><span>Insert Paragraph</span><div className="help-list-item"></div><label style="width: 180px; margin-right: 10px;"><kbd>CTRL+Z</kbd></label><span>Undoes the last command</span><div className="help-list-item"></div><label style="width: 180px; margin-right: 10px;"><kbd>CTRL+Y</kbd></label><span>Redoes the last command</span><div className="help-list-item"></div><label style="width: 180px; margin-right: 10px;"><kbd>TAB</kbd></label><span>Tab</span><div className="help-list-item"></div><label style="width: 180px; margin-right: 10px;"><kbd>SHIFT+TAB</kbd></label><span>Untab</span><div className="help-list-item"></div><label style="width: 180px; margin-right: 10px;"><kbd>CTRL+B</kbd></label><span>Set a bold style</span><div className="help-list-item"></div><label style="width: 180px; margin-right: 10px;"><kbd>CTRL+I</kbd></label><span>Set a italic style</span><div className="help-list-item"></div><label style="width: 180px; margin-right: 10px;"><kbd>CTRL+U</kbd></label><span>Set a underline style</span><div className="help-list-item"></div><label style="width: 180px; margin-right: 10px;"><kbd>CTRL+SHIFT+S</kbd></label><span>Set a strikethrough style</span><div className="help-list-item"></div><label style="width: 180px; margin-right: 10px;"><kbd>CTRL+BACKSLASH</kbd></label><span>Clean a style</span><div className="help-list-item"></div><label style="width: 180px; margin-right: 10px;"><kbd>CTRL+SHIFT+L</kbd></label><span>Set left align</span><div className="help-list-item"></div><label style="width: 180px; margin-right: 10px;"><kbd>CTRL+SHIFT+E</kbd></label><span>Set center align</span><div className="help-list-item"></div><label style="width: 180px; margin-right: 10px;"><kbd>CTRL+SHIFT+R</kbd></label><span>Set right align</span><div className="help-list-item"></div><label style="width: 180px; margin-right: 10px;"><kbd>CTRL+SHIFT+J</kbd></label><span>Set full align</span><div className="help-list-item"></div><label style="width: 180px; margin-right: 10px;"><kbd>CTRL+SHIFT+NUM7</kbd></label><span>Toggle unordered list</span><div className="help-list-item"></div><label style="width: 180px; margin-right: 10px;"><kbd>CTRL+SHIFT+NUM8</kbd></label><span>Toggle ordered list</span><div className="help-list-item"></div><label style="width: 180px; margin-right: 10px;"><kbd>CTRL+LEFTBRACKET</kbd></label><span>Outdent on current paragraph</span><div className="help-list-item"></div><label style="width: 180px; margin-right: 10px;"><kbd>CTRL+RIGHTBRACKET</kbd></label><span>Indent on current paragraph</span><div className="help-list-item"></div><label style="width: 180px; margin-right: 10px;"><kbd>CTRL+NUM0</kbd></label><span>Change current block's format as a paragraph(P tag)</span><div className="help-list-item"></div><label style="width: 180px; margin-right: 10px;"><kbd>CTRL+NUM1</kbd></label><span>Change current block's format as H1</span><div className="help-list-item"></div><label style="width: 180px; margin-right: 10px;"><kbd>CTRL+NUM2</kbd></label><span>Change current block's format as H2</span><div className="help-list-item"></div><label style="width: 180px; margin-right: 10px;"><kbd>CTRL+NUM3</kbd></label><span>Change current block's format as H3</span><div className="help-list-item"></div><label style="width: 180px; margin-right: 10px;"><kbd>CTRL+NUM4</kbd></label><span>Change current block's format as H4</span><div className="help-list-item"></div><label style="width: 180px; margin-right: 10px;"><kbd>CTRL+NUM5</kbd></label><span>Change current block's format as H5</span><div className="help-list-item"></div><label style="width: 180px; margin-right: 10px;"><kbd>CTRL+NUM6</kbd></label><span>Change current block's format as H6</span><div className="help-list-item"></div><label style="width: 180px; margin-right: 10px;"><kbd>CTRL+ENTER</kbd></label><span>Insert horizontal rule</span><div className="help-list-item"></div><label style="width: 180px; margin-right: 10px;"><kbd>CTRL+K</kbd></label><span>Show Link Dialog</span></div>    <div className="modal-footer"><p className="text-center"><a href="http://summernote.org/" target="_blank">Summernote 0.8.11</a> · <a href="https://github.com/summernote/summernote" target="_blank">Project</a> · <a href="https://github.com/summernote/summernote/issues" target="_blank">Issues</a></p></div>  </div></div></div></div>
                                                    </div>
                                                </div>
                                                <div className="form-group row mb-3">
                                                    <label className="col-md-2 col-form-label" for="sub_category_id">Category<span className="required">*</span></label>
                                                    <div className="col-md-10">
                                                        <select className="form-control select2 select2-hidden-accessible" data-toggle="select2" name="sub_category_id" id="sub_category_id" required="" data-select2-id="sub_category_id" tabindex="-1" aria-hidden="true">
                                                            <option value="" data-select2-id="2">Select a category</option>
                                                                                                                            <optgroup label="ARTS &amp; HUMANITIES ">
                                                                                                                                        <option value="69">Education</option>
                                                                                                                                    <option value="70">History</option>
                                                                                                                                    <option value="71">Political Science</option>
                                                                                                                                    <option value="72">Sociology</option>
                                                                                                                                    <option value="73">Geography</option>
                                                                                                                                    <option value="76">Media and Journalism</option>
                                                                                                                                    <option value="77">Architecture</option>
                                                                                                                            </optgroup>
                                                                                                                        <optgroup label="BUSINESS">
                                                                                                                                        <option value="86">Business Process Management </option>
                                                                                                                                    <option value="124">Service Management</option>
                                                                                                                                    <option value="125">Supply Chain Management</option>
                                                                                                                                    <option value="126">Sales and Marketing Management</option>
                                                                                                                                    <option value="127">Risk Management</option>
                                                                                                                                    <option value="128">Customer Service</option>
                                                                                                                                    <option value="129">Business Leadership</option>
                                                                                                                                    <option value="130">Human Resources</option>
                                                                                                                                    <option value="131">Finance and Banking</option>
                                                                                                                                    <option value="132">Accounting</option>
                                                                                                                            </optgroup>
                                                                                                                        <optgroup label="HEALTH CARE">
                                                                                                                                        <option value="88">Nursing </option>
                                                                                                                                    <option value="89">Disease and Disorders</option>
                                                                                                                                    <option value="90">Nutrition</option>
                                                                                                                                    <option value="91">Caregiving</option>
                                                                                                                                    <option value="92">Pharmacology</option>
                                                                                                                            </optgroup>
                                                                                                                        <optgroup label="LAW &amp; SOCIAL SCIENCES">
                                                                                                                                        <option value="95">Law</option>
                                                                                                                                    <option value="96">Economics</option>
                                                                                                                                    <option value="97">Psychology</option>
                                                                                                                            </optgroup>
                                                                                                                        <optgroup label="INFORMATION TECHNOLOGY">
                                                                                                                                        <option value="100">Network and security</option>
                                                                                                                                    <option value="101">IT Management</option>
                                                                                                                                    <option value="102">Digital Marketing</option>
                                                                                                                                    <option value="103">Web Site and Application Development</option>
                                                                                                                            </optgroup>
                                                                                                                        <optgroup label="MATHEMATICS ">
                                                                                                                                        <option value="105">SS1 Mathematics</option>
                                                                                                                                    <option value="106">SS2 Mathematics</option>
                                                                                                                                    <option value="107">SS3 Mathematics</option>
                                                                                                                            </optgroup>
                                                                                                                        <optgroup label="ENGINEERING AND PHYSICAL SCIENCES">
                                                                                                                                        <option value="110">Computer Science and Engineering</option>
                                                                                                                                    <option value="111">Electrical Engineering </option>
                                                                                                                                    <option value="112">Mechanical Engineering</option>
                                                                                                                                    <option value="113">Chemical Engineering</option>
                                                                                                                                    <option value="114">Civil Engineering</option>
                                                                                                                                    <option value="116">Biology </option>
                                                                                                                                    <option value="117">Physics </option>
                                                                                                                                    <option value="118">Chemistry</option>
                                                                                                                                    <option value="119">Environmental Studies</option>
                                                                                                                                    <option value="120">Agricultural Science</option>
                                                                                                                            </optgroup>
                                                                                                                        <optgroup label="LANGUAGE ">
                                                                                                                                        <option value="134">English</option>
                                                                                                                                    <option value="135">Yoruba</option>
                                                                                                                                    <option value="136">Igbo</option>
                                                                                                                                    <option value="137">Hausa</option>
                                                                                                                                    <option value="138">Chinese</option>
                                                                                                                                    <option value="139">French</option>
                                                                                                                            </optgroup>
                                                                                                            </select><span className="select2 select2-container select2-container--default" 
                                                                                                            dir="ltr" data-select2-id="1" style={{width: "auto"}}><span className="selection"><span className="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-labelledby="select2-sub_category_id-container"><span className="select2-selection__rendered" id="select2-sub_category_id-container" role="textbox" aria-readonly="true" title="Select a category">Select a category</span><span className="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span className="dropdown-wrapper" aria-hidden="true"></span></span>
                                                    <small className="text-muted">Select sub category</small>
                                                </div>
                                            </div>
                                            <div className="form-group row mb-3">
                                                <label className="col-md-2 col-form-label" for="level">Level</label>
                                                <div className="col-md-10">
                                                    <select className="form-control select2 select2-hidden-accessible" data-toggle="select2" name="level" id="level" data-select2-id="level" tabindex="-1" aria-hidden="true">
                                                        <option value="beginner" data-select2-id="4">Beginner</option>
                                                        <option value="advanced">Advanced</option>
                                                        <option value="intermediate">Intermediate</option>
                                                    </select><span className="select2 select2-container select2-container--default" dir="ltr" data-select2-id="3" style={{width: "auto"}}><span className="selection"><span className="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-labelledby="select2-level-container"><span className="select2-selection__rendered" id="select2-level-container" role="textbox" aria-readonly="true" title="Beginner">Beginner</span><span className="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span className="dropdown-wrapper" aria-hidden="true"></span></span>
                                                </div>
                                            </div>
                                            <div className="form-group row mb-3">
                                                <label className="col-md-2 col-form-label" for="language_made_in">Language made in</label>
                                                <div className="col-md-10">
                                                    <select className="form-control select2 select2-hidden-accessible" data-toggle="select2" name="language_made_in" id="language_made_in" data-select2-id="language_made_in" tabindex="-1" aria-hidden="true">
                                                                                                                    <option value="english" data-select2-id="6">English</option>
                                                                                                            </select><span className="select2 select2-container select2-container--default" dir="ltr" data-select2-id="5" style={{width: "auto"}}><span className="selection"><span className="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-labelledby="select2-language_made_in-container"><span className="select2-selection__rendered" id="select2-language_made_in-container" role="textbox" aria-readonly="true" title="English">English</span><span className="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span className="dropdown-wrapper" aria-hidden="true"></span></span>
                                                </div>
                                            </div>
                                            <div className="form-group row mb-3">
                                                <div className="offset-md-2 col-md-10">
                                                    <div className="custom-control custom-checkbox">
                                                        <input type="checkbox" className="custom-control-input" name="is_top_course" id="is_top_course" value="1">
                                                        <label className="custom-control-label" for="is_top_course">Check if this course is top course</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> 
                                    </div> 
                                </div> 

                                <div className="tab-pane" id="requirements">
                                    <div className="row justify-content-center">
                                        <div className="col-xl-8">
                                            <div className="form-group row mb-3">
                                                <label className="col-md-2 col-form-label" for="requirements">Requirements</label>
                                                <div className="col-md-10">
                                                    <div id="requirement_area">
                                                        <div className="d-flex mt-2">
                                                            <div className="flex-grow-1 px-3">
                                                                <div className="form-group">
                                                                    <input type="text" className="form-control" name="requirements[]" id="requirements" placeholder="Provide requirements">
                                                                </div>
                                                            </div>
                                                            <div className="">
                                                                <button type="button" className="btn btn-success btn-sm"  name="button" onclick="appendRequirement()"> <i className="fa fa-plus"></i> </button>
                                                            </div>
                                                        </div>
                                                        <div id="blank_requirement_field" style={{display: "none"}}>
                                                            <div className="d-flex mt-2">
                                                                <div className="flex-grow-1 px-3">
                                                                    <div className="form-group">
                                                                        <input type="text" className="form-control" name="requirements[]" id="requirements" placeholder="Provide requirements">
                                                                    </div>
                                                                </div>
                                                                <div className="">
                                                                    <button type="button" className="btn btn-danger btn-sm" style={{marginTop: "0px"}} name="button" onclick="removeRequirement(this)"> <i className="fa fa-minus"></i> </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="tab-pane" id="outcomes">
                                    <div className="row justify-content-center">
                                        <div className="col-xl-8">
                                            <div className="form-group row mb-3">
                                                <label className="col-md-2 col-form-label" for="outcomes">Outcomes</label>
                                                <div className="col-md-10">
                                                    <div id="outcomes_area">
                                                        <div className="d-flex mt-2">
                                                            <div className="flex-grow-1 px-3">
                                                                <div className="form-group">
                                                                    <input type="text" className="form-control" name="outcomes[]" id="outcomes" placeholder="Provide outcomes">
                                                                </div>
                                                            </div>
                                                            <div className="">
                                                                <button type="button" className="btn btn-success btn-sm" name="button" onclick="appendOutcome()"> <i className="fa fa-plus"></i> </button>
                                                            </div>
                                                        </div>
                                                        <div id="blank_outcome_field" style={{display: "none"}}>
                                                            <div className="d-flex mt-2">
                                                                <div className="flex-grow-1 px-3">
                                                                    <div className="form-group">
                                                                        <input type="text" className="form-control" name="outcomes[]" id="outcomes" placeholder="Provide outcomes">
                                                                    </div>
                                                                </div>
                                                                <div className="">
                                                                    <button type="button" className="btn btn-danger btn-sm" style={{marginTop: "0px"}} name="button" onclick="removeOutcome(this)"> <i className="fa fa-minus"></i> </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="tab-pane" id="pricing">
                                    <div className="row justify-content-center">
                                        <div className="col-xl-8">
                                            <div className="form-group row mb-3">
                                                <div className="offset-md-2 col-md-10">
                                                    <div className="custom-control custom-checkbox">
                                                        <input type="checkbox" className="custom-control-input" name="is_free_course" id="is_free_course" value="1" onclick="togglePriceFields(this.id)">
                                                        <label className="custom-control-label" for="is_free_course">Check if this is a free course</label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="paid-course-stuffs">
                                                <div className="form-group row mb-3">
                                                    <label className="col-md-2 col-form-label" for="price">Course price (₦)</label>
                                                    <div className="col-md-10">
                                                        <input type="number" className="form-control" id="price" name="price" placeholder="Enter course course price" min="0">
                                                    </div>
                                                </div>

                                                <div className="form-group row mb-3">
                                                    <div className="offset-md-2 col-md-10">
                                                        <div className="custom-control custom-checkbox">
                                                            <input type="checkbox" className="custom-control-input" name="discount_flag" id="discount_flag" value="1">
                                                            <label className="custom-control-label" for="discount_flag">Check if this course has discount</label>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="form-group row mb-3">
                                                    <label className="col-md-2 col-form-label" for="discounted_price">Discounted price (₦)</label>
                                                    <div className="col-md-10">
                                                        <input type="number" className="form-control" name="discounted_price" id="discounted_price" onkeyup="calculateDiscountPercentage(this.value)" min="0">
                                                        <small className="text-muted">This course has <span id="discounted_percentage" className="text-danger">0%</span> Discount</small>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> 
                                    </div> 
                                </div> 
                                <div className="tab-pane" id="media">
                                    <div className="row justify-content-center">

                                        <div className="col-xl-8">
                                            <div className="form-group row mb-3">
                                                <label className="col-md-2 col-form-label" for="course_overview_provider">Course overview provider</label>
                                                <div className="col-md-10">
                                                    <select className="form-control select2 select2-hidden-accessible" data-toggle="select2" name="course_overview_provider" id="course_overview_provider" data-select2-id="course_overview_provider" tabindex="-1" aria-hidden="true">
                                                        <option value="youtube" data-select2-id="8">Youtube</option>
                                                        <option value="vimeo">Vimeo</option>
                                                        <option value="html5">Html5</option>
                                                    </select><span className="select2 select2-container select2-container--default" dir="ltr" data-select2-id="7" style={{width: "auto"}}><span className="selection"><span className="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-labelledby="select2-course_overview_provider-container"><span className="select2-selection__rendered" id="select2-course_overview_provider-container" role="textbox" aria-readonly="true" title="Youtube">Youtube</span><span className="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span className="dropdown-wrapper" aria-hidden="true"></span></span>
                                                </div>
                                            </div>
                                        </div> 

                                        <div className="col-xl-8">
                                            <div className="form-group row mb-3">
                                                <label className="col-md-2 col-form-label" for="course_overview_url">Course overview url</label>
                                                <div className="col-md-10">
                                                    <input type="text" className="form-control" name="course_overview_url" id="course_overview_url" placeholder="E.g: https://www.youtube.com/watch?v=oBtf8Yglw2w">
                                                </div>
                                            </div>
                                        </div> 
                                        <!-- this portion will be generated theme wise from the theme-config.json file Starts-->
                                          <div className="col-xl-8">
    <div className="form-group row mb-3">
      <label className="col-md-2 col-form-label" for="course_thumbnail_label">Course thumbnail</label>
      <div className="col-md-10">
        <div className="wrapper-image-preview" style={{marginLeft: "-6px"}}>
          <div className="box" style={{width: "250px"}}>
            <div className="js--image-preview" style={{backgroundImage: "ourse_thumbnail_placeholder.jpg",
              backgroundColor: "#F5F5F5"}}></div>
            <div className="upload-options">
              <label for="course_thumbnail" className="btn"> <i className="mdi mdi-camera"></i> Course thumbnail <br> <small>(600 X 600)</small> </label>
              <input id="course_thumbnail" style={{visibility:"hidden"}} type="file" className="image-upload" name="course_thumbnail" accept="image/*">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
                                       
                                    </div> 
                                </div>
                                <div className="tab-pane" id="seo">
                                    <div className="row justify-content-center">
                                        <div className="col-xl-8">
                                            <div className="form-group row mb-3">
                                                <label className="col-md-2 col-form-label" for="website_keywords">Meta keywords</label>
                                                <div className="col-md-10">
                                                    <input type="text" className="form-control bootstrap-tag-input" id="meta_keywords" 
                                                    name="meta_keywords" data-role="tagsinput" style={{width: "100%", display: "none"}} placeholder="Write a keyword and then press enter button" .=""><div className="bootstrap-tagsinput"><input size="43" type="text" placeholder="Write a keyword and then press enter button"></div>
                                                </div>
                                            </div>
                                        </div> 
                                        <div className="col-xl-8">
                                            <div className="form-group row mb-3">
                                                <label className="col-md-2 col-form-label" for="meta_description">Meta description</label>
                                                <div className="col-md-10">
                                                    <textarea name="meta_description" className="form-control"></textarea>
                                                </div>
                                            </div>
                                        </div>
                                    </div> 
                                </div>
                                <div className="tab-pane" id="finish">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="text-center">
                                                <h2 className="mt-0"><i className="mdi mdi-check-all"></i></h2>
                                                <h3 className="mt-0">Thank you !</h3>

                                                <p className="w-75 mb-2 mx-auto">You are just one click away</p>

                                                <div className="mb-3 mt-3">
                                                    <button type="button" className="btn btn-primary text-center" onclick="checkRequiredFields()">Submit</button>
                                                </div>
                                            </div>
                                        </div> 
                                    </div> 
                                </div>

                                <ul className="list-inline mb-0 wizard text-center">
                                    <li className="previous list-inline-item disabled">
                                        <a href="javascript::" className="btn btn-info"> <i className="mdi mdi-arrow-left-bold"></i> </a>
                                    </li>
                                    <li className="next list-inline-item">
                                        <a href="javascript::" className="btn btn-info"> <i className="mdi mdi-arrow-right-bold"></i> </a>
                                    </li>
                                </ul>

                            </div> 
                        </div>
                    </form>
                </div>
            </div>
        </div> 
    </div> 
</div>
</div>



                  
	)
}



export const OverviewDash = () => {
  return (
    <div>


   
                    
<div className="row">
    <div className="col-xl-12">
        <div className="card">
            <div className="card-body">
                <h4 className="page-title"> <i className="mdi mdi-apple-keyboard-command title_icon"></i> Dashboard</h4>
            </div> 
        </div>
    </div>
</div>

<div className="row">
    <div className="col-xl-12">
        <div className="card">
            <div className="card-body">
                <h4 className="header-title mb-4">Instructor revenue</h4>
                <div className="mt-3 chartjs-chart" style={{height: "320px"}}><div className="chartjs-size-monitor" style={{position: "absolute", inset: "0px", 
                overflow: "hidden", pointerEvents: "none", visibility: "hidden", zIndex: "-1"}}>
                <div className="chartjs-size-monitor-expand" style={{position:"absolute", left:"0",top:"0",
                 right:"0", bottom:"0",overflow:"hidden",pointerEvents:"none",
                 visibility:"hidden",zIndex:"-1"}}>
                 <div style={{position:"absolute",width:"1000000px",height:"1000000px",left:"0",top:"0"}}></div></div>
                 <div className="chartjs-size-monitor-shrink" style={{position:"absolute",left:"0",top:"0",right:"0",bottom:"0",
                 overflow:"hidden",pointerEvents:"none",visibility:"hidden",zIndex:"-1"}}>
                 <div style={{position:"absolute",width:"200%",height:"200%",left:"0", top:"0"}}></div></div></div>
                    <canvas id="task-area-chart" width="546" style={{display: "block", height: "320px", width: "182px"}} className="chartjs-render-monitor" height="960"></canvas>
                </div>
            </div> 
        </div> 
    </div>
</div>

<div className="row">
    <div className="col-12">
        <div className="card widget-inline">
            <div className="card-body p-0">
                <div className="row no-gutters">
                    <div className="col-sm-6 col-xl-3">
                        <a href="/user/courses" className="text-secondary">
                            <div className="card shadow-none m-0">
                                <div className="card-body text-center">
                                    <i className="dripicons-archive text-muted" style={{fontSize:"24px"}}></i>
                                    <h3><span>0</span></h3>
                                    <p className="text-muted font-15 mb-0">Number of courses</p>
                                </div>
                            </div>
                        </a>
                    </div>

                    <div className="col-sm-6 col-xl-3">
                        <div className="card shadow-none m-0 border-left">
                            <div className="card-body text-center">
                                <i className="dripicons-user-group text-muted" style={{fontSize:"24px"}}></i>
                                <h3><span>0</span></h3>
                                <p className="text-muted font-15 mb-0">Number of enrolment</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-6 col-xl-3">
                        <a href="/user/payout_report" className="text-secondary">
                            <div className="card shadow-none m-0 border-left">
                                <div className="card-body text-center">
                                    <i className="dripicons-inbox text-muted" style={{fontSize:"24px"}}></i>
                                    <h3><span>₦0</span></h3>
                                    <p className="text-muted font-15 mb-0">Pending balance</p>
                                </div>
                            </div>
                        </a>
                    </div>

                    <div className="col-sm-6 col-xl-3">
                        <a href="/user/payout_report" className="text-secondary">
                            <div className="card shadow-none m-0 border-left">
                                <div className="card-body text-center">
                                    <i className="dripicons-pin text-muted" style={{fontSize:"24px"}}></i>
                                    <h3><span>₦0</span></h3>
                                    <p className="text-muted font-15 mb-0">Requested withdrawal amount</p>
                                </div>
                            </div>
                        </a>
                    </div>

                </div> 
            </div>
        </div>
    </div> 
</div>
<div className="row">
    <div className="col-xl-12">
        <div className="card">
            <div className="card-body">
                <h4 className="header-title mb-4">Course overview</h4>
                <div className="my-4 chartjs-chart" style={{height: "202px"}}><div className="chartjs-size-monitor" style={{position: "absolute", inset: "0px", 
                overflow: "hidden", pointerEvents: "none", visibility: "hidden", zIndex: "-1"}}><div className="chartjs-size-monitor-expand" style={{position:"absolute", left:"0",top:"0",
                 right:"0", bottom:"0",overflow:"hidden",pointerEvents:"none",
                 visibility:"hidden",zIndex:"-1"}}>
                 <div style={{position:"absolute",width:"1000000px",height:"1000000px",left:"0",top:"0"}}></div></div>
                 <div className="chartjs-size-monitor-shrink" style={{position:"absolute",left:"0",top:"0",right:"0",bottom:"0",
                 overflow:"hidden",pointerEvents:"none",visibility:"hidden",zIndex:"-1"}}>
                 <div style={{position:"absolute",width:"200%",height:"200%",left:"0", top:"0"}}></div></div></div>
                    <canvas id="project-status-chart" width="546" style={{display: "block", height: "202px", width: "182px"}} className="chartjs-render-monitor" height="606"></canvas>
                </div>
                <div className="row text-center mt-2 py-2">
                    <div className="col-6">
                        <i className="mdi mdi-trending-up text-success mt-3 h3"></i>
                        <h3 className="font-weight-normal">
                            <span>0</span>
                        </h3>
                        <p className="text-muted mb-0">Active courses</p>
                    </div>
                    <div className="col-6">
                        <i className="mdi mdi-trending-down text-warning mt-3 h3"></i>
                        <h3 className="font-weight-normal">
                            <span>0</span>
                        </h3>
                        <p className="text-muted mb-0"> Pending courses</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
                
      
          
    </div>
  );
};


export const AddHead = () => {
	return (
      <div className="row ">
					    <div className="col-md-12">
					        <div className="card">
					            <div className="card-body">
					                <h4 className="page-title"> <i className="mdi mdi-apple-keyboard-command title_icon"></i> Courses                    <a href="/user/course_form/add_course" className="btn btn-outline-primary btn-rounded alignToTitle"><i className="mdi mdi-plus"></i>Add new course</a>
					                </h4>
					            </div>
					        </div> 
					    </div>
                   </div>

	)
}

export const AddBoxes =() => {
	return (
      
<div className="row">
    <div className="col-md-12">
        <div className="card widget-inline">
            <div className="card-body p-0">
                <div className="row no-gutters">
                    <div className="col">
                        <a href="/user/courses" className="text-secondary">
                            <div className="card shadow-none m-0">
                                <div className="card-body text-center">
                                    <i className="dripicons-link text-muted" style={{fontSize: "24px"}}></i>
                                    <h3><span>
                                        0                                    </span></h3>
                                    <p className="text-muted font-15 mb-0">Active courses</p>
                                </div>
                            </div>
                        </a>
                    </div>

                    <div className="col">
                        <a href="/user/courses" className="text-secondary">
                            <div className="card shadow-none m-0 border-left">
                                <div className="card-body text-center">
                                    <i className="dripicons-link-broken text-muted" style={{fontSize: "24px"}}></i>
                                    <h3><span>
                                        0                                    </span></h3>
                                    <p className="text-muted font-15 mb-0">Pending courses</p>
                                </div>
                            </div>
                        </a>
                    </div>

                    <div className="col">
                        <a href="/user/courses" className="text-secondary">
                            <div className="card shadow-none m-0 border-left">
                                <div className="card-body text-center">
                                    <i className="dripicons-bookmark text-muted" style={{fontSize: "24px"}}></i>
                                    <h3><span>
                                        0                                    </span></h3>
                                    <p className="text-muted font-15 mb-0">Draft courses</p>
                                </div>
                            </div>
                        </a>
                    </div>

                    <div className="col">
                        <a href="/user/courses" className="text-secondary">
                            <div className="card shadow-none m-0 border-left">
                                <div className="card-body text-center">
                                    <i className="dripicons-star text-muted" style={{fontSize: "24px"}}></i>
                                    <h3><span>0</span></h3>
                                    <p className="text-muted font-15 mb-0">Free courses</p>
                                </div>
                            </div>
                        </a>
                    </div>

                    <div className="col">
                        <a href="/user/courses" className="text-secondary">
                            <div className="card shadow-none m-0 border-left">
                                <div className="card-body text-center">
                                    <i className="dripicons-tags text-muted" style={{fontSize: "24px"}}></i>
                                    <h3><span>0</span></h3>
                                    <p className="text-muted font-15 mb-0">Paid courses</p>
                                </div>
                            </div>
                        </a>
                    </div>

                </div> 
            </div>
        </div> 
    </div> 
</div>
	)
}


export const AddFormBox = () => {
	return (
      <div className="row">
    <div className="col-md-12">
        <div className="card">
            <div className="card-body">
                <h4 className="mb-3 header-title">Course list</h4>
                <form className="row justify-content-center" action="/user/courses" method="get">
                    
                    <div className="col-md-3">
                        <div className="form-group">
                            <label for="category_id">Categories</label>
                            <select className="form-control select2" data-toggle="select2" name="category_id" id="category_id">
                                <option value="all" selected>All</option>
                                                                    <optgroup label="ARTS & HUMANITIES ">
                                                                                <option value="69" >Education</option>
                                                                            <option value="70" >History</option>
                                                                            <option value="71" >Political Science</option>
                                                                            <option value="72" >Sociology</option>
                                                                            <option value="73" >Geography</option>
                                                                            <option value="76" >Media and Journalism</option>
                                                                            <option value="77" >Architecture</option>
                                                                    </optgroup>
                                                                <optgroup label="BUSINESS">
                                                                                <option value="86" >Business Process Management </option>
                                                                            <option value="124" >Service Management</option>
                                                                            <option value="125" >Supply Chain Management</option>
                                                                            <option value="126" >Sales and Marketing Management</option>
                                                                            <option value="127" >Risk Management</option>
                                                                            <option value="128" >Customer Service</option>
                                                                            <option value="129" >Business Leadership</option>
                                                                            <option value="130" >Human Resources</option>
                                                                            <option value="131" >Finance and Banking</option>
                                                                            <option value="132" >Accounting</option>
                                                                    </optgroup>
                                                                <optgroup label="HEALTH CARE">
                                                                                <option value="88" >Nursing </option>
                                                                            <option value="89" >Disease and Disorders</option>
                                                                            <option value="90" >Nutrition</option>
                                                                            <option value="91" >Caregiving</option>
                                                                            <option value="92" >Pharmacology</option>
                                                                    </optgroup>
                                                                <optgroup label="LAW & SOCIAL SCIENCES">
                                                                                <option value="95" >Law</option>
                                                                            <option value="96" >Economics</option>
                                                                            <option value="97" >Psychology</option>
                                                                    </optgroup>
                                                                <optgroup label="INFORMATION TECHNOLOGY">
                                                                                <option value="100" >Network and security</option>
                                                                            <option value="101" >IT Management</option>
                                                                            <option value="102" >Digital Marketing</option>
                                                                            <option value="103" >Web Site and Application Development</option>
                                                                    </optgroup>
                                                                <optgroup label="MATHEMATICS ">
                                                                                <option value="105" >SS1 Mathematics</option>
                                                                            <option value="106" >SS2 Mathematics</option>
                                                                            <option value="107" >SS3 Mathematics</option>
                                                                    </optgroup>
                                                                <optgroup label="ENGINEERING AND PHYSICAL SCIENCES">
                                                                                <option value="110" >Computer Science and Engineering</option>
                                                                            <option value="111" >Electrical Engineering </option>
                                                                            <option value="112" >Mechanical Engineering</option>
                                                                            <option value="113" >Chemical Engineering</option>
                                                                            <option value="114" >Civil Engineering</option>
                                                                            <option value="116" >Biology </option>
                                                                            <option value="117" >Physics </option>
                                                                            <option value="118" >Chemistry</option>
                                                                            <option value="119" >Environmental Studies</option>
                                                                            <option value="120" >Agricultural Science</option>
                                                                    </optgroup>
                                                                <optgroup label="LANGUAGE ">
                                                                                <option value="134" >English</option>
                                                                            <option value="135" >Yoruba</option>
                                                                            <option value="136" >Igbo</option>
                                                                            <option value="137" >Hausa</option>
                                                                            <option value="138" >Chinese</option>
                                                                            <option value="139" >French</option>
                                                                    </optgroup>
                                                    </select>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="form-group">
                        <label for="status">Status</label>
                        <select className="form-control select2" data-toggle="select2" name="status" id = 'status'>
                            <option value="all" selected>All</option>
                            <option value="active" >Active</option>
                            <option value="pending" >Pending</option>
                        </select>
                    </div>
                </div>

               
                <div className="col-md-3">
                    <div className="form-group">
                        <label for="price">Price</label>
                        <select className="form-control select2" data-toggle="select2" name="price" id = 'price'>
                            <option value="all"  selected>All</option>
                            <option value="free" >Free</option>
                            <option value="paid" >Paid</option>
                        </select>
                    </div>
                </div>

                <div className="col-md-3">
                    <label for=".." className="text-white">..</label>
                    <button type="submit" className="btn btn-primary btn-block" name="button">Filter</button>
                </div>
            </form>

            <div className="table-responsive-sm mt-4">
                                                    <div className="img-fluid w-100 text-center">
                      <img style={{opacity: "1", width: "100px"}} src="/assets/backend/images/file-search.svg" /><br/>
                      No data found                    </div>
                            </div>
        </div>
    </div>
</div>
</div>
  
	)
}


export const  TopNav = () => {
	return (
       	
<div className="navbar-custom topnav-navbar topnav-navbar-dark">
    <div className="container-fluid">

        
<a className="button-menu-mobile disable-btn">
    <div className="lines">
        <span></span>
        <span></span>
        <span></span>
    </div>
</a>
</div>
</div>
	)
}
export const SideBar = () =>{


	return(
	
<Fragment>


    

      <div className="left-side-menu left-side-menu-detached " style={{float:"left"}}>
	<div className="leftbar-user">
		<a href="javascript: void(0);">
			<img src="#/uploads/user_image/placeholder.png" alt="user-image" height="42" className="rounded-circle shadow-sm" />
						<span className="leftbar-user-name">Instructor-02 Questence</span>
		</a>
	</div>

	<ul className="metismenu side-nav side-nav-light">

		<li className="side-nav-title side-nav-item">Navigation</li>
					<li className="side-nav-item">
				<a href="#/user/dashboard" className="side-nav-link ">
					<i className="dripicons-view-apps"></i>
					<span>Dashboard</span>
				</a>
			</li>
			<li className="side-nav-item">
				<a href="#/user/courses" className="side-nav-link ">
					<i className="dripicons-archive"></i>
					<span>Course manager</span>
				</a>
			</li>
			<li className="side-nav-item">
				<a href="#/user/sales_report" className="side-nav-link ">
					<i className="dripicons-to-do"></i>
					<span>Sales report</span>
				</a>
			</li>
			<li className="side-nav-item">
				<a href="#/user/payout_report" className="side-nav-link ">
					<i className="dripicons-shopping-bag"></i>
					<span>Payout report</span>
				</a>
			</li>
			<li className="side-nav-item">
				<a href="#/user/payout_settings" className="side-nav-link ">
					<i className="dripicons-gear"></i>
					<span>Payout settings</span>
				</a>
			</li>
				<li className="side-nav-item">
			<a href="#/home/my_messages" className="side-nav-link">
				<i className="dripicons-mail"></i>
				<span>Message</span>
			</a>
		</li>
		<li className="side-nav-item">
			<a href="#/user/manage_profile" className="side-nav-link">
				<i className="dripicons-user"></i>
				<span>Manage profile</span>
			</a>
		</li>
	</ul>

</div>






</Fragment>


   )
}


