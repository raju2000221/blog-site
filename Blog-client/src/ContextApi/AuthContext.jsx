// import axios from 'axios';
// import React, { createContext, useState, useEffect, useContext } from 'react';



// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
// const [user, setuser] = useState(null)
//     useEffect(() => {

//         fetchData();
    
//       }, []);

//       const fetchData = async () => {
//         try {
//           const userResponse = await axios.get('http://localhost:5000/loginUser');
//           setuser(userResponse.data)
//           console.log(user)
//         }catch(error){
//             console.log(error)
//         }
    
//     }

//     const logout = async () => {
//         try {
//           const response = await axios.get('http://localhost:5000/logout');
//           if (response.status === 200) {
//             setuser(null)
//           console.log('logout')
//           console.log(user)

//           } else {
//             console.error('Error logging out:', response);
//           }
//         } catch (error) {
//           console.error('Error logging out:', error);
//         }
//       };
//   return (
//     <AuthContext.Provider value={{
//         logout

//     }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
