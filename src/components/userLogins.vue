<template>
<div class="hello">
    <h2 v-if="user">Signed In User: {{ user }}</h2>
    <div id="firebaseui-auth-container"></div>
    <div id="loader">Loading...</div>
    <br>
    <div v-if="isSignedIn">
        <button @click="handleSignOut">Sign Out</button>
    </div>
</div>
</template>

<script>
import {
    ref
} from 'vue';
import firebaseConfig from '../firebaseConfig';
// v9 compat packages are API compatible with v8 code
import firebase from 'firebase/compat/app';
firebase.initializeApp(firebaseConfig);
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'
import {
    getAuth,
    signOut
} from "firebase/auth";
const auth = getAuth();

export default {
    name: 'UserLogins',

    setup() {
        const user = ref(null);
        const isSignedIn = ref(false);
        const uiConfig = {
            signInFlow: 'popup',
            signinSuccessUrl: 'http://127.0.0.1:5173/user',
            signInOptions: [
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                firebase.auth.TwitterAuthProvider.PROVIDER_ID,
                firebase.auth.GithubAuthProvider.PROVIDER_ID
            ],
            callbacks: {
                signInSuccessWithAuthResult: function (authResult) {
                    user.value = authResult.user.displayName;
                    console.log(authResult)
                    isSignedIn.value = true;
                    console.log('Signed in by user ' + user.value);

                    // so it doesn't refresh the page
                    return false;
                },
                uiShown: function () {
                    // The widget is rendered.
                    // Hide the loader.
                    document.getElementById('loader').style.display = 'none';
                }
            }
        }
        // Initialize the FirebaseUI Widget using Firebase.
        var ui = new firebaseui.auth.AuthUI(firebase.auth());
        ui.start('#firebaseui-auth-container', uiConfig);
        const handleSignOut = () => {
            signOut(auth).then(() => {
                // Sign-out successful.
                user.value = null;
                isSignedIn.value = false;
                console.log('Signed out');
                ui.start('#firebaseui-auth-container', uiConfig);
            }).catch((error) => {
                // An error happened.
                console.log(error);
            });
        }
        return {
            user,
            isSignedIn,
            handleSignOut,
        }
    }
}
</script>

<style>

</style>
