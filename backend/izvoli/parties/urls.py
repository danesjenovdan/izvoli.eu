from django.urls import include, path
from .views import (
    # amandma,
    # landing,
    # delovna_skupina,
    # demand,
    # demands_party,
    # faq,
    # verify_email,
    # Registracija,
    # RestorePasswordView,
    # after_registration,
    party,
    party_instructions,
    PartyDemand,
    party_finish,
    party_save,
    party_summary,
    # open_party_summary,
    Volitvomat,
    # MunicipalitiesList,
    # MissingPartiesList,
    # QuestionsByMunicipalities,
    # omnia,
    # monitoring,
    # monitoring_report,
)


# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    # path("", include("django.contrib.auth.urls")),
    # path("registracija/", Registracija.as_view()),
    # path("potrdi-naslov/<str:token>/", verify_email),
    # path("ponastavi-geslo/<str:parameter>/", RestorePasswordView.as_view()),
    # path("ponastavi-geslo/", RestorePasswordView.as_view()),
    # path("hvala/", after_registration),
    # URLS for parties
    path("<slug:election_slug>/stranke/", party),
    path("<slug:election_slug>/stranke/navodila/", party_instructions),
    path("<slug:election_slug>/stranke/vprasalnik/", PartyDemand.as_view()),
    path("<slug:election_slug>/stranke/oddaja/", party_finish),
    path("<slug:election_slug>/stranke/oddaj/", party_save),
    path("<slug:election_slug>/stranke/povzetek/", party_summary),
    # path("<slug:election_slug>/stranke/povzetek/<int:party_id>/", open_party_summary),
    # volitvomat
    # path(
    #     "<int:election_id>/api/volitvomat/missing-parties/<slug:municipality_slug>",
    #     MissingPartiesList.as_view(),
    # ),
    # path("<int:election_id>/api/volitvomat/", Volitvomat.as_view()),
    # path("api/volitvomat/municipalities", MunicipalitiesList.as_view()),
    path("api/volitvomat/", Volitvomat.as_view()),
    # path("api/municipalities/", QuestionsByMunicipalities.as_view()),
]
