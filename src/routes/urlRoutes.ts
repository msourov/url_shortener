import express, { Request, Response } from "express";
import shortid from "shortid";
import Url from "../models/Url";

const router = express.Router();

// Create a short URL
router.post("/shorten", async (req: Request, res: Response): Promise<any> => {
  console.log(req, res);

  const { original_url } = req.body;

  if (!original_url) {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    const short_url = shortid.generate();
    const newUrl = await Url.create({ original_url, short_url });
    return res.status(201).json(newUrl);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
    return res.status(500).json({ error: "Server error" });
  }
});

// Redirect to the original URL
router.get("/:short_url", async (req: Request, res: Response): Promise<any> => {
  console.log(typeof req, typeof res);

  try {
    const { short_url } = req.params;
    const url = await Url.findOne({ short_url });

    if (!url) {
      return res.status(404).json({ error: "URL not found" });
    }

    url.click_count += 1;
    await url.save();

    res.redirect(url.original_url);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;

router.get('/:short_url/analytics', async(req: Request, res: Response): Promise<any> => {
  const { short_url } = req.params;

  if (!short_url) {
    return res.status(404).json({ error: "URL not found" });
  }
  try {
    const response = await Url.findOne({short_url})
    res.json(response)
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
} )