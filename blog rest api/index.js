import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;


app.use(bodyParser.urlencoded({ extended: true }));

var posts = [
    { id: 1, title: "hi" },
    { id: 2, title: "hello" },
    { id: 3, title: "how are you doing?" },
  ];
  var comments = [
    { id: 1, postId: 1, text: "comment 1" },
    { id: 2, postId: 2, text: "comment 2" },
    { id: 3, postId: 3, text: "comment 3" },
  ];
  
var postId = 1;

//1.GET /posts:
// Description: Retrieve all blog posts.
// Hint: Use GET method to fetch all blog posts from a local variable.
app.get('/posts', (req, res) => {
    res.json(posts);
})

//2.GET /posts/:id:
// Description: Retrieve a specific blog post by ID.
// Hint: Use GET method with a parameter to fetch a single blog post from a local variable.
app.get('/posts/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts.find((post) => post.id === id);
    res.json(post);
})

//3.POST /posts:
// Description: Create a new blog post.
// Hint: Use POST method to add a new blog post to a local variable.
app.post('/posts', (req, res) => {
    const { title, content} = req.body;
    const newPost = {
        id:posts.length + 1,
        title,comments: []
    }
    posts.push(newPost);
    res.json(newPost);
})

//4.PUT /posts/:id:
// Description: Update an existing blog post.
// Hint: Use PUT method with a parameter to update an existing blog post in a local variable.
app.put('/posts/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { title} = req.body;
    const postIndex = posts.findIndex((post) => post.id === id);
    if (postIndex === -1) {
      return res.status(404).json({ error: "post not found" });
    }
    posts[postIndex].title = title || posts[postIndex].title;
    res.json(posts[postIndex]);
})

//5.DELETE /posts/:id:
// Description: Delete a blog post by ID.
// Hint: Use DELETE method with a parameter to remove a blog post from a local variable.
app.delete("/posts/:id", (req, res) => {
      const id = parseInt(req.params.id);
      const searchIndex = posts.findIndex((post) => post.id === id);
      if (searchIndex > -1) {
        posts.splice(searchIndex, 1);
        res.sendStatus(200);
      } else {
        res
          .status(404)
          .json({ error: `Post with id: ${id} not found. No posts were deleted.` });
      }
    });

//6.GET /posts/:id/comments:
// Description: Retrieve all comments for a specific blog post.
// Hint: Use GET method with a parameter to fetch comments related to a specific blog post from a local variable.
app.get('/posts/:id/comments', (req, res) => {
    const postId = parseInt(req.params.id);
    const postComments = comments.filter((comment) => comment.postId === postId);
    res.json(postComments);
})

//7.POST /posts/:id/comments:
// Description: Add a comment to a specific blog post.
// Hint: Use POST method with a parameter to add a new comment to a specific blog post in a local variable.
app.post('/posts/:id/comments', (req, res) => {
    const postId = parseInt(req.params.id);
    const {text} = req.body;
    const post = posts.find(post => post.id === postId);
    if (!post) {
        res.status(404).json({error: 'Comment text not found'});
    } else {
        const newComment = {
            id: comments.length + 1,
            postId,
            text
        };
        comments.push(newComment);
        res.json(newComment);
    }

    }
)

//8.PUT /posts/:postId/comments/:commentId:
// Description: Update a comment on a specific blog post.
// Hint: Use PUT method with parameters to update a specific comment on a specific blog post in a local variable.
app.put('/posts/:postId/comments/:commentId', (req,res) => {
    const postId = parseInt(req.params.postId);
    const commentId = parseInt(req.params.commentId);
    const {text} = req.body;
    const post = posts.find(post.id === postId);
    if (!post) {
        res.status(404).json({error: 'Post text not found'});
    } else {
        const comment = comments.find(comment => comment.id === commentId)
        if (!comment) {
            res.status(404).json({error: 'Comment text not found'});
        } else {
            comment.text = text || comment.text;
            res.json(comment)
        }
    }
})

//9.DELETE /posts/:postId/comments/:commentId:
// Description: Delete a comment from a specific blog post.
// Hint: Use DELETE method with parameters to delete a specific comment from a specific blog post in a local variable.
app.delete('posts/:postId/comments/:commetId', (req, res) => {
    const postId = parseInt(req.params.postId);
    const commentId = parseInt(req.params.commentId);
    const post = posts.find(post => post.id === postId);
    if (!post) {
        res.status(404).json({error: 'Post text not found'});
    } else {
        const index = comments.findIndex(comment => comment.id === commentId);
        if (index === -1) {
            res.status(404).json({error: 'Post text not found'});    
        } else {
            comments.splice(index, 1);
            res.sendStatus(204);
        }
    }
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });