import { pushToQueue } from "./redis.service"
import { supabase } from "../db/supabase"

export const ingestEvent = async (payload: any, useRedis: boolean = false) => {
  if (useRedis) {
    await pushToQueue(payload)
  } else {
    // Direct database insert without Redis
    await supabase.from("events").insert({
      project_id: payload.projectId,
      event_name: payload.event,
      user_id: payload.userId,
      session_id: payload.sessionId,
      properties: payload.properties
    })
  }
}
