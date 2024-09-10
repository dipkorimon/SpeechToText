from django.http import JsonResponse
from django.shortcuts import render

from main.models import Sentences, Transcription
from fuzzywuzzy import fuzz


# Create your views here.
# View function to handle speech saving and matching
def save_speech(request):
  final_answer = ""
  if request.method == 'POST':
    # Get the speech text from the POST request and convert it to lowercase
    speech_text = request.POST.get('speech_text').lower()

    # If the speech_text is not empty, save it in the Transcription model
    if speech_text != "":
      Transcription.objects.create(text=speech_text)

    # Flag to indicate if a match was found
    is_match = False

    # Get all predefined sentences from the Sentences model
    predefined_sentences = Sentences.objects.values_list('sentence', flat=True)

    # Loop through each predefined sentence
    for predefined_sentence in predefined_sentences:
      # Convert to lowercase for case-insensitive comparison & get lengths of both speech_text and predefined_sentence
      predefined_sentence = predefined_sentence.lower()
      speech_text_length, predefined_sentence_length = len(speech_text), len(predefined_sentence)

      # Skip comparison if either sentence or predefined sentence is empty
      if speech_text_length == 0 or predefined_sentence_length == 0:
        continue

      # Initialize a 2D list (edit distance table) for dynamic programming
      # Each cell represents the edit distance between substrings of speech_text and predefined_sentence
      edit_distance = [[0] * (predefined_sentence_length + 1) for _ in range(speech_text_length + 1)]

      # Fill the first row and first column of the table
      # The value represents how many operations are needed to convert an empty string to a substring
      for speech_index in range(speech_text_length + 1):
        edit_distance[speech_index][0] = speech_index
      for predefined_index in range(predefined_sentence_length + 1):
        edit_distance[0][predefined_index] = predefined_index

      # Calculate the edit distance (Levenshtein distance)
      # Loop through each character of both speech_text and predefined_sentence
      for speech_index in range(1, speech_text_length + 1):
        for predefined_index in range(1, predefined_sentence_length + 1):
          if speech_text[speech_index - 1] == predefined_sentence[predefined_index - 1]:
            edit_distance[speech_index][predefined_index] = edit_distance[speech_index - 1][predefined_index - 1]
          else:
            edit_distance[speech_index][predefined_index] = 1 + min(edit_distance[speech_index][predefined_index - 1], edit_distance[speech_index - 1][predefined_index], edit_distance[speech_index - 1][predefined_index - 1])

      # Calculate the match percentage using dynamic programming result (Levenshtein distance)
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

  # If the request method is not POST, render the template
  return render(request, "upload.html", {"speech_text": final_answer})