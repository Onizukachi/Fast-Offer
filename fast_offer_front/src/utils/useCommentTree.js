import {useState, useEffect} from "react";

const useCommentTree = (initialComments) => {
  const [comments, setComments] = useState(initialComments);

  useEffect(() => {
    setComments(initialComments)
  }, [initialComments])

  const insertNode = (tree, commentId, newComment) => {
    return tree.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          children: [newComment, ...comment.children],
        };
      } else if (comment.children && comment.children.length > 0) {
        return {
          ...comment,
          children: insertNode(comment.children, commentId, newComment),
        };
      }
      return comment;
    });
  };

  const insertComment = (commentId, newComment) => {
    if (commentId) {
      setComments((prevComments) =>
        insertNode(prevComments, commentId, newComment)
      );
    } else {
      setComments((prevComments) => [newComment, ...prevComments]);
    }
  };

  const editNode = (tree, nodeId, editedComment) => {
    return tree.map((node) => {
      if (node.id === nodeId) {
        return editedComment
      } else if (node.children && node.children.length > 0) {
        return {
          ...node,
          children: editNode(node.children, nodeId, editedComment),
        };
      }
      return node;
    });
  };

  const editComment = (commentId, content) => {
    setComments((prevComments) => editNode(prevComments, commentId, content));
  };

  const deleteNode = (tree, nodeId) => {
    return tree.reduce((acc, node) => {
      if (node.id === nodeId) {
        return acc;
      } else if (node.children && node.children.length > 0) {
        node.children = deleteNode(node.children, nodeId);
      }
      return [...acc, node];
    }, []);
  };

  const deleteComment = (commentId) => {
    setComments((prevComments) => deleteNode(prevComments, commentId));
  };

  return {
    comments,
    insertComment,
    editComment,
    deleteComment,
  };
};

export default useCommentTree;

