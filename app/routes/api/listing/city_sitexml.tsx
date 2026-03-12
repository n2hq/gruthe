import { LoaderFunction } from "@remix-run/node"
import { DoResponse } from "~/lib/lib"
import { query } from "../DB"

export const loader: LoaderFunction = async ({ }) => {


    try {
        const rawdata: any = await query(`SELECT DISTINCT
            ci.name as city, ci.id
            FROM tbl_dir d, tbl_city ci 
            WHERE 
            d.city_id = ci.id`)

        return DoResponse(rawdata, 200)

    } catch (error: any) {
        return DoResponse({ "error": error.message }, 500)
    }

}