<template>
  <main class="container">
    <div class="rich-text">
      <h1>O aplikaciji in metodologiji</h1>
      <h2>Kaj je aplikacija Izvoli.eu</h2>
      <p>
        Volilna aplikacija Izvoli.eu seznanja ljudi s političnimi stališči strank oz. list in jim
        pomaga sprejeti odločitev na volitvah v Evropski parlament. Skozi interaktiven proces
        uporabnikom in uporabnicam pokaže stopnjo ujemanja njihovih stališč o pomembnih evropskih
        tematikah s stališči kandidatnih list. Obenem lahko preverijo tudi ujemanje s stališči list
        v vseh drugih državah članicah EU.
      </p>
      <h2>Kako smo določili izjave</h2>
      <p>
        V okviru vseevropske koalicije VoteMatch Europe smo nacionalne partnerske organizacije
        oblikovale 22 izjav. Septembra lani smo pričele usklajevati ključne tematike na podlagi
        lastnih raziskav področij, ki bodo v prihodnjem obdobju pomembno vplivala na Evropsko unijo,
        nato pa smo v začetku leta 2024 skupaj sestavile seznam 25 izjav, ki pokrivajo širok spekter
        aktualnih tem in vprašanj.
      </p>
      <p>
        8 izjav smo na Danes je nov dan oblikovali v sodelovanju z mladimi v Sloveniji. Organizirali
        smo delavnici na Gimnaziji Kranj in Gimnaziji Ormož, kjer je 60 mladih skozi debato
        izoblikovalo izhodišča za izjave. Na podlagi teh izhodišč smo oblikovali seznam predlogov 27
        izjav, ki smo jih v obliki vprašalnika objavili na spletu. Svoj glas za izjave, ki se jim
        zdijo najbolj pomembne, je oddalo 222 mladih. Na podlagi rezultatov smo v končni nabor izjav
        vključili 5 izjav, ki so prejele največ glasov, in dodatne 3 izjave, ki so se kot ključne
        izkazale v debatah z mladimi.
      </p>
      <p>
        Skupaj aplikacija Izvoli.eu torej vključuje 30 izjav, saj smo ocenili, da nekaj tistih,
        pripravljenih v okviru vseevropske koalicije, za slovensko okolje ni primernih.
      </p>
      <p>
        Pri izbiranju tematik smo bili pozorni na njihovo relevantnost in razumljivost za veliko
        različnih ljudi, pa tudi, da imajo do njih kandidatne liste jasna različna stališča. Poleg
        tega je bilo v procesu izbire ključno, da so izjave relevantne za trenutno evropsko politiko
        – da npr. igrajo pomembno vlogo v volilni kampanji oziroma so prisotne v političnih ali
        javnih debatah in da je odločanje o njih sploh v pristojnosti Evropskega parlamenta.
      </p>
      <p>
        Da bi zagotovili čim bolj uravnotežen in široko primeren nabor izjav, je bilo v oblikovanje
        vključenih veliko različnih mnenj ter udeležencev in udeleženk. Ker so mladi prevečkrat
        izključeni iz političnih debat, smo posebno pozornost namenili izjavam, ki so pomembne njim.
        S sodelovanjem pri oblikovanju izjav jih želimo opolnomočiti za prihodnje aktivno delovanje.
      </p>
      <h2>Sodelovanje kandidatnih list in političnih strank</h2>
      <p>
        K sodelovanju smo povabili vse stranke in kandidatne liste, ki kandidirajo na volitvah v
        Evropski parlament v Sloveniji.
      </p>
      <p>
        Stranke in kandidatne liste so na svoje uradne e-naslove prejele spletni vprašalnik z vsemi
        izjavami. Same so bile odgovorne, da določijo, če se bodo do izjav opredelile, kdo bo to
        storil in kako bodo določile skupna stališča.
      </p>
      <p>
        Glede vsake izjave se je mogoče opredeliti z »DA« v primeru strinjanja, z “NE” v primeru
        nestrinjanja ali z “NEOPREDELJENO”, če se lista ne želi opredeliti. Za vsako od izjav lahko
        lista poda tudi krajšo (do 500 znakov) obrazložitev mnenja.
      </p>
      <p>
        Vsa stališča list in njihove obrazložitve, prikazane v aplikaciji, so pridobljena od list in
        niso bila spremenjena s strani Danes je nov dan.
      </p>
      <p>
        Vsa stališča kandidatnih list so zbrana v
        <a target="_blank" href="#">tem dokumentu</a>.
      </p>
      <h2>Kako so izračunani rezultati</h2>
      <p>
        Izvoli.eu izračuna medsebojno odvisnost in bližino stališč uporabnikov in uporabnic s
        položaji kandidatnih list.
      </p>
      <p>
        Če se uporabnik oz. uporabnica popolnoma strinja s stališčem kandidatne liste, mu Izvoli.eu
        dodeli dve točki. Pri tem kot ujemanje upoštevamo tudi odgovor “Brez stališča”, če je enako
        odgovorila tudi stranka oz. lista. Če se stališče uporabnika oz. uporabnice razlikuje od
        stališča kandidatne liste, točk ne dodelimo.
      </p>
      <p>Izvoli.eu prikazuje ujemanja s kandidatno listo v odstotkih.</p>
      <h2>Kaj je Votematch EU</h2>
      <p>
        Votematch Europe je prostovoljna mreža organizacij iz držav članic EU, katere namen je
        boljša informiranost javnosti pred volitvami v Evropski parlament.
      </p>
      <p>
        Vsaka nacionalna partnerska organizacija izdela svojo aplikacijo za pomoč pri odločanju, v
        katero vključi vsaj 15 od skupnih 25 izjav. Partnerice zbirajo odgovore list v posameznih
        državah, ta stališča pa so vključena v skupno vseevropsko aplikacijo VoteMatch Europe. S to
        aplikacijo lahko volivci in volivke ugotovijo, stališča katerih političnih strank v drugih
        državah članicah EU najbolje ustrezajo njihovim lastnim.
      </p>
    </div>
  </main>
</template>

<style scoped lang="scss">
.rich-text {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 1.5em;
  }

  p,
  ul,
  ol {
    margin-top: 1em;
  }

  ul,
  ol {
    ul,
    ol {
      margin-top: 0;
    }
  }

  ul,
  ol {
    li {
      margin-top: 0.5em;
    }
  }

  & > :first-child {
    margin-top: 0;
  }

  a {
    font-weight: 700;
    color: inherit;

    &:hover {
      text-decoration-color: #ffd100;
      text-decoration-thickness: 2px;
    }
  }
}
</style>
