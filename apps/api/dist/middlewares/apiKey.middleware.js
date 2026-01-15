"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyApiKey = void 0;
const supabase_1 = require("../db/supabase");
const verifyApiKey = async (req, res, next) => {
    const key = req.header("x-api-key");
    if (!key) {
        console.log("❌ NO API KEY");
        return res.status(401).json({ error: "API key missing" });
    }
    const { data, error } = await supabase_1.supabase
        .from("projects")
        .select("*")
        .eq("api_key", key)
        .single();
    if (!data) {
        console.log("❌ INVALID KEY");
        return res.status(403).json({ error: "Invalid API key" });
    }
    req.project = data;
    next();
};
exports.verifyApiKey = verifyApiKey;
