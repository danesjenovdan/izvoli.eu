<script setup>
import axios from 'axios'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { atcb_action } from 'add-to-calendar-button'

const newsletterEmail = ref('')
const newsletterLoading = ref(false)

const config = {
  name: 'Volitve v Evropski parlament',
  description: 'Volitve v Evropski parlament',
  startDate: '2023-06-09',
  endDate: '2023-06-09',
  timeZone: 'Europe/Ljubljana',
  uid: '29173902-a18f-4e82-bc15-6e7a15234805',
  options: ['Apple', 'Google', 'iCal', 'Microsoft365', 'MicrosoftTeams', 'Outlook.com', 'Yahoo'],
  customLabels: {
    close: 'Zapri'
  }
}

function onCalClick(event) {
  atcb_action(config, event.currentTarget)
}

async function onNewsletterSubmit() {
  newsletterLoading.value = true
  try {
    const response = await axios.post('https://podpri.lb.djnd.si/api/subscribe/', {
      email: newsletterEmail.value,
      segment_id: 21
    })
    if (response.data.msg === 'mail sent') {
      newsletterEmail.value = ''
      newsletterLoading.value = false
      alert('Hvala! Poslali smo ti sporočilo s povezavo, na kateri lahko potrdiš prijavo!')
    } else {
      newsletterLoading.value = false
      alert('Prišlo je do napake :(')
    }
  } catch (error) {
    newsletterLoading.value = false
    alert('Prišlo je do napake :(')
  }
}
</script>

<template>
  <footer>
    <div class="support">
      <p>
        Aplikacijo je pripravil
        <a href="https://danesjenovdan.si/" target="_blank">Danes je nov dan</a> v sodelovanju z mednarodno mrežo
        <a href="https://votematch.eu/" target="_blank">VoteMatch Europe</a>.
      </p>
      <a href="https://danesjenovdan.si/doniraj" target="_blank" class="button">Podpri naše delo!<img
          src="../assets/img/donacija.svg" alt="" /></a>
    </div>
    <div class="columns">
      <div>
        <div>
          <img src="../assets/img/vodic.svg" alt="" class="i-vodic" />
          <p>
            <a href="https://vodici.djnd.si/volitve/evropske/" target="_blank">Obišči volilni vodič za vse, ki ne morejo
              glasovati na običajen način</a>
          </p>
        </div>
        <div>
          <img src="../assets/img/opomnik.svg" alt="" class="i-opomnik" />
          <p>
            <a href="javascript:;" @click.prevent="onCalClick">Dodaj opomnik za volitve v svoj koledar</a>
          </p>
        </div>
      </div>
      <div class="newsletter">
        <p><strong>Prijavi se na naš Občasnik!</strong></p>
        <form @submit.prevent="onNewsletterSubmit">
          <label for="newsletter-email">Vpiši svoj e-naslov:</label>
          <input
            type="email"
            id="newsletter-email"
            name="newsletter-email"
            placeholder="ime@email.si"
            required
            v-model="newsletterEmail"
          />
          <label for="newsletter-agree" class="newsletter-agree">
            <input type="checkbox" id="newsletter-agree" required />
            Strinjam se, da mi Danes je nov dan občasno pošlje elektronsko sporočilo.
          </label>
          <button type="submit" :disabled="newsletterLoading">Prijavi me!</button>
        </form>
      </div>
      <div>
        <div>
          <p>
            <RouterLink to="/politika-zasebnosti">Politika zasebnosti in varovanja osebnih podatkov</RouterLink>
          </p>
        </div>
        <div>
          <p>
            <RouterLink to="/metodologija">Spoznaj več o Izvoli.eu</RouterLink>
          </p>
        </div>
      </div>
    </div>
    <div class="financer">
      <img src="../assets/img/fundedby.png" class="" />
      <p>
        Projekt je sofinanciran s strani Evropske unije v okviru programa nepovratnih sredstev Evropskega parlamenta za
        komunikacije. Izražena stališča in mnenja ne odražajo nujno stališč in mnenj Evropske unije ali Evropskega
        parlamenta. Zanje ne moreta biti odgovorna niti Evropska unija niti Evropski parlament.
      </p>
    </div>
  </footer>
</template>

<style scoped lang="scss">
footer {
  max-width: 900px;
  margin-top: 70px;

  @media (max-width: 575.98px) {
    padding-inline: 21px;
    margin-top: 47px;
  }
}

