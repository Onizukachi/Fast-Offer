import HomePage from '@containers/HomePage'
import FavoritesPage from '@containers/FavoritesPage'
import InterviewsPage from '@containers/InterviewsPage'
import QuestionsPage from "@containers/QuestionsPage";
import QuestionPage from "@containers/QuestionPage";
import NewQuestionPage from "@containers/NewQuestionPage";
import EditQuestionPage from "@containers/EditQuestionPage";

const routesConfig = [
  {
    path: '/',
    element: HomePage,
  },
  {
    path: '/questions',
    element: QuestionsPage,
  },
  {
    path: '/questions/new',
    element: NewQuestionPage,
  },
  {
    path: '/questions/:id/edit',
    element: EditQuestionPage,
  },
  {
    path: '/questions/:id',
    element: QuestionPage,
  },
  {
    path: '/interviews',
    element: InterviewsPage,
  },
  {
    path: '/favorites',
    element: FavoritesPage,
  },
]

export default routesConfig