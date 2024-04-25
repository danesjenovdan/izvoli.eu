<script setup>
</script>

<template>
    <footer>
        <div class="support">
            <p>Aplikacijo je pripravil <a href="https://danesjenovdan.si/" target="_blank">Danes je nov dan</a> v
                sklopu
                <a href="/">VoteMatch Europe Network</a>.
            </p>
            <a href="https://danesjenovdan.si/doniraj" target="_blank" class="button">Podpri nas z donacijo!<img
                    src="../assets/img/donacija.svg" alt="" /></a>
        </div>
        <div class="columns">
            <div>
                <div>
                    <img src="../assets/img/vodic.svg" />
                    <p>Obišči tudi <a href="/">volilni vodič za
                            alternativno oddajo glasu</a>!</p>
                </div>
                <div>
                    <img src="../assets/img/opomnik.svg" />
                    <p>Dodaj opomnik za volitve v svoj koledar!</p>
                </div>
            </div>
            <div class="newsletter">
                <p><strong>Prijavi se na DJND novice</strong></p>
                <form>
                    <label for="newsletter-email">Vpiši svoj e-naslov</label>
                    <input type="email" id="newsletter-email" name="newsletter-email" value="ime@email.si">
                    <label for="newsletter-agree" class="newsletter-agree">
                        <input type="checkbox" id="newsletter-agree">
                        Strinjam se, da mi Danes je nov dan občasno pošlje email.
                    </label>
                    <button type="submit">Prijavi me</button>
                </form>
            </div>
            <div>
                <p><a href="/">Politika zasebnosti in varovanja osebnih podatkov</a></p>
                <p><a href="/">Metodologija</a></p>
            </div>
        </div>
        <div class="financer">
            <img src="../assets/img/fundedby.png" class="" />
            <p>Financirano s strani Evropske unije. Izražena stališča in mnenja ne odražajo nujno stališč in mnenj
                Evropske unije ali Evropskega parlamenta. Zanje ne moreta biti odgovorna niti Evropska unija niti
                Evropski parlament.</p>
        </div>
    </footer>
</template>

<style scoped lang="scss">
footer {
    max-width: 900px;
}

p {
    a {
        font-weight: 700;
        text-decoration: underline;
        color: black;

        &:hover {
            text-decoration-color: #FFD100;
            text-decoration-thickness: 2px;
        }
    }
}

.support {
    margin-top: 60px;
    background-color: #99C2FF;
    border-radius: 20px;
    padding: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    a.button {
        border: 2px solid black;
        border-radius: 10px;
        color: black;
        font-weight: 800;
        text-decoration: none;
        display: block;
        padding: 6px 80px 4px 10px;
        position: relative;

        img {
            position: absolute;
            width: 90px;
            right: -10px;
            top: -10px;
        }
    }
}

.columns {
    margin-top: 20px;
    margin-bottom: 20px;
    display: flex;

    &>div {
        flex-grow: 1;
        flex-basis: 0;
        border-top: 2px solid black;
        border-bottom: 2px solid black;
        padding: 20px;
        position: relative;

        &:not(:first-child) {
            border-left: 1px solid black;
        }

        &:not(:last-child) {
            border-right: 1px solid black;

            &::after,
            &::before {
                background-color: #7FB2FF;
                content: "";
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
            margin-bottom: 20px;
        }

        &:first-child {
            &>div {
                display: flex;
                align-items: center;
                margin-bottom: 20px;

                p {
                    margin-bottom: 0;
                }
            }
            
            img {
                width: 18px;
                margin-right: 10px;
            }
        }

    }

    .newsletter {
        p {
            margin-bottom: 10px;
        }

        label {
            font-size: 12px;
        }

        input {
            background-color: #7FB2FF;
            border: 1px solid black;
            border-radius: 10px;
        }
        
        input[type="email"] {
            padding: 8px 12px;
            font-size: 12px;
            width: 100%;
        }

        .newsletter-agree {
            line-height: 15px;
            display: block;
            margin-top: 6px;
            margin-bottom: 12px;
        }

        button {
            background-color: #65A3FF;
            border: 2px solid black;
            border-radius: 10px;
            padding: 8px 12px;
            width: 100%;
            text-align: start;
            font-size: 15px;
            font-weight: 800;
        }
    }
}

.financer {
    margin: 20px 0;
    display: flex;
    align-items: center;

    img {
        width: 160px;
        margin: 0 40px;
    }

    p {
        font-size: 12px;
        line-height: 16px;
        margin-right: 40px;
    }
}


@media (min-width: 1024px) {

}
</style>
