const websiteNameEl = document.getElementById('website-name');

let bookmarks = {};

const modal = new Modal(websiteNameEl);

// On Load, check Local Storage and Fetch Bookmarks
fetchBookmarks();
