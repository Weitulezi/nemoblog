from django.shortcuts import render

from .models import Writing, WritingVisited

def writing_view(request):
    context = {}
    return render(request, "writing/writing.html", context)


def writing_detail(request, pk):
    writing = Writing.objects.get(pk=pk)
    try:
        obj = WritingVisited.objects.get(writing=writing)
        obj.addOne()
        obj.save()
    except:
        obj = WritingVisited.objects.create(writing=writing)
        obj.addOne()
        obj.save()
    context = {"writing":writing}
    return render(request, "writing/writing_detail.html", context)