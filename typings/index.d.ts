import { Awaitable, Client, Message, MessageEmbed } from "discord.js";

declare module "anti-phish-implementation" {
    export class Fish {
        public constructor (client: Client): this;
        
        //public on(event: 'phishingMessage', listener: (message: Message, data: Object) => Awaitable<void>): this;
        //public on(event: 'messageCreate', listener: (message: Message) => Awaitable<void>): this;
        //public on(event: string, listener: (...args: any[]) => Awaitable<void>): this; 
        
        //public once(event: 'phishingMessage', listener: (message: Message, data: Object) => Awaitable<void>): this;
        //public once(event: string, listener: (...args: any[]) => Awaitable<void>): this;

    }
}