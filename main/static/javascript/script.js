const dailySentences = [
  "Good morning.",
  "How are you?",
  "I am fine, thank you.",
  "Whats your name?",
  "Nice to meet you.",
  "Have a great day.",
  "Can I help you?",
  "What time is it?",
  "I need some water.",
  "Where is the bathroom?",
  "Lets have lunch.",
  "What are your plans today?",
  "Can you pass me the salt?",
  "What do you think?",
  "I agree with you.",
  "I dont understand.",
  "Please explain it to me.",
  "Could you repeat that?",
  "How much does it cost?",
  "I need a doctor.",
  "Where do you live?",
  "I live nearby.",
  "I am very hungry.",
  "Do you have any pets?",
  "I love listening to music.",
  "Whats your favorite movie?",
  "The weather is nice today.",
  "Do you exercise regularly?",
  "I am going to the gym.",
  "Lets go for a walk.",
  "Where do you work?",
  "Whats your favorite book?",
  "I enjoy reading.",
  "Its too hot outside.",
  "Could you please call me?",
  "I dont know the answer.",
  "What is your phone number?",
  "I will be late.",
  "I am on my way.",
  "Please wait for me.",
  "I need to rest.",
  "Lets meet tomorrow.",
  "Do you have any plans this weekend?",
  "The food was delicious.",
  "I am sorry, I am late.",
  "Let me know if you need anything.",
  "Im looking for a new job.",
  "Do you enjoy cooking?",
  "Im learning a new language.",
  "Lets watch a movie.",
  "Do you have any hobbies?",
  "I forgot my keys.",
  "How was your day?",
  "What are you doing?",
  "Can you help me with this?",
  "I really appreciate it.",
  "Thank you for your help.",
  "Where are we going?",
  "I am going shopping.",
  "What is your favorite color?",
  "I love this song.",
  "Can you turn on the light?",
  "Please turn off the TV.",
  "Its time to go.",
  "I will call you later.",
  "Lets have dinner together.",
  "Are you ready?",
  "I am not sure about that.",
  "It was a pleasure meeting you.",
  "Im feeling tired today.",
  "Can we meet at 5 PM?",
  "Do you need any help?",
  "Lets get started.",
  "How old are you?",
  "I am 25 years old.",
  "I am very busy today.",
  "Can I borrow a pen?",
  "I am going to bed.",
  "Please take care of yourself.",
  "Whats the date today?",
  "Do you believe in fate?",
  "Its a beautiful day.",
  "Can I sit here?",
  "Where did you grow up?",
  "I need to buy groceries.",
  "Do you watch TV?",
  "I enjoy traveling.",
  "I miss my family.",
  "I am so excited!",
  "What do you want to eat?",
  "I am going to the store.",
  "Its raining outside.",
  "Can you open the door?",
  "I have a question for you.",
  "I cant believe it.",
  "Ill think about it.",
  "Have you been here before?",
  "Where are you from?",
  "I dont like spicy food.",
  "Im allergic to peanuts.",
  "Do you like your job?",
  "Can I see your ID?",
  "I am running late.",
  "I will be there soon.",
  "I dont have time.",
  "Im going out of town.",
  "Whats your favorite sport?",
  "Im trying to learn guitar.",
  "Do you like to dance?",
  "I am very sleepy.",
  "I lost my wallet.",
  "Have you seen my phone?",
  "I love this place.",
  "Im going to take a nap.",
  "Whats your favorite drink?",
  "Can you recommend a good restaurant?",
  "I need to charge my phone.",
  "Do you have Wi-Fi here?",
  "I am going to relax.",
  "Can we reschedule our meeting?",
  "It was a long day.",
  "Can I get a receipt?",
  "I need a break.",
  "I am so sorry.",
  "I appreciate your understanding.",
  "Lets keep in touch.",
  "Thats a great idea.",
  "Its not a big deal.",
  "I completely forgot.",
  "Could you send me an email?",
  "I will let you know.",
  "How was your weekend?",
  "Im thinking of moving.",
  "Whats your favorite band?",
  "I am learning to cook.",
  "Do you like coffee?",
  "I need some fresh air.",
  "Im planning a trip.",
  "Lets go out for dinner.",
  "What do you like to do for fun?",
  "Im looking forward to it.",
  "It was nice talking to you.",
  "Ill see you later.",
  "Ill text you.",
  "Do you like reading?",
  "I am on vacation.",
  "Can I help you with that?",
  "Lets meet up soon.",
  "Im in a hurry.",
  "Can you do me a favor?",
  "Its too early.",
  "Whats the weather like?",
  "I need to make a phone call.",
  "Im really hungry.",
  "Lets take a break.",
  "Where did you buy this?",
  "Im really sorry about that.",
  "Can I ask you something?",
  "Do you want to join us?",
  "Its getting late.",
  "I am so tired.",
  "I need to go now.",
  "That sounds good to me.",
  "Ill see you tomorrow.",
  "Whats the plan?",
  "Lets take a walk in the park.",
  "Do you have a minute?",
  "Can we talk?",
  "Im looking forward to our meeting.",
  "I really enjoyed that.",
  "Thats very interesting.",
  "How do you know each other?",
  "Ill take care of it.",
  "Can I have the bill, please?",
  "Its time for bed.",
  "Ive had a great day.",
  "Can I come with you?",
  "Ill be there on time.",
  "What do you recommend?",
  "Thats very kind of you.",
  "Ill let you decide.",
  "Im feeling much better.",
  "Its going to be okay.",
  "Im looking for something specific.",
  "I love spending time with friends.",
  "I need to finish this project.",
  "Im getting ready to leave.",
  "Do you have any plans tonight?",
  "How do you feel about it?",
  "Lets try something new.",
  "Im interested in that.",
  "Thats a good point.",
  "Ill be with you in a minute.",
  "Ill get back to you.",
  "Thank you for your patience.",
  "Lets make a decision.",
  "That's a tough question.",
  "Ill handle it.",
  "Ill keep that in mind.",
  "Ive got to run.",
  "Can we continue this later?",
  "That was a great suggestion.",
  "Im ready to go.",
  "Its been a long day.",
  "I am looking for new opportunities.",
  "I love this view.",
  "I hope you have a wonderful day.",
  "I am excited about the future.",
  "Im really glad to hear that.",
  "Let me check my schedule.",
  "Can we go somewhere quiet?",
  "I need to concentrate.",
  "Ill be back soon.",
  "Im thinking of taking a break.",
  "That was really helpful.",
  "Its time to start.",
  "Can we finish this tomorrow?",
  "Ill make sure to follow up.",
  "Im in the mood for something sweet.",
  "I need to grab a coffee.",
  "What do you think about that?",
  "Thats a great suggestion.",
  "Ive got a lot on my plate.",
  "Im glad you brought that up.",
  "Thats really thoughtful of you.",
  "Ill make sure to be there.",
  "Im very grateful for that.",
  "I really appreciate your help.",
  "Ill get it done.",
  "Lets go over the details.",
  "Thats an interesting perspective.",
  "Ill keep you updated.",
  "Im glad we talked.",
  "Ill let you know how it goes.",
  "Thats exactly what I was thinking.",
  "Lets take some time to discuss this.",
  "I appreciate your feedback.",
  "Its been a pleasure working with you.",
  "Im looking forward to it.",
  "I think were on the same page.",
  "That was a great meeting.",
  "Im excited to see what happens next.",
  "Lets wrap this up.",
  "Im confident well find a solution.",
  "That's a good question.",
  "Ill follow up with you soon.",
  "Im glad we had this conversation."]

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

