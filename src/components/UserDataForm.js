// import React, { useState } from "react";
// import { auth, provider, db } from "../firebase";
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signInWithPopup,
// } from "firebase/auth";
// import { doc, getDoc, setDoc } from "firebase/firestore";
// import { ToastContainer, toast } from "react-toastify";
// import "./style.css"

// const SignUpSignIn = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [flag, setFlag] = useState(false);

//   const createUserDocument = async (user) => {
//     setLoading(true);
//     if (!user) return;

//     const userRef = doc(db, "users", user.uid);
//     const userData = await getDoc(userRef);

//     if (!userData.exists()) {
//       const { displayName, email, photoURL } = user;
//       const createdAt = new Date();

//       try {
//         await setDoc(userRef, {
//           name: displayName ? displayName : name,
//           email,
//           photoURL: photoURL ? photoURL : "",
//           createdAt,
//         });
//         toast.success("Account Created!");
//         setLoading(false);
//       } catch (error) {
//         toast.error(error.message);
//         console.error("Error creating user document: ", error);
//         setLoading(false);
//       }
//     }
//   };

//   const signUpWithEmail = async (e) => {
//     e.preventDefault();
//     if (password !== confirmPassword) {
//       toast.error("Passwords do not match!");
//       return;
//     }
//     setLoading(true);
//     try {
//       const result = await createUserWithEmailAndPassword(auth, email, password);
//       const user = result.user;
//       await createUserDocument(user);
//       toast.success("Successfully Signed Up!");
//       setLoading(false);
//       setFlag(false); // Redirect to sign-in after sign-up
//     } catch (error) {
//       toast.error(error.message);
//       console.error("Error signing up with email and password: ", error.message);
//       setLoading(false);
//     }
//   };

//   const signInWithEmail = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const result = await signInWithEmailAndPassword(auth, email, password);
//       const user = result.user;
//       toast.success("Logged In Successfully!");
//       setLoading(false);
//       // You can perform navigation after successful login if needed
//     } catch (error) {
//       toast.error(error.message);
//       console.error("Error signing in with email and password: ", error.message);
//       setLoading(false);
//     }
//   };

//   const signInWithGoogle = async () => {
//     setLoading(true);
//     try {
//       const result = await signInWithPopup(auth, provider);
//       const user = result.user;
//       await createUserDocument(user);
//       toast.success("User Authenticated Successfully!");
//       setLoading(false);
//       // You can perform navigation after successful login if needed
//     } catch (error) {
//       setLoading(false);
//       toast.error(error.message);
//       console.error("Error signing in with Google: ", error.message);
//     }
//   };

//   const toggleForm = () => {
//     setFlag(!flag);
//     // Clear form fields when switching between sign-up and sign-in modes
//     setName("");
//     setEmail("");
//     setPassword("");
//     setConfirmPassword("");
//   };

//   return (
//     <div className="wrapper">
//       {flag ? (
//         <div className="signup-signin-container">
//           <h2 style={{ textAlign: "center" }}>
//             Log In on <span className="blue-text">Financely.</span>
//           </h2>
//           <form onSubmit={signInWithEmail}>
//             <div className="input-wrapper">
//               <p>Email</p>
//               <input
//                 type="email"
//                 placeholder="Enter your Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>

//             <div className="input-wrapper">
//               <p>Password</p>
//               <input
//                 type="password"
//                 placeholder="Enter your password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>

//             <button
//               disabled={loading}
//               className="btn"
//               onClick={signInWithEmail}
//             >
//               {loading ? "Loading..." : " Log In with Email and Password"}
//             </button>
//           </form>
//           <p style={{ textAlign: "center", margin: 0 }}>or</p>
//           <button
//             disabled={loading}
//             className="btn btn-blue"
//             onClick={signInWithGoogle}
//           >
//             {loading ? "Loading..." : " Log In with Google"}
//           </button>
//           <p
//             onClick={toggleForm}
//             style={{
//               textAlign: "center",
//               marginBottom: 0,
//               marginTop: "0.5rem",
//               cursor: "pointer",
//             }}
//           >
//             Or Don't Have An Account? <span className="click-link">Click Here.</span>
//           </p>
//         </div>
//       ) : (
//         <div className="signup-signin-container">
//           <h2 style={{ textAlign: "center" }}>
//             Sign Up on <span className="blue-text">Financely.</span>
//           </h2>
//           <form onSubmit={signUpWithEmail}>
//             <div className="input-wrapper">
//               <p>Full Name</p>
//               <input
//                 type="text"
//                 placeholder="Enter Your Name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//               />
//             </div>
//             <div className="input-wrapper">
//               <p>Email</p>
//               <input
//                 type="email"
//                 placeholder="Enter your Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>

//             <div className="input-wrapper">
//               <p>Password</p>
//               <input
//                 type="Password"
//                 placeholder="Enter Your Password "
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>

//             <div className="input-wrapper">
//               <p>Confirm Password</p>
//               <input
//                 type="password"
//                 placeholder="Confirm your password"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//               />
//             </div>

//             <button type="submit" className="btn">
//               {loading ? "Loading..." : "Sign Up with Email and Password"}
//             </button>
//           </form>
//           <p style={{ textAlign: "center", margin: 0 }}>or</p>
//           <button
//             disabled={loading}
//             className="btn btn-blue"
//             onClick={signInWithGoogle}
//           >
//             {loading ? "Loading..." : "Sign Up with Google"}
//           </button>
//           <p
//             onClick={toggleForm}
//             style={{
//               textAlign: "center",
//               marginBottom: 0,
//               marginTop: "0.5rem",
//               cursor: "pointer",
//             }}
//           >
//             Or Have An Account Already? <span className="click-link">Click Here</span>
//           </p>
//         </div>
//       )}
//       <ToastContainer />
//     </div>
//   );
// };

// export default SignUpSignIn;



import React, { useState } from 'react';
import Register from './Register';
import Login from './Login';
import './style.css';

const  UserDataForm = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="app-container1">
      {showLogin ? <Login setShowLogin={setShowLogin} /> : <Register setShowLogin={setShowLogin} />}
    </div>
  );
};

export default  UserDataForm ;
