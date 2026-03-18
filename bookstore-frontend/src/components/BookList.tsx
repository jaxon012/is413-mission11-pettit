import { useEffect, useState } from 'react'
import type { Book } from '../types/Book'

type SortOrder = 'asc' | 'desc'

interface BooksApiResponse {
  books: Book[]
  totalNumBooks: number
}

const API_BASE_URL = 'https://localhost:5000/api/books'

function BookList() {
  const [books, setBooks] = useState<Book[]>([])
  const [pageSize, setPageSize] = useState<number>(5)
  const [pageNum, setPageNum] = useState<number>(1)
  const [totalItems, setTotalItems] = useState<number>(0)
  const [totalPages, setTotalPages] = useState<number>(0)
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc')

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch(
        `${API_BASE_URL}?pageSize=${pageSize}&pageNum=${pageNum}&sortOrder=${sortOrder}`,
      )

      if (!response.ok) {
        throw new Error('Failed to fetch books from API')
      }

      const data: BooksApiResponse = await response.json()
      setBooks(data.books)
      setTotalItems(data.totalNumBooks)
    }

    fetchBooks().catch((error) => {
      console.error(error)
      setBooks([])
      setTotalItems(0)
    })
  }, [pageSize, pageNum, sortOrder])

  useEffect(() => {
    setTotalPages(Math.ceil(totalItems / pageSize))
  }, [totalItems, pageSize])

  return (
    <div className="container py-4">
      <h1 className="mb-4">Online Bookstore</h1>

      <div className="row g-3 mb-4">
        <div className="col-auto">
          <label htmlFor="pageSize" className="form-label">
            Books per page
          </label>
          <select
            id="pageSize"
            className="form-select"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value))
              setPageNum(1)
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select>
        </div>

        <div className="col-auto">
          <label htmlFor="sortOrder" className="form-label">
            Sort by title
          </label>
          <select
            id="sortOrder"
            className="form-select"
            value={sortOrder}
            onChange={(e) => {
              setSortOrder(e.target.value as SortOrder)
              setPageNum(1)
            }}
          >
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </select>
        </div>
      </div>

      <p className="text-muted">Total books: {totalItems}</p>

      <div className="row g-3">
        {books.map((book) => (
          <div className="col-12 col-md-6 col-lg-4" key={`${book.isbn}-${book.title}`}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{book.title}</h5>
                <p className="card-text mb-1">
                  <strong>Author:</strong> {book.author}
                </p>
                <p className="card-text mb-1">
                  <strong>Publisher:</strong> {book.publisher}
                </p>
                <p className="card-text mb-1">
                  <strong>ISBN:</strong> {book.isbn}
                </p>
                <p className="card-text mb-1">
                  <strong>Classification:</strong> {book.classification}
                </p>
                <p className="card-text mb-1">
                  <strong>Category:</strong> {book.category}
                </p>
                <p className="card-text mb-1">
                  <strong>Pages:</strong> {book.pageCount}
                </p>
                <p className="card-text">
                  <strong>Price:</strong> ${book.price.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="d-flex align-items-center gap-2 mt-4 flex-wrap">
        <button
          className="btn btn-outline-primary"
          onClick={() => setPageNum((current) => current - 1)}
          disabled={pageNum === 1}
        >
          Previous
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i + 1}
            className={`btn ${pageNum === i + 1 ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setPageNum(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        <button
          className="btn btn-outline-primary"
          onClick={() => setPageNum((current) => current + 1)}
          disabled={pageNum === totalPages || totalPages === 0}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default BookList
