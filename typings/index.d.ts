import { Client } from "discord.js";

declare module "anti-phish-advanced" {
    export class Fish {
        init(client: Client, version: String): VoidFunction;
    }
}