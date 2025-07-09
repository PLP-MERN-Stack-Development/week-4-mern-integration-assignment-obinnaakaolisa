import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
  const {
    _id,
    slug,
    title,
    excerpt,
    content,
    featuredImage,
    author,
    createdAt,
    category,
  } = post;

  const snippet = excerpt || content?.slice(0, 120) + '...';
  const imageUrl = featuredImage || '/uploads/default-post.jpg';
  const postUrl = `/post/${slug || _id}`;
  const postDate = new Date(createdAt).toLocaleDateString();

  return (
    <div className="card card-compact bg-base-100 shadow-md hover:shadow-xl transition">
      <figure className="h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title line-clamp-2">{title}</h2>
        <p className="text-sm text-gray-600 line-clamp-3">{snippet}</p>

        <div className="text-xs text-gray-500 flex justify-between mt-2">
          <span>By {author?.name || 'Unknown'}</span>
          <span>{postDate}</span>
        </div>

        <div className="card-actions justify-end mt-4">
          <Link to={postUrl} className="btn btn-sm btn-outline btn-primary">
            Read more
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
