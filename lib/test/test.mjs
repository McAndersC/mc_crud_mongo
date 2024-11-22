import { write } from "../handlers/file.handler.mjs";

console.log('TEST Vi skriver "Hello" i en txt fil');

write("./lib/db/test.txt", "hello");