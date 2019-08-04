import installApplicationLayout from "./layout"
import { Application, extendApplication } from "./application"
import "./css"

installApplicationLayout(Application)

export { extendApplication }
export default Application
