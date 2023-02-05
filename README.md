<h1>Blog API</h1>

<h2>A blog API built with Node js</h2>
<p>Server is listening on port 5000</p>
<h3>Features</h3>
<ul>
<li>Authentication</li>
<li>Sign Up</li>
<li>Confirm Email Address</li>
<li>Login</li>
<li>Stateful Jwt Authentication</li>
</ul>
<h1>Basic CRUD<h1>
<ul>
<li>Create Posts</li>
<li>Get Posts</li>
<li>Update Posts</li>
<li>Delete Posts</li>
<li>Testing</li>
<ul>

<span>To create a blog<strong>POST</strong></span><span>http://localhost:5000/api/posts/create</span><br>
<span>get all blog<strong>GET</strong></span><span>http://localhost:5000/api/posts/create</span><br><span>delete account<strong>DELETE</strong></span><span>http://localhost:5000/api/posts/blogId</span><br>
<span>update<strong>PUT</strong></span><span>http://localhost:5000/api/posts/blogId</span><br>
<span>get one blog<strong>GET</strong></span><span>http://localhost:5000/api/posts/blogId</span><br>
<span><strong>POST</strong></span><span>http://localhost:5000/api/comment/blogs/blogID/comments</span><br>
<span>signUp<strong>POST</strong></span><span>http://localhost:5000/api/auth/register</span><br>
<span>signUp<strong>POST</strong></span><span>http://localhost:5000/api/auth/login</span><br>

<h2>All endpoints are tested<h2>
<h3>Major Dependencies<h3>
</ul>
<li>Mongoose - Interfacing with mongodb</li>
<li>Express js - The core of the API</li>
<li>bcrypt - Password hashing</li>
<li>jwt - generating and verifying tokens in order to verify if user has an account in order to make a post</li>

<li>jest - Testing</li>
</ul>
See package.json for full list of Dependencies
