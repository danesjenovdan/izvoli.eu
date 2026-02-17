<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
import { atcb_action } from "add-to-calendar-button";

const newsletterEmail = ref("");
const newsletterConsent = ref(false);
const newsletterLoading = ref(false);

const config = {
  name: "Državnozborske volitve 2026",
  description: "Državnozborske volitve 2026",
  startDate: "2026-03-22",
  endDate: "2026-03-22",
  timeZone: "Europe/Ljubljana",
  uid: "f2a4df18-7f3a-4de3-9848-3a90dd1a97a8",
  options: [
    "Apple",
    "Google",
    "iCal",
    "Microsoft365",
    "MicrosoftTeams",
    "Outlook.com",
    "Yahoo",
  ],
  customLabels: {
    close: "Zapri",
  },
};

function onCalClick(event) {
  atcb_action(config, event.currentTarget);
}

async function onNewsletterSubmit() {
  const email = newsletterEmail.value;

  let campaign_slug = "glas-ljudstva";
  let segment_id = 10;

  let url = `https://moj.djnd.si/${campaign_slug}/prijava?segment_id=${segment_id}`;
  url += `&email=${encodeURIComponent(email)}`;
  window.open(`${url}`, `_blank`);
}
</script>

<template>
  <footer>
    <div class="columns">
      <div class="col">
        <div class="border">
          <div class="content info">
            <div class="with-image">
              <img src="../assets/img/vodic.png" alt="" />
              <p>
                <a
                  href="https://vodici.djnd.si/volitve/dz-2026/"
                  target="_blank"
                  >Obišči tudi volilni vodič za alternativno oddajo glasu!</a
                >
              </p>
            </div>
            <div class="with-image">
              <img src="../assets/img/opomnik.png" alt="" />
              <p>
                <a href="javascript:;" @click.prevent="onCalClick"
                  >Dodaj opomnik za volitve v svoj koledar!</a
                >
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="border">
          <div class="content newsletter">
            <p><strong>Prijavi se na Glas ljudstva novice</strong></p>
            <form @submit.prevent="onNewsletterSubmit">
              <label for="newsletter-email">Vpiši svoj e-naslov</label>
              <input
                id="newsletter-email"
                v-model="newsletterEmail"
                type="email"
                name="newsletter-email"
                placeholder="ime@email.si"
                required
              />
              <label for="newsletter-agree" class="newsletter-agree">
                <input
                  id="newsletter-agree"
                  v-model="newsletterConsent"
                  type="checkbox"
                  required
                />
                Strinjam se, da mi Danes je nov dan občasno pošlje elektronsko
                sporočilo.
              </label>
              <button type="submit" :disabled="newsletterLoading">
                Prijavi me
              </button>
            </form>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="border">
          <div class="content about">
            <p>
              <RouterLink :to="{ name: 'privacyPolicy' }"
                >Politika zasebnosti in varovanja osebnih podatkov</RouterLink
              >
            </p>
            <p>
              <RouterLink :to="{ name: 'about' }">Metodologija</RouterLink>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="columns financer">
      <div class="col djnd">
        <div>
          Spletno mesto z 🖤 postavil
          <a
            href="https://danesjenovdan.si"
            target="_blank"
            rel="noopener noreferrer"
            >Danes je nov dan</a
          >.
        </div>
      </div>
      <div class="col eu">
        <img src="../assets/img/fundedby.png" class="" />
        <p>
          Financirano s strani Evropske unije. Izražena stališča in mnenja ne
          odražajo nujno stališč in mnenj Evropske unije ali Evropskega
          parlamenta. Zanje ne moreta biti odgovorna niti Evropska unija niti
          Evropski parlament.
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
footer {
  width: 100%;
  max-width: 900px;
  margin-top: 4.5rem;

  @media (max-width: 575.98px) {
    margin-top: 3rem;
  }

  .columns {
    display: flex;

    @media (max-width: 923.98px) {
      flex-direction: column;
    }

    .col {
      flex: 1;
      display: flex;

      .border {
        display: flex;
        margin-inline: 5px;
        width: 100%;
        border: 2px solid #000;
        border-width: 2px 0 2px 0;

        @media (max-width: 923.98px) {
          margin-inline: 0;
        }

        .content {
          margin-inline: -5px;
          margin-block: 5px;
          padding: 1rem;
          border: 1px solid #000;
          border-width: 0 1px 0 1px;

          @media (max-width: 923.98px) {
            width: 100%;
            margin-inline: 0;
            border-left-width: 0;
            border-right-width: 0;
          }

          p:not(:last-child) {
            font-size: 1rem;
            line-height: 1.4;
            margin-bottom: 1em;
          }
        }
      }

      &:first-child {
        .border {
          margin-left: 0;

          .content {
            margin-left: 0;
            border-left-width: 0;
          }
        }
      }

      &:last-child {
        .border {
          margin-right: 0;

          .content {
            margin-right: 0;
            border-right-width: 0;
          }
        }
      }

      &:not(:last-child) {
        .border {
          @media (max-width: 923.98px) {
            border-bottom-width: 0;
          }
        }
      }

      .content.info {
        .with-image {
          display: flex;
          align-items: center;
          margin-left: -0.75rem;

          img {
            flex-shrink: 0;
            display: block;
            width: 4rem;
            height: 4rem;
            object-fit: contain;
            object-position: left;
          }

          a {
            display: inline-block;
            font-weight: 700;
            color: inherit;

            &:hover {
              text-decoration-color: #006fc3;
              text-decoration-thickness: 2px;
            }

            &:focus-visible {
              outline: 2px solid #006fc3;
              outline-offset: 2px;
            }
          }
        }
      }

      .content.about {
        a {
          display: inline-block;
          color: inherit;

          display: none; // TODO: enable when page is live

          &:hover {
            text-decoration-color: #006fc3;
            text-decoration-thickness: 2px;
          }

          &:focus-visible {
            outline: 2px solid #006fc3;
            outline-offset: 2px;
          }
        }
      }

      .content.newsletter {
        @media (max-width: 923.98px) {
          max-width: 500px;
        }

        label {
          display: block;
          margin-bottom: 0.5em;
          font-size: 0.75rem;
        }

        input#newsletter-email {
          display: block;
          width: 100%;
          background-color: transparent;
          border: 1px solid black;
          font: inherit;
          font-size: 0.75rem;
          line-height: 2.25rem;
          height: 2.25rem;
          padding-inline: 0.875rem;

          &::placeholder {
            color: #000;
          }

          &:focus-visible {
            background-color: #fff;
            outline: 2px solid #006fc3;
            outline-offset: 2px;
          }
        }

        .newsletter-agree {
          display: flex;
          align-items: flex-start;
          gap: 0.25rem;
          margin-top: 0.5em;

          input#newsletter-agree {
            flex-shrink: 0;
            position: relative;
            appearance: none;
            background-color: transparent;
            width: 1rem;
            height: 1rem;
            border: 1px solid black;
            cursor: pointer;

            &:checked {
              background-color: #fff;

              &::before {
                content: "";
                position: absolute;
                left: 0;
                top: 0;
                width: 9px;
                height: 5px;
                border: solid #000;
                border-width: 0 0 2px 2px;
                transform: scale(1) rotate(-45deg) translateX(-12%)
                  translateY(90%);
              }
            }

            &:focus-visible {
              outline: 2px solid #006fc3;
              outline-offset: 2px;

              &:not(:checked) {
                background-color: #fff;
              }
            }
          }
        }

        button[type="submit"] {
          display: block;
          width: 100%;
          margin-top: 1em;
          padding-block: 0.40625rem;
          padding-inline: 0.875rem;
          background-color: #65a3ff;
          border: 2px solid #000;
          font: inherit;
          font-size: 1rem;
          font-weight: 700;
          text-align: left;
          cursor: pointer;

          &:not(:disabled) {
            &:hover {
              background-color: #006fc3;
              color: #fff;
            }

            &:focus-visible {
              outline: 2px solid #006fc3;
              outline-offset: 2px;
            }
          }
        }
      }
    }
  }

  .financer {
    .col {
      align-items: center;
      padding-block: 1.5rem 1rem;

      @media (max-width: 923.98px) {
        justify-content: center;
      }

      &.djnd {
        flex: 1;
        font-size: 0.875rem;

        a {
          color: inherit;

          &:hover {
            text-decoration-color: #006fc3;
            text-decoration-thickness: 2px;
          }

          &:focus-visible {
            outline: 2px solid #006fc3;
            outline-offset: 2px;
          }
        }
      }

      &.eu {
        flex: 2;
        gap: 0.75rem;
        justify-content: flex-end;

        @media (max-width: 923.98px) {
          justify-content: center;
        }

        @media (max-width: 575.98px) {
          flex-direction: column;
          text-align: center;
        }

        p {
          max-width: 380px;
          font-size: 0.6875rem;
        }

        img {
          height: 2.625rem;
        }
      }
    }
  }
}
</style>
