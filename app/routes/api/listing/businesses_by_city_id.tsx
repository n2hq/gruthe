import { LoaderFunction } from "@remix-run/node";
import { query } from "../DB";
import { DoResponse } from "~/lib/lib";

export const loader: LoaderFunction = async ({ params }) => {
    const ITEMS_PER_PAGE = 20;
    const cityId = params.city_id;

    try {
        const rows: any = await query(`
                SELECT 
                    d.*, 
                    d.date_created,
                    d.gid, 
                    bg.image_url as bg_image_url_ext, 
                    bpi.image_url as profile_image_url_ext,
                    COALESCE(b.avg_rating, 0) as avg_rating,
                    COALESCE(b.count_of_rating, 0) as count_of_rating,
                    COALESCE(b.sum_of_rating, 0) as sum_of_rating,
                    b.*
                FROM tbl_dir d
                LEFT JOIN tbl_business_rating_summary b 
                    ON d.gid = b.business_guid
                LEFT JOIN tbl_business_profile_bg bg 
                    ON d.gid = bg.business_guid
                LEFT JOIN tbl_business_profile_image bpi
                    ON d.gid = bpi.business_guid
                WHERE 
                    d.city_id = ?
                    AND d.active_status = true
                ORDER BY 
                    d.featured DESC,
                    d.date_created DESC
                LIMIT 30;
        `, [cityId]);

        if (rows.length === 0) {
            return DoResponse(rows, 200);
        }



        return DoResponse(rows, 200);

    } catch (error: any) {
        return DoResponse({ error: error.message }, 500);
    }
};
