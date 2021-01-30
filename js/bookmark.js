let bookmarks = {};

class Bookmark {
  constructor(websiteNameEl, validate) {
    this.websiteNameEl = websiteNameEl;
    this.validate = validate;
    this.bookmarkForm = document.querySelector('#bookmark-form');
    this._init();
  }

  _init() {
    this._addEvent();
  }

  // Build Bookmarks DOM
  _buildBookmarks() {
    // Remove all bookmark elements
    const bookmarksContainer = document.querySelector('#bookmarks-container');
    bookmarksContainer.textContent = '';

    // Build items
    this._buildItemsFromBookmarks(bookmarksContainer);
  }

  _buildItemsFromBookmarks(bookmarksContainer) {
    Object.keys(bookmarks).forEach((id) => {
      const { name, url } = bookmarks[id];

      // Item
      const item = document.createElement('div');
      item.classList.add('item');

      // Close Icon
      const closeIcon = this._createCloseIcon(id);

      // Link Container
      const linkInfo = document.createElement('div');
      linkInfo.classList.add('name');

      // Favicon
      const favicon = this._createFavicon(url);

      // Link
      const link = this._createLink(name, url);

      // Append to bookmarks container
      linkInfo.append(favicon, link);
      item.append(closeIcon, linkInfo);
      bookmarksContainer.appendChild(item);
    });
  }

  _createCloseIcon(id) {
    const closeIcon = document.createElement('i');
    closeIcon.classList.add('fas', 'fa-times', 'delete-bookmark');
    closeIcon.setAttribute('title', 'delete-bookmark');
    closeIcon.setAttribute('id', id);
    return closeIcon;
  }

  _createFavicon(url) {
    const favicon = document.createElement('img');
    favicon.setAttribute('src', `https://s2.googleusercontent.com/s2/favicons?domain=${url}`);
    favicon.setAttribute('alt', 'Favicon');
    return favicon;
  }

  _createLink(name, url) {
    const link = document.createElement('a');
    link.setAttribute('href', `${url}`);
    link.setAttribute('target', '_blank');
    link.textContent = name;
    return link;
  }

  // Fetch Bookmarks
  fetchBookmarks() {
    // Get bookmarks from localStorage if available
    if (localStorage.getItem('bookmarks')) {
      bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    } else {
      // Create bookmarks object in localStorage
      this._createBookmark();
    }

    this._buildBookmarks();
  }

  _createBookmark() {
    const id = `https://google.com`;
    bookmarks[id] = {
      name: 'Google',
      url: 'https://google.com',
    };
    // Store to Local Storage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }

  // Handle Data from Form
  _storeBookmark(e) {
    e.preventDefault();
    const nameValue = websiteNameEl.value;
    const websiteUrlEl = document.querySelector('#website-url');
    let urlValue = websiteUrlEl.value;

    if (!urlValue.includes('http://', 'https://')) {
      urlValue = `https://${urlValue}`;
    }

    // Validate
    if (!this.validate(nameValue, urlValue)) {
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
    this.fetchBookmarks();
    this.bookmarkForm.reset();
    this.websiteNameEl.focus();
  }

  _addEvent() {
    // Event Listener
    this.bookmarkForm.addEventListener('submit', (e) => this._storeBookmark(e));
  }
}
