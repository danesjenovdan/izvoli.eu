import { createStore } from 'vuex'
import axios from 'axios'

const store = createStore({
  state() {
    return {
      apiUrl: import.meta.env.VITE_API_URL_BASE,
      storeInitialized: false,
      parties: {},
      questions: {},
      questionsList: [],
      answers: {},
      results: {},
      quizFinished: false,
      partiesToCompare: []
    }
  },
  getters: {
    getApiUrl(state) {
      return state.apiUrl
    },
    getStoreInitialized(state) {
      return state.storeInitialized
    },
    getQuestions(state) {
      return state.questions
    },
    getQuestionsList(state) {
      return state.questionsList
    },
    getAnswers(state) {
      return state.answers
    },
    getParties(state) {
      return state.parties
    },
    getResults(state) {
      return state.results
    },
    getQuizFinished(state) {
      return state.quizFinished
    },
    getPartiesToCompare(state) {
      return state.partiesToCompare
    }
  },
  mutations: {
    clearStore(state) {
      state.parties = {}
      state.questions = {}
      state.answers = {}
      state.results = {}
      state.quizFinished = false
      state.storeInitialized = true
    },
    initializeStore(state) {
      state.storeInitialized = true
    },
    addAnswer(state, payload) {
      state.answers[payload.id] = payload.answer
      localStorage.setItem('answers', JSON.stringify(state.answers))
      // plausible('Answer', {
      //   props: {
      //     demandId: payload.id,
      //     answer: payload.answer ? 1 : -1
      //   }
      // })
    },
    removeAnswer(state, payload) {
      delete state.answers[payload.id]
      localStorage.setItem('answers', JSON.stringify(state.answers))
      // plausible('Answer', {
      //   props: {
      //     demandId: payload.id,
      //     answer: 0
      //   }
      // })
    },
    calculateResults(state) {
      const answers_party_matches = {}
      const answersNo = Object.keys(state.answers).length

      // setup (count and percentage to 0 for every party)
      for (const key in state.parties) {
        answers_party_matches[key] = {
          count: 0,
          percentage: 0,
          finished_quiz: state.parties[key].finished_quiz
        }          
      }
      if (answersNo > 0) {
        // count matching answers for each party
        for (const id in state.answers) {
          // go through answers
          for (const party_id in answers_party_matches) {
            // compare user answer to all parties
            if (state.parties[party_id].finished_quiz) {
              if (state.answers[id] == state.questions[id].parties[party_id].answer) {
                // TODO: tu sem dal "?." ker je drugače lahko undefined, preveri da to kalkulacijo procentov ne uniči
                answers_party_matches[party_id].count++
                answers_party_matches[party_id].percentage = Math.round(
                  (answers_party_matches[party_id].count / answersNo) * 100
                )
              }
            }
              
          }
        }
      }
      // create an array with counting results
      const ordered_results = []
      for (const party_id in answers_party_matches) {
        ordered_results.push({
          party_id: party_id,
          count: answers_party_matches[party_id].count,
          percentage: answers_party_matches[party_id].percentage,
          finished_quiz: true
        })
      }
      // sort the array (descending by percentage) and save to state.results
      state.results = ordered_results.sort((a, b) => (a.percentage > b.percentage ? -1 : 1))
      for (const key in state.parties) {
        if (!state.parties[key].finished_quiz) {
          state.results.push({
            party_id: key,
            count: 0,
            percentage: 0,
            finished_quiz: false
          })
        }
        
      }
      state.quizFinished = true
      localStorage.setItem('quizFinished', 'true')
    },
    setQuestions(state, payload) {
      // save questions object
      state.questions = payload.questions
      localStorage.setItem('questions', JSON.stringify(state.questions))
      // create list of questions and shuffle it
      if (!payload.questionsList) {
        const questionsList = Object.keys(payload.questions)
        const shuffledQuestions = questionsList.sort(() => Math.random() - 0.5)
        state.questionsList = shuffledQuestions
        localStorage.setItem('questionsList', JSON.stringify(state.questionsList))
      } else {
        state.questionsList = payload.questionsList
        // localStorage.setItem('questionsList', JSON.stringify(state.questionsList))
      }
    },
    setParties(state, parties) {
      state.parties = {}
      for (const index in parties) {
        state.parties[parties[index].id] = {
          name: parties[index].name,
          image: parties[index].image,
          votematch_id: parties[index].votematch_id,
          finished_quiz: parties[index].finished_quiz
          // url: parties[index].url
        }
      }
      localStorage.setItem('parties', JSON.stringify(state.parties))
    },
    setPartiesToCompare(state, payload) {
      state.partiesToCompare = [...payload.parties]
    }
  },
  actions: {
    async initializeStore({ commit, dispatch, state }) {
      // check if data exists in local storage
      const parties = localStorage.getItem('parties')
      const questions = localStorage.getItem('questions')
      const questionsList = localStorage.getItem('questionsList')
      const answers = localStorage.getItem('answers')
      const finished = localStorage.getItem('quizFinished')
      // console.log("Localstorage")
      // console.log(parties)
      // console.log(questions)
      // console.log(questionsList)
      // console.log(answers)
      // console.log(finished)
      if (parties && questions && questionsList) {
        commit('setQuestions', {
          questions: JSON.parse(questions),
          questionsList: JSON.parse(questionsList)
        })
        state.parties = JSON.parse(parties) // TODO: change to commit when api is fixed
        // commit('setParties', response.data['parties']);
        if (answers) {
          state.answers = JSON.parse(answers)
        }
        if (finished) {
          state.quizFinished = finished === 'true'
          if (state.quizFinished) {
            store.commit('calculateResults')
          }
        }
      } else {
        // no data
        await dispatch('getData')
      }
      commit('initializeStore')
      return state.quizFinished
    },
    async getData({ commit, state }) {
      const response = await axios.get(`${state.apiUrl}/volitvomat`)
      commit('setQuestions', {
        questions: response.data['statements']
      })
      commit('setParties', response.data['parties'])
    },
    clearStore({ commit, dispatch }) {
      // localStorage.clear();
      localStorage.removeItem('parties')
      localStorage.removeItem('questions')
      localStorage.removeItem('answers')
      localStorage.removeItem('quizFinished')
      commit('clearStore')
      dispatch('getData')
    },
    initializeQuizFinished({ state }) {
      finished = localStorage.getItem('quizFinished')
      state.quizFinished = finished === 'true'
      return state.quizFinished
    }
  }
})

export default store
