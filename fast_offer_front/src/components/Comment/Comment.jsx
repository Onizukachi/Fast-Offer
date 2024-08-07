import "./Comment.module.css";
import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { BiSolidCommentDetail } from "react-icons/bi";
import LikeButton from "@components/LikeButton";
import moment from "moment/min/moment-with-locales";
import {
  createCommentQuery,
  deleteCommentQuery,
  updateCommentQuery,
} from "./queries";
import { useMutation } from "react-query";
import { showToast } from "@utils/toast";
import { Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/react";
import AuthContext from "@context/AuthContext";
import AuthorInfo from "@components/AuthorInfo";
import ActionMenu from "@components/ActionMenu";
import useLikeState from "@utils/useLikeState";

const Comment = ({
  comment,
  onSubmitComment,
  onEditComment,
  onDeleteComment,
}) => {
  const { user } = useContext(AuthContext);
  const [likeState, handleLikeUpdate] = useLikeState(comment);
  const [showInput, setShowInput] = useState(false);
  const [newCommentBody, setNewCommentBody] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editedBody, setEditedBody] = useState(comment.body);
  const [createErrors, setCreateErrors] = useState([]);
  const [updateErrors, setUpdateErrors] = useState([]);
  const author = comment.author.data.attributes;

  useEffect(() => {
    setEditedBody(comment.body);
  }, [comment.body]);


  const createCommentMutation = useMutation({
    mutationFn: () => createCommentQuery(comment.id, "Comment", newCommentBody),
    onSuccess: (data) => {
      setNewCommentBody("");
      onSubmitComment(comment.id, data[0]);
      toggleInput();
      showToast("Комментарий оставлен");
    },
    onError: (error) => {
      console.log(error.response.data);
      setCreateErrors(error.response.data);
    },
  });

  const updateCommentMutation = useMutation({
    mutationFn: () => updateCommentQuery(comment.id, editedBody),
    onSuccess: (data) => {
      setEditMode(false);
      setUpdateErrors([]);
      onEditComment(comment.id, data[0]);
      showToast("Комментарий отредактирован");
    },
    onError: (error) => {
      console.log(error.response.data);
      setUpdateErrors(error.response.data);
    },
  });

  const deleteCommentMutation = useMutation({
    mutationFn: () => deleteCommentQuery(comment.id),
    onSuccess: () => {
      onDeleteComment(comment.id);
      showToast("Комментарий успешно удален");
    },
    onError: (error) => {
      console.log(error.response.data);
      showToast("Не получилось удалить комментарий", "error");
    },
  });

  const toggleInput = () => {
    setShowInput(!showInput);
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
    setEditedBody(comment.body);
  };

  const handleInputChange = (e) => {
    if (editMode) {
      setEditedBody(e.target.value);
    } else {
      setNewCommentBody(e.target.value);
    }
  };

  const handleSubmit = () => {
    if (newCommentBody) {
      createCommentMutation.mutate();
    }
  };

  const handleEditSubmit = () => {
    updateCommentMutation.mutate();
  };

  const handleCommentAction = (action) => {
    switch (action) {
      case "delete":
        deleteCommentMutation.mutate();
        break;
      case "edit":
        toggleEditMode();
        break;
    }
  };

  return (
    <>
      <div
        key={comment.id}
        className="bg-gray-100 rounded-lg shadow-md px-8 py-4 mt-4 flex flex-col"
      >
        <div className="flex flex-wrap justify-between items-center">
          <span className="text-default-500">
            {moment(comment.created_at).format("LL")}
          </span>
          <div className="flex gap-2 sm:gap-4 items-center">
            <AuthorInfo author={author} />
            {user && user.id === Number(author.id) && (
              <ActionMenu onAction={handleCommentAction} />
            )}
          </div>
        </div>
        {!editMode ? (
          <div
            id="entity"
            className="mt-2 text-lg"
            dangerouslySetInnerHTML={{ __html: comment.body }}
          />
        ) : (
          <div className="mt-2">
            <Textarea
              variant={"bordered"}
              autoFocus={true}
              fullWidth={true}
              value={editedBody}
              onChange={handleInputChange}
              isInvalid={updateErrors.length > 0}
              errorMessage={updateErrors.join(". ")}
              classNames={{
                inputWrapper: ["bg-white"],
              }}
            />
            <div className="mt-2 flex gap-2">
              <Button
                color="default"
                variant={"shadow"}
                onPress={handleEditSubmit}
                isDisabled={!editedBody}
              >
                Cохранить
              </Button>
              <Button
                color="default"
                variant={"shadow"}
                onPress={() => toggleEditMode()}
              >
                Отмена
              </Button>
            </div>
          </div>
        )}
        <div className="flex justify-between gap-4 mt-4 sm:gap-0 items-start sm:items-center flex-col sm:flex-row">
          <div className="flex -ml-3">
            <div
              onClick={() => toggleInput()}
              className="flex hover:bg-gray-200 cursor-pointer rounded-lg px-3 py-2"
            >
              <BiSolidCommentDetail size="1.4em" />
              <p className="ml-2 text-default-500">Ответить</p>
            </div>
            <div className="flex px-3 py-2">
              <LikeButton
                likeableId={comment.id}
                likeableType="Comment"
                isLiked={likeState.isLiked}
                onLikeUpdate={handleLikeUpdate}
              />
              <p className="ml-2">
                {new Intl.NumberFormat("ru", {
                  notation: "compact",
                  maximumFractionDigits: 1,
                }).format(likeState.likesCount)}
              </p>
            </div>
          </div>
        </div>

        {showInput && (
          <div className="mt-2">
            <Textarea
              variant={"bordered"}
              autoFocus={true}
              placeholder="Введите ваш комментарий"
              fullWidth={true}
              value={newCommentBody}
              onChange={handleInputChange}
              isInvalid={createErrors.length > 0}
              errorMessage={createErrors.join(". ")}
              classNames={{
                inputWrapper: ["bg-white"],
              }}
            />
            <div className="mt-2 flex gap-2">
              <Button
                color="default"
                variant={"shadow"}
                onPress={handleSubmit}
                isDisabled={!newCommentBody}
              >
                Комментировать
              </Button>
              <Button
                color="default"
                variant={"shadow"}
                onPress={() => toggleInput()}
              >
                Отмена
              </Button>
            </div>
          </div>
        )}

        {comment.children.map((child) => {
          return (
            <Comment
              key={child.id}
              comment={child}
              onSubmitComment={onSubmitComment}
              onEditComment={onEditComment}
              onDeleteComment={onDeleteComment}
            />
          );
        })}
      </div>
    </>
  );
};

Comment.propTypes = {
  comment: PropTypes.object,
  onSubmitComment: PropTypes.func,
  onEditComment: PropTypes.func,
  onDeleteComment: PropTypes.func,
};

export default Comment;
