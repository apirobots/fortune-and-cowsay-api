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
app.get("/v1/fortune/plain", async (c) => {
    c.header("Cache-Control", "max-age=1, s-max-age=1");
    return fortune(c);
});

/**
 * Generates a random fortune message displayed by a random ASCII cow
 */
app.get("/v1/fortune/cowsay", async (c) => {
    c.header("Cache-Control", "max-age=1, s-max-age=1");
    return fortuneCowsay(c);
});

/**
 * Generates a random fortune message displayed by a random ASCII cow
 */
app.get("/v1/fortune/random-cow", async (c) => {
    c.header("Cache-Control", "max-age=1, s-max-age=1");
    return fortuneCowsayRandom(c);
});

/**
 * Generates a random ASCII cow with a message
 */
app.get("/v1/cowsay", async (c) => {
    c.header("Cache-Control", "max-age=36000, s-max-age=36000");
    const text = c.req.query("text") || "";
    return cowsay(c, text);
});

/**
 * Ping request to check if the server is up
 */
app.get("/v1/ping", async (c) => {
    c.header("Cache-Control", "max-age=1, s-max-age=1");
    return fortune(c);
});

/**
 * Handles 404 errors
 */
app.notFound((c) => {
    return c.json({ error: "Not Found" }, 404);
});

// Update fortune function
async function fortune(c: Context) {
    const command = new Deno.Command("fortune", {
        stdout: "piped",
        stderr: "piped"
    });
    
    const { stdout } = await command.output();
    const fortuneText = new TextDecoder().decode(stdout);
    
    return c.json({ fortune: fortuneText.trim() });
}

// Update fortuneCowsay function
async function fortuneCowsay(c: Context) {
    const command = new Deno.Command("sh", {
        args: ["-c", "fortune | cowsay"],
        stdout: "piped",
        stderr: "piped"
    });
    
    const { stdout } = await command.output();
    const cowText = new TextDecoder().decode(stdout);
    
    return c.json({ fortune: cowText.trim() });
}

async function fortuneCowsayRandom(c: Context) {
    const command = new Deno.Command("sh", {
        args: ["-c", "fortune | cowsay -f /app/cowfiles/$(ls /app/cowfiles | shuf -n 1)"],
        stdout: "piped",
        stderr: "piped"
    });

    const { stdout } = await command.output();
    const cowText = new TextDecoder().decode(stdout);

    return c.json({ fortune: cowText.trim() });
}

async function cowsay(c: Context, text: string) {
    function sanitizeText() {
        return text.replace(/[^a-zA-Z0-9 ]/g, "")
            .replace(/"/g, '\\"');
    }

    const sanitizedText = sanitizeText();
    const cmd = `echo "${sanitizedText}" | cowsay`;
    const command = new Deno.Command("sh", {
        args: ["-c", cmd],
        stdout: "piped",
        stderr: "piped"
    });

    const { stdout } = await command.output();
    const cowText = new TextDecoder().decode(stdout);

    return c.json({ fortune: cowText.trim() });
}