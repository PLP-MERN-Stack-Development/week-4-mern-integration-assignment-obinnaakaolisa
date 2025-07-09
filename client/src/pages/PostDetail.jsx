import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { postService } from '../services/api';

const PostDetail = () => {
  const { id } = useParams(); // slug or _id
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    postService.getPost(id)
      .then(data => {
        setPost(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load post:', err);
        setLoading(false);
      });
  }, [id]);
  
  if (loading) {
    return <p className="text-center py-10">Loading post...</p>;
  }

  if (!post) {
    return <p className="text-center py-10 text-red-500">Post not found</p>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <img
        src={post.featuredImage || '/uploads/default-post.jpg'}
        alt={post.title}
        className="w-full h-64 object-cover rounded-lg mb-6"
      />

      <h1 className="text-4xl font-bold mb-4 text-gray-800">{post.title}</h1>

      <div className="text-sm text-gray-500 mb-4">
        By {post.author?.name || 'Unknown'} · {new Date(post.createdAt).toLocaleDateString()}
      </div>

      <div className="prose prose-lg max-w-none mb-8 text-gray-800">
        {post.content}
      </div>

      <hr className="my-6" />

      <h2 className="text-2xl font-semibold mb-4">Comments</h2>
      {post.comments?.length === 0 ? (
        <p className="text-gray-500">No comments yet.</p>
      ) : (
        <ul className="space-y-4">
          {post.comments.map((comment) => (
            <li key={comment._id} className="border p-4 rounded-lg bg-gray-50">
              <p className="text-gray-700">{comment.content}</p>
              <div className="text-xs text-gray-500 mt-2">
                {comment.user?.name || 'Anonymous'} · {new Date(comment.createdAt).toLocaleString()}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PostDetail;
