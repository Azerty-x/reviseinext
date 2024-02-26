import { NextResponse } from "next/server";
import { prisma } from "../prisma";


export const POST = async (req:Request, res: Response) => {
    console.log("POST REQUEST");
    const body = await req.json()
    const { username, password } = body
    const isExist = await prisma.user.findUnique({where:{username:username}})
    if (isExist) {
        return NextResponse.json("user already exist")
    }
    const user = await prisma.user.create({data:{username:username, password:password}})
    return NextResponse.json({id:user.id,username:username, isLoggedIn:true})
};