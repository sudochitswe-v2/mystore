import { query } from "@/app/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: any) {
    const sql = "SELECT * FROM tbl_product ORDER BY Id DESC;"
    const result = await query(sql, "");
    try {
        return NextResponse.json(result)
    } catch (error) {
        return NextResponse.json(error);
    }
}
export async function PATCH(req: NextRequest) {
    const data = await req.formData();
    console.log(data);
    const sql = `UPDATE tbl_product SET Name = ?, BuyPrice = ?, SellPrice = ? WHERE Id = ? ;`
    const values = [
        data.get("name" || ""),
        data.get("buyPrice" || 0),
        data.get("sellPrice" || 0),
        data.get("id" || ""),
    ];
    try {
     var res =  await query(sql, values);
     console.log(res);
        return NextResponse.json({
            status: "success",
            message: "Successfully update"
        })
    } catch (error) {
        console.error("Error", error);
        return NextResponse.json({
            status: "error",
            message: "Error while updating",
            error
        });
    }
}