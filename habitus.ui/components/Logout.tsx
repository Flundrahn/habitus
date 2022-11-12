import { useAuthContext } from "./AuthContext";

export default function Logout() {
  const { isInitialized } = useAuthContext();

  if (!isInitialized || !isInitialized.user) {
    return null;
  } else {


  
  return ( 
    <button>
      Logout
    </button>
   );
}

}