$('.popup-window').hide();

if (!SpeechRecognition) {
  // document.getElementById('output').textContent = "Sorry, your browser does not support Speech Recognition.";
  // document.getElementById('start-btn').disabled = true;
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
    // document.getElementById('output').textContent = 'Listening...';
    $('#output').text('Listening...');
  };

  recognition.onresult = (event) => {
    // console.log(event.results.length);
    let matchFound = false;
    let final_answer;
    if (event.results && event.results.length > 0) {
      const transcript = event.results[0][0].transcript;
      console.log(transcript);
      if (!Array.isArray(dailySentences) || dailySentences.length === 0) {
        console.error("DailySentences array is not defined or empty.");
        return;
      }
      for (let k = 0; k < dailySentences.length; k++) {
        let preDefinedSentence = dailySentences[k].toLowerCase();
        const m = transcript.length, n = preDefinedSentence.length;
        let minimum_operation = 0;
        if (m === 0) minimum_operation = 0;
        if (n === 0) minimum_operation = 0;
        const dp = Array.from({length: m + 1}, () => Array(n + 1).fill(0));
        for (let i = 0; i <= m; i++) {
          dp[i][0] = i;
        }
        for (let j = 0; j <= n; j++) {
          dp[0][j] = j;
        }
        for (let i = 1; i <= m; i++) {
          for (let j = 1; j <= n; j++) {
            if (transcript[i - 1] === preDefinedSentence[j - 1]) {
              dp[i][j] = dp[i - 1][j - 1];
            } else {
              dp[i][j] = 1 + Math.min(dp[i][j - 1], dp[i - 1][j], dp[i - 1][j - 1]);
            }
          }
        }
        minimum_operation = dp[m][n];
        let matched_percentage = 100 - (minimum_operation / Math.max(m, n)) * 100;
        if (matched_percentage >= 75) {
          // document.getElementById('output').textContent = `Did you mean ${transcript}?`;
          final_answer = preDefinedSentence;
          matchFound = true;
          break;
        }
      }
      if (!matchFound) {
        // document.getElementById('output').textContent = "Please, speak again.";
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
        window.setTimeout( ()=> {
          // window.location.reload();
          // document.getElementById('start-btn').click();
          $('#start-btn').click();
        }, 1000);
      } else {
        // document.getElementById('output').textContent = `Did you mean ${final_answer}?`;
        $('.info').hide();
        $('.popup-window').show();
        // $('#output').text(`Did you mean ${final_answer}?`);
        $('#details').text(`Did you mean ${final_answer}?`);
        // voice to text part
        const speak = () => {
          if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance("Did you mean " + final_answer);
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
            window.location.href = "https://towardsdatascience.com/sqlalchemy-python-tutorial-79a577141a91";
          }
        });
      }
    }
  };

  recognition.onerror = (event) => {
    console.error('Error occurred: ' + event.error);
    // document.getElementById('output').textContent = 'Error: ' + event.error;
    $('#output').text('Error: ' + event.error);
  };

  recognition.onend = () => {
    console.log('Speech recognition ended');
    // document.getElementById('start-btn').disabled = false;
    // document.getElementById('stop-btn').disabled =
    $('#start-btn').prop('disabled', false);
    $('#stop-btn').prop('disabled', true);
    // document.getElementById('output').textContent = "Recognition stopped.";
    $('#output').text("Recognition stopped.");
  };

  // recognition.start();

  $('#start-btn').on('click', () => {
    try {
      recognition.start();
      // document.getElementById('output').textContent = "Listening...";
      // document.getElementById('start-btn').disabled = true;
      // document.getElementById('stop-btn').disabled = false;
      $('#output').text("Listening...");
      $('#start-btn').prop('disabled', true);
      $('#stop-btn').prop('disabled', false);
    } catch (err) {
      console.error('Error starting recognition: ', err);
      // document.getElementById('output').textContent = 'Failed to start speech recognition. Error: ' + err.message;
      $('#output').text('Failed to start speech recognition. Error: ' + err.message);
    }
  });

  $('#stop-btn').on('click', () => {
    recognition.stop();
    // document.getElementById('stop-btn').disabled = true;
    $('#stop-btn').prop('disabled', true);
  });
}