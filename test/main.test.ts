import { run } from "../main.ts"; // Adjust the import path as necessary
import { assert } from "https://deno.land/std@0.202.0/assert/assert.ts";
import { assertEquals } from "https://deno.land/std@0.202.0/assert/mod.ts";

const PORT = 8080;
const url = (vin: string) => new URL(`http://localhost:${PORT}/v1/vins/${vin}`);
run();


Deno.test("should return error for invalid VINs", async () => {
    const invalidVins = ["INVALIDVIN123", "5YJ1E7EB2MF111113"];
    for (const invalidVin of invalidVins) {
        const resp = await fetch(url(invalidVin), {
            method: "GET",
        });

        assertEquals(resp.status, 404);
        const body = await resp.json();
        assert(body.error !== undefined);
    }
});

Deno.test("should return Model S Plaid", async () => {
    const vins = [
        "5YJSA1E60MF443779",
        "5YJSA1E60MF452966",
        "5YJSA1E61MF454239",
        "5YJSA7E67PF494476",
        "5YJSA7E60PF508041",
        "5YJSA7E65RF532256",
        "5YJSA7E65RF532256",
        "5YJSA7E60PF508041",
        "5YJSA7E67PF494476"
    ];
    for (const invalidVin of vins) {
        const resp = await fetch(url(invalidVin), {
            method: "GET",
        });

        assertEquals(resp.status, 200);
        const body = await resp.json();
        console.debug(body);
        checkPropertiesNotNullOrUndefined(body);
        assertEquals(body.variant, "Plaid", `VIN: ${invalidVin}`);
        assertEquals(body.drive, "All-Wheel Drive", `VIN: ${invalidVin}`);
        assertEquals(body.trim, "Model S Plaid", `VIN: ${invalidVin}`);
    }
});

Deno.test("should return Model X Plaid", async () => {
    const vins = [
        "7SAXCBE60RF440266",
        "7SAXCBE6XRF452926",
        "7SAXCBE60RF440414"
    ];
    for (const invalidVin of vins) {
        const resp = await fetch(url(invalidVin), {
            method: "GET",
        });

        assertEquals(resp.status, 200);
        const body = await resp.json();
        console.debug(body);
        checkPropertiesNotNullOrUndefined(body);
        assertEquals(body.variant, "Plaid");
        assertEquals(body.drive, "All-Wheel Drive", `VIN: ${invalidVin}`);
        assertEquals(body.trim, "Model X Plaid", `VIN: ${invalidVin}`);
    }
});

Deno.test("should return model s Performance", async () => {
    const vins = [
        "5YJSA1E59RF543779",
        "5YJSA1E46LF403008",
        "5YJSA7E41LF369739",
        "5YJSA7E41LF369739",
        "5YJSA7E41LF369739"
    ];
    for (const invalidVin of vins) {
        const resp = await fetch(url(invalidVin), {
            method: "GET",
        });

        assertEquals(resp.status, 200);
        const body = await resp.json();
        checkPropertiesNotNullOrUndefined(body);
        assertEquals(body.variant, "Performance", `VIN: ${invalidVin}`);
        assertEquals(body.drive, "All-Wheel Drive", `VIN: ${invalidVin}`);
        assertEquals(body.trim, "Model S Performance", `VIN: ${invalidVin}`);
    }
});


Deno.test("should return model s long range", async () => {
    const vins = [
        "5YJSA1E21KF348111",
        "5YJSA1E52MF449591",
        "5YJSA1E52MF447307",
        "5YJSA1E52MF454810",
        "5YJSA1E54MF449110",
        "5YJSA1E25LF355998",
        "5YJSA7E29JF278679",
        "5YJSA1E59MF453136",
        "5YJSA1E2XKF335857",
        "5YJSA1E52MF455830",
        "5YJSA7E29LF406647"
    ];
    for (const invalidVin of vins) {
        const resp = await fetch(url(invalidVin), {
            method: "GET",
        });

        assertEquals(resp.status, 200);
        const body = await resp.json();
        checkPropertiesNotNullOrUndefined(body);
        assertEquals(body.variant, "Long Range", `VIN: ${invalidVin}`);
        assertEquals(body.drive, "All-Wheel Drive", `VIN: ${invalidVin}`);
        assertEquals(body.trim, "Model S Long Range", `VIN: ${invalidVin}`);
    }
});


