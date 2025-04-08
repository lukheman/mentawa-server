import { nanoid } from "nanoid"

export function generateToken(): string {

    const token = nanoid(64)
    return token

}
