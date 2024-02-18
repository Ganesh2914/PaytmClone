let zod=require('zod')

const signupSchema=zod.object({
    username:zod.string(),
    firstname:zod.string(),
    lastname:zod.string(),
    password:zod.string()
})

const updateBodySchema=zod.object({
    password:zod.string(),
    firstname:zod.string(),
    lastname:zod.string()
})

const signinBodySchema=zod.object({
    username:zod.string(),
    password:zod.string()
})
module.exports={
    signupSchema,updateBodySchema,signinBodySchema
}