# Mission 11 - Online Bookstore

This project contains:

- `BookstoreApi` - ASP.NET Core Web API + EF Core + SQLite
- `bookstore-frontend` - React + Vite + TypeScript + Bootstrap

## Folder Structure

```
Mission 11  Assignment/
  Bookstore.sqlite
  BookstoreApi/
    Controllers/BooksController.cs
    Data/BookstoreContext.cs
    Models/Book.cs
    Program.cs
    appsettings.json
  bookstore-frontend/
    src/components/BookList.tsx
    src/types/Book.ts
    src/App.tsx
    src/main.tsx
```

## Backend Setup and Run

1. Open terminal in `BookstoreApi`
2. Run:

```bash
dotnet restore
dotnet run
```

API URL:

- `https://localhost:5000/api/books`

Supported query params:

- `pageSize` (default `5`)
- `pageNum` (default `1`)
- `sortOrder` (`asc` or `desc`, default `asc`)

Example:

`https://localhost:5000/api/books?pageSize=10&pageNum=2&sortOrder=desc`

## Frontend Setup and Run

1. Open terminal in `bookstore-frontend`
2. Run:

```bash
npm install
npm run dev
```

Frontend URL:

- `http://localhost:5173`

## Notes

- Bootstrap is installed and imported in `src/main.tsx`
- CORS allows frontend origins `http://localhost:5173` and `http://localhost:3000`
- Backend uses the provided SQLite schema and returns:

```json
{
  "books": [ ... ],
  "totalNumBooks": 0
}
```
