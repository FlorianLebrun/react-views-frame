/* eslint-disable import/no-namespace */
import Application, { extendApplication, Addons } from "../lib"

Application.installPlugin(Addons.Notification)
Application.installPlugin(Addons.Popup)

export default Application
