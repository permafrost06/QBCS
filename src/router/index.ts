import { createRouter, createWebHashHistory } from "vue-router";
import AddQuestionView from "../views/AddQuestionView.vue";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/addNew",
      name: "Add Question",
      component: AddQuestionView,
    },
    {
      path: "/",
      name: "All Questions",
      component: () => import("../views/AllQuestionsView.vue"),
    },
    {
      path: "/test",
      name: "Test",
      component: () => import("../views/TestView.vue")
    }
  ],
});

export default router;
