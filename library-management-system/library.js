/**
 * Library management module demonstrating modern JavaScript features
 */

import { books, categoryDescriptions, uniqueAuthors, filterBooksByStatus, groupBooksByGenre } from './data.js';

/**
 * LibraryManager class demonstrating modern JavaScript class features
 */
export class LibraryManager {
    #statistics = {}; // Private field for storing statistics

    constructor(initialBooks = []) {
        this.books = [...initialBooks]; // Shallow copy using spread
        this.#updateStatistics();
    }

    /**
     * TODO: Implement addBooks method using rest parameters and search functionality
     * addBooks(...newBooks): Add multiple books using spread operator, update statistics
     * searchBooks({title, author, genre} = {}, caseSensitive = false): Search with destructuring and optional chaining
     */
    addBooks(...newBooks) {
        this.books.push(...newBooks);
        this.#updateStatistics();
        return this.books.length;
    }

    searchBooks({ title, author, genre } = {}, caseSensitive = false) {
        return this.books.filter(book => {
        // if have lowercase or not
        const bookTitle = caseSensitive ? book.title : book.title.toLowerCase();
        const bookAuthor = caseSensitive ? book.author : book.author.toLowerCase();
        const searchTitle = caseSensitive ? (title || '') : (title || '').toLowerCase();
        const searchAuthor = caseSensitive ? (author || '') : (author || '').toLowerCase();
        
        // the matching condition
        const matchesTitle = !title || bookTitle.includes(searchTitle);
        const matchesAuthor = !author || bookAuthor.includes(searchAuthor);
        const matchesGenre = !genre || book.genre === genre;
        
        return matchesTitle && matchesAuthor && matchesGenre;
    });

    }

    /**
     * TODO: Implement getStatistics and updateBook methods
     * getStatistics(): Return computed statistics object with total, available, checked out counts
     * updateBook(book, updates): Use logical assignment operators (??=, ||=, &&=)
     */
    getStatistics() {
         const genres = new Set(this.books.map(book => book.genre));
    
    return {
        ...this.#statistics,  
        genres: genres.size,   
        byGenre: this.books.reduce((acc, book) => {
            const genre = book.genre;
            acc[genre] = (acc[genre] || 0) + 1;
            return acc;
        }, {})
    };
    }

    updateBook(book, updates) {
         if (!book) return null;
    
    // only in null/undefined
    book.year ??= updates.year;
    
    // only in falsy 
    book.title ||= updates.title;
    book.author ||= updates.author;

    // &&= only in truthy
    if (book.availability && updates.availability) {
        book.availability.status &&= updates.availability.status;
    }
    
    this.#updateStatistics();
    return book;
    }

    /**
     * TODO: Implement higher-order functions and memoization
     * createBookFormatter(formatter): Return function that applies formatter to book arrays
     * memoize(fn): Use Map to cache function results
     */
    #updateStatistics() {
        // Calculate statistics and store in private field
        this.#statistics = {
            total: this.books.length,
            available: this.books.filter(book => book.availability?.status === 'available').length,
            checkedOut: this.books.filter(book => book.availability?.status === 'checked_out').length
        };
    }

}
export const createBookFormatter = (formatter) => {
     return (bookArray) => {
        return bookArray.map(book => formatter(book));
    };
};

export const memoize = (fn) => {
     const cache = new Map();
    
    return (...args) => {
        const key = JSON.stringify(args);
        
        if (cache.has(key)) {
            console.log('📦 Returning cached result');
            return cache.get(key);
        }
        
        console.log('🔄 Computing new result');
        const result = fn(...args);
        cache.set(key, result);
        return result;
    };
};

// Export default library instance
export default new LibraryManager(books);