// Deno.test("should return model s long range plus", async () => {
//     const vins = [
//         "5YJSA1E26LF414735",
//         "5YJSA1E25LF399984",
//         "5YJSA1E27LF412265",
//         "5YJSA1E28MF421087",
//         "5YJSA1E27LF415361",
//         "5YJSA1E25MF426473"
//     ];
//     for (const invalidVin of vins) {
//         const resp = await fetch(url(invalidVin), {
//             method: "GET",
//         });
//
//         assertEquals(resp.status, 200);
//         const body = await resp.json();
//         checkPropertiesNotNullOrUndefined(body);
//         assertEquals(body.variant, "Long Range Plus", `VIN: ${invalidVin}`);
//         assertEquals(body.drive, "All-Wheel Drive", `VIN: ${invalidVin}`);
//         assertEquals(body.trim, "Model S Long Range Plus", `VIN: ${invalidVin}`);
//     }
// });

Deno.test("should return model s 75d", async () => {
    const vins = [
        "5YJSA1E25JF295685",
    ];
    for (const invalidVin of vins) {
        const resp = await fetch(url(invalidVin), {
            method: "GET",
        });

        assertEquals(resp.status, 200);
        const body = await resp.json();
        checkPropertiesNotNullOrUndefined(body);
        assertEquals(body.variant, "75D", `VIN: ${invalidVin}`);
        assertEquals(body.drive, "All-Wheel Drive", `VIN: ${invalidVin}`);
        assertEquals(body.trim, "Model S 75D", `VIN: ${invalidVin}`);
    }
});

// Deno.test("should return model s 100d", async () => {
//     const vins = [
//         "5YJSA1E47KF302901", // 100D Ludicrous Performance
//         "5YJSA1E22KF306580" // 100d Long range
//
//     ];
//     for (const invalidVin of vins) {
//         const resp = await fetch(url(invalidVin), {
//             method: "GET",
//         });
//
//         assertEquals(resp.status, 200);
//         const body = await resp.json();
//         checkPropertiesNotNullOrUndefined(body);
//         assertEquals(body.variant, "100D", `VIN: ${invalidVin}`);
//         assertEquals(body.drive, "All-Wheel Drive", `VIN: ${invalidVin}`);
//         assertEquals(body.trim, "Model S 100D", `VIN: ${invalidVin}`);
//     }
// });

Deno.test("should return model X Performance", async () => {
    const vins = [
        "5YJXCBE48LF299434",
        "7SAXCDE53RF434285",
        "5YJXCBE48LF299434",
        "5YJXCDE42LF261726",
        "5YJXCAE47LF264703",
    ];
    for (const invalidVin of vins) {
        const resp = await fetch(url(invalidVin), {
            method: "GET",
        });

        assertEquals(resp.status, 200);
        const body = await resp.json();
        checkPropertiesNotNullOrUndefined(body);
        assertEquals(body.variant, "Performance", `VIN: ${invalidVin}`);
        assertEquals(body.drive, "All-Wheel Drive", `VIN: ${invalidVin}`);
        assertEquals(body.trim, "Model X Performance", `VIN: ${invalidVin}`);
    }
});

Deno.test("should return model X Long Range", async () => {
    const vins = [
        "5YJXCDE27KF205620",
        "5YJXCDE21LF234239",
        "5YJXCDE2XKF207801",
        "5YJXCAE21LF232229",
        "5YJXCDE28KF160932"
    ];
    for (const invalidVin of vins) {
        const resp = await fetch(url(invalidVin), {
            method: "GET",
        });

        assertEquals(resp.status, 200);
        const body = await resp.json();
        checkPropertiesNotNullOrUndefined(body);
        assertEquals(body.variant, "Long Range", `VIN: ${invalidVin}`);
        assertEquals(body.drive, "All-Wheel Drive", `VIN: ${invalidVin}`);
        assertEquals(body.trim, "Model X Long Range", `VIN: ${invalidVin}`);
    }
});

// Deno.test("should return model X Standard Range", async () => {
//     const vins = [
//         "5YJXCDE2XKF184634",
//     ];
//     for (const invalidVin of vins) {
//         const resp = await fetch(url(invalidVin), {
//             method: "GET",
//         });
//
//         assertEquals(resp.status, 200);
//         const body = await resp.json();
//         checkPropertiesNotNullOrUndefined(body);
//         assertEquals(body.variant, "Standard Range", `VIN: ${invalidVin}`);
//         assertEquals(body.drive, "All-Wheel Drive", `VIN: ${invalidVin}`);
//         assertEquals(body.trim, "Model X Standard Range", `VIN: ${invalidVin}`);
//     }
// });

