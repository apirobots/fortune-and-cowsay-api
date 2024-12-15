import { run } from "../main.ts";
import { assertEquals } from "https://deno.land/std@0.202.0/assert/assert_equals.ts";
import { assertExists } from "https://deno.land/std@0.202.0/assert/assert_exists.ts";

const PORT = 8080;
const baseUrl = `http://localhost:${PORT}/v1`;
run();

Deno.test("fortune endpoint returns fortune message", async () => {
    const resp = await fetch(`${baseUrl}/fortune`);
    assertEquals(resp.status, 200);
    const data = await resp.json();
    assertExists(data.fortune);
});

Deno.test("cowsay endpoint returns cow ASCII art", async () => {
    const resp = await fetch(`${baseUrl}/cowsay`);
    assertEquals(resp.status, 200);
    const data = await resp.json();
    assertExists(data.cow);
});

Deno.test("ping endpoint returns response", async () => {
    const resp = await fetch(`${baseUrl}/ping`);
    assertEquals(resp.status, 200);
    const data = await resp.json();
    assertEquals(resp.status, 200);
});

Deno.test("invalid endpoint returns 404", async () => {
    const resp = await fetch(`${baseUrl}/invalid`);
    assertEquals(resp.status, 404);
    const data = await resp.json();
    assertEquals(data.error, "Not Found");
});

Deno.test("CORS headers are present", async () => {
    const resp = await fetch(`${baseUrl}/fortune`);
    assertEquals(resp.status, 200);
    const data = await resp.json();
    assertEquals(resp.headers.get("Access-Control-Allow-Origin"), "*");
    assertEquals(resp.headers.get("Access-Control-Allow-Methods"), "GET, OPTIONS");
});