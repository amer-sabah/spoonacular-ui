import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      recipeDetails: {
        servings: "Servings",
        readyIn: "Ready in",
        minutes: "minutes",
        healthScore: "Health Score",
        pricePerServing: "Price Per Serving",
        ingredients: "Ingredients",
        calories: "Calories",
        cost: "Cost",
        excludeFromTotal: "Exclude from total",
        totalCalories: "Total Calories",
        instructions: "Instructions",
        backToSearch: "Back to Search",
        loading: "Loading recipe details...",
        loadingIngredient: "Loading ingredient details...",
        error: "Error loading recipe details"
      }
    }
  },
  ar: {
    translation: {
      recipeDetails: {
        servings: "الحصص",
        readyIn: "جاهز في",
        minutes: "دقائق",
        healthScore: "نقاط الصحة",
        pricePerServing: "السعر لكل حصة",
        ingredients: "المكونات",
        calories: "السعرات الحرارية",
        cost: "التكلفة",
        excludeFromTotal: "استبعاد من المجموع",
        totalCalories: "إجمالي السعرات الحرارية",
        instructions: "التعليمات",
        backToSearch: "العودة للبحث",
        loading: "جاري تحميل تفاصيل الوصفة...",
        loadingIngredient: "جاري تحميل تفاصيل المكون...",
        error: "خطأ في تحميل تفاصيل الوصفة"
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
