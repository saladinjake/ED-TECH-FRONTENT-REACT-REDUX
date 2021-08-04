import React, {Fragment } from "react"
import { SideBar }  from "./sidebar"
import NavBar from "components/Navbar";

const SalesReport = () => {
	return (
		<Fragment>
      
<div className="row ">
    <div className="col-md-12">
        <div className="card">
            <div className="card-body">
                <h4 className="page-title"> <i className="mdi mdi-apple-keyboard-command title_icon"></i> Sales report</h4>
            </div> 
        </div> 
    </div>
</div>

<div className="row">
    <div className="col-md-12">
        <div className="card">
            <div className="card-body">
                <h4 className="mb-3 header-title">Sales report</h4>
                <div className="row justify-content-md-center">
                    <div className="col-md-6">
                        <form className="form-inline" action="" method="get">
                            <div className="col-md-10">
                                <div className="form-group">
                                    <div id="reportrange" className="form-control" data-toggle="date-picker-range" data-target-display="#selectedValue" data-cancel-className="btn-light" style={{width: "100%"}}>
                                        <i className="mdi mdi-calendar"></i>&nbsp;
                                        <span id="selectedValue">August 04, 2021 - August 31, 2021</span> <i className="mdi mdi-menu-down"></i>
                                    </div>
                                    <input id="date_range" type="hidden" name="date_range" value="01 August, 2021 - 31 August, 2021" />
                                </div>
                            </div>
                            <div className="col-md-2">
                                <button type="submit" className="btn btn-info" id="submit-button" > Filter</button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="table-responsive-sm mt-4">
                    <div id="sales-report-datatable_wrapper" className="dataTables_wrapper dt-bootstrap4 no-footer">
                    <div className="row"><div className="col-sm-12 col-md-6">
                    <div className="dataTables_length" id="sales-report-datatable_length">
                    <label>Show 
                    <select name="sales-report-datatable_length" aria-controls="sales-report-datatable" className="custom-select custom-select-sm form-control form-control-sm"><option value="10">10</option><option value="25">25</option>
                    <option value="50">50</option><option value="100">100</option></select> entries</label>
                    </div></div><div className="col-sm-12 col-md-6">
                    <div id="sales-report-datatable_filter" className="dataTables_filter">
                    <label>Search:
                    <input type="search" className="form-control form-control-sm" placeholder="" aria-controls="sales-report-datatable" /></label></div>
                    </div></div><div className="row"><div className="col-sm-12">
                    <div style={{position: "absolute", height: "1px", width: "0px", overflow: "hidden"}}>
                    <input type="text" tabindex="0" /></div>
                    <table id="sales-report-datatable" className="table table-striped table-centered mb-0 dataTable no-footer" role="grid" aria-describedby="sales-report-datatable_info" style={{position: "relative"}}>
                        <thead>
                            <tr role="row">
                            <th className="sorting_asc" tabindex="0" aria-controls="sales-report-datatable" rowspan="1" colspan="1" aria-sort="ascending" aria-label="Course name: activate to sort column descending" style={{width: "363.734px"}}>Course name</th>
                            <th className="sorting" tabindex="0" aria-controls="sales-report-datatable" rowspan="1" colspan="1" aria-label="Instructor revenue: activate to sort column ascending" style={{width: "469.438px"}}>Instructor revenue</th></tr>
                        </thead>
                        <tbody>
                                                    <tr className="odd"><td valign="top" colspan="2" className="dataTables_empty">No data available in table</td></tr></tbody>
                    </table></div></div><div className="row"><div className="col-sm-12 col-md-5"><div className="dataTables_info" id="sales-report-datatable_info" role="status" aria-live="polite">Showing 0 to 0 of 0 entries</div>
                    </div><div className="col-sm-12 col-md-7">
                    <div className="dataTables_paginate paging_simple_numbers" id="sales-report-datatable_paginate"><ul className="pagination pagination-rounded">
                    <li className="paginate_button page-item previous disabled" id="sales-report-datatable_previous">
                    <a href="#" aria-controls="sales-report-datatable" data-dt-idx="0" tabindex="0" className="page-link">
                    <i className="mdi mdi-chevron-left"></i></a></li>
                    <li className="paginate_button page-item next disabled" id="sales-report-datatable_next">
                    <a href="#" aria-controls="sales-report-datatable" data-dt-idx="1" tabindex="0" className="page-link"><i className="mdi mdi-chevron-right"></i></a>
                    </li></ul></div></div></div></div>
                </div>
            </div>
        </div>
    </div>
</div>


               
               </Fragment>





	)
}


const SalesBench = () => {
	return (
       <Fragment>
	<NavBar/><br/><br/><br/><br/>


    <div className="container">
        <div className="wrapper">
           <SideBar />



          <div className="content-page-x col-md-9" style={{float:"right"}}>
           <div className="content-x">
                    <SalesReport />
                 
             </div>
          </div>


     </div>
    </div>
	
	</Fragment>
	)
}

export default SalesBench