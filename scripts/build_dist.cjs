const child_process = require("child_process")
const fs = require("fs")
const Path = require("path")

const package_json = JSON.parse(fs.readFileSync("./package.json").toString())

function makeDirSync(...paths) {
  let path = paths[0]
  if (paths.length > 1) path = Path.join.apply(Path, paths)
  if (path && !fs.existsSync(path)) {
    makeDirSync(Path.parse(path).dir)
    fs.mkdirSync(path)
  }
  return path
}

function removeDirSync(dir_path) {
  if (fs.existsSync(dir_path)) {
    fs.readdirSync(dir_path).forEach(function (entry) {
      var entry_path = Path.join(dir_path, entry)
      if (fs.lstatSync(entry_path).isDirectory()) {
        removeDirSync(entry_path)
      } else {
        fs.unlinkSync(entry_path)
      }
    })
    fs.rmdirSync(dir_path)
  }
}

function copyFileSync(target, source) {
  try {
    var targetFile = target;

    //if target is a directory a new file with the same name will be created
    if (fs.existsSync(target)) {
      if (fs.lstatSync(target).isDirectory()) {
        targetFile = Path.join(target, Path.basename(source));
      }
    }

    fs.writeFileSync(targetFile, fs.readFileSync(source));
  } catch (e) {
    console.error("copyFileSync:", e.message)
  }
}

function copyDirSync(target, source, filter) {
  try {
    var files = [];

    //check if folder needs to be created or integrated
    makeDirSync(target)

    //copy
    if (fs.lstatSync(source).isDirectory()) {
      files = fs.readdirSync(source)
      files.forEach(function (filename) {
        var srcfile = Path.join(source, filename)
        var dstfile = Path.join(target, filename)
        if (fs.lstatSync(srcfile).isDirectory()) {
          copyDirSync(dstfile, srcfile, filter)
        }
        else if (!filter || filter(filename)) {
          copyFileSync(dstfile, srcfile)
        }
      });
    }
  } catch (e) {
    console.error("copyDirSync:", e.message)
  }
}

// 1. Clean 'dist' directory
removeDirSync("./dist")
makeDirSync("./dist")

// 2. Copy 'package.json'
fs.writeFileSync("./dist/package.json", JSON.stringify({
  name: package_json.name,
  version: package_json.version,
  type: "module",
  dependencies: package_json.dependencies,
  license: package_json.license,
  main: "./index.js",
}, null, 2))

// 2. Copy documentation
copyFileSync("./dist/readme.md", "./readme.md")
copyDirSync("./dist/doc", "./doc")

// 3. Copy css files
copyDirSync("./dist", "./src/lib", (name) => name.indexOf(".css") > 0)

// 4. Generate js files
child_process.execSync("tsc --project tsconfig.lib.json")
