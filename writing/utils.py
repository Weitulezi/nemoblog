from .models import Writing

def getPopularWriting():
    writings = Writing.objects.all().filter(isPublic=True).order_by("-view_count")
    mostPopularWriting = writings[0]
    return mostPopularWriting


def getLatestWriting():
    writings = Writing.objects.all().filter(isPublic=True).order_by("-id")
    if len(writings) > 3:
        return writings[0:3]
    elif len(writings) > 0 and len(writings) < 3:
        return writings[0]
    else:
        return writings

    
def getWritingauthor(writing):
    authors = writing.author.all()
    author_name = ""
    if len(authors) > 0:
        for i in range(len(authors)):
            if i == 0:
                author_name += f"<a href='/author/{authors[i]}'>{authors[i]}</a>" 
    return author_name