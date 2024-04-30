<script setup>
import { RouterLink } from 'vue-router'
import { atcb_action } from 'add-to-calendar-button'

const config = {
  name: 'Volitve v Evropski parlament',
  description: 'Volitve v Evropski parlament',
  startDate: '2023-06-09',
  endDate: '2023-06-09',
  timeZone: 'Europe/Ljubljana',
  uid: '29173902-a18f-4e82-bc15-6e7a15234805',
  options: ['Apple', 'Google', 'iCal', 'Microsoft365', 'MicrosoftTeams', 'Outlook.com', 'Yahoo']
}

function onCalClick(event) {
  atcb_action(config, event.currentTarget)
}

function onNewsletterSubmit(event) {
  console.log('onNewsletterSubmit', event)
}
</script>

<template>
  <footer>
    <div class="support">
      <p>
        Aplikacijo je pripravil
        <a href="https://danesjenovdan.si/" target="_blank">Danes je nov dan</a> v sklopu
        <a href="https://votematch.eu/" target="_blank">VoteMatch Europe Network</a>.
      </p>
      <a href="https://danesjenovdan.si/doniraj" target="_blank" class="button"
        >Podpri nas z donacijo!<img src="../assets/img/donacija.svg" alt=""
      /></a>
    </div>
    <div class="columns">
      <div>
        <div>
          <img src="../assets/img/vodic.svg" alt="" class="i-vodic" />
          <p>
            <a href="https://vodici.djnd.si/volitve/evropske/"
              >Obišči tudi volilni vodič za alternativno oddajo glasu!</a
            >
          </p>
        </div>
        <div>
          <img src="../assets/img/opomnik.svg" alt="" class="i-opomnik" />
          <p>
            <a href="javascript:;" @click.prevent="onCalClick"
              >Dodaj opomnik za volitve v svoj koledar!</a
            >
          </p>
        </div>
      </div>
      <div class="newsletter">
        <p><strong>Prijavi se na DJND novice</strong></p>
        <form @submit.prevent="onNewsletterSubmit">
          <label for="newsletter-email">Vpiši svoj e-naslov</label>
          <input
            type="email"
            id="newsletter-email"
            name="newsletter-email"
            placeholder="ime@email.si"
          />
          <label for="newsletter-agree" class="newsletter-agree">
            <input type="checkbox" id="newsletter-agree" />
            Strinjam se, da mi Danes je nov dan občasno pošlje email.
          </label>
          <button type="submit">Prijavi me</button>
        </form>
      </div>
      <div>
        <div>
          <p>
            <RouterLink to="/politika-zasebnosti"
              >Politika zasebnosti in varovanja osebnih podatkov</RouterLink
            >
          </p>
        </div>
        <div>
          <p>
            <RouterLink to="/metodologija">Metodologija</RouterLink>
          </p>
        </div>
      </div>
    </div>
    <div class="financer">
      <img src="../assets/img/fundedby.png" class="" />
      <p>
        Financirano s strani Evropske unije. Izražena stališča in mnenja ne odražajo nujno stališč
        in mnenj Evropske unije ali Evropskega parlamenta. Zanje ne moreta biti odgovorna niti
        Evropska unija niti Evropski parlament.
      </p>
    </div>
  </footer>
</template>

<style scoped lang="scss">
footer {
  max-width: 900px;
  margin-top: 70px;
}

.support {
  background-color: #99c2ff;
  border-radius: 20px;
  padding: 28px 26px 28px 36px;
  margin-bottom: 26px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  p {
    font-size: 15px;
    line-height: 20px;

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

  & > div {
    flex-grow: 1;
    flex-basis: 0;
    border-top: 2px solid black;
    border-bottom: 2px solid black;
    padding: 18px 21px;
    position: relative;

    &:not(:first-child) {
      border-left: 1px solid black;
    }

    &:not(:last-child) {
      border-right: 1px solid black;

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

      & > div {
        display: flex;
        align-items: center;
        margin-bottom: 24px;
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

      & > div {
        margin-bottom: 24px;
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

        &::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background-color: #ffd100;
          background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" fill="%23010101"><path d="M3.73164 9.02395L0 5.2925L1.77979 3.51264L3.73162 5.46455L8.22029 0.976074L10.0001 2.75586L3.73164 9.02395Z"/></svg>');
          background-size: 75%;
          background-position: center;
          background-repeat: no-repeat;
          opacity: 0;
        }

        &:checked::before {
          opacity: 1;
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

      &:hover {
        background-color: rgba(255, 255, 255, 0.33);
      }
    }
  }
}

.financer {
  display: flex;
  align-items: center;
  gap: 38px;
  padding: 16px 52px;

  img {
    height: 42px;
  }

  p {
    font-size: 12px;
    line-height: 16px;
  }
}
</style>