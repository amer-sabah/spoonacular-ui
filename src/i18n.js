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
      },
      buttons: {
        close: "Close",
        backToSearch: "Back to Search"
      },
      errors: {
        rateLimit: {
          title: "Daily API Limit Reached",
          message: "Your daily points limit of 50 has been reached. Please upgrade your plan to continue using the API.",
          action: "Please contact support for assistance or upgrade your subscription."
        },
        network: {
          title: "Connection Error",
          message: "Unable to connect to the server. Please check your internet connection and try again.",
          action: "If the problem persists, please contact support."
        },
        server: {
          title: "Server Error",
          message: "We're experiencing technical difficulties. Our team has been notified.",
          action: "Please try again in a few moments or contact support if the issue continues."
        },
        notFound: {
          title: "Not Found",
          message: "The requested recipe could not be found.",
          action: "Please try searching for a different recipe."
        },
        unauthorized: {
          title: "Access Denied",
          message: "You don't have permission to access this resource.",
          action: "Please contact support for assistance."
        },
        generic: {
          title: "Something Went Wrong",
          message: "We encountered an unexpected error while processing your request.",
          action: "Please try again or contact support if the problem persists."
        },
        recipeNotFound: {
          title: "Recipe Not Found",
          message: "The requested recipe could not be found in our database.",
          action: "Please try searching for a different recipe or return to the search page."
        }
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
      },
      buttons: {
        close: "إغلاق",
        backToSearch: "العودة للبحث"
      },
      errors: {
        rateLimit: {
          title: "تم الوصول إلى الحد اليومي",
          message: "لقد وصلت إلى الحد اليومي من النقاط وهو 50. يرجى ترقية خطتك لمواصلة استخدام الخدمة.",
          action: "يرجى الاتصال بالدعم للحصول على المساعدة أو ترقية اشتراكك."
        },
        network: {
          title: "خطأ في الاتصال",
          message: "غير قادر على الاتصال بالخادم. يرجى التحقق من اتصالك بالإنترنت والمحاولة مرة أخرى.",
          action: "إذا استمرت المشكلة، يرجى الاتصال بالدعم."
        },
        server: {
          title: "خطأ في الخادم",
          message: "نواجه صعوبات تقنية. تم إخطار فريقنا.",
          action: "يرجى المحاولة مرة أخرى بعد قليل أو الاتصال بالدعم إذا استمرت المشكلة."
        },
        notFound: {
          title: "غير موجود",
          message: "لم يتم العثور على الوصفة المطلوبة.",
          action: "يرجى البحث عن وصفة مختلفة."
        },
        unauthorized: {
          title: "تم رفض الوصول",
          message: "ليس لديك إذن للوصول إلى هذا المورد.",
          action: "يرجى الاتصال بالدعم للحصول على المساعدة."
        },
        generic: {
          title: "حدث خطأ ما",
          message: "واجهنا خطأ غير متوقع أثناء معالجة طلبك.",
          action: "يرجى المحاولة مرة أخرى أو الاتصال بالدعم إذا استمرت المشكلة."
        },
        recipeNotFound: {
          title: "الوصفة غير موجودة",
          message: "لم يتم العثور على الوصفة المطلوبة في قاعدة البيانات.",
          action: "يرجى البحث عن وصفة مختلفة أو العودة إلى صفحة البحث."
        }
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
