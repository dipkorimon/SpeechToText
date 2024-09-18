const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

// Hide the popup window initially
$('.popup-window').hide();

if (!SpeechRecognition) {
  // Inform the user if their browser does not support Speech Recognition
  $('#output').text("Sorry, your browser does not support Speech Recognition.");
  $('#start-btn').prop('disabled', true);
} else {
  const recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.continuous = true;
  recognition.interimResults = false;

  let isRecognitionActive = false;

  // Event handler for when recognition starts
  recognition.onstart = () => {
    isRecognitionActive = true;
    console.log('Speech recognition started');
    $('#output').text('Listening...');
  };

  // Event handler for when recognition results are available
  recognition.onresult = (event) => {
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
      };

      const csrftoken = getCookie('csrftoken');

      // Send the transcript to the server
      $.ajax({
        type: 'POST',
        url: '/save_speech/',
        headers: { 'X-CSRFToken': csrftoken },
        data: { 'speech_text': transcript }
      }).done((response) => {
        recognition.stop();
        checkMatch(response.status, response.matched_sentence, response.speech_text);
        if (response.status === 'success') {
          $('.popup-window').show();
          $('#details').text(`Did you mean ${response.matched_sentence}?`);

          // Initiate a second recognition for confirmation
          const confirmationRecognition = new SpeechRecognition();
          confirmationRecognition.lang = 'en-US';
          confirmationRecognition.continuous = true;
          confirmationRecognition.interimResults = false;

          confirmationRecognition.onresult = (confirmEvent) => {
            let confirmationText = confirmEvent.results[0][0].transcript.toLowerCase();
            console.log("Confirmation Transcript: ", confirmationText);
            confirmationRecognition.stop();

            if (confirmationText.includes("yes")) {
              console.log("User confirmed the match");
              // confirmationRecognition.stop();
              $('#details').text("Hello World");
              $('#voice-output').hide();
            } else if (confirmationText.includes("no")) {
              console.log("User rejected the match, restarting...");
              $('#output').text("Please try another sentence.");
              $('.popup-window').hide();
              $('.info').show();

              // Function to speak a message if the response is rejected by user
              const speakRejectedInput = () => {
                if ('speechSynthesis' in window) {
                  const utterance = new SpeechSynthesisUtterance("Please, try another sentence.");
                  utterance.lang = 'en-US';
                  utterance.pitch = 1;
                  utterance.rate = 1;
                  utterance.volume = 1;
                  window.speechSynthesis.speak(utterance);
                } else {
                  $('#output').text("Your browser does not support speech synthesis");
                }
              };

              speakRejectedInput();
              // Restart recognition after a delay if not currently recognizing
              setTimeout(() => {
                if (!isRecognitionActive) {
                  recognition.start();
                }
              }, 1000);
            } else {
              $('#output').text("Please confirm with 'yes' or 'no'.");
              // Restart confirmation recognition after a delay if not currently recognizing
              setTimeout(() => {
                confirmationRecognition.start();
              }, 1000);
            }
          };

          confirmationRecognition.onerror = (error) => {
            console.error('Error in confirmation recognition: ', error);
            $('#output').text("Error: Please try confirming again.");
            // confirmationRecognition.start();
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

      const checkMatch = (status, matched_sentence, speech_text) => {
        if (status === "success") {
          console.log("Matched Sentence: ", matched_sentence);
          $('.info').hide();
          $('.popup-window').show();
          $('#details').text(`Did you mean ${matched_sentence}?`);
          $('#voice-output').text('Listening...');

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
          $('#output').text("Please, speak again.");
          recognition.stop();

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

          setTimeout(() => {
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
    isRecognitionActive = false;
    console.log('Speech recognition ended');
    $('#start-btn').prop('disabled', false);
    $('#stop-btn').prop('disabled', true);
    $('#output').text("Recognition stopped.");
  };

  $('#start-btn').on('click', () => {
    if (!isRecognitionActive) {
      try {
        recognition.start();
        $('#output').text("Listening...");
        $('#start-btn').prop('disabled', true);
        $('#stop-btn').prop('disabled', false);
      } catch (err) {
        console.error('Error starting recognition: ', err);
        $('#output').text('Failed to start speech recognition. Error: ' + err.message);
      }
    }
  });

  $('#stop-btn').on('click', () => {
    if (isRecognitionActive) {
      recognition.stop();
    }
    $('#stop-btn').prop('disabled', true);
  });
}
