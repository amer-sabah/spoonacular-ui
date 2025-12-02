import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      app: {
        title: "Spoonacular Recipe Search"
      },
      recipeSearch: {
        title: "Search Recipes",
        placeholder: "Enter recipe name (e.g., pasta, chicken, salad)...",
        cuisineLabel: "Cuisine (Optional)",
        allCuisines: "All Cuisines",
        maxCaloriesLabel: "Max Calories (Optional)",
        anyCalories: "Any Calories",
        searchButton: "Search",
        searching: "Searching...",
        errorEmpty: "Please enter a search query",
        errorPrefix: "Error:"
      },
      recipeList: {
        noResults: "No recipes found. Try a different search term."
      },
      recipeDetails: {
        servings: "Servings",
        readyIn: "Ready in",
        minutes: "minutes",
        healthScore: "Health Score",
        pricePerServing: "Price Per Serving",
        ingredients: "Ingredients",
        calories: "Calories",
        amount: "Amount",
        cost: "Cost",
        excludeFromTotalCalories: "Exclude from total calories",
        totalCalories: "Total Calories",
        instructions: "Instructions",
        backToSearch: "Back to Search",
        loading: "Loading recipe details...",
        loadingIngredient: "Loading ingredient details...",
        error: "Error loading recipe details"
      },
      cuisines: {
        African: "African",
        Asian: "Asian",
        American: "American",
        British: "British",
        Cajun: "Cajun",
        Caribbean: "Caribbean",
        Chinese: "Chinese",
        "Eastern European": "Eastern European",
        European: "European",
        French: "French",
        German: "German",
        Greek: "Greek",
        Indian: "Indian",
        Irish: "Irish",
        Italian: "Italian",
        Japanese: "Japanese",
        Jewish: "Jewish",
        Korean: "Korean",
        "Latin American": "Latin American",
        Mediterranean: "Mediterranean",
        Mexican: "Mexican",
        "Middle Eastern": "Middle Eastern",
        Nordic: "Nordic",
        Southern: "Southern",
        Spanish: "Spanish",
        Thai: "Thai",
        Vietnamese: "Vietnamese"
      },
      calories: {
        max100: "Max 100 Calories",
        max200: "Max 200 Calories",
        max300: "Max 300 Calories",
        max400: "Max 400 Calories",
        max500: "Max 500 Calories",
        max600: "Max 600 Calories",
        max700: "Max 700 Calories"
      }
    }
  },
  ar: {
    translation: {
      app: {
        title: "بحث وصفات سبوناكيولار"
      },
      recipeSearch: {
        title: "البحث عن الوصفات",
        placeholder: "أدخل اسم الوصفة (مثل: معكرونة، دجاج، سلطة)...",
        cuisineLabel: "المطبخ (اختياري)",
        allCuisines: "كل المطابخ",
        maxCaloriesLabel: "الحد الأقصى للسعرات الحرارية (اختياري)",
        anyCalories: "أي سعرات حرارية",
        searchButton: "بحث",
        searching: "جاري البحث...",
        errorEmpty: "الرجاء إدخال استعلام بحث",
        errorPrefix: "خطأ:"
      },
      recipeList: {
        noResults: "لم يتم العثور على وصفات. جرب مصطلح بحث مختلف."
      },
      recipeDetails: {
        servings: "الحصص",
        readyIn: "جاهز في",
        minutes: "دقائق",
        healthScore: "نقاط الصحة",
        pricePerServing: "السعر لكل حصة",
        ingredients: "المكونات",
        calories: "السعرات الحرارية",
        amount: "الكمية",
        cost: "التكلفة",
        excludeFromTotalCalories: "استبعاد من إجمالي السعرات الحرارية",
        totalCalories: "إجمالي السعرات الحرارية",
        instructions: "التعليمات",
        backToSearch: "العودة للبحث",
        loading: "جاري تحميل تفاصيل الوصفة...",
        loadingIngredient: "جاري تحميل تفاصيل المكون...",
        error: "خطأ في تحميل تفاصيل الوصفة"
      },
      cuisines: {
        African: "أفريقي",
        Asian: "آسيوي",
        American: "أمريكي",
        British: "بريطاني",
        Cajun: "كيجن",
        Caribbean: "كاريبي",
        Chinese: "صيني",
        "Eastern European": "أوروبي شرقي",
        European: "أوروبي",
        French: "فرنسي",
        German: "ألماني",
        Greek: "يوناني",
        Indian: "هندي",
        Irish: "إيرلندي",
        Italian: "إيطالي",
        Japanese: "ياباني",
        Jewish: "يهودي",
        Korean: "كوري",
        "Latin American": "أمريكي لاتيني",
        Mediterranean: "متوسطي",
        Mexican: "مكسيكي",
        "Middle Eastern": "شرق أوسطي",
        Nordic: "شمالي",
        Southern: "جنوبي",
        Spanish: "إسباني",
        Thai: "تايلندي",
        Vietnamese: "فيتنامي"
      },
      calories: {
        max100: "حد أقصى 100 سعرة حرارية",
        max200: "حد أقصى 200 سعرة حرارية",
        max300: "حد أقصى 300 سعرة حرارية",
        max400: "حد أقصى 400 سعرة حرارية",
        max500: "حد أقصى 500 سعرة حرارية",
        max600: "حد أقصى 600 سعرة حرارية",
        max700: "حد أقصى 700 سعرة حرارية"
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
