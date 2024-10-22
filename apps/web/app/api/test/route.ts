import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    console.log("req is ", req);
    return NextResponse.json(req);
    
}