// Deno.test("should return model X 75d", async () => {
//     const vins = [
//         "5YJXCDE24JF135931",
//     ];
//     for (const invalidVin of vins) {
//         const resp = await fetch(url(invalidVin), {
//             method: "GET",
//         });
//
//         assertEquals(resp.status, 200);
//         const body = await resp.json();
//         checkPropertiesNotNullOrUndefined(body);
//         assertEquals(body.variant, "75D", `VIN: ${invalidVin}`);
//         assertEquals(body.drive, "All-Wheel Drive", `VIN: ${invalidVin}`);
//         assertEquals(body.trim, "Model X 75D", `VIN: ${invalidVin}`);
//     }
// });

// FIXME cannot find difference between long range and long range plus
// Deno.test("should return model X long Range plus", async () => {
//     const vins = [
//         "5YJXCDE24MF311199",
//         "5YJXCDE21LF283456",
//         "5YJXCAE23LF298619",
//         "5YJXCDE23LF285676",
//         "5YJXCDE20LF303972",
//         "5YJXCDE28LF301144",
//         "5YJXCDE23LF297956",
//         "5YJXCDE21LF299348",
//         "5YJXCDE26LF250808",
//         "5YJXCAE21MF324538"
//     ];
//     for (const invalidVin of vins) {
//         const resp = await fetch(url(invalidVin), {
//             method: "GET",
//         });
//
//         assertEquals(resp.status, 200);
//         const body = await resp.json();
//         checkPropertiesNotNullOrUndefined(body);
//         assertEquals(body.variant, "Long Range Plus", `VIN: ${invalidVin}`);
//         assertEquals(body.drive, "All-Wheel Drive", `VIN: ${invalidVin}`);
//         assertEquals(body.trim, "Model X Long Range Plus", `VIN: ${invalidVin}`);
//     }
// });


Deno.test("should return model Y Performance", async () => {
    const vins = [
        "7SAYGDEF4RF053692",
        "7SAYGDEF4RF021678",
        "5YJYGDEF8MF272533",
    ];
    for (const invalidVin of vins) {
        const resp = await fetch(url(invalidVin), {
            method: "GET",
        });

        assertEquals(resp.status, 200);
        const body = await resp.json();
        checkPropertiesNotNullOrUndefined(body);
        assertEquals(body.variant, "Performance", `VIN: ${invalidVin}`);
        assertEquals(body.drive, "All-Wheel Drive", `VIN: ${invalidVin}`);
        assertEquals(
            body.trim,
            "Performance All-Wheel Drive",
            `VIN: ${invalidVin}`,
        );
    }
});

Deno.test("should return model y long range all wheel drive", async () => {
    const vins = [
        "5YJYGDEEXMF240920",
        "5YJYGDEEXMF299465",
        "7SAYGDEE0NF377577",
        "5YJYGDEE6MF306220",
        "5YJYGDEE3MF077673",
        "7SAYGDEE0NF350055",
        "7SAYGDEEXRA278770",
        "5YJYGDEE3LF052822",
        "5YJYGDEE8LF053383",
        "5YJYGDEE6MF069437",
        "5YJYGDEEXLF017338",
    ];
    for (const invalidVin of vins) {
        const resp = await fetch(url(invalidVin), {
            method: "GET",
        });

        assertEquals(resp.status, 200);
        const body = await resp.json();
        checkPropertiesNotNullOrUndefined(body);
        assertEquals(body.variant, "Long Range");
        assertEquals(body.drive, "All-Wheel Drive");
        assertEquals(body.trim, "Long Range All-Wheel Drive");
    }
});

Deno.test("should return model y long range rear", async () => {
    const vins = [
        "7SAYGDED8RF154104",
        "7SAYGDED8RF102696",
        "7SAYGDEDXRF109407",
    ];
    for (const invalidVin of vins) {
        const resp = await fetch(url(invalidVin), {
            method: "GET",
        });

        assertEquals(resp.status, 200);
        const body = await resp.json();
        checkPropertiesNotNullOrUndefined(body);
        assertEquals(body.variant, "Long Range", `VIN: ${invalidVin}`);
        assertEquals(body.drive, "Rear-Wheel Drive", `VIN: ${invalidVin}`);
        assertEquals(
            body.trim,
            "Long Range Rear-Wheel Drive",
            `VIN: ${invalidVin}`,
        );
    }
});


