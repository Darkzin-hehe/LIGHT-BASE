//Base feita pelo  ™ 𝑫𝜜𝑹𝑲✞
//Kiba nn xereka

const p = '!'
const dono = '5517996690040'
const bot = 'LIGHT_V4'

const fs = require('fs')
const Pino = require('pino')
const chalk = require('chalk')
const cfonts = require('cfonts')
const type = require('typescript')
const encodeUrl = require('encodeurl')
const ffmpeg = require('fluent-ffmpeg')
const PropTypes = require ('prop-types')

const { default: makeWASocket, downloadContentFromMessage,
DisconnectReason, useSingleFileAuthState } = require ('@adiwajshing/baileys')

const { state, saveState } = useSingleFileAuthState('light_base.json') 

const { getGroupAdmins , banner, color } = require('./arquivos/functions.js')

async function Lightzin () {
console.log(banner.string)
const light = makeWASocket({
logger: Pino({ level: 'silent' }),printQRInTerminal: true,auth: state})
light.ev.on('connection.update', (update) => {
const { connection, lastDisconnect } = update
if(connection === 'close') {
const shouldReconnect = (lastDisconnect.error)?.output?.statusCode !== DisconnectReason.loggedOut
console.log ('connection closed due to ', lastDisconnect.error)
if(shouldReconnect) {Lightzin()}
} else if(connection === 'open') {
console.log('Conectado !')}})
light.ev.on('messages.upsert', async blk => {

const mek =  blk.messages ? blk.messages[0]: blk.messages[1]
await light.sendReadReceipt(mek.key.remoteJid, mek.key.participant, [mek.key.id])
if (!mek.key.participant) mek.key.participant = mek.key.remoteJid
mek.key.participant = mek.key.participant.replace(/:[0-9]+/gi, "")
if (!mek.message) return
const fromMe = mek.key.fromMe
const content = JSON.stringify(mek.message)
const from = mek.key.remoteJid
const type = Object.keys(mek.message).find((key) => !["senderKeyDistributionMessage", "messageContextInfo"].includes(key))

const body = (type === "conversation" &&
mek.message.conversation.startsWith(p)) ?
mek.message.conversation: (type == "imageMessage") &&
mek.message[type].caption.startsWith(p) ?
mek.message[type].caption: (type == "videoMessage") &&
mek.message[type].caption.startsWith(p) ?
mek.message[type].caption: (type == "extendedTextMessage") &&
mek.message[type].text.startsWith(p) ?
mek.message[type].text: (type == 'buttonsResponseMessage') ? mek.message.buttonsResponseMessage.selectedButtonId : 
(type == "listResponseMessage") &&
mek.message[type].singleSelectReply.selectedRowId ?
mek.message.listResponseMessage.singleSelectReply.selectedRowId: (type == "templateButtonReplyMessage") ?
mek.message.templateButtonReplyMessage.selectedId: (type === "messageContextInfo") ?
mek.message[type].singleSelectReply.selectedRowId: (type == "light.sendMessageButtonMessage") &&
mek.message[type].selectedButtonId ?
mek.message[type].selectedButtonId: (type == "stickerMessage") && ((mek.message[type].fileSha256.toString("base64")) !== null && (mek.message[type].fileSha256.toString("base64")) !== undefined) ? (mek.message[type].fileSha256.toString("base64")): ""
const budy = (type === "conversation") ?
mek.message.conversation: (type === "extendedTextMessage") ?
mek.message.extendedTextMessage.text: ""

const args = body.trim().split(/ +/).slice(1)
const q = args.join(' ')
const comando = body.slice(1).trim().split(/ +/).shift().toLowerCase()
const isCmd = body.startsWith(p)
const enviar = (text) => {light.sendMessage(from, {text: text}, { quoted: mek})}

const isGroup = from.endsWith("@g.us")
const groupMetadata = isGroup ? await light.groupMetadata(from): ""
const groupName = isGroup ? groupMetadata.subject: ""
const sender = isGroup ? mek.key.participant: mek.key.remoteJid
const pushname = mek.pushName || "No Name"
const groupMembers = isGroup ? groupMetadata.participants : ''
const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
const isGroupAdmins = isGroup ? groupAdmins.includes(sender) : ''
const groupDesc = isGroup ? groupMetadata.desc : ''
const criador = `${dono}@s.whatsapp.net`
const isOwner = criador.includes(sender)

if(!isGroup && isCmd) console.log(`┃
┃ ┏━━━━━━${color(`𝗖𝗢𝗠𝗔𝗡𝗗𝗢 𝗡𝗢 𝗣𝗩`)}
┃ ┃${color(`𝙲𝙾𝙼𝙰𝙽𝙳𝙾 :`)} ${comando}
┃ ┃${color(`𝙽𝙾𝙼𝙴 :`)} ${pushname}
┃ ┗━━━━━━━━━━━━━━━━━━━━━━━\n┃`)

if(!isCmd && !isGroup)
console.log(`┃
┃ ┏━━━━━━${color(`𝗠𝗘𝗡𝗦𝗔𝗚𝗘𝗠 𝗡𝗢 𝗣𝗩`)}
┃ ┃${color(`𝙼𝙴𝙽𝚂𝙰𝙶𝙴𝙼 :`)} ${budy}
┃ ┃${color(`𝙽𝙾𝙼𝙴 :`)} ${pushname}
┃ ┗━━━━━━━━━━━━━━━━━━━━━━━\n┃`)

if(isCmd && isGroup)
console.log(`┃
┃ ┏━━━━━━${color(`𝗖𝗢𝗠𝗔𝗡𝗗𝗢 𝗘𝗠 𝗚𝗥𝗨𝗣𝗢`)}
┃ ┃${color(`𝙲𝙾𝙼𝙰𝙽𝙳𝙾︎ :`)} ${comando}
┃ ┃${color(`𝙶𝚁𝚄𝙿𝙾︎ :`)} ${groupName}
┃ ┃${color(`𝙽𝙾𝙼𝙴︎ :`)} ${pushname}
┃ ┗━━━━━━━━━━━━━━━━━━━━━━━\n┃`)

if(!isCmd && isGroup) 
console.log(`┃
┃ ┏━━━━━━${color(`𝗠𝗘𝗡𝗦𝗔𝗚𝗘𝗠 𝗘𝗠 𝗚𝗥𝗨𝗣𝗢`)}
┃ ┃${color(`𝙶𝚁𝚄𝙿𝙾 :`)} ${groupName}
┃ ┃${color(`𝙽𝙾𝙼𝙴︎ :`)} ${pushname}
┃ ┃${color(`𝙼𝙴𝙽𝚂𝙰𝙶𝙴𝙼︎ :`)} ${budy}
┃ ┗━━━━━━━━━━━━━━━━━━━━━━━\n┃`)
try {
switch(comando) {

//case de texto
case 'texto':
light.sendMessage(from,{text: 'seu texto'})
break
//case de imagem
case 'image':
light.sendMessage(from,{image: {url:'https://telegra.ph/file/88a0d27a375350500c77a.jpg'}})
break
//case de imagem com texto e botão 
case 'botao':
butttons = [
  {buttonId: `${p}comando`, buttonText: {displayText: 'BOTÃO'}, type: 1},
  {buttonId: `${p}comando`, buttonText: {displayText: 'BOTÃO'}, type: 1},
  {buttonId: `${p}comando`, buttonText: {displayText: 'BOTÃO'}, type: 1}
]
buttonMessage = {
    image: {url: 'https://telegra.ph/file/88a0d27a375350500c77a.jpg'},
    caption: `Olá mestre @${pushname}`,
    footer: `texto com imagem e botão`,
    buttons: butttons,
    headerType: 4
}

light.sendMessage(from, buttonMessage)
break
//case de video
case 'video':
light.sendMessage(from,{video: fs.readFileSync('./pasta/video.mp4')})
break
//case de gif
case 'gif':
light.sendMessage(from,{video: fs.readFileSync('./pasta/gif.mp4'),gifPlayback: true})
break
//case de áudio 
case 'bot':
light.sendMessage(from,{audio: fs.readFileSync('./pasta/audio.mp3')})
break



}} catch(e) {
console.log(e)
enviar(e)}})}
Lightzin()


//deixa os créditos deu trabalho pra fzr saporra