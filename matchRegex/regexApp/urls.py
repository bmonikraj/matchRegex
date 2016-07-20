from django.conf.urls import url
from . import views
urlpatterns = [
url(r'^$', views.index, name='index'),
url(r'^regexService/$', views.regexService, name='regexService'),
url(r'^session/$', views.session, name='session'),
]