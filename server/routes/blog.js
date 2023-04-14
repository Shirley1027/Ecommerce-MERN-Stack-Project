import express from "express";
import formidable from "express-formidable";

const router = express.Router();

import { requireSignin, isAdmin } from "../middwares/auth.js";
import {
  create,
  list,
  read,
  photo,
  remove,
  update,
  filteredBlogs,
  blogCounts,
  listBlogs,
  blogsSearch,
  relatedBlogs,
} from "../controllers/blog.js";

router.post("/blog", requireSignin, formidable(), create);
router.get("/blogs", list);
router.get("/blog/:slug", read);
router.get("/blog/photo/:blogId", photo);
router.delete("/blog/:blogtId", requireSignin, isAdmin, remove);
router.put("/blog/:blogId", requireSignin, isAdmin, formidable(), update);
router.post("/filtered-blogs", filteredBlogs);
router.get("/blogs-count", blogCounts);
router.get("/list-blogs/:page", listBlogs);
router.get("/blogs/search/:keyword", blogsSearch);
router.get("/related-products/:productId/:categoryId", relatedBlogs);




export default router;
