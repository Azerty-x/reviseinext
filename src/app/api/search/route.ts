import { NextResponse } from "next/server";
import { prisma } from "../prisma";



export async function GET(req,res) {
    
    const searchParams = req.nextUrl.searchParams
    const query = searchParams.get('q')
    const cat = searchParams.get('cat')
    
    try {
        const data = await prisma.cours.findMany({
            where: !cat ? {
                OR: [
                    {
                        title: {
                            contains:query,
                            mode: 'insensitive'
                        }
                    },
                    {
                        description: {
                            contains:query,
                            mode: 'insensitive'
                        }
                    }
                ]
            } : {
                category: cat
            }
        })
        return NextResponse.json({ok:200, data:data})
    } catch (error) {
        return NextResponse.json({ok:404, message:"Rien n'a été trouvé"})
    }
}