
function detectTime(result) {
  // 00:55:29.3
  a = result.match(/([0-9]+):([0-5][0-9]):([0-5][0-9])\.([0-9]{1,3})/);
  if ( a != null) {
    console.log('match dt1');
    return a[1] + ':' + a[2] + ':' + a[3] + '.' + a[4];
  }
  // タイム
  // 01:36:08
  // TATTA
  a = result.match(/\n(タイム|Duration)\n([0-9]+):([0-5][0-9]):([0-5][0-9])/);
  if ( a != null) {
    console.log('match dt2');
    return a[2] + ':' + a[3] + ':' + a[4];
  }
  // 01:36:08
  // タイム
  a = result.match(/\n([0-9]+):([0-5][0-9]):([0-5][0-9])\nタイム/);
  if ( a != null) {
    console.log('match dt3');
    return a[1] + ':' + a[2] + ':' + a[3];
  }
  // 0:51:45
  a = result.match(/([0-9]+):([0-5][0-9]):([0-5][0-9])/);
  if ( a != null) {
    console.log('match dt5');
    return a[1] + ':' + a[2] + ':' + a[3];
  }
  // 36:08
  // タイム
  a = result.match(/\n([0-5][0-9]):([0-5][0-9])\nタイム/);
  if ( a != null) {
    console.log('match dt4');
    return '0:' + a[1] + ':' + a[2];
  }
  // 0:49'01" LAP
  // 01:00′ 15"-
  a = [...result.matchAll(/([0-9]+):([0-5][0-9])[\'′][ ]*([0-5][0-9])\"/g)];
  if ( a.length > 0) {
    console.log(`match dt6 with ${a.length} patterns.`);
    for(i=0; i<a.length;i++) {
      duration = a[i][1] + ':' + a[i][2] + ':' + a[i][3];
      if(duration != '0:00:00') {
        // TODO: 複数あったら返して選択してもらう。
        return duration;
      }
    }
  }
  // 01:00
  a = [...result.matchAll(/\n([0-5]*[0-9]):([0-5][0-9])\n/g)];
  if ( a.length > 0) {
    console.log(`match dt7 with ${a.length} patterns.`);
    for(i=0; i<a.length;i++) {
      duration = '0:' + a[i][1] + ':' + a[i][2];
      if(duration != '0:00:00') {
        // TODO: 複数あったら返して選択してもらう。
        return duration;
      }
    }
  }

  return null;
}

function detectDistance(result) {
  // 3.70km
  a = [...result.matchAll(/([0-9]+)\.([0-9]+)[kK][mM]/g)];
  if ( a.length > 0) {
    for(i=0; i<a.length;i++) {
      distance = a[i][1] + '.' + a[i][2];
      if(distance != '0.000') {
        console.log(`match dd0 with ${a[i][0]} of ${a.length} patterns.`);
        // TODO: 複数あったら返して選択してもらう。
        return distance;
      }
    }
  }
  // 8.260 km
  a = result.match(/([0-9]+)\.([0-9]+)[ ]*km/);
  if ( a != null) {
    console.log(`match dd1 with ${a[0]}`);
    return a[1] + '.' + a[2];
  }
  // 7.67
  // 距離(km)
  a = result.match(/([0-9]+)\.([0-9]+)\n(距離|キロメートル)/);
  if ( a != null) {
    console.log(`match dd2 with ${a[0]}`);
    return a[1] + '.' + a[2];
  }
  // km 5.24
  a = result.match(/km[ ]*([0-9]+)\.([0-9]+)/);
  if ( a != null) {
    console.log(`match dd3 with ${a[0]}`);
    return a[1] + '.' + a[2];
  }
  // 0.44
  // km
  a = result.match(/([0-9]+)\.([0-9]+)\nkm/);
  if ( a != null) {
    console.log(`match dd4 with ${a[0]}`);
    return a[1] + '.' + a[2];
  }
  // 8.0 14km EPSON Watchで01が 0 1になる問題
  a = result.match(/\n([0-9]+)\.([0-9]+) ([0-9]+)km\n/);
  if ( a != null) {
    console.log(`match dd5 with ${a[0]}`);
    return a[1] + '.' + a[2] + a[3];
  }

  return null;
}

function sendLine(to, strMessage){
   
  //Lineに送信するためのトークン
  var strToken = CHANNEL_ACCESS_TOKEN;
  var options =
   {
     "method"  : "post",
     "payload" : JSON.stringify({
       'messages': [{
         'type': 'text',
         'text': strMessage,
        }],
       'to' : to,
      }),
     "headers" : {"Authorization" : "Bearer " + strToken, 
       "Content-Type" : "application/json"
     }
 
   };
 
   UrlFetchApp.fetch("https://api.line.me/v2/bot/message/push",options);
   console.log(to + String.fromCharCode(10) + strMessage)
}

function replyLine(sourcename, replyToken, strMessage){
   
  //Lineに送信するためのトークン
  var strToken = CHANNEL_ACCESS_TOKEN;
  var options =
   {
     "method"  : "post",
     "payload" : JSON.stringify({
       'messages': [{
         'type': 'text',
         'text': strMessage,
        }],
       'replyToken' : replyToken,
      }),
     "headers" : {"Authorization" : "Bearer " + strToken, 
       "Content-Type" : "application/json"
     }
 
   };
 
   UrlFetchApp.fetch("https://api.line.me/v2/bot/message/reply",options);
   console.log('reply to ' + sourcename + String.fromCharCode(10) + strMessage)
}

function replyLineCorrect(sourcename, replyToken, strMessage, name, duration, distance){

  var tag = replyToken.substr(0,7);
  var fillInText = '';
  fillInText += `${tag}:修正\n氏名\t${name}`;
  fillInText += `\n距離\t${distance != null ? distance : '0.00'}`;
  fillInText += `\nタイム\t${duration != null ? duration : '0:00:00'}`;

  //Lineに送信するためのトークン
  var strToken = CHANNEL_ACCESS_TOKEN;
  var options =
   {
     "method"  : "post",
     "payload" : JSON.stringify({
       'messages': [{
         'type': 'text',
         'text': strMessage,
         'quickReply': {
           'items': [
              {
                'type': 'action', 
                'action': {
                  'type': 'postback',
                  'data': `${tag}:修正`,
                  'label': '修正',
                  'displayText': '記録を修正します。',
                  "inputOption": "openKeyboard",
                  "fillInText": fillInText
                }
              },
              {
                'type': 'action', 
                'action': {
                  'type': 'postback',
                  'data': `${tag}:取り消し`,
                  'label': '取り消し',
                  'displayText': '記録を取り消します。'
                }
              },
            ]
         }
        }],
       'replyToken' : replyToken,
      }),
     "headers" : {"Authorization" : "Bearer " + strToken, 
       "Content-Type" : "application/json"
     }
 
   };
 
   UrlFetchApp.fetch("https://api.line.me/v2/bot/message/reply",options);
   console.log('reply to ' + sourcename + String.fromCharCode(10) + strMessage)
}

function replyAddResultInstruction(sourcename, replyToken){
   
  //Lineに送信するためのトークン
  var strToken = CHANNEL_ACCESS_TOKEN;
  var options =
   {
     "method"  : "post",
     "payload" : JSON.stringify({
       'messages': [{
         'type': 'text',
         'text': '記録を手入力で追加します。「追加」を選択すると、ひな形が表示されます。',
         'quickReply': {
           'items': [
              {
                'type': 'action', 
                'action': {
                  'type': 'postback',
                  'data': replyToken.substr(0,7) + ':追加',
                  'label': '追加',
                  'displayText': '記録を追加します。',
                  "inputOption": "openKeyboard",
                  "fillInText": replyToken.substr(0,7) + ':追加\n氏名\tおなまえ\n距離\t0.00\n\タイム\t0:00:00'
                }
              },
            ]
         }
        }],
       'replyToken' : replyToken,
      }),
     "headers" : {"Authorization" : "Bearer " + strToken, 
       "Content-Type" : "application/json"
     }
   };
 
   UrlFetchApp.fetch("https://api.line.me/v2/bot/message/reply",options);
   console.log('reply to ' + sourcename + '「追加」')
}

function recordRequest(e) {

  // JSONをパース
  if (e == null || e.postData == null || e.postData.contents == null) {
    return;
  }
  var requestJSON = e.postData.contents;
  var requestObj = JSON.parse(requestJSON);
  var type = '';
  var userId = '';
  var groupId = '';
  var messageText = '';
  if(requestObj.events.length > 0) {
    type = requestObj.events[0].type;
    if(type == 'message' || type == 'follow' || type == 'unfollow') {
      userId = requestObj.events[0].source.userId;
    }
    if(type == 'message') {
      messageText = requestObj.events[0].message.text;
    }
    if(requestObj.events[0].source.type == 'group') {
      groupId = requestObj.events[0].source.groupId;
    }
  }

  date = new Date();

  //  
  // 結果をスプレッドシートに追記
  //

  var ss = SpreadsheetApp.getActive()
  var sheet = ss.getSheetByName('Webhook Log');

  // ヘッダ行を取得
  var headers = sheet.getRange(1,1,1,sheet.getLastColumn()).getValues()[0];

  // ヘッダに対応するデータを取得
  var values = [];
  for (i in headers){
    var header = headers[i];
    var val = "";
    switch(header) {
      case "date":
        val = new Date();
        break;
      case "body":
        val = e.postData.contents;
        break;
      case "type":
        val = type;
        break;
      case "userId":
        val = userId;
        break;
      case "groupId":
        val = groupId;
        break;
      case "message":
        val = messageText;
        break;
      default:
        val = requestObj[header];
        if (val == undefined) {
          val = "";
        }
        break;
    }
    values.push(val);
  }

  // 行を追加
  sheet.appendRow(values);
}

function recordResult(event, analyzed, textAnnotations, distance, duration) {

  var userId = event.source.userId;
  var type = event.source.type;
  var groupId = '';
  if(type == 'group') {
    groupId = event.source.groupId;
  }
  var tag = event.replyToken.substr(0,7);

  date = new Date();

  //  
  // 結果をスプレッドシートに追記
  //

  var ss = SpreadsheetApp.getActive()
  var sheet = ss.getSheetByName('Analyze Log');

  // ヘッダ行を取得
  var headers = sheet.getRange(1,1,1,sheet.getLastColumn()).getValues()[0];

  // ヘッダに対応するデータを取得
  var values = [];
  for (i in headers){
    var header = headers[i];
    var val = "";
    switch(header) {
      case "date":
        val = new Date();
        break;
      case "analyzed":
        val = analyzed;
        break;
      case "userId":
        val = userId;
        break;
      case "groupId":
        val = groupId;
        break;
      case "textAnnotations":
        val = textAnnotations;
        break;
      case "name":
        val = getListedUserName(userId);
        if(val == 'unknown') {
          // リストになければ追加しておく
          recordUser(userId);
        }
        break;
      case "distance":
        val = distance;
        break;
      case "duration":
        val = duration;
        break;
      case "tag":
        val = tag;
        break;
      default:
        break;
    }
    values.push(val);
  }

  // 行を追加
  sheet.appendRow(values);
}

// 追加
function addResult(tag, name, groupId, distance, duration) {
  date = new Date();

  var ss = SpreadsheetApp.getActive()
  var sheet = ss.getSheetByName('Analyze Log');

  // ヘッダ行を取得
  var headers = sheet.getRange(1,1,1,sheet.getLastColumn()).getValues()[0];

  // ヘッダに対応するデータを取得
  var values = [];
  for (i in headers){
    var header = headers[i];
    var val = "";
    switch(header) {
      case "date":
        val = new Date();
        break;
      case "groupId":
        val = groupId;
        break;
      case "name":
        val = name;
        break;
      case "distance":
        val = distance;
        break;
      case "duration":
        val = duration;
        break;
      case "tag":
        val = tag;
        break;
      default:
        break;
    }
    values.push(val);
  }

  // 行を追加
  sheet.appendRow(values);

  return '記録しました'
}

// 修正
function updateResult(tag, name, distance, duration) {

  date = new Date();

  var ss = SpreadsheetApp.getActive()
  var sheet = ss.getSheetByName('Analyze Log');

  const lastRow = sheet.getLastRow();

  for (var i = lastRow; i > lastRow - 20; i--) {
    if (sheet.getRange(i, 8).getValue() == tag) {
      sheet.getRange(i, 5).setValue(name);
      sheet.getRange(i, 6).setValue(distance);
      sheet.getRange(i, 7).setValue(duration);
      return '更新しました';
    }
  }
  return '記録がありません';

}

// 取り消し
function ignoreResult(tag) {

  date = new Date();

  var ss = SpreadsheetApp.getActive()
  var sheet = ss.getSheetByName('Analyze Log');

  const lastRow = sheet.getLastRow();

  for (var i = lastRow; i > lastRow - 20; i--) {
    if (sheet.getRange(i, 8).getValue() == tag) {
      sheet.getRange(i, 11).setValue('取り消し');
      return '取り消しました';
    }
  }
  return '記録がありません';

}


function getListedUserName(userId) {

  var ss = SpreadsheetApp.getActive()
  var sheet = ss.getSheetByName('User List');

  const lastRow = sheet.getLastRow();

  for (var i = 2; i <= lastRow; i++) {
    if (sheet.getRange(i, 1).getValue() == userId) {
      return sheet.getRange(i, 2).getValue();
    }
  }
  return 'unknown';

}

function recordUser(userId) {

  var requestObj = JSON.parse('{}');

  //  
  // userIdをスプレッドシートに追記
  //

  var ss = SpreadsheetApp.getActive()
  var sheet = ss.getSheetByName('User List');

  // ヘッダ行を取得
  var headers = sheet.getRange(1,1,1,sheet.getLastColumn()).getValues()[0];

  // ヘッダに対応するデータを取得
  var values = [];
  for (i in headers){
    var header = headers[i];
    var val = "";
    switch(header) {
      case "userId":
        val = userId;
        break;
      case "displayName":
        val = '未設定さん';
        break;
      case "addDate":
      case "updateDate":
        val = new Date();
        break;
      default:
        val = requestObj[header];
        if (val == undefined) {
          val = "";
        }
        break;
    }
    values.push(val);
  }

  // 行を追加
  sheet.appendRow(values);
}

function getLastPeriod() {
  // 現在時刻から集計対象の日時（昨日の分）を返す。
  // 8:30 まで、一昨日の8:10を返す。
  var dt = new Date();
  if(dt.getHours() * 100 + dt.getMinutes() < 830) {
    dt.setDate(dt.getDate() -2);
  }
  else {
    dt.setDate(dt.getDate() -1);
  }
  dt.setHours(8);
  dt.setMinutes(10);
  dt.setSeconds(0);

  return dt;
}

function getCurrentPeriod() {
  // 現在時刻から集計対象の日時を返す。
  // 8:30 まで、前日の8:10を返す。
  var dt = new Date();
  if(dt.getHours() * 100 + dt.getMinutes() < 830) {
    dt.setDate(dt.getDate() -1);
  }
  dt.setHours(8);
  dt.setMinutes(10);
  dt.setSeconds(0);

  return dt;
}

function getSummary(groupId) {

  var ss = SpreadsheetApp.getActive()
  var sheet = ss.getSheetByName('24h Report');
  var key = Utilities.formatDate(getCurrentPeriod(), "JST", "yyyy-MM-dd HH:mm:ss");
  var result = `${key} からの集計\n`;

  // queryの条件（抽出対象期間）を更新
  sheet.getRange(1, 1).setValue(`=QUERY('Analyze Log'!A:K,"SELECT E, F, G WHERE A > datetime '${key}' AND C = '${groupId}' AND (F is not null OR G is not null) AND K is null", -1)`);

  // queryで転写された24時間以内のラン記録を取得
  var records = sheet.getRange(1,1,sheet.getLastRow(),3).getDisplayValues();
  for(i = 1; i < sheet.getLastRow(); i++) {
    result += records[i][0] + '\t' + records[i][1] + '\t' + records[i][2] + '\n';
  }
  // 計算式で集計された合計距離・走行時間と残り距離
  var summary = sheet.getRange(1,5,3,3).getDisplayValues();
  for(i = 1; i < 3; i++) {
    result += '\n' + summary[i][0] + '\t' + summary[i][1] + '\t' + summary[i][2];
  }
  if(summary[1][1] == '0' && summary[1][2] == '0') {
    return '記録なし';
  }

  return result;
}

function getPreviousSummary(groupId) {

  var ss = SpreadsheetApp.getActive()
  var sheet = ss.getSheetByName('24h Report');
  var date_from = Utilities.formatDate(getLastPeriod(), "JST", "yyyy-MM-dd HH:mm:ss");
  var date_to = Utilities.formatDate(getCurrentPeriod(), "JST", "yyyy-MM-dd HH:mm:ss");
  var result = `${date_from} から24hの集計\n`;

  // queryの条件（抽出対象期間）を更新
  sheet.getRange(1, 1).setValue(`=QUERY('Analyze Log'!A:K,"SELECT E, F, G WHERE A > datetime '${date_from}' AND A <= datetime '${date_to}' AND C = '${groupId}' AND (F is not null OR G is not null) AND K is null", -1)`);

  // queryで転写された24時間以内のラン記録を取得
  var records = sheet.getRange(1,1,sheet.getLastRow(),3).getDisplayValues();
  for(i = 1; i < sheet.getLastRow(); i++) {
    result += records[i][0] + '\t' + records[i][1] + '\t' + records[i][2] + '\n';
  }
  // 計算式で集計された合計距離・走行時間と残り距離
  var summary = sheet.getRange(1,5,3,3).getDisplayValues();
  for(i = 1; i < 3; i++) {
    result += '\n' + summary[i][0] + '\t' + summary[i][1] + '\t' + summary[i][2];
  }
  if(summary[1][1] == '0' && summary[1][2] == '0') {
    return '記録なし';
  }

  return result;
}

function replyUpdateResultInstruction(sourcename, replyToken, groupId){

  var ss = SpreadsheetApp.getActive()
  var sheet = ss.getSheetByName('24h Report');
  var key = Utilities.formatDate(getCurrentPeriod(), "JST", "yyyy-MM-dd HH:mm:ss");
  var result = `${key} からの記録\n`;

  // queryの条件（抽出対象期間）を更新
  sheet.getRange(1, 1).setValue(`=QUERY('Analyze Log'!A:K,"SELECT E, F, G, H WHERE A > datetime '${key}' AND C = '${groupId}' AND (F is not null OR G is not null) AND K is null", -1)`);

  // queryで転写された24時間以内のラン記録を取得
  var records = sheet.getRange(1,1,sheet.getLastRow(),4).getDisplayValues();
  var message = {'type':'text'};
  var items = [];
  for(i = 1; i < sheet.getLastRow(); i++) {
    if(records[i][0] == '') {
      continue;
    }
    result += `${i}. ${records[i][0]}\t${records[i][1]}\t${records[i][2]}\n`;
    items.push(
      {
        'type': 'action', 
        'action': {
          'type': 'postback',
          'data': `${records[i][3]}:修正`,
          'label': `${i}. ${records[i][0]}`,
          'displayText': `${i}. ${records[i][0]} の記録を修正します。`,
          "inputOption": "openKeyboard",
          "fillInText": `${records[i][3]}:修正\n氏名\t${records[i][0]}\n距離\t${records[i][1]}\nタイム\t${records[i][2]}`
        }
      });
  }
  if(items.length>0) {
    message.quickReply = {'items': items};
    message.text = result + '\n修正する記録を選択してください。';
  }
  else {
    message.text = result + '\n記録がありません。';
  }
   
  //Lineに送信するためのトークン
  var strToken = CHANNEL_ACCESS_TOKEN;
  var options =
   {
     "method"  : "post",
     "payload" : JSON.stringify({
       'messages': [message],
       'replyToken' : replyToken,
      }),
     "headers" : {"Authorization" : "Bearer " + strToken, 
       "Content-Type" : "application/json"
     }
   };
 
   UrlFetchApp.fetch("https://api.line.me/v2/bot/message/reply",options);
   console.log('reply to ' + sourcename + '「修正」')
}

function replyIgnoreResultInstruction(sourcename, replyToken, groupId){

  var ss = SpreadsheetApp.getActive()
  var sheet = ss.getSheetByName('24h Report');
  var key = Utilities.formatDate(getCurrentPeriod(), "JST", "yyyy-MM-dd HH:mm:ss");
  var result = `${key} からの記録\n`;

  // queryの条件（抽出対象期間）を更新
  sheet.getRange(1, 1).setValue(`=QUERY('Analyze Log'!A:K,"SELECT E, F, G, H WHERE A > datetime '${key}' AND C = '${groupId}' AND (F is not null OR G is not null) AND K is null", -1)`);

  // queryで転写された24時間以内のラン記録を取得
  var records = sheet.getRange(1,1,sheet.getLastRow(),4).getDisplayValues();
  var message = {'type':'text'};
  var items = [];
  for(i = 1; i < sheet.getLastRow(); i++) {
    if(records[i][0] == '') {
      continue;
    }
    result += `${i}. ${records[i][0]}\t${records[i][1]}\t${records[i][2]}\n`;
    items.push(
      {
        'type': 'action', 
        'action': {
          'type': 'postback',
          'data': `${records[i][3]}:取り消し`,
          'label': `${i}. ${records[i][0]}`,
          'displayText': `${i}. ${records[i][0]} の記録を取り消します。`,
        }
      });
  }
  if(items.length>0) {
    message.quickReply = {'items': items};
    message.text = result + '\n取り消す記録を選択してください。';
  }
  else {
    message.text = result + '\n記録がありません。';
  }
   
  //Lineに送信するためのトークン
  var strToken = CHANNEL_ACCESS_TOKEN;
  var options =
   {
     "method"  : "post",
     "payload" : JSON.stringify({
       'messages': [message],
       'replyToken' : replyToken,
      }),
     "headers" : {"Authorization" : "Bearer " + strToken, 
       "Content-Type" : "application/json"
     }
   };
 
   UrlFetchApp.fetch("https://api.line.me/v2/bot/message/reply",options);
   console.log('reply to ' + sourcename + '「取り消し」')
}

// Vision APIで画像を解析して結果を取得
function analyzeImage(image) {

   const url = 'https://vision.googleapis.com/v1/images:annotate?key=' + GOOGLE_API_KEY;

   // 画像からテキストの検出
   const body = {
       "requests": [
           {
               "image": {
                   "content": image
               },
               "features": [
                   {
                       "type": "DOCUMENT_TEXT_DETECTION",
                   }
               ]
           }
       ]
   };

   const head = {
       "method": "post",
       "contentType": "application/json",
       "payload": JSON.stringify(body),
       "muteHttpExceptions": true
   };

   const response = UrlFetchApp.fetch(url, head);
   const obj = JSON.parse(response.getContentText());

   return obj;
}
