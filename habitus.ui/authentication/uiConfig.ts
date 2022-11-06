import firebase from 'firebase/compat/app';

// export const uiConfig = (app: FirebaseApp) => {
export const uiConfig = {
  signInSuccessUrl: '/',
  tosUrl: '/terms-of-service',
  privacyPolicyUrl: '/privacy-policy',
  signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
  // TODO Lookup further options
  // set requireDisplayName to false
  // set signInFlow to popup¨
  // iconUrl: '<icon-url-of-sign-in-button>'
  // signInSuccessUrl: '<url-to-redirect-to-on-success>'
};
