import React from 'react'
import {Redirect,Route,useLocation} from "react-router-dom";

export const PrivateRoute = ({component:Component,...rest}) => {
    const user_data=JSON.parse(localStorage.getItem("user_data"));
    const location=useLocation();
  return (
   <Route
   {...rest}
   render={(props)=>{
    if(user_data?.access){
        return <Component {...props}/>
    }else{
        return<Redirect to={{pathname:"/auth/login/",search:`?next=${location.pathname}`,
    }}/>;
    }
   }}
   />
  );
}
