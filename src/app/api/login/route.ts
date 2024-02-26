import { NextResponse } from "next/server";
import { prisma } from "../prisma";


export async function GET(req, res: NextResponse){
    const searchParams = req.nextUrl.searchParams
    const username = searchParams.get('u');
    const password = searchParams.get('p');
    try {
        const user = await prisma.user.findUniqueOrThrow({
            where:{
                username:username,
                password:password
            }
        })
        return NextResponse.json({id:user.id,username:username,isLoggedIn:true})
    } catch (error) {
        return NextResponse.json("user not exist")
    }
}
