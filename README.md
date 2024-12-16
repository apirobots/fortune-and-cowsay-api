# Fortune and Cowsay API

This project provides an API that exposes fortune and cowsay Linux commands using Deno and Hono frameworks.

## What is this?

### Fortune

Fortune is a program that displays a random message of encouragement or humor. It's commonly found on Unix-like systems and is known for its motivational quotes and witty sayings.

### Cowsay

Cowsay is another popular Unix utility that displays ASCII art of a cow (or other animals) speaking the text you input. It's often used for humorous purposes in system administration and scripting.

## Features

- Built with Deno and Hono frameworks
- Exposes fortune and cowsay commands via API endpoints
- Uses cowfiles from the project directory

## How to use

To run this API locally:

```bash
./run.sh
```

This will start the server on `http://localhost:8080`.

## Free Public API

You can also use the free public API hosted on RapidAPI: [Fortune and Cowsay Public API](https://apirobots.pro/apis/fortune-and-cowsay-api/)

## 🚀 API Endpoints

### 1. Get Plain Fortune
```http
GET /v1/fortune/plain
```

Response:
```json
{
    "fortune": "\"I'm in Pittsburgh.  Why am I here?\"\n\t\t-- Harold Urey, Nobel Laureate"
}
```

### 2. Fortune with Cowsay
```http
GET /v1/fortune/cowsay
```

Response:
```json
{
    "fortune": "_________________________________________ \n/ Today's scientific question is: What in \\\n| the world is electricity?               |\n|                                         |\n| And where does it go after it leaves    |\n| the toaster?                            |\n|                                         |\n\\ -- Dave Barry, \"What is Electricity?\"   /\n ----------------------------------------- \n        \\   ^__^\n         \\  (oo)\\_______\n            (__)\\       )\\/\\\n                ||----w |\n                ||     ||"
}
```

### 3. Random Cow Fortune
```http
GET /v1/fortune/random-cow
```

Response:
```json
{
    "fortune": "________________________________________ \n/ User n.:                               \\\n|                                        |\n| A programmer who will believe anything |\n\\ you tell him.                          /\n ---------------------------------------- \n          \\      (__)      \n           \\     /oo|  \n            \\   (_\"_)*+++++++++*\n                   //I#\\\\\\\\\\\\\\\\I\\\n                   I[I|I|||||I I `\n                   I`I'///'' I I\n                   I I       I I\n                   ~ ~       ~ ~\n                     Scowleton"
}
```

### 4. Custom Cowsay Message
```http
GET /v1/cowsay?message=Hello%20Foobar
```

Response:
```json
{
    "fortune": "______________\n&lt; Hello Foobar &gt;\n --------------\n        \\   ^__^\n         \\  (oo)\\_______\n            (__)\\       )\\/\\\n                ||----w |\n                ||     ||"
}
```

## Project Structure

```markdown
project-root/
├─── main.ts
└── cowfiles/
    ├── cow1.txt
    ├── cow2.txt
    └── ...
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open-source and licensed under the MIT License.

## Cowfiles

- https://github.com/bkendzior/cowfiles 
- https://github.com/paulkaefer/cowsay-files

## Acknowledgments

- [Fortune](https://en.wikipedia.org/wiki/Fortune_(Unix_program))
- [Cowsay](https://en.wikipedia.org/wiki/Cowsay)
- [Deno](https://deno.land/)
- [Hono](https://hono.dev/)
