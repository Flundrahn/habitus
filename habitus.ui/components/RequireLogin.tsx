// import useAuthContext from '../authentication/useAuth';
// import React, { useEffect } from 'react';
// import firebase from 'firebase/compat/app';
// import firebaseui from 'firebaseui';
// import 'firebaseui/dist/firebaseui.css';
// import ReactLoading from 'react-loading';

// function Login() {
//   const { auth } = useAuthContext();
//   useEffect(() => {
//     if (auth) {
//       const ui =
//         firebaseui.auth.AuthUI.getInstance(auth) ||
//         new firebaseui.auth.AuthUI(auth);
//       const uiConfig = {
//         signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
//         // TODO Lookup further options
//         // set requireDisplayName to false
//         // set signInFlow to popup¨
//         // iconUrl: '<icon-url-of-sign-in-button>'
//         // signInSuccessUrl: '<url-to-redirect-to-on-success>'
//       };
//       ui.start('.firebaseui-auth-container', uiConfig);
//     }
//   }, [auth]);

//   // TODO Decide if this is needed
//   // if (!auth) {
//   //   return null;
//   // }

//   return (
//     <div className="flex flex-col items-center">
//       <h1>Welcome to Habitus</h1>
//       <p>Here you can login or create an account</p>
//       <div className={'firebaseui-auth-container'} />
//     </div>
//   );
// }

// // export const FirebaseAuth = () => {
// //   // Do not SSR FirebaseUI, because it is not supported.
// //   // https://github.com/firebase/firebaseui-web/issues/213
// //   const [renderAuth, setRenderAuth] = useState(false);
// //   useEffect(() => {
// //     if (typeof window !== 'undefined') {
// //       setRenderAuth(true);
// //     }
// //   }, []);

// //   let firebaseAuthConfig = {};
// //   if (renderAuth) {
// //     firebaseAuthConfig = {
// //       signInFlow: 'popup',
// //       signInOptions: [
// //         {
// //           provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
// //           requireDisplayName: false,
// //         },
// //       ],
// //       credentialHelper: 'none',
// //     };
// //   }
// //   if (!renderAuth) {
// //     return null;
// //   }
// //   return (
// //     <div>
// //       <StyledFirebaseAuth
// //         uiConfig={firebaseAuthConfig}
// //         firebaseAuth={firebase.auth()}
// //       />
// //     </div>
// //   );
// // };

// export const RequireLogin = ({ children }: { children: React.ReactNode }) => {
//   const { user, loading: initializing } = useAuthContext();

//   // NOTE Having trouble deciding if I should initialize firebase app in a usememo or useEffect,
//   // usememo means before render, useEffect after first render, meaning would not see component, but should still see page right?, then loading spinner let's try usememo

//   if (initializing) {
//     return <ReactLoading type="spin" />;
//   }

//   if (!user) {
//     return (
//       <>
//         <Login />
//       </>
//     );
//   }

//   return (
//     // NOTE Might not need AuthProvider here, wrap whole app instead,
//     // <AuthProvider>
//     <>{children}</>
//     // </AuthProvider>
//   );
// };
