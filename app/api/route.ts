import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET() {
    try {



        const stores = await prismadb.store.findMany({
            orderBy:{
                createdAt: "desc"
            },
            include:{
                products: true,
                categories: true,
                sizes: true,
                colors: true
            }
        })

        return NextResponse.json(stores)

    } catch (err) {
        console.log("[STORES_GET]", err);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function POST(
    req: Request
) {
    try {

        const { userId } = auth();
        const body = await req.json();

        const { name } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        };

        if (!name) {
            return new NextResponse("Name is required", { status: 400 })
        };

        const store = await prismadb.store.create({
            data: {
                name,
                userId
            }
        });

        return NextResponse.json(store);



    } catch (error) {
        console.log("[STORES_POST]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}