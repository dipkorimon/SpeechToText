from django.http import JsonResponse
from django.shortcuts import render

from main.models import Sentences, Transcription


# Create your views here.
def save_speech(request):
  final_answer = ""
  if request.method == 'POST':
    speech_text = request.POST.get('speech_text').lower()
    if speech_text != "":
      Transcription.objects.create(text=speech_text)

    is_match = False

    # sentence matching with edit distance algorithm
    predefined_sentences = Sentences.objects.values_list('sentence', flat=True)
    # print(predefined_sentences)
    for predefined_sentence in predefined_sentences:
      predefined_sentence = predefined_sentence.lower()
      speech_text_length, predefined_sentence_length = len(speech_text), len(predefined_sentence)

      if speech_text_length == 0 or predefined_sentence_length == 0:
        continue

      dp = [[0] * (predefined_sentence_length + 1) for _ in range(speech_text_length + 1)]

      for speech_index in range(speech_text_length + 1):
        dp[speech_index][0] = speech_index
      for predefined_index in range(predefined_sentence_length + 1):
        dp[0][predefined_index] = predefined_index

      for speech_index in range(1, speech_text_length + 1):
        for predefined_index in range(1, predefined_sentence_length + 1):
          if speech_text[speech_index - 1] == predefined_sentence[predefined_index - 1]:
            dp[speech_index][predefined_index] = dp[speech_index - 1][predefined_index - 1]
          else:
            dp[speech_index][predefined_index] = 1 + min(dp[speech_index][predefined_index - 1], dp[speech_index - 1][predefined_index], dp[speech_index - 1][predefined_index - 1])

      minimum_operation = dp[speech_text_length][predefined_sentence_length]
      matched_percentage = 100 - (minimum_operation / max(speech_text_length, predefined_sentence_length)) * 100

      if matched_percentage >= 75:
        is_match = True
        final_answer = predefined_sentence
        break

    if is_match:
      return JsonResponse({'status': 'success', 'matched_sentence': final_answer, 'speech_text': speech_text})
    else:
      return JsonResponse({'status': 'fail', 'message': 'No matching sentence found.'})

  return render(request, "upload.html", {"speech_text": final_answer})