Custom URL Shortener (Node.js)

A simple URL shortener built with Node.js, HTML, and JavaScript.  
This project allows users to shorten long URLs, and **logged-in users** can create **custom short URLs**.

Features

- User login
- Shorten long URLs
- Custom short URL codes for logged-in users
- Redirection to original URL via short code
- In-memory session and URL storage (no database)
- File-based frontend (`home.html`, `customize.html`)

Project Structure

   shorten_url/

     ├── public/

     │ ├── home.html

     │ ├── customize.html

     │ ├── Login.html

     ├── index.js
     
     └── README.md




How to Run

1. Clone the repository

   git clone https://github.com/yourusername/url-shortener.git

   cd url-shortener

2. Run the server

   http://localhost:3000/
