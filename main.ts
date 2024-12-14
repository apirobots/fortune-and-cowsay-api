import { Hono } from "hono";
import { Context } from "npm:hono@4.6.11";

const app = new Hono();
/**
 * Starts the HTTP server on port 8080
 * @returns {Promise<Deno.Server>} The Deno server instance
 */
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


// CORS middleware
app.use("*", (c, next) => {
    c.header("Access-Control-Allow-Origin", "*");
    c.header("Access-Control-Allow-Methods", "GET, OPTIONS");
    c.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    return next();
});

/**
 * Generates a random fortune message
 */
app.get("/v1/fortune", async (c) => {
    c.header("Cache-Control", "max-age=6000, s-max-age=6000");
    return fortune(c);
});

/**
 * Generates a random fortune message displayed by a random ASCII cow
 */
app.get("/v1/cowsay", async (c) => {
    c.header("Cache-Control", "max-age=6000, s-max-age=6000");
    return fortuneCowsay(c);
});

/** 
 * Ping request to check if the server is up
 */
app.get("/v1/ping", async (c) => {
    c.header("Cache-Control", "max-age=6000, s-max-age=6000");
    return fortune(c);
});

/**
 * Handles 404 errors
 */
app.notFound((c) => {
    return c.json({ error: "Not Found" }, 404);
});


/**
 * Generates a random fortune message
 * @param {Context} c - The Hono context object
 * @returns {Promise<Response>} JSON response containing the fortune message
 * @throws {Error} If fortune command fails
 */
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

/**
 * Generates a random fortune message displayed by a random ASCII cow
 * @param {Context} c - The Hono context object
 * @returns {Promise<Response>} JSON response containing the cow saying a fortune
 * @throws {Error} If fortune or cowsay commands fail
 */
async function fortuneCowsay(c: Context) {
    const process = Deno.run({
        cmd: ["sh", "-c", "fortune | cowsay -r"],
        stdout: "piped",
        stderr: "piped"
    });

    const output = await process.output();
    const decoder = new TextDecoder();
    const cowText = decoder.decode(output);

    process.close();

    return c.json({ cow: cowText });
}