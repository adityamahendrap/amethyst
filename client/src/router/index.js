import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ListArticleView from "../views/ListArticleView.vue";
import ArticleView from "../views/ArticleView.vue";
import LoginView from "../views/LoginView.vue";
import DashboardView from "../views/DashboardView.vue";
import AddArticleAView from "../views/AddArticleView.vue";
import EditArticleAView from "../views/EditArticleView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/articles/:tag",
      name: "listArticle",
      component: ListArticleView,
    },
    {
      path: "/article/:id",
      name: "article",
      component: ArticleView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: DashboardView,
    },
    {
      path: "/add",
      name: "add",
      component: AddArticleAView,
    },
    {
      path: "/edit/:id",
      name: "edit",
      component: EditArticleAView,
    },
  ],
});

export default router;
