import Book from '../models/Book.js'
import { validationResult } from 'express-validator'

export const getAllBooks = async(req,res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 8
        const skip = (page-1)*limit

        const books = await Book.find().skip(skip).limit(limit).sort({createdAt: -1})
        const total = await Book.countDocuments()

        res.json({books,totalPages: Math.ceil(total / limit),currentPage:page})
    } catch (error) {
       res.status(500).json({msg:'Failed to fetch books'}) 
    }
}

export const getBookById = async (req, res) => {
    try {
      const book = await Book.findById(req.params.id)
      if (!book) return res.status(404).json({ msg: 'Book not found' })
      res.json(book)
    } catch (err) {
      res.status(500).json({ msg: 'Error fetching book' })
    }
  }

export const createBook = async (req,res) =>{
    const errors = validationResult(req)
    if(!errors.isEmpty()) return res.status(400).json({errors:errors.array()})

    const {title,author,description,coverImage} = req.body

    try {
        const newBook = new Book({title,author,description,coverImage})
        await newBook.save()
        res.status(201).json(newBook)
    } catch (error) {
        res.status(500).json({msg:'Failed to create book'})
    }
}