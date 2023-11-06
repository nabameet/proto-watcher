#!/usr/bin/env node

const chokidar = require("chokidar");
const { exec } = require("child_process");
const yargs = require("yargs");
const path = require("path");

const options = yargs
  .options({
    proto: {
      alias: "p",
      describe: "Specify the folder containing .proto files",
      demandOption: true,
      type: "string",
    },
    output: {
      alias: "o",
      describe: "Specify the output folder for generated files",
      demandOption: true,
      type: "string",
    },
    language: {
      alias: "l",
      describe: "Specify the target language (ts or js)",
      choices: ["ts", "js"],
      demandOption: true,
      type: "string",
    },
  })
  .help()
  .alias("help", "h").argv;

const protoFolder = options.proto;
const outputFolder = options.output;
const targetLanguage = options.language;

const compileProtoToLanguage = (protoFilePath) => {
  const protoFileName = path.basename(protoFilePath, ".proto");
  const outputFilePathWithoutExtension = `${outputFolder}/${protoFileName}`;
  const generateJs = `npx pbjs -t static-module -w es6 -o ${outputFilePathWithoutExtension}.js ${protoFilePath}`;
  const generateTsDefinitions = `npx pbts -o ${outputFilePathWithoutExtension}.d.ts ${outputFilePathWithoutExtension}.js`;
  const cmd =
    targetLanguage === "js"
      ? generateJs
      : `${generateJs} && ${generateTsDefinitions}`;

  exec(cmd, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error compiling ${protoFilePath}: ${error.message}`);
      return;
    }
    console.log(`Compiled ${protoFilePath} to ${outputFolder}`);
  });
};

const watcher = chokidar.watch(protoFolder, {
  ignored: /(^|[/\\])\../, // Ignore hidden files
  persistent: true,
});

watcher
  .on("add", (path) => {
    if (path.endsWith(".proto")) {
      compileProtoToLanguage(path);
    }
  })
  .on("change", (path) => {
    if (path.endsWith(".proto")) {
      compileProtoToLanguage(path);
    }
  })
  .on("error", (error) => {
    console.error(`Watcher error: ${error}`);
  });

console.log(
  `Watching .proto files in ${protoFolder} and compiling to ${
    targetLanguage === "js" ? "JavaScript" : "TypeScript"
  } in ${outputFolder}`
);
