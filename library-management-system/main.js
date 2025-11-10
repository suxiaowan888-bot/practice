/**
 * Main entry point for the library management system
 * Demonstrates ES6 modules, async operations, and coordination of different modules
 */

import { books, filterBooksByStatus, groupBooksByGenre, bookTitleGenerator, createBookSummary } from './data.js';
import libraryManager, { LibraryManager, createBookFormatter, memoize } from './library.js';
import { displayStatistics, displayBooks, displaySearchResults, showBookAnalysis, formatAvailability } from './ui.js';

/**
 * TODO: Implement main application function and variable scoping demonstration
 * runLibraryDemo(): Coordinate all modules, handle null default export, show library features
 * demonstrateScoping(): Show let/const behavior, block scoping, temporal dead zone awareness
 */
async function runLibraryDemo() {
    console.log('🚀 Starting Library Management System Demo');
    console.log('='.repeat(50));

    try {
         const library = libraryManager || new LibraryManager(books);
        demonstrateScoping();
        
       
        console.log('\n === LIBRARY STATISTICS ===');
        const stats = library.getStatistics();
        displayStatistics(stats);
        
        displayBooks(books, 'All Books');
        
        console.log('\n === AVAILABLE BOOKS ===');
        const availableBooks = filterBooksByStatus(books, 'available');
        displayBooks(availableBooks, 'Available');
        
        console.log('\n === SEARCH DEMO ===');
        const searchResults = library.searchBooks({ title: 'Clean' });
        displaySearchResults(searchResults, { title: 'Clean' });
        
        showBookAnalysis(books);
        showGeneratorExample();
        demonstrateErrorHandling(library);
        
    } catch (error) {
        console.error('Application error:', error.message);
    } finally {
        console.log('\n✅ Demo completed!');
    }
}

function demonstrateScoping() {
    console.log('\n === VARIABLE SCOPING DEMO ===');
    
    const gen = bookTitleGenerator(books);
    
    console.log('Getting titles one by one:');
    console.log('1.', gen.next().value);
    console.log('2.', gen.next().value);
    console.log('3.', gen.next().value);
}

/**
 * TODO: Implement error handling and generator demonstrations  
 * demonstrateErrorHandling(library): Show try/catch, optional chaining, nullish coalescing
 * showGeneratorExample(): Use bookTitleGenerator to iterate through titles
 */
function demonstrateErrorHandling(library) {
    console.log('\n⚠️  === ERROR HANDLING DEMO ===');
    
    try {
        const book = books[0];
        const status = book?.availability?.status ?? 'unknown';
        console.log('Book status:', status);
        
        const missing = books[999];
        const missingStatus = missing?.availability?.status ?? 'Not found';
        console.log('Missing book:', missingStatus);
        
        const result = library.updateBook(null, { title: 'Test' });
        if (!result) {
            throw new Error('Cannot update null book');
        }
        
    } catch (error) {
        console.log('✅ Caught error:', error.message);
    }
}

function showGeneratorExample() {
    console.log('\n🔄 === GENERATOR DEMO ===');
    
    const gen = bookTitleGenerator(books);
    
    console.log('Getting titles one by one:');
    console.log('1.', gen.next().value);
    console.log('2.', gen.next().value);
    console.log('3.', gen.next().value);
}

/**
 * TODO: Start the application and demonstrate array destructuring
 * Call runLibraryDemo() when module loads
 * Show destructuring with first book, second book, and rest pattern
 */
// Start application and show destructuring example
console.log('\n📖 === DESTRUCTURING DEMO ===');
const [firstBook, secondBook, ...remainingBooks] = books;
// Display destructured results
console.log('First book:', firstBook);
console.log('Second book:', secondBook);
console.log('Remaining books:', remainingBooks);

const { title, author, year } = firstBook;
console.log(`Book info: ${title} by ${author} (${year})`);

runLibraryDemo();