import { NextResponse } from "next/server";
import User from '@/app/models/user'
import joi from 'joi'
import bcryptjs from 'bcryptjs'

export async function POST(request:Request) {
    const body = await request.json()

    const usuarioSchema = joi.object().keys({
        fullname: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().min(6).required()
    })

    const { error, value } = usuarioSchema.validate(body)

    if(error){
        return NextResponse.json({
            message: error.message
        }, { status: 400 })
    }

    const userFound = await User.findOne({email: body.email})

    if(userFound) return NextResponse.json({
        message: 'Email already exists'
    },{ status: 400 })

    var hashPass = await bcryptjs.hash(body.password, 12)

    const user = new User({
        email: body.email,
        fullname: body.fullname,
        password: hashPass
    })

    await user.save()

    return NextResponse.json({ message: 'signup' })
}