import { Application } from "../application"

export default class Connector {
  fetchModule(guid: string): Promise<Object> | undefined {
    return Application.fetchAPI("app:/webfile.pack?guid=" + guid)
      .then((res) => {
        return res.json
      })
  }
  fetchFileInfos(name: string): Promise<Object> | undefined {
    return Application.fetchAPI("app:/model" + (name || "/"), {
      method: "GET",
      mode: "cors",
    })
      .then((res) => {
        return res.json
      })
  }
  createFileByName(name: string, descriptor: any) {
    if (typeof descriptor !== "object" ||
      typeof descriptor.type !== "string" ||
      typeof name !== "string"
    ) {
      throw new Error("bad create file arguments")
    }
    return Application.fetchAPI("app:/webfile/" + name, {
      method: "PUT",
      body: descriptor,
    })
  }
  deleteFileByName(name: string) {
    return Application.fetchAPI("app:/webfile/" + name, {
      method: "DELETE",
    })
  }
  writeFile(guid: string, resources: Object) {
    return Application.fetchAPI("app:/webfile?guid=" + guid, {
      method: "POST",
      body: resources,
    })
  }
  deleteFile(guid: string) {
    /*if (this.register[guid]) {
      // TODO: manage deletion of mounted file
    } */
    return Application.fetchAPI("app:/webfile?guid=" + guid, {
      method: "DELETE",
    })
  }
}
