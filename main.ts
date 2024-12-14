import { Hono } from "hono";
import { Context } from "npm:hono@4.6.11";

const app = new Hono();
// CORS middleware
app.use("*", (c, next) => {
    c.header("Access-Control-Allow-Origin", "*");
    c.header("Access-Control-Allow-Methods", "GET, OPTIONS");
    c.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    return next();
});

// Get crypto price with query params
app.get("/v1/fortune", async (c) => {
    c.header("Cache-Control", "max-age=6000, s-max-age=6000");
    return fortune(c);
});

// Get crypto price with query params
app.get("/v1/ping", async (c) => {
    c.header("Cache-Control", "max-age=6000, s-max-age=6000");
    return fortune(c);
});

// Handle 404 Not Found
app.notFound((c) => {
    return c.json({ error: "Not Found" }, 404);
});

export function run() {
    return Deno.serve({ port: 8080 }, app.fetch);
}

// Run this immediately if this is the entrypoint to the program
// Useful for testing because we can import this file and run it
// with a function call when we're ready
if (import.meta.main) {
    run();
}

export { app };

async function fortune(c: Context) {
    const process = Deno.run({
        cmd: ["fortune"],
        stdout: "piped",
        stderr: "piped"
    });

    const output = await process.output();
    const decoder = new TextDecoder();
    const fortuneText = decoder.decode(output);

    process.close();

    return c.json({ fortune: fortuneText });
}