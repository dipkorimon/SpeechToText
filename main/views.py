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
      m, n = len(speech_text), len(predefined_sentence)

      if m == 0 or n == 0:
        continue

      dp = [[0] * (n + 1) for _ in range(m + 1)]

      for i in range(m + 1):
        dp[i][0] = i
      for j in range(n + 1):
        dp[0][j] = j

      for i in range(1, m + 1):
        for j in range(1, n + 1):
          if speech_text[i - 1] == predefined_sentence[j - 1]:
            dp[i][j] = dp[i - 1][j - 1]
          else:
            dp[i][j] = 1 + min(dp[i][j - 1], dp[i - 1][j], dp[i - 1][j - 1])

      minimum_operation = dp[m][n]
      matched_percentage = 100 - (minimum_operation / max(m, n)) * 100

      if matched_percentage >= 75:
        is_match = True
        final_answer = predefined_sentence
        break

    if is_match:
      return JsonResponse({'status': 'success', 'matched_sentence': final_answer, 'speech_text': speech_text})
    else:
      return JsonResponse({'status': 'fail', 'message': 'No matching sentence found.'})

  return render(request, "upload.html", {"speech_text": final_answer})