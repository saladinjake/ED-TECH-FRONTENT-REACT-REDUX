// class Notification extends React.Component{
//     constructor(props){
//         super(props);
//         this.state ={
//             data:[],
//         }
//     }
//     async componentDidMount(){
//           try{
//         const response = await  getCourses();
//         this.setState({
//             data: response.data.data.courses
//         })
          
//        } catch (err) {
//          toast.error("Error occured fetching notifications");
//        }
//     }

//     render(){
//           const { data } = this.state;
//           console.log(data)

//             return (
//               data.length == 0 
//                 ?( <p>Loading Data...</p> )
//                 : (
                      
//                         <div className="row">
//                            <div className="m-b-15">
//                         {data.length > 0 &&  data.map((item, i) => {
//                                        return ( 
//                                            <NotificationListItem key={uuid()} item={item} />
//                                        );
                                     
//                         })}

//                              </div>
//                         </div>

//                  )
//             )

//     }
// }

// export default Notification;
