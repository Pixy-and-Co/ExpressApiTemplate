import { AsciiTable3 } from 'ascii-table3'
import { Route } from '#structs/route.mjs'
import recover from '#handlers/files.handler.mjs'

export default async function registerRoutes (app) {
    const files = recover('./routes', true)
    const table = new AsciiTable3('Routes')

    if (files.length === 0) {
        table.addRow('No data.')
        return console.log(table.toString().slice(0, -1))
    }

    for (const file of files) {
        if (file === 'register.mjs') continue

        try {
            let route = await import(`#routes/${file}`)
            route = route.default

            if (route instanceof Array) route.forEach(r => {
                registerRoute(app, r)
                table.addRow(r.method.toUpperCase(), r.path, '🔹', '')
            })
            else if (route instanceof Route) {
                registerRoute(app, route)
                table.addRow(route.method.toUpperCase(), route.path, '🔹', '')
            }
            else table.addRow('', `"${file}"`, '🔸', `Can't load a route which is not actually a route!`)
        } catch (e) {
            table.addRow('', `"${file}"`, '🔸', e.message)
        }
    }

    table.setHeading('Method', 'Name', 'Status', 'Error')
    console.log(table.toString().slice(0, -1))
}

export function registerRoute (app, route) {
    if (!route) throw new Error(`Can't register an undefined route!`)

    switch (route.method) {
        case 'get':
            app.get(route.path, route.middlewares, route.callback)
            break
        case 'post':
            app.post(route.path, route.middlewares, route.callback)
            break
        case 'put':
            app.put(route.path, route.middlewares, route.callback)
            break
        case 'delete':
            app.delete(route.path, route.middlewares, route.callback)
            break
        default:
            throw new Error(`Not implemented or invalid http method!`)
    }
}
