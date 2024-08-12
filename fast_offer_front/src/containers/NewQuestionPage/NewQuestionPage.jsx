import { useRef, useState, useCallback } from "react";
import { useMutation, useQuery } from "react-query";
import { tagsQuery, createQuestionQuery } from "./queries";
import { positionsQuery } from '@queries/positionsQuery'
import { gradesQuery } from '@queries/gradesQuery'
import { Button, Select, SelectItem } from "@nextui-org/react";
import { deserialize } from "deserialize-json-api";
import { showToast } from "@utils/toast.js";
import { ReactTags } from "react-tag-autocomplete";
import { useNavigate } from "react-router-dom";
import { formatErrors } from "@utils/formatErrors";
import QuillEditor from "@components/QuillEditor";

const NewQuestionPage = () => {
  const navigate = useNavigate();
  const [editorContent, setEditorContent] = useState("");
  const [editorPlainText, setEditorPlainText] = useState("");
  const [questionErrors, setQuestionErrors] = useState({
    body: [],
    grade: [],
    positions: [],
  });
  const [grades, setGrades] = useState([]);
  const [positions, setPositions] = useState([]);
  const [tags, setTags] = useState([]);
  const quillRef = useRef(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedGradeId, setSelectedGradeId] = useState(null);
  const [selectedPositionIds, setSelectedPositionIds] = useState([]);

  useQuery(
    `grades`,
    () =>
      gradesQuery().then((data) => {
        setGrades(deserialize(data).data);
      }),
    { refetchInterval: false, refetchOnWindowFocus: false },
  );

  useQuery(
    `positions`,
    () =>
      positionsQuery().then((data) => {
        setPositions(deserialize(data).data);
      }),
    { refetchInterval: false, refetchOnWindowFocus: false },
  );

  useQuery(
    `tags`,
    () =>
      tagsQuery().then((data) => {
        setTags(deserialize(data).data);
      }),
    { refetchInterval: false, refetchOnWindowFocus: false },
  );

  const formParams = () => {
    return {
      body: getUnprivilegedEditor()?.getHTML(),
      it_grades_id: selectedGradeId,
      tag_list: selectedTags.map((tag) => tag.label),
      position_ids: Array.from(selectedPositionIds).filter((el) => el !== ""),
    };
  };

  const { mutate } = useMutation({
    mutationFn: () => createQuestionQuery(formParams()),
    onSuccess: () => {
      showToast("Вопрос создан");
      navigate("/questions", { replace: false });
    },
    onError: (error) => {
      setQuestionErrors((prevErrors) => {
        const updatedErrors = { ...prevErrors };
        Object.keys(prevErrors).forEach((key) => {
          updatedErrors[key] = error.response.data[key] || [];
        });

        return updatedErrors;
      });
    },
  });

  const getUnprivilegedEditor = () => {
    if (!quillRef.current) return;

    const editor = quillRef.current.getEditor();
    return quillRef.current.makeUnprivilegedEditor(editor);
  };

  const handleEditorChange = (content, editor) => {
    setEditorPlainText(editor.getText());
    setEditorContent(editor.getHTML());
  };

  const onAddTag = useCallback(
    (newTag) => {
      setSelectedTags([...selectedTags, newTag]);
    },
    [selectedTags],
  );

  const onDeleteTag = useCallback(
    (tagIndex) => {
      setSelectedTags(selectedTags.filter((_, i) => i !== tagIndex));
    },
    [selectedTags],
  );

  const tagIsValid = (value) => /^[a-z]{2,30}$/i.test(value);

  const onTagValidate = useCallback((value) => tagIsValid(value), []);

  const validateQuestion = () => {
    return (
      editorPlainText.length > 1 &&
      selectedGradeId &&
      Array.from(selectedPositionIds).filter((el) => el !== "").length > 0
    );
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-3xl text-center mb-6">Создать вопрос</h1>
      <div className="flex flex-col gap-6">
        {questionErrors.body.length > 0 && (
          <div className="mt-4 text-danger">
            <ul className="list-disc text-danger">
              {formatErrors("Вопрос", questionErrors.body).map(
                (error, index) => {
                  return <li key={index}>{error}</li>;
                },
              )}
            </ul>
          </div>
        )}
        <QuillEditor
          value={editorContent}
          onChange={handleEditorChange}
          quillRef={quillRef}
          placeholder={"Введите текст вопроса"}
        />
        <div className="flex flex-wrap gap-6">
          <Select
            label="Уровень сложности"
            isInvalid={questionErrors.grade.length > 0}
            errorMessage={formatErrors(
              "Уровень сложности",
              questionErrors.grade,
            ).join(". ")}
            isRequired
            labelPlacement="outside"
            placeholder="Выберите уровень"
            className="max-w-xs"
            disableSelectorIconRotation
            onChange={(e) => setSelectedGradeId(e.target.value)}
          >
            {grades.map((grade) => (
              <SelectItem key={grade.id}>{grade.grade}</SelectItem>
            ))}
          </Select>
          <Select
            label="Языки программирования"
            isInvalid={questionErrors.positions.length > 0}
            errorMessage={formatErrors("Язык", questionErrors.positions).join(
              ". ",
            )}
            isRequired
            labelPlacement="outside"
            selectionMode="multiple"
            placeholder="Выберите языки"
            selectedKeys={selectedPositionIds}
            className="max-w-xs"
            onChange={(e) =>
              setSelectedPositionIds(new Set(e.target.value.split(",")))
            }
          >
            {positions.map((position) => (
              <SelectItem
                key={position.id}
                startContent={
                  <img
                    className="w-6 h-6"
                    src={position.image_url}
                    alt={position.title}
                  ></img>
                }
              >
                {position.title}
              </SelectItem>
            ))}
          </Select>
        </div>
        <ReactTags
          allowNew
          collapseOnSelect
          id="tagsInput"
          labelText="Теги"
          placeholderText="Создайте или выберите теги"
          newOptionText={"Добавить %value%"}
          isInvalid={false}
          onAdd={onAddTag}
          onDelete={onDeleteTag}
          onValidate={onTagValidate}
          selected={selectedTags}
          suggestions={tags.map((tag) => {
            return { value: tag.id, label: tag.name };
          })}
        />
        <Button
          onClick={() => mutate()}
          className="w-44"
          color="primary"
          size="lg"
          variant="shadow"
          isDisabled={!validateQuestion()}
        >
          Сохранить
        </Button>
      </div>
    </div>
  );
};

export default NewQuestionPage;
