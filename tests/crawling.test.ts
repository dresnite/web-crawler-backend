import { crawlContent } from "../src/services/crawling";

test("Should crawl the links correctly", () => {
    const seed = "https://website.com";

    const content = `
        <div>
            <a href="https://google.com">Google</a>
            <a href="https://pokemon.com">Pokemon</a>
            <div>
                <a href="/route">
                <div>
                    <a href="https://website.com/esoes">
                    <a href="http://website.com/repeated">
                    <a href="https://website.com/repeated">
                </div>
            </div>
        </div>
    `;

    const { links, routes } = crawlContent(seed, content);

    expect(Array.from(links).length).toBe(4);
    expect(Array.from(routes).length).toBe(3);
});