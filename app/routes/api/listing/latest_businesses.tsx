import { LoaderFunction } from "@remix-run/node";
import { query } from "../DB";
import { DoResponse } from "~/lib/lib";

export const loader: LoaderFunction = async ({ request }) => {
  const ITEMS_PER_PAGE = 36;

  try {
    const url = new URL(request.url);
    const page = Math.max(1, Number(url.searchParams.get("page")) || 1);
    const offset = (page - 1) * ITEMS_PER_PAGE;

    // 🔹 Count total rows
    const countResult: any = await query(`
      SELECT COUNT(*) AS total
      FROM tbl_dir d
      WHERE d.active_status = true
    `, []);

    const totalItems = countResult[0]?.total || 0;
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

    // 🔹 Fetch paginated data
    const rows: any = await query(`
      SELECT 
        d.*, 
        d.date_created,
        d.gid,
        bg.image_url AS bg_image_url_ext,
        bpi.image_url AS profile_image_url_ext,
        COALESCE(b.avg_rating, 0) AS avg_rating,
        COALESCE(b.count_of_rating, 0) AS count_of_rating,
        COALESCE(b.sum_of_rating, 0) AS sum_of_rating
      FROM tbl_dir d
      LEFT JOIN tbl_business_rating_summary b 
        ON d.gid = b.business_guid
      LEFT JOIN tbl_business_profile_bg bg 
        ON d.gid = bg.business_guid
      LEFT JOIN tbl_business_profile_image bpi
        ON d.gid = bpi.business_guid
      WHERE d.active_status = true
      ORDER BY d.date_created DESC
      LIMIT ? OFFSET ?
    `, [ITEMS_PER_PAGE, offset]);

    return DoResponse({
      items: rows,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems,
        itemsPerPage: ITEMS_PER_PAGE,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      }
    }, 200);

  } catch (error: any) {
    console.error("Pagination error:", error.message);
    return DoResponse({ error: error.message }, 500);
  }
};
