import { NextResponse } from "next/server";
import { prisma } from "../prisma";

export async function GET(req, res){
    const searchParams = req.nextUrl.searchParams
    
    const id = searchParams.get("id")
    const pages = searchParams.get("p")

    const pagesize = 10

    const total = await prisma.cours.count();
    const totalPages = Math.ceil(total / pagesize);
    const skip = (parseInt(pages) - 1) * pagesize;
    console.log(skip);
    

    if (id !== null) {
        try {
            const cours = await prisma.cours.findUniqueOrThrow({
                where:{
                    id:Number(id)
                }
            })
            return NextResponse.json({cours, "ok":"true"})
        } catch (error) {
            return NextResponse.json({"error":error})
        }
    } else {
        const onePart = await prisma.cours.findMany({
            orderBy:{createdAt:"desc"},
            skip,
            take:pagesize
        })
        return NextResponse.json({"ok":"true", "pages":totalPages,"data":onePart})
    }
}

export async function POST(req, res: NextResponse){
    const body = await req.json()
    const { author, title, description, content, datetime, isLoggedIn, category } = body
    if (isLoggedIn !== "true" || datetime === "0102") {
        return NextResponse.json({"error":"You are not allowed to make this request"})
    }else {
        const element = await prisma.cours.create({
            data:{
                author:author,
                title:title,
                description:description,
                content:content,
                category:category
            }
        })
        return NextResponse.json({"ok":"true", "createdElement": element})
    }
}

export async function PUT(req, res) {
    const body = await req.json()
    const { 
        id, 
        title = undefined, 
        description = undefined,
        content = undefined,
        likes = 0, 
        userLiked = undefined,
        isLoggedIn = "false", 
        datetime = "21",
        category
    } = body
    if (datetime === "21") {
        try {
            const cour = await prisma.cours.findUniqueOrThrow({where:{id:id}})
            const like = likes === 0 ? -1 : 1
            const newLikes = cour.likes+like === 0 ? 0 : cour.likes+like
            const updateData = {
                id:id,
                title: title || cour.title,
                description: description || cour.description,
                content: content || cour.content,
                likes: newLikes,
                userLiked: userLiked !== undefined ? likes === 0 ? cour.userLiked.filter(item => item !== userLiked) : [...cour.userLiked, userLiked] : cour.userLiked,
                category: category || cour.category
            }
            const update = await prisma.cours.update({
                where: {
                    id:id
                },
                data:updateData
            })
            return NextResponse.json({"ok":true, "oldData":cour,"newData":update})
        } catch (error) {
            return NextResponse.json({"error":error})
        }
    } else {
        if (isLoggedIn !== "true" || datetime === "0102") {
            return NextResponse.json({"error":"You are not authorized to edit an element without access"})
        }else {
            try {
                const cour = await prisma.cours.findUniqueOrThrow({
                    where:{
                        id:Number(id)
                    }
                })
                const updateCour = await prisma.cours.update({
                    where:{
                        id:Number(id)
                    },
                    data:{
                        title:title,
                        description:description,
                        content:content,
                        likes:Number(likes),
                        userLiked:userLiked,
                        category:category
                    }
                })
                return NextResponse.json({"success": "Cours updated!", "old_data": cour, "new_data":updateCour})
            } catch (error) {
                return NextResponse.json({"error":error})
            }
        }
    }
    
}

export async function DELETE(req, res) {
    const body = await req.json()
    const { id, author, isLoggedIn, datetime } = body
    if ( isLoggedIn !== "true" || datetime === "0102") {
        return NextResponse.json({"error": "You are not allowed to make this request"})
    }else {
        try {
            const deletedElt = await prisma.cours.delete({
                where:{
                    id:id,
                    author:author
                }
            })
            return NextResponse.json({"Success":"true","message":"Successfuly deleted element", "data": deletedElt})
        } catch (error) {
            return NextResponse.json({"error":error})
        }
    }
}