import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({children,requiredRole})=>{
    const {isAuthenticated,user} = useSelector((state)=>state.auth);

    console.log("isauthenticated-------->",isAuthenticated)
        console.log("user-------->",user)
   if(!isAuthenticated){
    return <Navigate to ={'/login'}/>

   }
    if(requiredRole && !requiredRole.includes(user?.role)){
         return <Navigate to={"/login"}/>
        
    }
    return children
   
}

export default ProtectedRoute