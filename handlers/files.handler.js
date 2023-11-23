/**
 * Search all js files in a specified directory.
 * @author Loïc MAES
 * @year 2023
 */
const fs = require('fs')

function isDirectory (path) {
    return fs.lstatSync(path).isDirectory()
}

function recover (path, recursive) {
    const files = []

    fs.readdirSync(path).forEach(file => {
        const child = `${path}/${file}`

        if (file.includes('-lock.')) return
        if (recursive && isDirectory(child)) recover(`${child}/`, recursive).forEach(f => files.push(`${file}/${f}`))
        else if (file.endsWith('.js')) files.push(file)
    })

    return files
}

module.exports = {
    recover,
    isDirectory
}
