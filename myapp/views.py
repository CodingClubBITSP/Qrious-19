from __future__ import unicode_literals
from django.shortcuts import render, redirect, HttpResponse, HttpResponseRedirect
from django.contrib.auth import logout
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse, HttpResponseRedirect
from django.contrib.auth.decorators import login_required
from .models import Userdata, Question
import json
import random

# Create your views here.


@login_required
def userdat(request):
    usrdata = {}
    if request.user.is_authenticated():
        # username,score,current_reality,last_question
        user = request.user
        print(type(str(request.user)))
        usrdata["username"] = user.username
        usrdata["score"] = user.userdata.score
        usrdata["current_reality"] = user.userdata.current_reality
        usrdata["answered_questions"] = user.userdata.last_question
        return JsonResponse(usrdata, safe=False,)
# score,question,last_question's answer(POST),


def home(request):
    if(request.method == 'POST'):
        logout(request)
        return redirect('/accounts/google/login')
    return render(request, 'index.html')


@login_required
def loading(request):
    return render(request, 'loader.html')


@login_required
def roulette(request):
    rand_no = request.user.userdata.reality_played
    randlist = rand_no.split('-')[:-1]
    if len(randlist) == 4:
        return HttpResponseRedirect('/leaderboard.html')
    if request.user.userdata.current_reality != 0:
        url_list = ['mythology', 'magic', 'robotic', 'gaming']
        redirect_url = ''.join(
            ["/roulette/", url_list[request.user.userdata.current_reality-1], "des.html"])
        return redirect(redirect_url)
    return render(request, 'roulette.html')


def l_out(request):
    logout(request)
    return redirect('/')


@login_required
def intro(request, filename):
    if filename == 'leaderboard.html':
        return render(request, 'leaderboard.html')
    if request.user.userdata.current_reality == 0:
        return HttpResponseRedirect('/roulette')
    return render(request, filename)


@login_required
def quiz(request, filename, basename):
    if basename == 'leaderboard.html':
        return render(request, 'leaderboard.html')
    if request.user.userdata.current_reality == 0:
        return HttpResponseRedirect('/roulette')
    return render(request, filename)


@login_required
def leaderboard_view(request):
    data = []
    leaderboard = Userdata.objects.order_by('score').reverse()[:10]
    for user in leaderboard:
        user_details = {"name": user.user.username, "score": user.score}
        data.append(user_details)
    return JsonResponse(data, safe=False)


@login_required
@csrf_exempt
def postanswer(request):
    if request.method == 'POST':
        print(request.POST)
        print("last_question=", request.user.userdata.last_question)
        print("current_reality=", request.user.userdata.current_reality)
        ques_no = request.POST['question']
        request.user.userdata.last_question = ques_no
        request.user.userdata.save()
        ques_answered = request.user.userdata.ques_answered
        ques_answered = ques_answered+str(ques_no)+'-'
        queslist = ques_answered.split('-')[:-1]
        for i in range(len(queslist)):
            queslist[i] = int(queslist[i])
        request.user.userdata.ques_answered = ques_answered
        request.user.userdata.save()
        print(request.user.userdata.ques_answered)
        print("last_question_updated=", request.user.userdata.last_question)
        question = Question.objects.get(question_no=ques_no)
        selected_choice = request.POST['answer']
        print(question)
        print(selected_choice)
        if selected_choice == 'NULL ANSWER':
            pass
        else:
            if question.reality_type == 'MAGIC':
                if selected_choice == question.correct_choice:
                    power = request.user.userdata.magicmarks
                    request.user.userdata.score += 2 ** power
                    request.user.userdata.magicmarks += 1
                    request.user.userdata.save()
                else:
                    request.user.userdata.magicmarks = 0
                    request.user.userdata.save()
            elif question.reality_type == 'ROBOTICS':
                if selected_choice == question.correct_choice:
                    simcorrect = request.user.userdata.roboticsmarks
                    if simcorrect < 5:
                        request.user.userdata.roboticsmarks += 1
                        request.user.userdata.save()
                    else:
                        request.user.userdata.score += 25
                        request.user.userdata.save()
                else:
                    request.user.userdata.roboticsmarks = 0
                    request.user.userdata.save()
            elif question.reality_type == 'GAMING':
                if selected_choice == question.correct_choice:
                    request.user.userdata.score += 4
                    request.user.userdata.save()
                else:
                    request.user.userdata.score -= 1
                    request.user.userdata.save()
            elif question.reality_type == 'MYTHOLOGY':
                if selected_choice == question.correct_choice:
                    request.user.userdata.mythologymarks += 1
                    request.user.userdata.save()
                    correct = request.user.userdata.mythologymarks
                    if correct == 1:
                        request.user.userdata.score += 2
                    elif correct == 2:
                        request.user.userdata.score += 3
                    elif correct == 3:
                        request.user.userdata.score += 5
                    elif correct == 4:
                        request.user.userdata.score += 8
                    elif correct == 5:
                        request.user.userdata.score += 13
            request.user.userdata.save()
        print("score=", request.user.userdata.score)
        return HttpResponse('')


@login_required
@csrf_exempt
def getquestion(request):
    if request.user.is_authenticated():
        ques_no = request.user.userdata.last_question
        reality = request.user.userdata.current_reality
        print(reality)
        ques_answered = request.user.userdata.ques_answered
        queslist = ques_answered.split('-')[:-1]
        for i in range(len(queslist)):
            queslist[i] = int(queslist[i])
        print(queslist)
        if ques_no in range((reality-1)*5+1, (reality)*5):
            question = Question.objects.get(question_no=(ques_no+1))
        elif ques_no != reality*5:
            question = Question.objects.get(question_no=((reality-1)*5+1))
        else:
            request.user.userdata.current_reality = 0
            request.user.userdata.save()
            question = Question.objects.get(question_no=1)
            return HttpResponseRedirect('/roulette')
        score = request.user.userdata.score
        print("correct_choice=", question.correct_choice)
        question_obj = {'question_number': question.question_no, 'question': question.question, 'option1': question.choice1, 'option2': question.choice2,
                        'option3': question.choice3, 'option4': question.choice4, 'correct_choice': question.correct_choice, 'score': score}
        return JsonResponse(question_obj)


@login_required
@csrf_exempt
def realitychange(request):
    if request.user.is_authenticated():
        ch = 2
        if request.method == 'POST':
            print("change reality")
            list = [1, 2, 3, 4]
            rand_no = request.user.userdata.reality_played
            randlist = rand_no.split('-')[:-1]
            for i in range(len(randlist)):
                if int(randlist[i]) in list:
                    list.remove(int(randlist[i]))
            ch = random.choice(list)
            request.user.userdata.reality_played += (str(ch)+'-')
            request.user.userdata.current_reality = ch
            request.user.userdata.save()
            print(request.user.userdata.reality_played)
            reality_obj = {'reality': (ch-1)}
            return JsonResponse(reality_obj)
    return HttpResponse('')

# 1. powerscheme - 2 ki power, resets on wrong answer
# 2. all or nothing - all sahi to number warna gaye
# 3. normal marking with negative +4 -1
# 4. fibonacci marking
# json.load(request.body.decode('utf-8'))
# index
# questions send
# answer check
# leaderboard
# score calculate
# reality check
# total score
