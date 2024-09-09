const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

$('.popup-window').hide();

if (!SpeechRecognition) {
  $('#output').text("Sorry, your browser does not support Speech Recognition.");
  $('#start-btn').prop('disabled', true);
} else {
  const recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.continuous = true;
  recognition.interimResults = false;

  // console.log(recognition);

  recognition.onstart = () => {
    console.log('Speech recognition started');
    $('#output').text('Listening...');
  };

  // debugger
  recognition.onresult = (event) => {
    // console.log(event.results.length);
    if (event.results && event.results.length > 0) {
      const transcript = event.results[0][0].transcript;
      console.log("Transcript: ", transcript);

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
        headers: {'X-CSRFToken': csrftoken},
        data: {
          'speech_text': transcript,
        }
      }).done((response) => {
        if (response.status === 'success') {
          $('.popup-window').show();
          $('#details').text(`Did you mean ${response.matched_sentence}?`);
          checkMatch(response.status, response.matched_sentence, response.speech_text);

          // Initiate a second recognition for confirmation
          const confirmationRecognition = new SpeechRecognition();
          confirmationRecognition.lang = 'en-US';
          confirmationRecognition.continuous = true;
          confirmationRecognition.interimResults = false;

          confirmationRecognition.onresult = (confirmEvent) => {
            const confirmationText = confirmEvent.results[0][0].transcript.toLowerCase();
            console.log("Confirmation Transcript: ", confirmationText);

            if (confirmationText.includes("yes")) {
              console.log("User confirmed the match");
              $('#output').text("Hello World");
              $('.popup-window').hide();
              $('.info').show();
              recognition.stop();
            } else if (confirmationText.includes("no")) {
              console.log("User rejected the match, restarting...");
              $('#output').text("Please try again.");
              $('.popup-window').hide();
              $('.info').show();
              recognition.start();
            } else {
              $('#output').text("Please confirm with 'yes' or 'no'.");
              window.setTimeout(() => {
                confirmationRecognition.start();
              }, 1000);
            }
          };

          confirmationRecognition.onerror = (error) => {
            console.error('Error in confirmation recognition: ', error);
            $('#output').text("Error: Please try confirming again.");
            confirmationRecognition.start();
          };

          confirmationRecognition.onend = () => {
            console.log('Confirmation recognition ended.');
          };

          confirmationRecognition.start();
        }
      }).fail((xhr, status, error) => {
        console.error("Error saving speech: ", error);
        $('#output').text("Error: Unable to process your input.");
      });

      // debugger
      const checkMatch = (status, matched_sentence, speech_text) => {
        if (status === "success") {
          console.log(matched_sentence);
          // handle popup window
          $('.info').hide();
          $('.popup-window').show();
          $('#details').text(`Did you mean ${matched_sentence}?`);
          $('#voice-output').text('Listening...');

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
            recognition.stop();
            $('.popup-window').hide();
            $('.info').show();
          });
        } else {
          // debugger
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
      };
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