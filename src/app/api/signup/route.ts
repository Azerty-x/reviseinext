import { NextResponse } from "next/server";
import { prisma } from "../prisma";


export const POST = async (req:Request, res: Response) => {
    const body = await req.json()
    const { username, password } = body
    const isExist = await prisma.user.findUnique({where:{username:username}})
    if (isExist) {
        return NextResponse.json("user already exist")
    }
    const user = await prisma.user.create({data:{username:username, password:password}})
    return NextResponse.json({id:user.id,username:username, isLoggedIn:true})
};
export const DELETE = async (req:Request, res: Response) => {
    const body = await req.json()
    const { username, password } = body
    const isExist = await prisma.user.delete({where:{username:username}})
    if (isExist) {
        return NextResponse.json("user not exist")
    }
    return NextResponse.json({ok:200,message:"Success"})
};