import { load } from "cheerio";
import { isURL } from "validator";
import { normalize } from "../utils/normalize";

export function crawlContent(seed: string, content: string) {
    const $ = load(content);

    const links: Set<string> = new Set();
    const routes: Set<string> = new Set();

    $('a').each((_, element) => {
        try {
            const link = $(element).attr('href');
        
            if(!link) {
                return;
            }

            if(isURL(link)) {
                links.add(normalize(link));
            }

            const startsWithSlash = link.startsWith("/");
            if(startsWithSlash || (link.startsWith("http") && areTwoUrlsFromTheSameOrigin(seed, link))) {
                routes.add((startsWithSlash) ? seed + link : normalize(link))
            }
        } catch {}
    });

    return { links , routes };
}

export function areTwoUrlsFromTheSameOrigin(seed: string, link: string) {
    const baseUrl = new URL(seed);
    const potentialUrl = new URL(link);

    if(baseUrl.origin !== potentialUrl.origin) {
        return false;
    }

    return potentialUrl.pathname.startsWith(baseUrl.pathname);
}