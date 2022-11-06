import { FirebaseApp, initializeApp } from 'firebase/app';
// NOTE: Don't know what this does
import 'firebase/auth';
import { Auth, getAuth } from 'firebase/auth';
import { firebaseConfig } from './firebaseConfig';

let firebase: FirebaseApp;
let auth: Auth;

function initFirebase() {
  // NOTE makes sure to only initialize in browser, not on server
  if (typeof window !== 'undefined') {
    firebase = initializeApp(firebaseConfig);
    auth = getAuth(firebase);
  }

  // NOTE Worry that I might return uninitialized objects here
  // NOTE Throw error instead, now only return real objects
  // NOTE Decide that my philosophy is to only initialize firebase here, then everything else in useEffect
  // in effort to keep time to initial render as low as possible
  return { firebase, auth };
}

export default initFirebase;
