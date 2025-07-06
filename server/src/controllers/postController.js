import Post from '../models/Post.js';

export const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find()
      .populate('author', 'name email')
      .populate('category', 'name')
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (err) {
    next(err);
  }
};

export const getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'name email')
      .populate('category', 'name');

    if (!post) return res.status(404).json({ message: 'Post not found' });

    await post.incrementViewCount(); // Optional: track views
    res.json(post);
  } catch (err) {
    next(err);
  }
};

export const createPost = async (req, res, next) => {
  try {
    const {
      title,
      content,
      category,
      tags,
      excerpt,
      featuredImage,
      isPublished,
    } = req.body;

    const newPost = new Post({
      title,
      content,
      category,
      tags,
      excerpt,
      featuredImage,
      isPublished,
      author: req.user._id,
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    next(err);
  }
};

export const updatePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorised to edit this post' });
    }

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    res.json(updatedPost);
  } catch (err) {
    next(err);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorised to delete this post' });
    }

    await post.remove();
    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    next(err);
  }
};

export const getPostsByCategory = async (req, res, next) => {
  try {
    const posts = await Post.find({ category: req.params.categoryId })
      .populate('author', 'name email')
      .populate('category', 'name')
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (err) {
    next(err);
  }
};

export const addCommentToPost = async (req, res, next) => {
  try {
    const { content } = req.body;
    const { id } = req.params;

    if (!content || content.trim() === '') {
      return res.status(400).json({ message: 'Comment is required' });
    }

    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    // Push comment
    post.comments.push({
      user: req.user._id,
      content,
    });

    await post.save();

    const updatedPost = await Post.findById(id)
      .populate('author', 'name')
      .populate('category', 'name')
      .populate('comments.user', 'name email');

    res.status(201).json({
      message: 'Comment added',
      comments: updatedPost.comments,
    });
  } catch (err) {
    next(err);
  }
};

