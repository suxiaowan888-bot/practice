/**
 * Data module for library management system
 * Demonstrates modern JavaScript data structures and manipulation
 */

// Sample book data
export const books = [
    {
        id: 1,
        title: "The Clean Coder",
        author: "Robert C. Martin",
        year: 2011,
        genre: "Programming",
        availability: { status: "available", location: "A1-23" }
    },
    {
        id: 2,
        title: "You Don't Know JS",
        author: "Kyle Simpson",
        year: 2014,
        genre: "Programming",
        availability: { status: "checked_out", dueDate: "2024-12-01" }
    },
    {
        id: 3,
        title: "Design Patterns",
        author: "Gang of Four",
        year: 1994,
        genre: "Software Engineering"
        // Note: availability is intentionally missing for some books
    },
    {
        id: 4,
        title: "Clean Architecture",
        author: "Robert C. Martin",
        year: 2017,
        genre: "Programming",
        availability: { status: "available", location: "A2-15" }
    }
];

// TODO: Create a Map for book categories and a Set for unique authors
// Map: "Programming" -> "Books about programming languages and techniques"
//      "Software Engineering" -> "Books about software design and architecture"
// Set: Extract all unique author names from the books array using spread operator
//export const categoryDescriptions = null; // Replace with your Map
//export const uniqueAuthors = new Set([...books.map(book => book.author)]);
export const categoryDescriptions = new Map([//use the map to store the decriptions
    ["Programming", "Books about programming languages and techniques"],
    ["Software Engineering", "Books about software design and architecture"]
]);
export const uniqueAuthors = new Set([...books.map(book => book.author)]);//use set
/**
 * TODO: Implement filterBooksByStatus and groupBooksByGenre functions
 * filterBooksByStatus: Use array filter method and optional chaining for availability
 * groupBooksByGenre: Return Map with genre as key, array of books as value
 */
export function filterBooksByStatus(bookArray, status) {
   return bookArray.filter(book => book.availability?.status === status);
}

export function groupBooksByGenre(bookArray) {
    const genreMap = new Map();
    
    for (const book of bookArray) {
        const genre = book.genre;
        if (!genreMap.has(genre)) {
            genreMap.set(genre, []);
        }
        genreMap.get(genre).push(book);
    }
    return genreMap;
}

/**
 * TODO: Create generator function and book summary function
 * bookTitleGenerator: Generator that yields each book title using for...of
 * createBookSummary: Use destructuring and template literals for formatted output
 * Example: "The Clean Coder by Robert C. Martin (2011) - Available at A1-23"
 */
export function* bookTitleGenerator(bookArray) {
    for (const book of bookArray) {
        yield book.title;
    }
}

export function createBookSummary(book) {
     const { title, author, year, availability } = book;
      const location = availability?.location;
    const status = availability?.status;
    const dueDate = availability?.dueDate;
    let statusText = '';
    
    if (status === 'available' && location) {
        statusText = ` - Available at ${location}`;
    } else if (status === 'checked_out' && dueDate) {
        statusText = ` - Checked out (Due: ${dueDate})`;
    } else {
        statusText = ' - Status unknown';
    }

    return `${title} by ${author} (${year}) - ${statusText}`;
}