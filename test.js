const { WASI } = require('wasi')

const wasiOptions = {
    args: process.argv,
    env: process.env
}

const wasi = new WASI(wasiOptions)

const fs = require('fs')

const loader = require('../JSON/node_modules/@assemblyscript/loader/umd/index')

const imports = {
    wasi_snapshot_preview1: wasi.wasiImport
}

const wasmModule = loader.instantiateSync(fs.readFileSync(__dirname + '/node.wasm'), imports)

wasi.start(wasmModule)