    var default_language = 'ko-KR';

    var create_email = false;
    var final_transcript = '';
    var recognizing = false;
    var ignore_onend;
    var start_timestamp;
    var lat = 37.5714000000;
    var lon = 126.9658000000;
    var appkey = "&appKey=4a0b49b3-d1e6-36b9-8d35-6b21fe6edb66"

    //webkitSeechRecognition : webbroser가 web speech api를 제공하는지 check

    if (!('webkitSpeechRecognition' in window)) {
      upgrade();
    } else {
      start_button.style.display = 'inline-block';
      var recognition = new webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onstart = function() {
        recognizing = true;
        showInfo('info_speak_now');
      };

      recognition.onerror = function(event) {
        if (event.error == 'no-speech') {
          showInfo('info_no_speech');
          ignore_onend = true;
        }
        if (event.error == 'audio-capture') {
          showInfo('info_no_microphone');
          ignore_onend = true;
        }
        if (event.error == 'not-allowed') {
          if (event.timeStamp - start_timestamp < 100) {
            showInfo('info_blocked');
          } else {
            showInfo('info_denied');
          }
          ignore_onend = true;
        }
      };


      recognition.onend = function() {
        recognizing = false;
        if (ignore_onend) {
          return;
        }
        if (!final_transcript) {
          showInfo('info_start');
          return;
        }
        showInfo('');
        if (window.getSelection) {
          window.getSelection().removeAllRanges();
          var range = document.createRange();
          range.selectNode(document.getElementById('final_span'));
          window.getSelection().addRange(range);
        }
      };

    //interim_transcript  : 중간 스크립트
    //final_transcript : final 스크립트
    var letter = new Array(); //음성 명령 저장
    var socket = io.connect();
      recognition.onresult = function(event) {
        var interim_transcript = '';
        for (var i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            final_transcript = event.results[i][0].transcript;
            console.log(final_transcript);
          } else {
            interim_transcript = event.results[i][0].transcript;
          }
        }
        var enter = '<br>'
        input_array(final_transcript);
        final_transcript = capitalize(final_transcript);
        final_span.innerHTML = linebreak(final_transcript);
        interim_span.innerHTML = linebreak(interim_transcript);
       }
      };

    var db_data;
    var db_status;
    socket.on('Status', function(data)
    {
      console.log('status');
      console.log(data);
      db_status = data;
    })

    socket.on('data', function(data)
    {
      db_data = data;
      document.write(db_data);
    })
    socket.on('responseurl', function(data)
    {
      var url = data;
      if(db_status=="날씨")
       {
        console.log('weather');
         url += "&lat="+lat+"&lon="+lon+appkey;
         JSON_send(url, db_status, db_data);
       }
      else if(db_status == "대화")
      {
        console.log('data');
        print_data(db_status, db_data, url);
      }
      else
      {
        console.log('else');
        url+=appkey;
        JSON_send(url,db_status, db_data);
      }
      
    })

    function JSON_send(url, db_status, db_data)
    {
      parameters = [
      'appKey=4a0b49b3-d1e6-36b9-8d35-6b21fe6edb66',
      'format = json',
      'version = 1'
      ];
      $.getJSON(url, JSONparse);
//      document.write(url);
        function JSONparse(data)
      {
          print_data(db_status,db_data, data);
      }
    }

    function print_data(status, word, json_data)
    {
      console.log("happy")
      console.log(status);
     if(status == "날씨")
     {
        var string_info;
        var day_info;

         if(word == "오늘")
        {
          console.log("today");
          document.write(json_data.weather.summary[0].today.sky.name)
          document.write("최고 온도", json_data.weather.summary[0].today.temperature.tmax)
          document.write("최저 온도", json_data.weather.summary[0].today.temperature.tmin)
        }
        else if(word == "내일")
        {
          document.write(json_data.weather.summary[0].tomorrow.sky.name)
          document.write("최고 온도", json_data.weather.summary[0].tomorrow.temperature.tmax)
          document.write("최저 온도", json_data.weather.summary[0].tomorrow.temperature.tmin)
        }
        else if(word == "어제")
        {
          document.write(json_data.weather.summary[0].yesterday.sky.name)
           document.write("최고 온도", json_data.weather.summary[0].yesterday.temperature.tmax)
          document.write("최저 온도", json_data.weather.summary[0].yesterday.temperature.tmin)
        } 
        else if(word == "자외선" || word == "자외선지수")
        {
          document.write(json_data.weather.wIndex.uvindex[0].day01.comment);
        }
        else if(word == "빨래")
        {
          document.write(json_data.weather.wIndex.laundry[0].day01.comment);
        }
        else if(word == "체감" || word =="체감온도")
       {
          document.write(json_data.weather.wIndex.wctIndex[0].current.index);
          document.write("4시간 뒤 체감온도는");
          document.write(json_data.weather.wIndex.wctIndex[0].forecast.index4hour);
          document.write("입니다.");
       }

    }
    else if (status == "세차")
    {
      document.write(json_data.weather.wIndex.carWash[0].comment)
    }
    else if(status == "대화")
    {
      document.write(json_data);
    }
        // else if(status == "체감" || status == "체감온도" || status=="온도")
        // {

        // }
    }
    function input_array(s)
    {
      if(letter.length>0)
      {
        if(s!= "")
        {
          console.log(letter.length-1);
          if(letter[letter.length-1] == s)
          {
            console.log('a');
          }
          else
          {
            console.log('s');
            letter.push(s);
            socket.emit('send_date', s);
          }
        }
      }
      else
      {
        if(s!="")
        letter.push(s);
        socket.emit('send_date', s);
      }
      console.log(letter);
    }

    function upgrade() {
      start_button.style.visibility = 'hidden';
      showInfo('info_upgrade');
    }

    var two_line = /\n\n/g;
    var one_line = /\n/g;

    function linebreak(s) {
        return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
    }

    var first_char = /\S/;
    function capitalize(s) {

      return s.replace(first_char, function(m) { return m.toUpperCase(); });
    }

    function startButton(event) {
      if (recognizing) {
        recognition.stop();
        return;
      }
      final_transcript = '';
      recognition.lang = default_language;
      recognition.start();
      ignore_onend = false;
      final_span.innerHTML = '';
      interim_span.innerHTML = '';

      showInfo('info_allow');

      start_timestamp = event.timeStamp;
    }

    function start_recog()
    {
      if(recognizing)
      {
        recognition.stop();
        return;
      }
      final_transcript = '';
      recognition.lang = default_language;
      recognition.start();
      ignore_onend = false;
      final_span.innerHTML = '';
      interim_span.innerHTML = '';
      showInfo('info_allow');

    }
    window.onload = start_recog();
    function showInfo(s) {
      if (s) {
        for (var child = info.firstChild; child; child = child.nextSibling) {
          if (child.style) {
            child.style.display = child.id == s ? 'inline' : 'none';
          }
        }
        info.style.visibility = 'visible';
      } else {
        info.style.visibility = 'hidden';
      }
    }

    var current_style;
