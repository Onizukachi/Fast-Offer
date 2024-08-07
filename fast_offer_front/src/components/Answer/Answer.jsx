import "./Answer.module.css";
import { useContext, useState } from "react";
import PropTypes from "prop-types";
import { BiSolidCommentDetail } from "react-icons/bi";
import LikeButton from "@components/LikeButton";
import moment from "moment/min/moment-with-locales";
import { normalizeCountForm } from "@utils/normalizeCountForm";
import Comment from "@components/Comment";
import { commentsQuery, deleteAnswerQuery } from "./queries";
import { useMutation, useQuery } from "react-query";
import { createCommentQuery } from "@components/Comment/queries";
import { showToast } from "@utils/toast";
import { Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/react";
import useCommentTree from "@utils/useCommentTree";
import AuthContext from "@context/AuthContext";
import AuthorInfo from "@components/AuthorInfo";
import ActionMenu from "@components/ActionMenu";
import useLikeState from "@utils/useLikeState";

const Answer = ({ answer, questionId, onDelete }) => {
  const { user } = useContext(AuthContext);
  const [likeState, handleLikeUpdate] = useLikeState(answer);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [newCommentBody, setNewCommentBody] = useState("");
  const [commentsCount, setCommentsCount] = useState(0);
  const [commentErrors, setCommentErrors] = useState([]);

  const {
    comments: commentsData,
    insertComment,
    editComment,
    deleteComment,
  } = useCommentTree(comments);

  const deepCountComments = (rootObjects) => {
    let count = 0;

    function recurse(objects) {
      objects.forEach((obj) => {
        count++;
        if (obj.children && Array.isArray(obj.children)) {
          recurse(obj.children);
        }
      });
    }

    recurse(rootObjects);
    return count;
  };

  useQuery(
    `comments-${answer.id}`,
    () =>
      commentsQuery(answer.id, "Answer").then((data) => {
        setCommentsCount(deepCountComments(data));
        setComments(data);
      }),
    { refetchInterval: false, refetchOnWindowFocus: false },
  );

  const createCommentMutation = useMutation({
    mutationFn: () => createCommentQuery(answer.id, "Answer", newCommentBody),
    onSuccess: (data) => {
      setNewCommentBody("");
      setCommentErrors([]);
      insertComment(undefined, data[0]);
      showToast("Комментарий оставлен");
    },
    onError: (error) => {
      console.log(error.response.data);
      setCommentErrors(error.response.data);
    },
  });

  const deleteAnswerMutation = useMutation({
    mutationFn: () => deleteAnswerQuery(questionId, answer.id),
    onSuccess: () => {
      onDelete(answer.id);
      showToast("Ответ успешно удален");
    },
    onError: (error) => {
      console.log(error.response.data);
      showToast("Не получилось удалить ответ", "error");
    },
  });

  const handleCommentSubmit = () => {
    if (newCommentBody) {
      createCommentMutation.mutate();
    }
  };

  const handleAnswerAction = (action) => {
    switch (action) {
      case "delete":
        deleteAnswerMutation.mutate();
        break;
      case "edit":
        // TO DO
        break;
    }
  };

  return (
    <div key={answer.id} className="mt-4 flex flex-col">
      <div className="flex flex-wrap justify-between items-center">
        <span className="text-default-500">
          {moment(answer.created_at).format("LL")}
        </span>
        <div className="flex gap-2 sm:gap-4 items-center">
          <AuthorInfo author={answer.author} />
          {user && user.id === Number(answer.author.id) && (
            <ActionMenu onAction={handleAnswerAction} showEdit={false} />
          )}
        </div>
      </div>
      <div
        id="entity"
        className="mt-2 text-lg"
        dangerouslySetInnerHTML={{ __html: answer.body }}
      />
      <div className="flex justify-between gap-4 mt-4 sm:gap-0 items-start sm:items-center flex-col sm:flex-row">
        <div className="flex -ml-3">
          <div
            onClick={() => setShowComments(!showComments)}
            className="flex hover:bg-gray-200 cursor-pointer rounded-lg px-3 py-2"
          >
            <BiSolidCommentDetail size="1.4em" />
            <p className="ml-2">{commentsCount}</p>
            <p className="ml-2 text-default-500">
              {normalizeCountForm(commentsCount, [
                "Комментарий",
                "Комментария",
                "Комментариев",
              ])}
            </p>
          </div>
          <div className="flex px-3 py-2">
            <LikeButton
              likeableId={answer.id}
              likeableType="Answer"
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
      {showComments && (
        <div className="mt-2">
          <Textarea
            variant={"bordered"}
            autoFocus={true}
            placeholder="Введите ваш комментарий"
            fullWidth={true}
            value={newCommentBody}
            onChange={(e) => setNewCommentBody(e.target.value)}
            isInvalid={commentErrors.length > 0}
            errorMessage={commentErrors.join(". ")}
            classNames={{
              inputWrapper: ["bg-white"],
            }}
          />
          <Button
            className="mt-2"
            color="default"
            variant={"shadow"}
            onClick={handleCommentSubmit}
            isDisabled={!newCommentBody}
          >
            Комментировать
          </Button>
        </div>
      )}
      <div className="mt-2">
        {showComments &&
          commentsData.map((comment) => {
            return (
              <Comment
                key={comment.id}
                comment={comment}
                onSubmitComment={insertComment}
                onEditComment={editComment}
                onDeleteComment={deleteComment}
              />
            );
          })}
      </div>
    </div>
  );
};

Answer.propTypes = {
  answer: PropTypes.object,
  onDelete: PropTypes.func,
  questionId: PropTypes.number,
};

export default Answer;
