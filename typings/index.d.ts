import { Client } from "discord.js";

declare module "anti-phish-advanced" {
    export interface Fish {
        init(client: Client): VoidFunction;
    }
}