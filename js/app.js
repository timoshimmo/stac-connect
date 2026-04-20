// app.js
window.addEventListener('DOMContentLoaded', async () => {
    // Your MSAL initialization code here
    const msalInstance = new msal.PublicClientApplication(msalConfig);

     // 1. Initialize MSAL (Required for v2/v3)
     await msalInstance.initialize();

    function handleRedirectCallback() {
        msalInstance.handleRedirectPromise().then((tokenResponse) => {
            // Handle the response after redirect
            if (tokenResponse) {
                console.log("Login successful:", tokenResponse.account);
                // Update UI to show signed-in state
                updateUI(tokenResponse.account);
            } else {
                // Check for existing accounts
                const currentAccounts = msalInstance.getAllAccounts();
                if (currentAccounts && currentAccounts.length > 0) {
                    updateUI(currentAccounts[0]);
                } else {
                    msalInstance.loginRedirect(loginRequest);
                    updateUI(null);
                }
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    const loginButton = document.getElementById("loginButton");
    
    loginButton.addEventListener("click", async () => {
        try {
            //msalInstance.loginRedirect({scopes: ["user.read", "openid", "profile"]});
            msalInstance.loginRedirect(loginRequest);
        } catch (err) {
            console.error("Login failed", err);
        }
    });

function signIn() {
    // Use loginRedirect for full page redirects (common in vanilla JS)
    msalInstance.loginRedirect(loginRequest);
}

function signOut() {
    msalInstance.logoutRedirect();
}

function updateUI(account) {
    const appDiv = document.getElementById('app');
    const appSignOut = document.getElementById('lt-signout');
    const appSignIn = document.getElementById('lt-signIn');
    
    if (account) {
        appSignOut.style.display = 'block';
        appSignIn.style.display = 'none';
       /* appDiv.innerHTML = `
            <p>Welcome, ${account.name}!</p>
            <button onclick="signOut()">Sign Out</button>
            <!-- Add more authenticated content here -->
        `; */
    } else {
        appSignIn.style.display = 'block';
        appSignOut.style.display = 'none';
       /* appDiv.innerHTML = `
            <p>Please sign in to continue.</p>
            <button onclick="signIn()">Sign In</button>
        `; */
    }
}

// Call this on page load
handleRedirectCallback();
});


