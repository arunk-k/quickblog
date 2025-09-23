import Blog from '../models/Blog.js'
import fs from 'fs'
import imageKit from '../configs/imagekit.js'

export const addBlog = async (req, res) => {
    try {
        const { title, subTitle, description, category, isPublished } = JSON.parse(req.body.blog)
        const imageFile = req.file

        // Check if all fields are present 
        if (!title || !description || !category || !imageFile) {
            return res.json({ success: false, message: "Missing required fields" })
        }

        // Upload Image to ImageKit 
        const fileBuffer = fs.readFileSync(imageFile.path)
        const response = await imageKit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: "/blogs"
        })

        // optimization through imagekit URL transformation 
        const optimizedImageUrl = imageKit.url({
            path: response.filePath,
            transformation: [
                { quality: 'auto' }, // Auto compression
                { format: 'webp' }, // Convert to modern format
                { width: '1280' } //  Width resizing
            ]
        })

        const image = optimizedImageUrl

        await Blog.create({ title, subTitle, description, category, image, isPublished })

        res.json({ success: true, message: "Blog added successfully" })

    }
    catch (error) {
        res.json({ success: false, message: error.message })
    }
}