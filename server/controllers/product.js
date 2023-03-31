import Product from "../models/product.js";
import fs from "fs";
import slugify from "slugify";

export const create = async (req, res) => {
    try {
        // console.log(req.fields);
        // console.log(req.files);
        const { name, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;

        switch (true) {
            case !name.trim():
                return res.json({ err: "Name is required" });
            case !description.trim():
                return res.json({ err: "Decription is required" });
            case !price.trim():
                return res.json({ err: "Price is required" });
            case !category.trim():
                return res.json({ err: "Category is required" });
            case !quantity.trim():
                return res.json({ err: "Quantity is required" });
            case !shipping.trim():
                return res.json({ err: "Shipping is required" });
            case photo && photo.size > 1000000:
                return res.json({ err: "Image should be less than 1mb in size" });
        }

        //create product
        const product = new Product({ ...req.fields, slug: slugify(name) });

        if (photo) {
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.type;
        }

        await product.save();
        res.json(product);

    } catch (err) {
        console.log(err);
        return res.status(400).json(err.message);
    }
};


export const list = async (req, res) => {
    try {
        const products = await Product.find({})
            .populate("category")
            .select("-photo")
            .limit(12)
            .sort({ createdAt: -1 });
        res.json(products);

    } catch (err) {
        console.log(err);
    }
};

export const read = async (req, res) => {
    try {
        const product = await Product.findOne({ slug: req.params.slug })
            .select("-photo")
            .populate("category");
        res.json(product);
    } catch (err) {
        console.log(err);
    }
};

export const photo = async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId).select("photo");
        if (product.photo.data) {
            res.set("Content-type", product.photo.contentType);
            return res.send(product.photo.data);
        }
        res.json(product);
    } catch (err) {
        console.log(err);
    }
};

export const remove = async (req, res) => {
    try {
        const product = await Product.findByIdAndRemove(req.params.productId).select("-photo");
        res.json(product);
    } catch (err) {
        console.log(err);
    }
};

export const update = async (req, res) => {
    try {
        const { name, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;

        switch (true) {
            case !name.trim():
                res.json({ err: "Name is required" });
            case !description.trim():
                res.json({ err: "Decription is required" });
            case !price.trim():
                res.json({ err: "Price is required" });
            case !category.trim():
                res.json({ err: "Category is required" });
            case !quantity.trim():
                res.json({ err: "Quantity is required" });
            case !shipping.trim():
                res.json({ err: "Shipping is required" });
            case photo && photo.size > 1000000:
                res.json({ err: "Image should be less than 1mb in size" });
        }

        //update product
        const product = await Product.findByIdAndUpdate(req.params.productId, {
            ...req.fields,
            slug: slugify(name),
        },
            { new: true }
        );

        if (photo) {
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.type;
        }

        await product.save();
        res.json(product);

    } catch (err) {
        console.log(err);
        return res.status(400).json(err.message);
    }
};
