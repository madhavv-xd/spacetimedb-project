// server/src/index.ts
import { serve } from "bun";

serve({
    port: 4000,
    fetch(req) {
     return new Response("Bun backend running 🚀");
    },
});