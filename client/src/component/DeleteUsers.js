import Users from './Users';
import UsersClass from './UsersClass';
// import './App.css';

function DeleteUsers() {
  return (
    <div >
      <Users />

      <UsersClass />
    </div>
  );
}

export default DeleteUsers;


// const DeleteUsers = () => {
// const navigate = useNavigate();
    
// // UserAuthenticate();
// // const udata = useContext(UserDataContext);
// // console.log(UserDataContext);
// // console.log(udata);
// const [userData, setUserData] = useState();
// useEffect(() =>{
  
//   const callData = async () =>{
//       try{
//           const res = await fetch('/userlist', {
//               method:"GET",
//               headers:{
//                   Accept: "Application/json",
//                   "Content-Type": "application/json"
//               },
//               credentials: 'include'
//           });
//           const data = await res.json();
//           console.log(data);
//           setUserData(data);
//           if (!res === 200) {
//               const error = new Error(res.error);
//               throw error;
//           }
//       }catch(err){
//           console.log(err);
//           navigate('/Login');
//       }
//   }
//   callData();
// }, []);
//   return (
//     <div>
//       <table className="table table-bordered">  
//       {/* <tr>  
//                 <th>ID</th>  
//                 <th>FName</th>
//                 <th>LName</th>
//                 <th>Email</th>
//                 <th>Role</th>
//             </tr>  
    
//             {userData.map((user, index) => (  
//               <tr key={index}>  
//                 <td>{user._id}</td>  
//                 <td>{user.fname}</td>
//                 <td>{user.lname}</td>  
//                 <td>{user.email}</td>
//                 <td>{user.role}</td>    
//               </tr>  
//             ))}   */}
    
//         </table>
        
        
//     </div>
//   )
// }

// export default DeleteUsers