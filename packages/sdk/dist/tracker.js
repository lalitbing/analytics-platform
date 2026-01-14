import { saveEvent, getAllEvents, clearEvents } from "./buffer.js";
export class Analytics {
    constructor(key, url) {
        this.apiKey = key;
        this.endpoint = url;
        this.bootstrap();
    }
    bootstrap() {
        window.addEventListener("online", () => this.flush());
    }
    async track(event, props = {}) {
        const payload = {
            event,
            properties: props,
            ts: Date.now()
        };
        if (!navigator.onLine) {
            await saveEvent(payload);
            return;
        }
        try {
            await fetch(this.endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": this.apiKey
                },
                body: JSON.stringify(payload)
            });
        }
        catch {
            await saveEvent(payload);
        }
    }
    async flush() {
        if (!navigator.onLine)
            return;
        const events = await getAllEvents();
        if (!events.length)
            return;
        try {
            await fetch(this.endpoint + "/batch", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": this.apiKey
                },
                body: JSON.stringify({ events })
            });
            await clearEvents();
        }
        catch (err) {
            console.log("Flush failed, will retry");
        }
    }
}
