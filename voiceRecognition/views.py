from django.http import JsonResponse
from django.shortcuts import render

from voiceRecognition.models import Sentences, Transcription
from fuzzywuzzy import fuzz

# View function to handle speech saving and matching
def save_speech(request):
  final_answer = ""
  if request.method == 'POST':
    # Get the speech text from the POST request and convert it to lowercase
    speech_text = request.POST.get('speech_text').lower()

    if speech_text != "":
      Transcription.objects.create(text=speech_text)

    is_match = False

    # Get all predefined sentences from the Sentences model
    predefined_sentences = Sentences.objects.values_list('sentence', flat=True)

    for predefined_sentence in predefined_sentences:
      predefined_sentence = predefined_sentence.lower()
      speech_text_length, predefined_sentence_length = len(speech_text), len(predefined_sentence)

      if speech_text_length == 0 or predefined_sentence_length == 0:
        continue

      edit_distance = [[0] * (predefined_sentence_length + 1) for _ in range(speech_text_length + 1)]

      for speech_index in range(speech_text_length + 1):
        edit_distance[speech_index][0] = speech_index
      for predefined_index in range(predefined_sentence_length + 1):
        edit_distance[0][predefined_index] = predefined_index

      for speech_index in range(1, speech_text_length + 1):
        for predefined_index in range(1, predefined_sentence_length + 1):
          if speech_text[speech_index - 1] == predefined_sentence[predefined_index - 1]:
            edit_distance[speech_index][predefined_index] = edit_distance[speech_index - 1][predefined_index - 1]
          else:
            edit_distance[speech_index][predefined_index] = 1 + min(edit_distance[speech_index][predefined_index - 1], edit_distance[speech_index - 1][predefined_index], edit_distance[speech_index - 1][predefined_index - 1])

      # Calculate the match percentage using dynamic programming result & fuzzywuzzy
      minimum_operation = edit_distance[speech_text_length][predefined_sentence_length]
      matched_percentage_from_dp = 100 - (minimum_operation / max(speech_text_length, predefined_sentence_length)) * 100
      matched_percentage_from_fuzzy = fuzz.ratio(predefined_sentence, speech_text)

      # If the matching score is 75% or greater, mark it as a match and break the loop
      if matched_percentage_from_fuzzy >= 75:
        is_match = True
        final_answer = predefined_sentence
        break

    # If a match was found, return a success response with the matched sentence
    # If no match was found, return a failure response
    if is_match:
      return JsonResponse({'status': 'success', 'matched_sentence': final_answer, 'speech_text': speech_text})
    else:
      return JsonResponse({'status': 'fail', 'message': 'No matching sentence found.'})

  return render(request, "upload.html", {"speech_text": final_answer})