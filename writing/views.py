from django.shortcuts import render, redirect

from .models import Writing, WritingVisited

def writing_view(request):
    context = {}
    return render(request, "writing/writing.html", context)


def writing_detail(request, pk):
    writing = Writing.objects.get(pk=pk)
    if request.user.is_authenticated:
        print("DO NOTHING")
    else:
        try:
            obj = WritingVisited.objects.get(writing=writing)
            obj.addOne()
            obj.save()
        except:
            obj = WritingVisited.objects.create(writing=writing)
            obj.addOne()
            obj.save()
    if writing.isPublic == False:
        return redirect("writing")
    context = {"writing":writing}
    return render(request, "writing/writing_detail.html", context)