import { query } from "@/app/db";
import { NextResponse } from "next/server";

export async function DELETE(request: Request, { params }: { params: { id: String } }) {
    const id = params.id;
    const sql = `DELETE FROM tbl_product WHERE Id = ?`;
    try {
        const result = await query(sql, [id]);
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json(error);
    }
}
export async function GET(request: Request, { params }: { params: { id: String } }) {
    const id = params.id;
    const sql = `SELECT * FROM tbl_product WHERE Id = ?`;
    try {
        const result = await query(sql, [id]);
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json(error);
    }
}