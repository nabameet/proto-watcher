# Proto Watcher CLI

Proto Watcher CLI is a command-line tool that watches for changes in Protocol Buffers (.proto) files and compiles them to TypeScript or JavaScript using the Protobuf.js library.

It is designed to help streamline the development process when working with Protocol Buffers in your project.

## Features

- Watch a folder for changes in .proto files.
- Compile .proto files to TypeScript or JavaScript.
- Specify the input proto folder, output folder, and target language (ts or js) using command-line options.

## Installation

Ensure you have Node.js installed. Then, you can use `npx` to run the Proto Watcher CLI without installing it globally.

```bash
npx proto-watcher -p <protoFolder> -o <outputFolder> -l <language>
```

- `-p, --proto <protoFolder>`: Specify the folder containing .proto files.
- `-o, --output <outputFolder>`: Specify the output folder for generated files.
- `-l, --language <language>`: Specify the target language (ts or js).

## Example

Here is an example of using Proto Watcher:

```bash
npx proto-watcher -p ./proto -o ./output -l ts
```

This command watches the `./proto` folder for changes in .proto files and compiles them to TypeScript, placing the generated files in the `./output` folder.

## Contributing

If you encounter any issues or have ideas for improvements, please feel free to open an issue or submit a pull request on the [GitHub repository](https://github.com/nabameet/proto-watcher).

## License

This project is licensed under the MIT License. See the [LICENSE](https://nabameet.mit-license.org/) for details.

Enjoy using Proto Watcher CLI for your Protocol Buffers development!
