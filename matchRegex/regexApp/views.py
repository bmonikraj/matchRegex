from django.http import HttpResponse, HttpRequest, JsonResponse
from django.template import Context, loader, Template
import json
import re


#request = HttpRequest
def index(request):
    temp = loader.get_template("index.html")
    return HttpResponse(temp.render())

def regexService(request):
    if request.method == 'POST':
        if request.is_ajax():
            jsonRequest = str(request.POST.get('jsonData'))
            jsonRequestObj = json.loads(jsonRequest)
            regexStr = jsonRequestObj['regexString']
            regexStr = regexStr.replace(' ','+')
            textStr = jsonRequestObj['textString']
            matchList = re.findall(regexStr,textStr,re.M|re.I)
            responseJSON = '{"totalOcc":'
            if len(matchList)==0:
                responseJSON = responseJSON + '0}'
            else:
                responseJSON = responseJSON + str(len(matchList)) + ', "occArr" : ['
                for i in range(0,len(matchList),1):
                    responseJSON=responseJSON+'{"text":"'+str(matchList[i])+'"}'
                    if (i!=len(matchList)-1):
                        responseJSON = responseJSON + ','
                responseJSON = responseJSON+']}'
            return HttpResponse(responseJSON)
    return HttpResponse("Service Hit but nothing...")