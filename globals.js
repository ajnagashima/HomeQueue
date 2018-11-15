const configs = {
    Spotify:{
        redirectURI:'https://localhost:8888',
        client_id: 'b610b0bf7b7644fab5905b20ad6f03e1',
        scope:'user-read-email',
    }
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

export function getFields(provider, field){
    return configs[provider][field]
}