Deno.test("should return model y all wheel drive", async () => {
    const vins = [
        "7SAYGDEE4PA127534",
        "7SAYGDEE3PA129324",
        "7SAYGDEE6PA104157",
    ];
    for (const invalidVin of vins) {
        const resp = await fetch(url(invalidVin), {
            method: "GET",
        });

        assertEquals(resp.status, 200);
        const body = await resp.json();
        checkPropertiesNotNullOrUndefined(body);
        assertEquals(body.variant, "Standard Range", `VIN: ${invalidVin}`);
        assertEquals(body.drive, "All-Wheel Drive", `VIN: ${invalidVin}`);
        assertEquals(
            body.trim,
            "Model Y All-Wheel Drive",
            `VIN: ${invalidVin}`,
        );
    }
});

Deno.test("should return model y Standard Range Rear-Wheel Drive", async () => {
    const vins = [
        "5YJYGDED7MF173989",
        "5YJYGDED0MF181304",
        "5YJYGDEDXMF177034",
        "5YJYGDED2MF103879",
        "5YJYGDED2MF103879",
        "7SAYGDED8RF006289",
        "7SAYGDED6RF018764",
        "7SAYGDED9RF008472",
        "7SAYGDED0RF001829",
        "5YJYGDED6MF103139",
    ];
    for (const invalidVin of vins) {
        const resp = await fetch(url(invalidVin), {
            method: "GET",
        });

        assertEquals(resp.status, 200);
        const body = await resp.json();
        checkPropertiesNotNullOrUndefined(body);
        assertEquals(body.variant, "Standard Range", `VIN: ${invalidVin}`);
        assertEquals(body.drive, "Rear-Wheel Drive", `VIN: ${invalidVin}`);
        assertEquals(
            body.trim,
            "Model Y Rear-Wheel Drive",
            `VIN: ${invalidVin}`,
        );
    }
});

function checkPropertiesNotNullOrUndefined(obj: any) {
    const properties = [
        "battery_type",
        "body_type",
        "model",
        "motor",
        "vin_locations",
        "location_of_manufacture",
        "restraint_systems",
        "serial_number",
        "manufacturer",
        "year",
        "vin",
        "make",
        "variant",
        "drive",
        "trim",
    ];

    for (const property of properties) {
        if (
            obj[property] === null || obj[property] === undefined ||
            obj[property] === ""
        ) {
            throw new Error(`Property ${property} is null or undefined`);
        }
    }
}

Deno.test("Should return model 3 Performance all wheel drive", async () => {
    const vins = [
        "5YJ3E1EC5LF624065",
        "5YJ3E1EC0PF589859",
        "5YJ3E1ET7RF828522",
        "5YJ3E1EC6LF602575",
        "5YJ3E1EC9LF601338",
        "5YJ3E1EC4LF602588",
        "5YJ3E1EC6LF623815",
        // "5YJ3E1EBXKF419931", // maybe it is a long range, tesla website says it is a performance
        "5YJ3E1EC4MF088095",
        "5YJ3E1EC8MF037019",
        "5YJ3E1EC4NF103275",
        "5YJ3E1EC0NF103290",
        "5YJ3E1EC4MF077436",
        "LRW3E7ET6RC220665"
    ];
    for (const vin of vins) {
        const resp = await fetch(url(vin), {
            method: "GET",
        });

        assertEquals(resp.status, 200);
        const body = await resp.json();
        checkPropertiesNotNullOrUndefined(body);
        assertEquals(body.variant, "Performance", `VIN: ${vin}`);
        assertEquals(body.drive, "All-Wheel Drive", `VIN: ${vin}`);
        assertEquals(
            body.trim,
            "Performance All-Wheel Drive",
            `VIN: ${vin}`,
        );
    }
});

Deno.test("Should return model 3 long range all wheel drive", async () => {
    const vins = [
        "5YJ3E1EB6JF119382",
        "5YJ3E1EB4MF066301",
        "5YJ3E1EB4LF668050",
        "5YJ3E1EB5KF361517",
        "5YJ3E1EB9MF906931",
        "5YJ3E1EB3NF314619",
        "5YJ3E1EBXMF948122",
        "5YJ3E1EB2NF104559",
        "5YJ3E1EB2RF794142",
        "5YJ3E1EB6RF787128",
        "5YJ3E1EB2RF800912",
        "5YJ3E1EB6RF792278",
        "5YJ3E1EB1RF792897",
        "5YJ3E1EBXRF819269",
        "5YJ3E1EB6JF119382"
    ];
    for (const vin of vins) {
        const resp = await fetch(url(vin), {
            method: "GET",
        });

        assertEquals(resp.status, 200);
        const body = await resp.json();
        checkPropertiesNotNullOrUndefined(body);
        assertEquals(body.variant, "Long Range", `VIN: ${vin}`);
        assertEquals(body.drive, "All-Wheel Drive", `VIN: ${vin}`);
        assertEquals(
            body.trim,
            "Model 3 Long Range All-Wheel Drive",
            `VIN: ${vin}`,
        );
    }
});

