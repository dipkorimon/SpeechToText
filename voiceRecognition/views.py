from django.http import JsonResponse
from django.urls import get_resolver
from divineba.system.renderer import Renderer


def list_urls_by_readable_name(url_patterns=None, base_url=''):
    if url_patterns is None:
        url_patterns = get_resolver().url_patterns

    url_dict = {}

    for pattern in url_patterns:
        full_url = base_url + str(pattern.pattern)

        if hasattr(pattern, 'url_patterns'):
            # Recursively get URLs from included URLs
            url_dict.update(list_urls_by_readable_name(pattern.url_patterns, full_url))
        else:
            # Extract the `readable_name` from the pattern if it exists in the dictionary
            if isinstance(pattern.default_args, dict) and 'readable_name' in pattern.default_args:
                readable_name = pattern.default_args['readable_name']
                url_dict[readable_name] = full_url

    return url_dict


def speak(request, **kwargs):
    renderer = Renderer(request)
    final_answer = ""
    url = ""
    url_dict = list_urls_by_readable_name()

    if request.method == 'POST':
        # Get the speech text from the POST request and convert it to lowercase
        speech_text = request.POST.get('speech_text').lower()

        is_match = False

        for name, url in url_dict.items():
            predefined_sentence = str(name)

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
                        edit_distance[speech_index][predefined_index] = edit_distance[speech_index - 1][
                            predefined_index - 1]
                    else:
                        edit_distance[speech_index][predefined_index] = 1 + min(
                            edit_distance[speech_index][predefined_index - 1],
                            edit_distance[speech_index - 1][predefined_index],
                            edit_distance[speech_index - 1][predefined_index - 1])

            # Calculate the match percentage using dynamic programming result
            minimum_operation = edit_distance[speech_text_length][predefined_sentence_length]
            matched_percentage_from_dp = 100 - (
                        minimum_operation / max(speech_text_length, predefined_sentence_length)) * 100

            # If the matching score is 75% or greater, mark it as a match and break the loop
            if matched_percentage_from_dp >= 75:
                is_match = True
                final_answer = predefined_sentence
                break

        # If a match was found, return a success response with the matched sentence
        # If no match was found, return a failure response
        if is_match:
            return JsonResponse({'status': 'success', 'matched_sentence': final_answer, 'url': url, 'speech_text': speech_text})
        else:
            return JsonResponse({'status': 'fail', 'message': 'No matching sentence found.'})

    return renderer.render('speech_recognition/speak')
