import { Readable } from "stream"

export const buffer = async (readable: Readable) => {
    const chunks = []

    for await (const chunk of readable) {
        chunks.push(
            //se o tipo de chunk for string
            typeof chunk === "string" ? Buffer.from(chunk) : chunk
        );
    }

    return Buffer.concat(chunks);
    //incrementar tudo no array
}
