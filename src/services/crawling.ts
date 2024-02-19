import { load } from "cheerio";
import normalizeUrl from "normalize-url";
import { isURL } from "validator";

export function crawlContent(seed: string, content: string) {
    const $ = load(content);

    const links: Set<string> = new Set();
    const routes: Set<string> = new Set();

    $('a').each((_, element) => {
        const link = $(element).attr('href');
        
        if(!link) {
            return;
        }

        if(isURL(link)) {
            links.add(normalizeUrl(link));
        }

        const startsWithSlash = link.startsWith("/");
        if(startsWithSlash || areTwoUrlsFromTheSameOrigin(seed, link)) {
            routes.add((startsWithSlash) ? seed + link : normalizeUrl(link))
        }
    });

    return { links, routes };
}

export function areTwoUrlsFromTheSameOrigin(seed: string, link: string) {
    const baseUrl = new URL(seed);
    const potentialUrl = new URL(link);

    if(baseUrl.origin !== potentialUrl.origin) {
        return false;
    }

    return potentialUrl.pathname.startsWith(baseUrl.pathname);
}