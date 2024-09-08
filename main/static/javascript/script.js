const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

$('.popup-window').hide();

if (!SpeechRecognition) {
  $('#output').text("Sorry, your browser does not support Speech Recognition.");
  $('#start-btn').prop('disabled', true);
} else {
  const recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.continuos = true;
  recognition.interimResults = false;

  // console.log(recognition);

  recognition.onstart = () => {
    console.log('Speech recognition started');
    $('#output').text('Listening...');
  };

  recognition.onresult = (event) => {
    // console.log(event.results.length);
    let final_answer;
    if (event.results && event.results.length > 0) {
      const transcript = event.results[0][0].transcript;
      console.log(transcript);

      const getCookie = (name) => {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
          const cookies = document.cookie.split(';');
          for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
            }
          }
        }
        return cookieValue;
      }

      const csrftoken = getCookie('csrftoken');

      // debugger
      $.ajax({
        type: 'POST',
        url: '/save-speech/',
        headers: { 'X-CSRFToken': csrftoken },
        data: {
          'speech_text': transcript,
        },
        success: (response) => {
          // debugger
          // response.matched_sentence = undefined;
          console.log("Speech saved successfully: ", response);
          let text = "success";
          // let matched_sentence =
          checkMatch(text, response.matched_sentence);
        },
        error: (xhr, status, error) => {
          console.error("Error saving speech: ", error);
        }
      });
      // debugger
      const checkMatch = (text, matched_sentence) => {
        console.log(matched_sentence);
        // let final_answer = matched_sentence;
        if (text === "success") {
          // handle popup window
          $('.info').hide();
          $('.popup-window').show();
          $('#details').text(`Did you mean ${matched_sentence}?`);

          // voice to text part
          const speak = () => {
            if ('speechSynthesis' in window) {
              const utterance = new SpeechSynthesisUtterance("Did you mean " + matched_sentence);
              utterance.lang = 'en-US';
              utterance.pitch = 1;
              utterance.rate = 1;
              utterance.volume = 1;
              window.speechSynthesis.speak(utterance);
            } else {
              $('#output').text("Your browser does not support speech synthesis");
            }
          };
          speak();
          $('#close').click(() => {
            $('.popup-window').hide();
            $('.info').show();
          });
          $('#proceed').on('keyup', (event) => {
            if (event.key === "Enter") {
              window.location.href = "";
            }
          });
        } else {
          $('#output').text("Please, speak again.");
          // voice to text part
          const speakNotMatchFound = () => {
            if ('speechSynthesis' in window) {
              const utterance = new SpeechSynthesisUtterance("Please, speak again.");
              utterance.lang = 'en-US';
              utterance.pitch = 1;
              utterance.rate = 1;
              utterance.volume = 1;
              window.speechSynthesis.speak(utterance);
            } else {
              $('#output').text("Your browser does not support speech synthesis");
            }
          };
          speakNotMatchFound();
          window.setTimeout(() => {
            $('#start-btn').click();
          }, 1000);
        }
      }
    }
  };

  recognition.onerror = (event) => {
    console.error('Error occurred: ' + event.error);
    $('#output').text('Error: ' + event.error);
  };

  recognition.onend = () => {
    console.log('Speech recognition ended');
    $('#start-btn').prop('disabled', false);
    $('#stop-btn').prop('disabled', true);
    $('#output').text("Recognition stopped.");
  };

  $('#start-btn').on('click', () => {
    try {
      recognition.start();
      $('#output').text("Listening...");
      $('#start-btn').prop('disabled', true);
      $('#stop-btn').prop('disabled', false);
    } catch (err) {
      console.error('Error starting recognition: ', err);
      $('#output').text('Failed to start speech recognition. Error: ' + err.message);
    }
  });

  $('#stop-btn').on('click', () => {
    recognition.stop();
    $('#stop-btn').prop('disabled', true);
  });
}