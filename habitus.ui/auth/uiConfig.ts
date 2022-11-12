import { EmailAuthProvider } from 'firebase/auth';

export const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
  signInSuccessUrl: '/',
  credentialHelper: 'none',
  tosUrl: '/terms-of-service', // NOTE May remove this later
  privacyPolicyUrl: '/privacy-policy',
  signInOptions: [
    {
      provider: EmailAuthProvider.PROVIDER_ID,
      signInMethod: EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD,
    },
  ],
  // TODO Lookup further options
  // set requireDisplayName to false
  // set signInFlow to popup¨
  // iconUrl: '<icon-url-of-sign-in-button>'
  // signInSuccessUrl: '<url-to-redirect-to-on-success>'
};
