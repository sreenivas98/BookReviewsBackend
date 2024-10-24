const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  let username = req.body.username;
  let password = req.body.password;
  if (username && password) {
    // Check if the user does not already exist
    if (!isValid(username)) {
        // Add the new user to the users array
        users.push({"username": username, "password": password});
        return res.status(200).json({message: "User successfully registered. Now you can login"});
    } else {
        return res.status(404).json({message: "User already exists!"});
    }
}
// Return error if username or password is missing
return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  res.status(200).json(books);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  let isbn = req.params.isbn;
  if(books[isbn]) {
    return res.status(200).json(books[isbn]);
  } else {
    return res.status(403).json({message:"No books found with given ISBN number"});
  }
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  let results=[];
  let author = req.params.author;
  for(const ISBN in books) {
    const book = books[ISBN];
    if(book["author"]===author) {
      results.push({"isbn":ISBN,"title":book["title"],"reviews":book["reviews"]});
    }
  }
  if(results.length>0) {
    return res.status(200).json({"BooksByAuthor":results});
  } else {
    return res.status(403).json({message:"No books found with given author name"});
  }
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  let results=[];
  let title = req.params.title;
  for(const ISBN in books) {
    const book = books[ISBN];
    if(book["title"]===title) {
      results.push({"isbn":ISBN,"author":book["author"],"reviews":book["reviews"]});
    }
  }
  if(results.length>0) {
    res.status(200).json({"BooksByTitle":results});
  } else {
    return res.status(403).json({message:"No books found with given Title"});
  }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  let isbn = req.params.isbn;
  if(books[isbn]) {
    return res.status(200).json(books[isbn]["reviews"]);
  } else {
    return res.status(403).json({message:"No book found with given ISBN number"});
  }
});



// //Using Promises and async/await


// // Simulating asynchronous data fetch with async/await
// function getBooksAsync() {
//   return new Promise((resolve, reject) => {
//     // Simulate data fetching delay
//     setTimeout(() => {
//       if (books) {
//         resolve(books);
//       } else {
//         reject("Error fetching books");
//       }
//     }, 1000); // Simulate 1 second delay
//   });
// }

// // Get the book list available in the shop using async/await
// public_users.get('/', async function (req, res) {
//   try {
//     const bookData = await getBooksAsync();
//     res.status(200).json(bookData);
//   } catch (error) {
//     res.status(500).json({ message: error });
//   }
// });

// // Get book details based on ISBN using async/await
// public_users.get('/isbn/:isbn', async function (req, res) {
//   let isbn = req.params.isbn;
//   try {
//     const bookData = await getBooksAsync();
//     if (bookData[isbn]) {
//       res.status(200).json(bookData[isbn]);
//     } else {
//       res.status(404).json({ message: "No books found with given ISBN number" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error });
//   }
// });

// // Get book details based on author using async/await
// public_users.get('/author/:author', async function (req, res) {
//   let author = req.params.author;
//   try {
//     const bookData = await getBooksAsync();
//     let results = [];
//     for (const ISBN in bookData) {
//       const book = bookData[ISBN];
//       if (book["author"] === author) {
//         results.push({ "isbn": ISBN, "title": book["title"], "reviews": book["reviews"] });
//       }
//     }
//     if (results.length > 0) {
//       res.status(200).json({ "BooksByAuthor": results });
//     } else {
//       res.status(404).json({ message: "No books found with given author name" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error });
//   }
// });

// // Get book details based on title using async/await
// public_users.get('/title/:title', async function (req, res) {
//   let title = req.params.title;
//   try {
//     const bookData = await getBooksAsync();
//     let results = [];
//     for (const ISBN in bookData) {
//       const book = bookData[ISBN];
//       if (book["title"] === title) {
//         results.push({ "isbn": ISBN, "author": book["author"], "reviews": book["reviews"] });
//       }
//     }
//     if (results.length > 0) {
//       res.status(200).json({ "BooksByTitle": results });
//     } else {
//       res.status(404).json({ message: "No books found with given title" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error });
//   }
// });

module.exports.general = public_users;
