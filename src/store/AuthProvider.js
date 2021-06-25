import React, { useEffect, useState } from "react";
import Spinner from "../components/Spinner/Spinner";
import { auth, db } from "../utility/firebase";

export const AuthContext = React.createContext({
  currentUser: null,
  signUp: () => {},
  signIn: () => {},
  signOut: () => {},
  writeUserDetails: () => {},
  writeUserFavourite: () => {},
});

const AuthProvider = (props) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const { uid } = user;
        db.ref(`/users/${uid}`).on("value", (snapshot) => {
          setCurrentUser(snapshot.val());
        });
      }
      setShowLoader(false);
    });
    return unsubscribe;
  }, []);

  const onSignUp = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  const onSignIn = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const onWriteUserDetails = (user) => {
    db.ref(`/users/${user.id}`).set(user);
  };

  const onWriteUserFavourite = (id, photo, action) => {
    if (action === "REMOVE") {
      db.ref(`/users/${id}/favourite/${photo.id}`).remove();
    } else {
      db.ref(`/users/${id}/favourite/${photo.id}`).set(photo);
    }
  };

  const onSignOut = async () => {
    try {
      setCurrentUser(null);
      return await auth.signOut();
    } catch (error) {
      console.error(error.message);
    }
  };

  const authContext = {
    currentUser: currentUser,
    signUp: onSignUp,
    signIn: onSignIn,
    signOut: onSignOut,
    writeUserDetails: onWriteUserDetails,
    writeUserFavourite: onWriteUserFavourite,
  };

  return (
    <AuthContext.Provider value={authContext}>
      {showLoader && <Spinner isVisible={showLoader} />}
      {!showLoader && props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
