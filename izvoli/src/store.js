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

  function clearData() {
    loaded.value = false;
    quizData.value = null;
    questionOrder.value = [];
    quizAnswers.value = {};
    quizFinished.value = false;
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
      const ids = Object.keys(quizData.value.questions).map((id) => Number(id));
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

    // TODO:
    // if (state.quizFinished) {
    //   store.commit("calculateResults");
    // }

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
    router.push({ name: "introduction" });
  }

  return {
    loaded,
    quizData,
    questionOrder,
    quizAnswers,
    quizFinished,
    clearStore: clearData,
    loadData,
    fetchData,
    restartQuiz,
  };
});

// const store = createStore({
//   mutations: {
//     calculateResults(state) {
//       const answers_party_matches = {};
//       const answersNo = Object.keys(state.answers).length;

//       // setup (count and percentage to 0 for every party)
//       for (const key in state.parties) {
//         answers_party_matches[key] = {
//           count: 0,
//           percentage: 0,
//           finished_quiz: state.parties[key].finished_quiz,
//         };
//       }
//       if (answersNo > 0) {
//         // count matching answers for each party
//         for (const id in state.answers) {
//           // go through answers
//           for (const party_id in answers_party_matches) {
//             // compare user answer to all parties
//             if (state.parties[party_id].finished_quiz) {
//               if (
//                 state.answers[id] ==
//                 state.questions[id].parties[party_id].answer
//               ) {
//                 // TODO: tu sem dal "?." ker je drugače lahko undefined, preveri da to kalkulacijo procentov ne uniči
//                 answers_party_matches[party_id].count++;
//                 answers_party_matches[party_id].percentage = Math.round(
//                   (answers_party_matches[party_id].count / answersNo) * 100,
//                 );
//               }
//             }
//           }
//         }
//       }
//       // create an array with counting results
//       const ordered_results = [];
//       for (const party_id in answers_party_matches) {
//         if (state.parties[party_id].finished_quiz) {
//           ordered_results.push({
//             party_id: party_id,
//             count: answers_party_matches[party_id].count,
//             percentage: answers_party_matches[party_id].percentage,
//             finished_quiz: true,
//           });
//         }
//       }
//       // sort the array (descending by percentage) and save to state.results
//       state.results = ordered_results.sort((a, b) =>
//         a.percentage > b.percentage ? -1 : 1,
//       );
//       for (const key in state.parties) {
//         if (!state.parties[key].finished_quiz) {
//           state.results.push({
//             party_id: key,
//             count: 0,
//             percentage: 0,
//             finished_quiz: false,
//           });
//         }
//       }
//       state.quizFinished = true;
//       localStorage.setItem("quizFinished", "true");
//     },
//   },
// });
