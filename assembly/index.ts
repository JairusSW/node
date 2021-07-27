import { Buffer } from "./buffer";

import { console } from "./console"

import { fs } from "./fs";

console.log('hello world')

console.log(1234567890)

console.log(true)

console.log(false)

console.log(['Hello', 'World'])

const map = new Map<string, string>()

map.set('hello', 'world')

console.log(map)

console.log(Buffer.from('Hello World'))

console.log(new Uint8Array(5))

fs.writeFileSync('./helloworld.txt', Buffer.from('Hello World!'))