Deno.test("Should return model 3 long range rear wheel drive", async () => {
    const vins = [
        "5YJ3E1EA0RF829025",
        "5YJ3E1EAXKF325135",
        "5YJ3E1EA6RF825318",
        "5YJ3E1EA6KF326329",
    ];
    for (const vin of vins) {
        const resp = await fetch(url(vin), {
            method: "GET",
        });

        assertEquals(resp.status, 200);
        const body = await resp.json();
        checkPropertiesNotNullOrUndefined(body);
        assertEquals(body.variant, "Long Range", `VIN: ${vin}`);
        assertEquals(body.drive, "Rear-Wheel Drive", `VIN: ${vin}`);
        assertEquals(
            body.trim,
            "Model 3 Long Range Rear-Wheel Drive",
            `VIN: ${vin}`,
        );
    }
});


Deno.test("Should return model 3 mid range rear wheel drive", async () => {
    const vins = [
        "5YJ3E1EA3JF163346",
        "5YJ3E1EA4JF152792",
    ];
    for (const vin of vins) {
        const resp = await fetch(url(vin), {
            method: "GET",
        });

        assertEquals(resp.status, 200);
        const body = await resp.json();
        checkPropertiesNotNullOrUndefined(body);
        assertEquals(body.variant, "Mid Range", `VIN: ${vin}`);
        assertEquals(body.drive, "Rear-Wheel Drive", `VIN: ${vin}`);
        assertEquals(
            body.trim,
            "Model 3 Mid Range Rear-Wheel Drive",
            `VIN: ${vin}`,
        );
    }
});

Deno.test("Should return model 3 standard plus range rear wheel drive", async () => {
    const vins = [
        "5YJ3E1EA2MF048175",
        "5YJ3E1EA9MF057746",
        "5YJ3E1EA7MF091071",
        "5YJ3E1EA4MF098446",
        "5YJ3E1EA5MF100298",
        "5YJ3E1EA8LF785248",
        "5YJ3E1EA5MF996490",
        "5YJ3E1EA0MF982609",
        "5YJ3E1EA5MF927668",
        "5YJ3E1EA0MF082714",
        "5YJ3E1EA5MF929792",
        "5YJ3E1EA5MF991578",
        "5YJ3E1EA5MF083129",
    ];
    for (const vin of vins) {
        const resp = await fetch(url(vin), {
            method: "GET",
        });

        assertEquals(resp.status, 200);
        const body = await resp.json();
        checkPropertiesNotNullOrUndefined(body);
        assertEquals(body.variant, "Standard Range Plus", `VIN: ${vin}`);
        assertEquals(body.drive, "Rear-Wheel Drive", `VIN: ${vin}`);
        assertEquals(
            body.trim,
            "Model 3 Standard Range Plus Rear-Wheel Drive",
            `VIN: ${vin}`,
        );
    }
});


Deno.test("Should return model 3 standard range rear wheel drive", async () => {
    const vins = [
        "5YJ3E1EA2RF746731",
        "5YJ3E1EA3NF122303",
        "5YJ3E1EA0PF646706",
        "5YJ3E1EA8RF731215",
        "5YJ3E1EA2RF728715",
        "5YJ3E1EA2RF773895",
        "5YJ3E1EA9RF770296",
        "5YJ3E1EA8PF535630",
        "5YJ3E1EA9PF411804",
        "5YJ3E1EA9PF506654",
        "5YJ3E1EA4PF571024",
        "5YJ3E1EA4NF101458",
        "5YJ3E1EA4NF117496",
        "5YJ3E1EAXNF112075",
        "5YJ3E1EA5NF119418"
    ];
    for (const vin of vins) {
        const resp = await fetch(url(vin), {
            method: "GET",
        });

        assertEquals(resp.status, 200);
        const body = await resp.json();
        checkPropertiesNotNullOrUndefined(body);
        assertEquals(body.variant, "Standard Range", `VIN: ${vin}`);
        assertEquals(body.drive, "Rear-Wheel Drive", `VIN: ${vin}`);
        assertEquals(
            body.trim,
            "Model 3 Rear-Wheel Drive",
            `VIN: ${vin}`,
        );
    }
});
