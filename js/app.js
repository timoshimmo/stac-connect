// app.js
const msalInstance = new msal.PublicClientApplication(msalConfig);

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
                updateUI(null);
            }
        }
    }).catch((error) => {
        console.error(error);
    });
}

function signIn() {
    // Use loginRedirect for full page redirects (common in vanilla JS)
    msalInstance.loginRedirect(loginRequest);
}

function signOut() {
    msalInstance.logoutRedirect();
}

function updateUI(account) {
    const appDiv = document.getElementById('app');
    if (account) {
        appDiv.innerHTML = `
            <p>Welcome, ${account.name}!</p>
            <button onclick="signOut()">Sign Out</button>
            <!-- Add more authenticated content here -->
        `;
    } else {
        appDiv.innerHTML = `
            <p>Please sign in to continue.</p>
            <button onclick="signIn()">Sign In</button>
        `;
    }
}

// Call this on page load
handleRedirectCallback();
