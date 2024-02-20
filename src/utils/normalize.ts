import normalizeUrl from "normalize-url"

export function normalize(link: string) {
    return normalizeUrl(link, {
        normalizeProtocol: true,
        stripHash: true,
        removeQueryParameters: true,
        removeTrailingSlash: true,
        removeSingleSlash: true,
        forceHttps: true
    });
}

