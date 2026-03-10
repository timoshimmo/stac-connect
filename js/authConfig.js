// authConfig.js
const msalConfig = {
    auth: {
        clientId: "cded3be1-6cb3-495c-8799-5c45a15cc7e4", // Replace with your Application (client) ID
        authority: "https://login.microsoftonline.com/f6e07a26-1f87-4350-8703-9d891f3a7bf1", // Replace with your Directory (tenant) ID
        redirectUri: "https://stac-connect.netlify.app/", // Must match the redirect URI registered in Azure
    },
    cache: {
        cacheLocation: "sessionStorage", // or "localStorage"
        storeAuthStateInCookie: false,
    },
    system: {
        loggerOptions: {
            loggerCallback: (level, message, containsPii) => {
                if (!containsPii) console.log(message);
            },
            level: msal.LogLevel.Info
        }
    }
};

const loginRequest = {
    scopes: ["openid", "profile", "User.Read"]
};
