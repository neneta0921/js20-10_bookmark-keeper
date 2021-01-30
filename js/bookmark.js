const bookmarkForm = document.getElementById('bookmark-form');

// Build Bookmarks DOM
function buildBookmarks() {
  const bookmarksContainer = document.getElementById('bookmarks-container');

  // Remove all bookmark elements
  bookmarksContainer.textContent = '';
  // Build items
  Object.keys(bookmarks).forEach((id) => {
    const { name, url } = bookmarks[id];
    // Item
    const item = document.createElement('div');
    item.classList.add('item');
    // Close Icon
    const closeIcon = document.createElement('i');
    closeIcon.classList.add('fas', 'fa-times');
    closeIcon.setAttribute('title', 'delete-bookmark');
    closeIcon.setAttribute('onclick', `deleteBookmark('${id}')`);
    // Favicon / Link Container
    const linkInfo = document.createElement('div');
    linkInfo.classList.add('name');
    // Favicon
    const favicon = document.createElement('img');
    favicon.setAttribute('src', `https://s2.googleusercontent.com/s2/favicons?domain=${url}`);
    favicon.setAttribute('alt', 'Favicon');
    // Link
    const link = document.createElement('a');
    link.setAttribute('href', `${url}`);
    link.setAttribute('target', '_blank');
    link.textContent = name;
    // Append to bookmarks container
    linkInfo.append(favicon, link);
    item.append(closeIcon, linkInfo);
    bookmarksContainer.appendChild(item);
  });
}

// Fetch Bookmarks
function fetchBookmarks() {
  // Get bookmarks from localStorage if available
  if (localStorage.getItem('bookmarks')) {
    bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  } else {
    // Create bookmarks object in localStorage
    const id = `https://google.com`;
    bookmarks[id] = {
      name: 'Google',
      url: 'https://google.com',
    };
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }

  buildBookmarks();
}

// Delete Bookmark
function deleteBookmark(id) {
  // Loop through the bookmarks array
  if (bookmarks[id]) {
    delete bookmarks[id];
  }
  // Update bookmarks array in localStorage, re-populate DOM
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  // removing localStorage bookmarks if bookmarks is 0
  // if (bookmarks.length === 0) {
  //     localStorage.removeItem('bookmarks');
  // }
  fetchBookmarks();
}

// Handle Data from Form
function storeBookmark(e) {
  e.preventDefault();
  const nameValue = websiteNameEl.value;
  const websiteUrlEl = document.getElementById('website-url');
  let urlValue = websiteUrlEl.value;
  if (!urlValue.includes('http://', 'https://')) {
    urlValue = `https://${urlValue}`;
  }
  // Validate
  if (!validate(nameValue, urlValue)) {
    return false;
  }
  // Set bookmark object, add to array
  const bookmark = {
    name: nameValue,
    url: urlValue,
  };
  bookmarks[urlValue] = bookmark;
  // Set bookmarks in localStorage, fetch, reset input fields
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  fetchBookmarks();
  bookmarkForm.reset();
  websiteNameEl.focus();
}

// Event Listener
bookmarkForm.addEventListener('submit', storeBookmark);
