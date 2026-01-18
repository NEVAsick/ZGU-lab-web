const express = require('express')
const fs = require('fs')
const path = require('path')
const cors = require('cors')
const bodyParser = require('body-parser')

const DATA_FILE = path.join(__dirname, 'data', 'users.json')
const PORT = process.env.PORT || 3000

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(express.static(__dirname)) 


let users = []
try {
    const raw = fs.readFileSync(DATA_FILE, 'utf8')
    users = JSON.parse(raw)
} catch (e) {
    users = []
}


function save() {
    fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true })
    fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2), 'utf8')
}

function genAvatar(first, last) {
    const initials = ((first || '')[0] || '') + ((last || '')[0] || '')
    const bg = '#' + (Math.abs(hashCode((first + '|' + last))) % 0xFFFFFF).toString(16).padStart(6, '0')
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'>
        <rect width='100%' height='100%' fill='${bg}'/>
        <text x='50%' y='50%' font-size='72' fill='#fff' font-family='Arial,Helvetica,sans-serif' dominant-baseline='middle' text-anchor='middle'>${escapeHtml(initials).toUpperCase()}</text>
    </svg>`
    return 'data:image/svg+xml;base64,' + Buffer.from(svg).toString('base64')
}

function hashCode(str) {
    let h = 0
    for (let i = 0; i < str.length; i++) {
        h = (h << 5) - h + str.charCodeAt(i)
        h |= 0
    }
    return h
}

function escapeHtml(str) {
    return String(str || '').replace(/[&<>"']/g, function (m) {
        return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[m]
    })
}


app.get('/api/users', (req, res) => {
    const sort = req.query.sort || ''
    let out = [...users]
    if (sort === 'id_asc') out.sort((a, b) => a.id - b.id)
    else if (sort === 'id_desc') out.sort((a, b) => b.id - a.id)
    res.json({ items: out })
})


app.get('/api/users/:id', (req, res) => {
    const id = Number(req.params.id)
    const user = users.find(u => u.id === id)
    if (!user) return res.status(404).json({ error: 'Not found' })
    res.json({ user })
})


app.post('/api/users', (req, res) => {
    const body = req.body || {}
    const nextId = users.reduce((m, u) => Math.max(m, u.id || 0), 0) + 1
    const user = {
        id: nextId,
        first_name: body.first_name || 'Имя',
        last_name: body.last_name || 'Фамилия',
        photo_max_orig: genAvatar(body.first_name, body.last_name),
        photo_max: genAvatar(body.first_name, body.last_name),
        domain: body.domain || '',
        sex: body.sex || 0,
        city: body.city ? { title: body.city.title } : undefined,
        bdate: body.bdate,
        about: body.about
    }
    users.push(user)
    save()
    res.json({ user })
})


app.delete('/api/users/:id', (req, res) => {
    const id = Number(req.params.id)
    const idx = users.findIndex(u => u.id === id)
    if (idx === -1) return res.status(404).json({ error: 'Not found' })
    users.splice(idx, 1)
    save()
    res.json({ success: true })
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})
