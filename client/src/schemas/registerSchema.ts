import z from 'zod'

const RegisterSchema = z
.object({
    username: z
    .string({message: "Username must be a string"})
    .min(2, "Too short username")
    .max(200, "Too long username"),

    password: z
    .string()
    .min(4, "Too short password")
    .max(200, "Too long password"),

    paraphrase: z
    .string()
    .min(4, "Too short paraphrase")
    .max(400, "Too long paraphrase"),
})

export default RegisterSchema;