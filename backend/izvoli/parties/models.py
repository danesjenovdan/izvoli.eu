from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class Election(models.Model):
    name = models.TextField(verbose_name="Ime")
    slug = models.SlugField()

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Volitve"
        verbose_name_plural = "Volitve"


class Party(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, verbose_name="Uporabnik"
    )
    name = models.TextField(
        blank=True, verbose_name="Ime"
    )
    # proposer = models.TextField(blank=True, verbose_name="Predlagatelj kandidata_ke")
    # sex = models.CharField(blank=True, max_length=1, verbose_name="spol (m/f)")
    # email = models.EmailField(null=True, blank=True)
    # is_winner = models.BooleanField(
    #     default=False, verbose_name="Je zmagal_a na volitvah?"
    # )
    finished_quiz = models.BooleanField(
        default=False, verbose_name="Je oddal_a vprašalnik? (se izpolni avtomatsko)"
    )
    image = models.ImageField(null=True, blank=True, verbose_name="Slika")
    # url = models.URLField(blank=True)
    election = models.ForeignKey(
        Election, on_delete=models.CASCADE, verbose_name="Volitve"
    )
    votematch_id = models.CharField(verbose_name="Votematch ID", blank=True, default="")
    # municipality = models.ForeignKey(
    #     Municipality, null=True, on_delete=models.SET_NULL, verbose_name="Občina"
    # )
    # already_has_pp = models.BooleanField(
    #     default=False, verbose_name="Je že izvajal_a PP v prejšnjem mandatu?"
    # )
    # mautic_id = models.IntegerField(blank=True, null=True)

    # @property
    # def image_url(self):
    #     return f"https://djnd.s3.fr-par.scw.cloud/glas-ljudstva/img/{filepath_to_uri(self.party_name)}.jpg"

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Stranka"
        verbose_name_plural = "Stranke"


class StatementGroup(models.Model):
    name = models.TextField()
    # description = models.TextField(null=False, blank=False)
    # og_title = models.TextField(null=False, blank=False)
    # og_description = models.TextField(null=False, blank=False)
    # election = models.ForeignKey(Election, on_delete=models.CASCADE)
    # order = models.IntegerField(
    #     verbose_name="Vrstni red za sortiranje na seznamu",
    #     validators=[MinValueValidator(1)],
    #     default=1,
    # )

    def __str__(self):
        return self.name

    @property
    def statements(self):
        return Statement.objects.filter(statement_group=self).order_by("?")

    class Meta:
        verbose_name = "Skupina"
        verbose_name_plural = "Skupine"


class Statement(models.Model):
    title = models.TextField(verbose_name="Izjava")
    description = models.TextField(null=True, blank=True, verbose_name="Dodaten opis")
    statement_group = models.ForeignKey(
        "StatementGroup",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        verbose_name="Skupina izjav",
    )
    hide_in_app = models.BooleanField(
        default=False,
        verbose_name="Vprašanja ne prikazuj na aplikaciji izvoli.eu",
    )
    election = models.ForeignKey(
        Election, on_delete=models.CASCADE, verbose_name="Volitve"
    )
    votematch_id = models.CharField(verbose_name="Votematch ID", blank=True, default="")

    def __str__(self):
        return self.title

    @property
    def partys_which_agree(self):
        return Party.objects.filter(
            id__in=StatementAnswer.objects.filter(
                statement=self, answer="DA", party__finished_quiz=True
            ).values_list("party__id", flat=True)
        )

    @property
    def partys_which_agree_in_ids(self):
        return StatementAnswer.objects.filter(
            statement=self, answer="DA", party__finished_quiz=True
        ).values_list("party__id", flat=True)

    @property
    def partys_which_dont_agree(self):
        return Party.objects.filter(
            id__in=StatementAnswer.objects.filter(
                statement=self, answer="NE", party__finished_quiz=True
            ).values_list("party__id", flat=True)
        )

    @property
    def answers_which_dont_agree(self):
        return StatementAnswer.objects.filter(
            statement=self, answer="NE", party__finished_quiz=True
        )

    class Meta:
        verbose_name = "Izjava"
        verbose_name_plural = "Izjave"


class StatementAnswer(models.Model):
    answer = models.TextField(
        choices=[("YES", "DA"), ("NO", "NE"), ("NEUTRAL", "NEOPREDELJENO")],
        blank=True,
        null=True
    )
    # answer je nadomestil agree_with_demand
    # agree_with_demand = models.BooleanField(
    #     null=True, blank=True, verbose_name="Odgovor"
    # )
    comment = models.CharField(
        blank=True, null=True, max_length=500, verbose_name="Obrazložitev"
    )
    party = models.ForeignKey(
        "Party", on_delete=models.CASCADE, verbose_name="Stranka"
    )
    statement = models.ForeignKey(
        "Statement", on_delete=models.CASCADE, verbose_name="Izjava"
    )

    def __str__(self):
        return self.statement.title + ", " + self.party.name

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["party", "statement"], name="unique_party_statement"
            ),
        ]
        verbose_name = "Odgovor"
        verbose_name_plural = "Odgovori"