.support {
  background-color: #99c2ff;
  border-radius: 20px;
  padding: 28px 26px 28px 36px;
  margin-bottom: 26px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 575.98px) {
    flex-direction: column;
    padding: 27px 24px;
    gap: 21px;
  }

  p {
    font-size: 15px;
    line-height: 20px;
    margin-right: 20px;

    @media (max-width: 575.98px) {
      font-size: 12px;
    }

    a {
      font-weight: 700;
      color: black;

      &:hover {
        text-decoration-color: #ffd100;
        text-decoration-thickness: 2px;
      }
    }
  }

  a.button {
    display: block;
    padding: 4px 84px 4px 12px;
    border: 2px solid black;
    border-radius: 10px;
    font-size: 15px;
    font-weight: 800;
    color: black;
    text-decoration: none;
    position: relative;
    flex-shrink: 0;

    img {
      position: absolute;
      width: 94px;
      top: -10px;
      right: -8px;
    }

    &:hover {
      background-color: rgba(255, 255, 255, 0.33);

      img {
        animation: shake 1s ease-in-out;

        @keyframes shake {
          0%,
          100% {
            transform: rotate(0deg);
            transform-origin: 50% 50%;
          }

          10% {
            transform: rotate(4deg);
          }

          20%,
          40%,
          60% {
            transform: rotate(-6deg);
          }

          30%,
          50%,
          70% {
            transform: rotate(6deg);
          }

          80% {
            transform: rotate(-4deg);
          }

          90% {
            transform: rotate(4deg);
          }
        }
      }
    }
  }
}

.columns {
  display: flex;

  @media (max-width: 575.98px) {
    flex-direction: column;
  }

  & > div {
    flex-grow: 1;
    flex-basis: 0;
    border-top: 2px solid black;
    border-bottom: 2px solid black;
    padding: 18px 21px;
    position: relative;

    &:not(:first-child) {
      border-left: 1px solid black;

      @media (max-width: 575.98px) {
        border-left: none;
      }
    }

    &:not(:last-child) {
      border-right: 1px solid black;

      @media (max-width: 575.98px) {
        border-right: none;
        border-bottom: none;
      }

      &::after,
      &::before {
        background-color: #7fb2ff;
        content: '';
        display: block;
        height: 8px;
        position: absolute;
        width: 12px;
        z-index: 1;
        right: -7px;

        @media (max-width: 575.98px) {
          display: none;
        }
      }

      &::before {
        top: -2px;
      }

      &::after {
        bottom: -2px;
      }
    }

    p {
      font-size: 15px;
      line-height: 20px;

      @media (max-width: 575.98px) {
        font-size: 12px;
        line-height: 15px;
      }

      a {
        font-weight: 700;
        color: black;

        &:hover {
          text-decoration-color: #ffd100;
          text-decoration-thickness: 2px;
        }
      }
    }

    &:first-child {
      padding-left: 12px;

      @media (max-width: 575.98px) {
        padding-left: 21px;
      }

      & > div {
        display: flex;
        align-items: center;
        margin-bottom: 24px;

        &:last-child {
          margin-bottom: 0;
        }
      }

      .i-vodic {
        width: 17px;
        margin-right: 10px;
      }

      .i-opomnik {
        width: 14px;
        margin-right: 13px;
      }
    }

    &:last-child {
      padding-right: 12px;

      @media (max-width: 575.98px) {
        padding-right: 21px;
      }

      & > div {
        margin-bottom: 24px;

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }

  .newsletter {
    label {
      display: block;
      margin-block: 10px 5px;
      font-size: 12px;
      line-height: 16px;
    }

    input#newsletter-email {
      display: block;
      width: 100%;
      font: inherit;
      background-color: #7fb2ff;
      border: 1px solid black;
      border-radius: 10px;
      font-size: 12px;
      line-height: 36px;
      height: 36px;
      padding: 0 14px;
    }

    .newsletter-agree {
      display: flex;
      align-items: flex-start;
      gap: 4px;

      input#newsletter-agree {
        flex-shrink: 0;
        appearance: none;
        background-color: transparent;
        margin: 2px 0 0 0;
        width: 16px;
        height: 16px;
        border: 1px solid black;
        border-radius: 4px;
        transform: translateY(-0.075em);
        cursor: pointer;
        position: relative;

        &:checked {
          background-color: #ffd100;

          &::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            width: 9px;
            height: 5px;
            border: solid black;
            border-width: 0 0 2px 2px;
            transform: scale(1) rotate(-45deg) translateX(-12%) translateY(90%);
          }
        }
      }
    }

    button[type='submit'] {
      display: block;
      width: 100%;
      padding: 6px 14px;
      margin-top: 14px;
      background-color: #65a3ff;
      border: 2px solid black;
      border-radius: 10px;
      font: inherit;
      font-size: 15px;
      line-height: 20px;
      font-weight: 800;
      text-align: left;
      cursor: pointer;

      &:not(:disabled):hover {
        background-color: rgba(255, 255, 255, 0.33);
      }

      &:disabled {
        background-color: rgba(255, 255, 255, 0.22);
        cursor: progress;
      }
    }
  }
}

.financer {
  display: flex;
  align-items: center;
  gap: 38px;
  padding: 16px 52px;

  @media (max-width: 575.98px) {
    flex-direction: column;
    padding: 18px 21px;
    align-items: flex-start;
    gap: 18px;
  }

  img {
    height: 42px;
  }

  p {
    font-size: 12px;
    line-height: 16px;

    @media (max-width: 575.98px) {
      font-size: 10px;
      line-height: 14px;
    }
  }
}
</style>
