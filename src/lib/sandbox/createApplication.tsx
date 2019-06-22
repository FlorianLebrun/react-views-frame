import { SandBox } from "./SandBox"

export default function createApplication(name: string, moduleId: string, externals: Object, callback: Function) {

  // Prepare the sandbox
  const sandbox = new SandBox(name)
  sandbox.imports(externals)

  // Install the application entry point
  const entry = sandbox.getModule(moduleId)
  const deffer = sandbox.installModule(entry)
  if (deffer) deffer.then((entry) => {
    callback && callback(entry)
  })
  else {
    callback && callback(entry)
  }
}
