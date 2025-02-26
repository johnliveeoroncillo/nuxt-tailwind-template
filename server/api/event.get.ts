import { timeConsumingBackgroundTask } from "../events/sample"
import { ResponseHandler } from "../utils/response.handler";

export default defineEventHandler(async (event) => {
    event.waitUntil(timeConsumingBackgroundTask());
    return ResponseHandler.Ok();
})
