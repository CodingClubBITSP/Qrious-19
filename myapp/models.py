from django.db import models
from django.contrib.auth.models import User
# Create your models here.

REALITY_TYPES = (
    ('MAGIC', 'MAGIC'),
    ('ROBOTICS', 'ROBOTICS'),
    ('GAMING', 'GAMING'),
    ('MYTHOLOGY', 'MYTHOLOGY'),
)


class Userdata(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bits_id = models.EmailField(blank=True, null=True)
    score = models.PositiveIntegerField(default=0)
    magicmarks = models.IntegerField(default=0)
    roboticsmarks = models.IntegerField(default=0)
    mythologymarks = models.IntegerField(default=0)
    ques_answered = models.CharField(max_length=450, blank=True, default='')
    last_question = models.IntegerField(default=0)
    current_reality = models.IntegerField(default=0)

    # def __str__(self):
    #     return self.name


class Question(models.Model):
    #question_no = models.AutoField(primary_key=True)
    question_no = models.IntegerField(default=0, primary_key=True)
    reality_type = models.CharField(max_length=450, choices=REALITY_TYPES, null=True)
    question = models.CharField(max_length=450, unique=True)
    choice1 = models.CharField(max_length=450, null=True)
    choice2 = models.CharField(max_length=450, null=True)
    choice3 = models.CharField(max_length=450, null=True)
    choice4 = models.CharField(max_length=450, null=True)
    correct_choice = models.CharField(max_length=450, null=True)

    def __str__(self):
        return str(self.question_no)
