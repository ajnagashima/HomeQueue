const configs = {
    Spotify:{
        redirectURI:'https://localhost:8888',
        logoutRedirect:'https://www.spotify.com/us/',
        client_id: 'b610b0bf7b7644fab5905b20ad6f03e1',
        scope:'user-read-email user-modify-playback-state',
        auth_token:null,
        token_type:null,
    },
}

export function getConfig(provider){
    return configs[provider]
}

export function getRedirectURI(provider){
    return configs[provider].redirectURI
}

export function getClient_id(provider){
    return configs[provider].client_id
}

export function getLogoutRedirect(provider){
    return configs[provider].logoutRedirect
}

export function getAuthToken(provider){
    return configs[provider].auth_token
}

export function getTokenType(provider){
    return configs[provider].token_type
}

export function setAuthToken(provider, token){
    configs[provider].auth_token = token
}

export function removeAuthToken(provider){
    configs[provider].auth_token = null
}

export function setTokenType(provider, token){
    configs[provider].token_type = token
}

export function removeTokenType(provider){
    configs[provider].token_type = null
}

export function getField(provider, field){
    return configs[provider][field]
}
