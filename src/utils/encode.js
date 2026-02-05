export function encodeData(data) {
    return btoa(JSON.stringify(data))
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
}

export function decodeData(str) {
    try {
        const base64 = str.replace(/-/g, "+").replace(/_/g, "/");
        return JSON.parse(atob(base64));
    } catch {
        return null;
    }
}
