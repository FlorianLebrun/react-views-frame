/* eslint-disable import/no-namespace */
import * as Frame from "./frame"
import * as Environment from "./environment"
import * as Storage from "./storage"
import * as Notification from "./notification"
import * as Layout from "./layout"
import { Application, extendApplication } from "./application"
import "../css"

extendApplication(Environment)
extendApplication(Storage)
extendApplication(Notification)

Application.installFeatures(Layout, true)
Application.layout = Layout.applicationLayout
Application.renderDisplayFrame = Frame.renderDisplayFrame

export default Application