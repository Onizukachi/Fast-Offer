import PropTypes from "prop-types";
import { Chip } from "@nextui-org/react";
import { useMemo, useContext } from "react";
import moment from "moment/min/moment-with-locales";
import { BiSolidCommentDetail } from "react-icons/bi";
import { FaEye } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import LikeButton from "@components/LikeButton";
import Positions from "./Positions";
import AuthorInfo from "@components/AuthorInfo";
import { normalizeCountForm } from "@utils/normalizeCountForm";
import AuthContext from "@context/AuthContext";
import { useMutation } from "react-query";
import { deleteQuestionQuery } from "./queries";
import { showToast } from "@utils/toast.js";
import { useNavigate } from "react-router-dom";
import ActionMenu from "@components/ActionMenu";
import useLikeState from "@utils/useLikeState";
import Favorite from "@components/Favorite";

const Question = ({ question, refetch, handleTagClick }) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { author, positions, tags } = question;
  const [likeState, handleLikeUpdate] = useLikeState(question);

  const formattedDate = useMemo(
    () => moment(question.created_at).format("LL"),
    [question.created_at],
  );

  const formatNumber = (number) =>
    new Intl.NumberFormat("ru", {
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(number);

  const deleteQuestionMutation = useMutation({
    mutationFn: () => deleteQuestionQuery(question.id),
    onSuccess: () => {
      showToast("Вопрос успешно удален");
      refetch();
    },
    onError: (error) => {
      console.log(error.response.data);
      showToast("Не получилось удалить вопрос", "error");
    },
  });

  const handleQuestionAction = (action) => {
    switch (action) {
      case "delete":
        deleteQuestionMutation.mutate();
        break;
      case "edit":
        navigate(`/questions/${question.id}/edit`);
        break;
    }
  };

  return (
    <div className="px-8 py-4 rounded-lg shadow-md">
      <div className="flex flex-wrap justify-between items-center">
        <span className="text-default-500">{formattedDate}</span>
        <Positions positions={positions} />
      </div>
      <div className="mt-2">
        <NavLink
          to={`/questions/${question.id}`}
          className="font-bold text-xl hover:opacity-80"
        >
          <div
            id="entity"
            dangerouslySetInnerHTML={{ __html: question.body }}
          />
        </NavLink>
      </div>
      <div className="flex justify-between gap-4 mt-2 sm:gap-0 items-start sm:items-center flex-col sm:flex-row">
        <div className="flex gap-5">
          <div className="flex">
            <BiSolidCommentDetail size="1.4em" />
            <p className="ml-2">{question.answers_count}</p>
            <p className="ml-2 text-default-500">
              {normalizeCountForm(question.answers_count, [
                "ответ",
                "ответа",
                "ответов",
              ])}
            </p>
          </div>
          <div className="flex">
            <FaEye size="1.4em" />
            <p className="ml-2">{formatNumber(question.views_count)}</p>
          </div>
          <div className="flex">
            <LikeButton
              likeableId={question.id}
              likeableType="Question"
              isLiked={likeState.isLiked}
              onLikeUpdate={handleLikeUpdate}
            />
            <p className="ml-2">{formatNumber(likeState.likesCount)}</p>
          </div>
          <Favorite question={question} />
        </div>
        <div className="flex gap-2 sm:gap-4 items-center">
          <AuthorInfo author={author} />
          {user && user.id === Number(author.id) && (
            <ActionMenu onAction={handleQuestionAction} />
          )}
        </div>
      </div>
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-4 sm:gap-2 sm:mt-1 mt-3">
          <Chip size="sm" color="primary" className="cursor-pointer">
            {question.grade.grade}
          </Chip>
          {tags.map((tag) => {
            return (
              <Chip key={tag.id} onClick={() => handleTagClick(tag.name)} size="sm" className="cursor-pointer">
                {tag.name}
              </Chip>
            );
          })}
        </div>
      )}
    </div>
  );
};

Question.propTypes = {
  question: PropTypes.object,
  refetch: PropTypes.func,
  handleTagClick: PropTypes.func,
  handleGradeClick: PropTypes.func
};

export default Question;
