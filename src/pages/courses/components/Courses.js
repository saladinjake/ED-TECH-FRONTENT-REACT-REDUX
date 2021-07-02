import React, {useState} from "react"
import CourseGridList from "./CourseGridList"
import CourseItemsGrid from "./CourseItemsGrid"

const ViewSwitcher = () => {
	const [viewGrid,setViewGrid] = useState(true)

	return (

      <div>
	   {viewGrid ===true ? (<CourseGridList />) : (<CourseItemsList/>)}
     </div>

	)
}