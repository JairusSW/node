import "wasi";

import { Buffer } from "../buffer";

import { FileSystem, Descriptor, FileStat } from "as-wasi";

import { console } from "../console";

export namespace fs {
    export function existSync(path: string): boolean {
        return changetype<boolean>(FileSystem.exists(path))
    }
    export function exists(path: string, callback: (exists: boolean) => void): void {
        callback(fs.existSync(path))
    }
    export function mkdirSync(path: string): void {
        FileSystem.mkdir(path)
    }
    export function mkdir(path: string, callback: () => void): void {
        fs.mkdirSync(path)
        callback()
    }
    export function writeFileSync(path: string, data: Buffer): void {
        const descriptor = FileSystem.open(path, 'w+')
        if (!descriptor) {
            throw new Error('File not found')
        }
        descriptor.writeString(data.toString('utf8'))
    }
}