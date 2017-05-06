/* eslint-disable import/no-namespace */
import * as Environment from "./environment"
import * as Storage from "./storage"
import * as Notification from "./notification"
import * as Kernel from "./kernel"
import { Application, extendApplication } from "./application"
import './css'

extendApplication(Environment)
extendApplication(Storage)
extendApplication(Notification)

Application.installFeatures(Kernel)

export default Application