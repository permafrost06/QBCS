import { createRouter, createWebHashHistory } from "vue-router";
import AllQuestionsView from "@/views/AllQuestionsView.vue";

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "All Questions",
            component: AllQuestionsView,
        },
        {
            path: "/test",
            name: "Test",
            component: () => import("@/views/TestView.vue"),
        },
        {
            path: "/login",
            name: "Log in",
            component: () => import("@/views/LoginView.vue"),
        },
    ],
});

export default router;
