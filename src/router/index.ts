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
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AllQuestionsView.vue"),
    },
  ],
});

export default router;
