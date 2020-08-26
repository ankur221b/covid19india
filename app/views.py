from django.shortcuts import render

# Create your views here.

def index(request):
    return render(request,'index.html')

def state(request,state):
    return render(request,'state.html',{'state':state})
