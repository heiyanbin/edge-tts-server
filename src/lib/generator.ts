import fs from "fs"
import path from "path"
import { execSync } from "child_process"
import { innerVoices } from "./voice"

const publicPath = path.resolve("public")
const audioPath = path.join(publicPath, "a")

export const generateTTS = (text: string, voice: string) => {
    if (!fs.existsSync(publicPath)) {
        fs.mkdirSync(publicPath)
    }

    if (!fs.existsSync(audioPath)) {
        fs.mkdirSync(audioPath)
    }

    const ts = Date.now()
    const f_name = `${ts}.mp3`
    const s_name = `${ts}.srt`

    if (!innerVoices.includes(voice)) {
        throw new Error("Invalid voice")
    }
    //const proxy_arg = process.env.http_proxy ? `--proxy ${process.env.http_proxy}` : " "
    execSync(
        `edge-tts --voice ${voice} --text "${text}"  --write-subtitles ${path.join(audioPath, s_name)} --write-media ${path.join(
            audioPath,
            f_name
        )}`
    )

    return [`/a/${f_name}`, `/a/${s_name}`]
}
