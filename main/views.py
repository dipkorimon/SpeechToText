from django.http import JsonResponse
from django.shortcuts import render

from main.models import Transcription

# Create your views here.
def save_speech(request):
  if request.method == 'POST':
    speech_text = request.POST.get('speech_text')
    if speech_text:
      # Save the speech text to the database
      Transcription.objects.create(text=speech_text)
      return JsonResponse({'message': 'Speech saved successfully!'})
    else:
      return JsonResponse({'error': 'No speech text received'}, status=400)

  elif request.method == 'GET':
    speeches = Transcription.objects.last().text
    return render(request, "upload.html", {'speeches': speeches})

  return JsonResponse({'error': 'Invalid request method'}, status=405)