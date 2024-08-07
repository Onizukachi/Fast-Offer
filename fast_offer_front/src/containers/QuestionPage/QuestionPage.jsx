import { useMutation, useQuery } from "react-query";
import { useContext, useState, useRef } from "react";
import { questionQuery } from "./queries";
import { Divider, Spinner } from "@nextui-org/react";
import Question from "@components/Question";
import { useParams } from "react-router-dom";
import AuthContext from "@context/AuthContext";
import { gravatarUrl } from "@utils/gravatarUrl";
import "react-quill/dist/quill.snow.css";
import "highlight.js/styles/monokai-sublime.css";
import { Button } from "@nextui-org/react";
import { MdComment } from "react-icons/md";
import { createAnswerQuery } from "./queries";
import { showToast } from "@utils/toast";
import { normalizeCountForm } from "@utils/normalizeCountForm";
import Answer from "@components/Answer";
import { UNATHORIZED } from "@constants/toastMessages";
import { deserialize } from "deserialize-json-api";
import QuillEditor from "@components/QuillEditor";

const QuestionPage = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [editorContent, setEditorContent] = useState("");
  const [editorPlainText, setEditorPlainText] = useState("");
  const [answerErrors, setAnswerErrors] = useState([]);
  const quillRef = useRef(null);

  const resetAnswerEditor = () => {
    setEditorContent("");
    setEditorPlainText("");
    setAnswerErrors([]);
  };

  const { isLoading } = useQuery(
    `question`,
    () =>
      questionQuery(id).then((data) => {
        setQuestion(deserialize(data).data);
      }),
    { refetchInterval: false, refetchOnWindowFocus: false },
  );

  const getUnprivilegedEditor = () => {
    if (!quillRef.current) return;

    const editor = quillRef.current.getEditor();
    return quillRef.current.makeUnprivilegedEditor(editor);
  };

  const createAnswerMutation = useMutation({
    mutationFn: () => createAnswerQuery(id, getUnprivilegedEditor()?.getHTML()),
    onSuccess: (data) => {
      const deserializedAnswer = deserialize(data).data;
      setQuestion({
        ...question,
        answers_count: question.answers_count + 1,
        answers: [deserializedAnswer, ...question.answers],
      });
      resetAnswerEditor();
      showToast("Ответ успешно создан");
    },
    onError: (error) => {
      console.log(error.response.data);
      setAnswerErrors(error.response.data);
    },
  });

  const handleSubmitAnswer = () => {
    if (!user) {
      showToast(UNATHORIZED, "warning");
      return;
    }

    createAnswerMutation.mutate();
  };

  const handleEditorChange = (content, editor) => {
    setEditorPlainText(editor.getText());
    setEditorContent(editor.getHTML());
  };

  const onDeleteAnswer = (answerId) => {
    const answers = question.answers.filter(
      (answer) => +answer.id !== +answerId,
    );
    setQuestion((prev) => {
      return {
        ...prev,
        answers: answers,
      };
    });
  };

  const validateAnswer = () => {
    return editorPlainText.length > 1;
  };

  return (
    <div className="flex flex-col gap-6">
      {isLoading && <Spinner size="lg" color="primary" />}
      {question && (
        <>
          <Question question={question} />
          <div className="px-8 py-4 rounded-lg shadow-md">
            <h1 className="text-3xl ">Ответить на вопрос</h1>
            {answerErrors.length > 0 && (
              <div className="ml-28 mt-4 text-danger">
                <ul className="list-disc text-danger">
                  {answerErrors.map((error, index) => {
                    return <li key={index}>{error}</li>;
                  })}
                </ul>
              </div>
            )}
            <div className="mt-4 flex flex-row">
              {user && (
                <a className="hidden sm:flex items-center basis-28" href="#">
                  <img
                    className="ml-0 mr-4 sm:mx-4 w-12 h-12 object-cover rounded-full sm:block"
                    src={gravatarUrl(user.gravatar_hash)}
                    alt="avatar"
                  />
                </a>
              )}
              <QuillEditor
                value={editorContent}
                onChange={handleEditorChange}
                quillRef={quillRef}
                placeholder={"Введите текст ответа"}
              />
            </div>
            <div className={`ml-0 ${user && 'sm:ml-28'} mt-20 flex flex-row gap-4 items-center flex-wrap`}>
              <Button
                size="lg"
                startContent={<MdComment size="1.4em" />}
                className="text-lg"
                color="primary"
                onClick={handleSubmitAnswer}
                isDisabled={!validateAnswer()}
              >
                Ответить
              </Button>
              <p className="underline">
                Пожалуйста, отвечайте серьезно, уважайте других пользователей
                сайта
              </p>
            </div>
          </div>
          <div className="px-8 py-4 rounded-lg shadow-md">
            <h1 className="text-3xl ">{`${question.answers_count} ${normalizeCountForm(question.answers_count, ["ответ", "ответа", "ответов"])}`}</h1>
            <div className="flex flex-col gap-2">
              {question.answers.map((answer, index) => {
                return (
                  <div key={answer.id}>
                    <Answer
                      answer={answer}
                      questionId={question.id}
                      onDelete={onDeleteAnswer}
                    />
                    {index !== question.answers.length - 1 && (
                      <Divider className="mt-1" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default QuestionPage;
