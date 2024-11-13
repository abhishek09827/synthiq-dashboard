// src/config/vapiClient.ts
import { VapiClient } from "@vapi-ai/server-sdk";

const client = new VapiClient({ token: process.env.VAPI_API_KEY });

export default client;