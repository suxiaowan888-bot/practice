/**
 * UI utilities module demonstrating template literals, destructuring, and modern JS
 */

/**
 * TODO: Implement display functions using destructuring and template literals
 * displayStatistics(statistics): Extract properties with destructuring, format with template literals
 * displayBooks(books, title): Show formatted book list, use optional chaining for availability
 */
export function displayStatistics(statistics) {
     const { total, available, checkedOut, genres } = statistics;
    
    console.log(`📊 Total Books: ${total}`);
    console.log(`✅ Available: ${available}`);
    console.log(`📤 Checked Out: ${checkedOut}`);
    console.log(`📚 Genres: ${genres}`);
}

export function displayBooks(books, title = "Books") {
    console.log(`\n📖 === ${title.toUpperCase()} ===`);
    
    books.forEach(book => {
        const status = book.availability?.status ?? 'unknown';
        const location = book.availability?.location ?? 'N/A';
        
        console.log(`📖 ${book.title} by ${book.author} (${book.year}) - ${status}`);
        
        if (location !== 'N/A') {
            console.log(`   Location: ${location}`);
        }
    });
}

/**
 * TODO: Implement search results and availability formatting
 * displaySearchResults(results, criteria): Show search results with dynamic title
 * formatAvailability(availability): Return formatted status string with optional chaining
 */
export function displaySearchResults(searchResults, searchCriteria) {
    const { title, author, genre } = searchCriteria;
    
    let criteriaText = [];
    if (title) criteriaText.push(`title: "${title}"`);
    if (author) criteriaText.push(`author: "${author}"`);
    if (genre) criteriaText.push(`genre: "${genre}"`);
    
    const searchDesc = criteriaText.join(', ');
    console.log(`\n🔍 Search Results (${searchDesc})`);
    console.log(`Found ${searchResults.length} book(s)\n`);
    
    if (searchResults.length > 0) {
        searchResults.forEach(book => {
            const availability = formatAvailability(book.availability);
            console.log(`📖 ${book.title} by ${book.author} - ${availability}`);
        });
    } else {
        console.log('No books found matching your criteria.');
    }
}

export function formatAvailability(availability) {
     const status = availability?.status;
    const location = availability?.location;
    const dueDate = availability?.dueDate;
    
    if (status === 'available' && location) {
        return `✅ Available at ${location}`;
    } else if (status === 'checked_out' && dueDate) {
        return `❌ Checked out (Due: ${dueDate})`;
    } else {
        return '❓ Status unknown';
    }
}

/**
 * TODO: Create analysis function demonstrating array methods
 * showBookAnalysis(books): Use map, filter, reduce to show insights
 * Calculate most common decade, genre distribution, etc.
 */
export function showBookAnalysis(books) {
    console.log('\n🔍 === BOOK ANALYSIS ===');
    
   
    
    // use reduce 
    const genreCounts = books.reduce((acc, book) => {
        const genre = book.genre;
        acc[genre] = (acc[genre] || 0) + 1;
        return acc;
    }, {});
    
    console.log('\n Books by Genre:');
    Object.entries(genreCounts).forEach(([genre, count]) => {
        console.log(`   ${genre}: ${count} book(s)`);
    });
    
    // find the most common genre
    const mostCommonGenre = Object.entries(genreCounts).reduce((max, [genre, count]) => {
        return count > max.count ? { genre, count } : max;
    }, { genre: '', count: 0 });
    
    console.log(`\n Most Common Genre: ${mostCommonGenre.genre} (${mostCommonGenre.count} books)`);
    
    
    const availableCount = books.filter(book => book.availability?.status === 'available').length;
    const checkedOutCount = books.filter(book => book.availability?.status === 'checked_out').length;
    
    console.log(`\n Availability Status:`);
    console.log(`   Available: ${availableCount}`);
    console.log(`   Checked Out: ${checkedOutCount}`);
    
    // map
    const years = books.map(book => book.year);
    const oldestYear = Math.min(...years);
    const newestYear = Math.max(...years);
    
    console.log(`\n Publication Range: ${oldestYear} - ${newestYear}`);
    
    
    const avgYear = Math.round(years.reduce((sum, year) => sum + year, 0) / years.length);
    console.log(` Average Publication Year: ${avgYear}`);
}