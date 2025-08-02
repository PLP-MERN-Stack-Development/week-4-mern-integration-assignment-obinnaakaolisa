import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";
import { postsAPI, authAPI } from "@/services/api";

const CommentSection = ({ postId, comments: initialComments = [] }) => {
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState("");
  const [editingComment, setEditingComment] = useState(null);
  const [editText, setEditText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const isAuthenticated = authAPI.isAuthenticated();

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsLoading(true);
    try {
      const comment = await postsAPI.addComment(postId, { text: newComment });
      setComments(prev => [...prev, comment]);
      setNewComment("");
      toast({
        title: "Success",
        description: "Comment added successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add comment",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditComment = async (commentId) => {
    if (!editText.trim()) return;

    try {
      const updatedComment = await postsAPI.updateComment(postId, commentId, { text: editText });
      setComments(prev => prev.map(comment => 
        comment.id === commentId ? updatedComment : comment
      ));
      setEditingComment(null);
      setEditText("");
      toast({
        title: "Success",
        description: "Comment updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update comment",
        variant: "destructive",
      });
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await postsAPI.deleteComment(postId, commentId);
      setComments(prev => prev.filter(comment => comment.id !== commentId));
      toast({
        title: "Success",
        description: "Comment deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete comment",
        variant: "destructive",
      });
    }
  };

  const startEditing = (comment) => {
    setEditingComment(comment.id);
    setEditText(comment.text);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold">
        Comments ({comments.length})
      </h3>

      {/* Add Comment Form */}
      {isAuthenticated ? (
        <form onSubmit={handleAddComment} className="space-y-4">
          <Textarea
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="min-h-[100px]"
          />
          <Button type="submit" disabled={isLoading || !newComment.trim()}>
            {isLoading ? "Adding..." : "Add Comment"}
          </Button>
        </form>
      ) : (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">
              Please log in to add a comment.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Comments List */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">
                No comments yet. Be the first to comment!
              </p>
            </CardContent>
          </Card>
        ) : (
          comments.map((comment) => (
            <Card key={comment.id}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <Avatar>
                      <AvatarFallback>
                        {comment.author?.username?.[0]?.toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">
                          {comment.author?.username || 'Anonymous'}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {new Date(comment.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      
                      {editingComment === comment.id ? (
                        <div className="mt-2 space-y-2">
                          <Textarea
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            className="min-h-[80px]"
                          />
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              onClick={() => handleEditComment(comment.id)}
                            >
                              Save
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setEditingComment(null)}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <p className="mt-1 text-foreground">{comment.text}</p>
                      )}
                    </div>
                  </div>

                  {/* Comment Actions */}
                  {isAuthenticated && comment.isOwner && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => startEditing(comment)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteComment(comment.id)}
                          className="text-destructive"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentSection;