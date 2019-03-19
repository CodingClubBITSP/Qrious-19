from django.conf.urls import url
from myapp.views import home, roulette, loading, l_out, quiz, userdat, intro, getquestion, leaderboard_view, realitychange, postanswer

urlpatterns = [
    url(r'^$', home, name='myapp-home'),
    url(r'^loading$', loading, name='myapp-load'),
    url(r'^roulette$', roulette, name='myapp-roulette'),
    url(r'^getInfo$', userdat, name='myapp-get-usrdata'),
    url(r'^reality/get/request$', realitychange, name='myapp-post-reality'),
    url(r'^(?P<filename>[^/]+)/$', intro, name='myapp-intro'),
    url(r'^(?P<basename>[^/]+)/(?P<filename>[^/]+)$', quiz, name='myapp-quiz'),
    url(r'^questions/reality/request$', getquestion, name='myapp-getques'),
    url(r'^answer/ajax/post$', postanswer, name='myapp-post-answer'),
    url(r'^leaderboard$', leaderboard_view, name='myapp-leaderboard'),
    url(r'^logout$', l_out, name='myapp-logout'),
]
# /get_question
# /get_leaderboard
