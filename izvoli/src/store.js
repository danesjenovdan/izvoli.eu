import { ref } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export const useMainStore = defineStore("main", () => {
  const router = useRouter();

  const loaded = ref(false);

  const quizData = ref(null);
  const questionOrder = ref([]);
  const quizAnswers = ref({});
  const quizFinished = ref(false);

  const results = ref([]);
  const resultsCalculated = ref(false);

  const partiesToCompare = ref([]);

  function clearData() {
    loaded.value = false;

    quizData.value = null;
    questionOrder.value = [];
    quizAnswers.value = {};
    quizFinished.value = false;
    localStorage.removeItem("volitvomat-data");
    localStorage.removeItem("volitvomat-question-order");
    localStorage.removeItem("volitvomat-answers");
    localStorage.removeItem("volitvomat-finished");

    results.value = [];
    resultsCalculated.value = false;

    partiesToCompare.value = [];
  }

  async function loadData() {
    const dataString = localStorage.getItem("volitvomat-data");
    const questionOrderString = localStorage.getItem(
      "volitvomat-question-order",
    );
    const answersString = localStorage.getItem("volitvomat-answers");
    const finishedString = localStorage.getItem("volitvomat-finished");

    if (dataString) {
      quizData.value = JSON.parse(dataString);
    } else {
      quizData.value = await fetchData();
      localStorage.setItem("volitvomat-data", JSON.stringify(quizData.value));
    }

    if (questionOrderString) {
      questionOrder.value = JSON.parse(questionOrderString);
    } else {
      const ids = quizData.value.questions.map((q) => q.id);
      questionOrder.value = shuffleArray(ids);
      localStorage.setItem(
        "volitvomat-question-order",
        JSON.stringify(questionOrder.value),
      );
    }

    if (answersString) {
      quizAnswers.value = JSON.parse(answersString);
    }

    if (finishedString) {
      quizFinished.value = finishedString === "true";
    }

    loaded.value = true;
  }

  async function fetchData() {
    const apiUrl = `${import.meta.env.VITE_API_URL_BASE}/drzavnozborske-volitve-2026/`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  }

  function restartQuiz() {
    clearData();
    loadData();
    router.push({ name: "introduction" });
  }

  function saveAnswer({ questionId, agreement }) {
    quizAnswers.value[questionId] = agreement;
    localStorage.setItem(
      "volitvomat-answers",
      JSON.stringify(quizAnswers.value),
    );
  }

  function finishQuiz() {
    quizFinished.value = true;
    localStorage.setItem("volitvomat-finished", "true");
  }

  function calculateResults() {
    const matchesByParty = quizData.value.parties.reduce((acc, party) => {
      acc[party.id] = {
        count: 0,
        percentage: 0,
      };
      return acc;
    }, {});

    const answersCount = Object.keys(quizAnswers.value).length;
    if (answersCount > 0) {
      for (const questionId in quizAnswers.value) {
        for (const partyId in matchesByParty) {
          const partyAnswer = quizData.value.answers.find(
            (a) =>
              a.question_id === Number(questionId) &&
              a.party_id === Number(partyId),
          );
          const match = partyAnswer.agreement === quizAnswers.value[questionId];
          if (match) {
            matchesByParty[partyId].count++;
            matchesByParty[partyId].percentage = Math.round(
              (matchesByParty[partyId].count / answersCount) * 100,
            );
          }
        }
      }
    }

    const matches = Object.keys(matchesByParty)
      .map((partyId) => ({
        party_id: Number(partyId),
        count: matchesByParty[partyId].count,
        percentage: matchesByParty[partyId].percentage,
      }))
      .sort((a, b) => (a.percentage > b.percentage ? -1 : 1));

    results.value = matches;
    resultsCalculated.value = true;
  }

  return {
    loaded,
    quizData,
    questionOrder,
    quizAnswers,
    quizFinished,
    results,
    resultsCalculated,
    partiesToCompare,
    clearData,
    loadData,
    fetchData,
    restartQuiz,
    saveAnswer,
    finishQuiz,
    calculateResults,
  };
});
