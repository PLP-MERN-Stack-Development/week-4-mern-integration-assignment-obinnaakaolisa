import Post from '../models/Post.js';

export const getAllPosts = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, category, q } = req.query;

    const query = {};

    //Search by keyword
    if (q) {
      query.$or = [
        { title: { $regex: q, $options: 'i' } },
        { content: { $regex: q, $options: 'i' } },
      ];
    }

    // Filter by category ID
    if (category) {
      query.category = category;
    }

    // Count total documents for pagination
    const total = await Post.countDocuments(query);

    const posts = await Post.find(query)
      .populate('author', 'name')
      .populate('category', 'name')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json({
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      totalPages: Math.ceil(total / limit),
      posts,
    });
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

export const deleteCommentFromPost = async (req, res, next) => {
  try {
    const { postId, commentId } = req.params;

    const post = await Post.findById(postId).populate('comments.user', 'id name email');
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const comment = post.comments.id(commentId);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });

    const isOwner = comment.user._id.toString() === req.user._id.toString();
    const isAdmin = req.user.isAdmin;

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: 'Not authorised to delete this comment' });
    }

    comment.deleteOne();
    await post.save();

    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (err) {
    next(err);
  }
};

