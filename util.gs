
function detectTime(result) {
  // 00:55:29.3
  a = result.match(/([0-9]+):([0-5][0-9]):([0-5][0-9])\.([0-9]{1,3})/);
  if ( a != null) {
    console.log('match dt1');
    return a[1] + ':' + a[2] + ':' + a[3] + '.' + a[4];
  }
  // 5:59.6
  a = result.match(/([0-5]*[0-9]):([0-5][0-9])\.([0-9]{1,3})/);
  if ( a != null) {
    console.log('match dt1\'');
    return '0:' + a[1] + ':' + a[2] + '.' + a[3];
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
  a = result.match(/\n([0-9]+):([0-5][0-9]):([0-5][0-9])\n[合計タイム|タイム]/);
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
  a = result.match(/\n([0-5][0-9]):([0-5][0-9])\n[合計タイム|タイム|時間]/);
  if ( a != null) {
    console.log('match dt4');
    return '0:' + a[1] + ':' + a[2];
  }
  // 0:49'01" LAP
  // 01:00′ 15"-
  a = [...result.matchAll(/([0-9]+):([0-5][0-9])[\'′ ]*([0-5])[ ]*([0-9])[\"\″]*/g)];
  if ( a.length > 0) {
    console.log(`match dt6 with ${a.length} patterns.`);
    for(i=0; i<a.length;i++) {
      duration = a[i][1] + ':' + a[i][2] + ':' + a[i][3] + a[i][4];
      if(duration != '0:00:00') {
        // TODO: 複数あったら返して選択してもらう。
        return duration;
      }
    }
  }
  // 01:00
  a = [...result.matchAll(/\n([0-5]{0,1}[0-9]):([0-5][0-9])\n/g)];
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
  // 90.65:00
  // タイム
  a = result.match(/([LEO0-9h][LEO0-5h])\.([LEO0-9h][LEO0-5h])[:]*([LEO0-9h][LEO0-9h])/);
  if ( a != null) {
    console.log('match dt6r');
    return rotateTimeStr(a[3]) + ':' + rotateTimeStr(a[2]) + ':' + rotateTimeStr(a[1]);
  }
  // ¹10:32 GARMINのシンプルな表示でタイムの時が左上に小さく表示される。
  a = result.replace('¹', '1:').replace('²','2:').replace('³','3:').match(/([0-9]+):([0-5][0-9]):([0-5][0-9])/);
  if ( a != null) {
    console.log('match dt5g');
    return a[1] + ':' + a[2] + ':' + a[3];
  }
  // 228:19 GARMINのシンプルな表示でタイムの時が左上に小さく表示される。上付きではなく数字として認識されるケース
  a = result.match(/([0-9])([0-5][0-9]):([0-5][0-9])/);
  if ( a != null) {
    console.log('match dt7g');
    return a[1] + ':' + a[2] + ':' + a[3];
  }
  // 1時間23分のような日本語表記のタイム
  a = result.match(/([0-5]{0,1}[0-9])時間[ ]*([0-5]{0,1}[0-9])分/);
  if ( a != null) {
    console.log('match dt8');
    return a[1] + ':' + a[2] + ':00';
  }

  return null;
}

// 95 -> 56のように回転した状態で検出された時間を元に戻す。
// 9 -> 6, 6 -> 9, L -> 1
function rotateTimeStr(src) {
  const rotate_str = 'LEO0123456789h';
  const normal_str = '13001234597864';
  var result = '';
  for( i=src.length; i>0; i--) {
    result += normal_str.charAt(rotate_str.indexOf(src.charAt(i-1)));
  }
  return result;
} 

function detectDistance(result) {
  // 6.2 マイル
  a = result.match(/([0-9]+)\.([0-9]+)[ ]*(マイル|マイア)/);
  if ( a != null) {
    console.log(`match dd8 with ${a[0]}`);
    return mile2kiro(a[1] + '.' + a[2]);
  }
  // Distance
  // 1.02km
  a = result.match(/Distance\n([0-9]+)[\.,]([0-9]+)/);
  if ( a != null) {
    console.log(`match dd9 with ${a[0]}`);
    return a[1] + '.' + a[2];
  }
  // 7.67
  // 距離(km)
  a = result.match(/([0-9]+)[\.,]([0-9]+)\n(距離|キロメートル)/);
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
  a = result.match(/([0-9]+)[\.,]([0-9]+) ([0-9]+)[ ]*km\n/);
  if ( a != null) {
    console.log(`match dd5 with ${a[0]}`);
    return a[1] + '.' + a[2] + a[3];
  }
  // 3.70km
  a = [...result.matchAll(/([0-9]+)[\.,]([0-9]+)[ ]*[kK][mM]/g)];
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
  // 0.78
  a = [...result.matchAll(/([0-9]+)\.([0-9]+)\n/g)];
  if ( a.length > 0) {
    for(i=0; i<a.length;i++) {
      distance = a[i][1] + '.' + a[i][2];
      if(distance != '0.000') {
        console.log(`match dd6 with ${a[i][0]} of ${a.length} patterns.`);
        // TODO: 複数あったら返して選択してもらう。
        return distance;
      }
    }
  }

  return null;
}

// マイルをキロに換算
function mile2kiro(num){
    return (num / 0.621371).toFixed(3);
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

function replyLineSetname(sourcename, replyToken, strMessage, name){

  var tag = replyToken.substr(0,7);
  var fillInText = '';
  fillInText += `${tag}:名前設定\n`;
  fillInText += `集計に表示される名前を入力してください。\n`;
  fillInText += `氏名\t${name}`;

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
                  'data': `${tag}:名前設定`,
                  'label': '名前を設定',
                  'displayText': '名前を設定します。',
                  "inputOption": "openKeyboard",
                  "fillInText": fillInText
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
function addResult(tag, name, groupId, distance, duration, userId) {
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
      case "userId":
        val = getListedUserId(name);
        if(val == 'unknown') {
          // TODO: 手入力で間違っている可能性もあるので、見つからない場合は運用者になんらか通知されるようにしたい。
          Logger.log(`${tag}: 入力された名前(${name})が見つかりませんでした。記録を確認し、修正してください。`);
        }
        break;
      case "note":
        val = `${getListedUserName(userId)}さんが追加しました`;
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

// 「修正」コマンドを受けて記録を修正する。
function updateResult(tag, name, distance, duration) {

  date = new Date();

  var ss = SpreadsheetApp.getActive()
  var sheet = ss.getSheetByName('Analyze Log');

  const lastRow = sheet.getLastRow();

  for (var i = lastRow; i > lastRow - 20; i--) {
    // 修正はだいたいすぐに行われるので、記録の下から20件だけ探す。
    if (sheet.getRange(i, 8).getValue() == tag) {
      var userId = sheet.getRange(i, 4).getValue();
      var orgName = getListedUserName(userId);
      if (orgName == 'unknown') {
        updateListedUserName(userId, name);
      }
      sheet.getRange(i, 5).setValue(name);
      sheet.getRange(i, 6).setValue(distance);
      sheet.getRange(i, 7).setValue(duration);
      sheet.getRange(i, 10).setValue('更新しました');
      sheet.getRange(i, 12).setValue(new Date());
      return '更新しました';
    }
  }
  return '記録がありません';

}

// 「名前設定」コマンドを受けて、名前を保存し記録を修正する。
function updateResultName(tag, name) {

  date = new Date();

  var ss = SpreadsheetApp.getActive()
  var sheet = ss.getSheetByName('Analyze Log');

  const lastRow = sheet.getLastRow();

  for (var i = lastRow; i > lastRow - 20; i--) {
    // 修正はだいたいすぐに行われるので、記録の下から20件だけ探す。
    if (sheet.getRange(i, 8).getValue() == tag) {
      var userId = sheet.getRange(i, 4).getValue();
      updateListedUserName(userId, name);
      sheet.getRange(i, 5).setValue(name);
      sheet.getRange(i, 10).setValue('名前を保存しました');
      sheet.getRange(i, 12).setValue(new Date());
      return '名前を保存しました';
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

// 登録ユーザの名前を取得
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

// 登録ユーザのIDを名前で取得
function getListedUserId(name) {

  var ss = SpreadsheetApp.getActive()
  var sheet = ss.getSheetByName('User List');

  const lastRow = sheet.getLastRow();

  for (var i = 2; i <= lastRow; i++) {
    if (sheet.getRange(i, 2).getValue() == name) {
      return sheet.getRange(i, 1).getValue();
    }
  }
  return 'unknown';

}

// 登録ユーザの名前を更新
function updateListedUserName(userId, name) {

  var ss = SpreadsheetApp.getActive()
  var sheet = ss.getSheetByName('User List');

  const lastRow = sheet.getLastRow();

  for (var i = 2; i <= lastRow; i++) {
    if (sheet.getRange(i, 1).getValue() == userId) {
      sheet.getRange(i, 2).setValue(name);
      sheet.getRange(i, 5).setValue(new Date());
      return '更新しました'
    }
  }
  return '指定のユーザが見つかりませんでした';

}

// 記録するユーザの情報をUser Listシートに追加する。
// 該当のユーザが公式アカウントをお友だちにしていない場合は名前がAPIで取得できないのと、公式記録としてユーザ名ではなく姓名を登録してもらっているため、ここではuserIdのみ登録する。
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
        val = 'unknown';
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

// 登録グループの名前を取得
function getListedGroupName(groupId) {

  var ss = SpreadsheetApp.getActive()
  var sheet = ss.getSheetByName('Group List');

  const lastRow = sheet.getLastRow();

  for (var i = 2; i <= lastRow; i++) {
    if (sheet.getRange(i, 1).getValue() == groupId) {
      return sheet.getRange(i, 2).getValue();
    }
  }
  return 'unknown';

}


// 公式アカウントが追加されたグループチャットの情報をGroup Listシートに追加する。
function recordGroup(groupId, groupName) {

  var requestObj = JSON.parse('{}');

  //  
  // groupIdをスプレッドシートに追記
  //

  var ss = SpreadsheetApp.getActive()
  var sheet = ss.getSheetByName('Group List');

  // ヘッダ行を取得
  var headers = sheet.getRange(1,1,1,sheet.getLastColumn()).getValues()[0];

  // ヘッダに対応するデータを取得
  var values = [];
  for (i in headers){
    var header = headers[i];
    var val = "";
    switch(header) {
      case "groupId":
        val = groupId;
        break;
      case "displayName":
        val = groupName;
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

function getNextPeriod() {
  // 現在時刻から集計対象の日時を返す。
  // 8:30 まで、当日の8:10を返す。
  var dt = new Date();
  if(dt.getHours() * 100 + dt.getMinutes() > 830) {
    dt.setDate(dt.getDate() +1);
  }
  dt.setHours(8);
  dt.setMinutes(10);
  dt.setSeconds(0);

  return dt;
}

// 先月末日分の集計日時を返す　
// 当月が2024年4月の場合、'2024-04-01 08:10:00' を返す
function getLastMonthPeriod(targetDate) {
  // 現在時刻から月で集計する対象範囲の開始日時を返す。
  // 月初1日は8:30 まで、前月1日の8:10を返す。
  var dt = new Date();
  if(targetDate != null) {
    dt = targetDate;
  }
  if(dt.getDate() == 1 && dt.getHours() * 100 + dt.getMinutes() < 830) {
    // ↑　８：３０が 830になる。8:30を過ぎているかの判定
    // 1日の8:10より前だったら、前の月にする。
    dt.setMonth(dt.getMonth() -1);
  }
  dt.setDate(1); // 当月ないし前月の1日
  dt.setHours(8);// の、8:10以降を集計
  dt.setMinutes(10);
  dt.setSeconds(0);

  return dt;
}

// 先月初日の集計日時を返す　
// 当月が2024年4月の場合、'2024-0３-01 08:10:00' を返す
function getLastMonthStart(targetDate) {
  // 現在時刻から先月分を集計する対象範囲の開始日時を返す。
  // 月初1日は8:30 まで、前月1日の8:10を返す。
  var dt = new Date();
  if(targetDate != null) {
    dt = targetDate;
  }
  dt.setMonth(dt.getMonth() -1);
  if(dt.getDate() == 1 && dt.getHours() * 100 + dt.getMinutes() < 830) {
    // ↑　８：３０が 830になる。8:30を過ぎているかの判定
    // 1日の8:10より前だったら、前の月にする。
    dt.setMonth(dt.getMonth() -1);
  }
  dt.setDate(1); // 当月ないし前月の1日
  dt.setHours(8);// の、8:10以降を集計
  dt.setMinutes(10);
  dt.setSeconds(0);

  return dt;
}

// グループの集計
function getSummary(groupId) {

  var ss = SpreadsheetApp.getActive()
  var sheet = ss.getSheetByName('24h Report');
  var date_from = Utilities.formatDate(getCurrentPeriod(), "JST", "yyyy-MM-dd HH:mm:ss");
  var date_to = Utilities.formatDate(getNextPeriod(), "JST", "yyyy-MM-dd HH:mm:ss");
  var result = `${date_from} から24hの集計\n`;

  // queryの条件（抽出対象期間）を更新
  sheet.getRange(1, 1).setValue(`=QUERY('Analyze Log'!A:K,"SELECT E, F, G WHERE A > datetime '${date_from}' AND A <= datetime '${date_to}' AND C = '${groupId}' AND (F is not null OR G is not null) AND K is null", -1)`);

  // queryで転写された24時間以内のラン記録を取得
  var records = sheet.getRange(1,1,sheet.getLastRow(),3).getDisplayValues();
  result += makeResultList(records);
  // 計算式で集計された合計距離・走行時間と残り距離
  var summary = sheet.getRange(1,5,3,3).getDisplayValues();
  if(summary[1][1] == '0' && summary[1][2] == '0:00:00') {
    result += '今日はまだ記録がありません。\n';
    result += `\n${getPreviousSummary(groupId)}`;
  }
  else {
    for(i = 1; i < 3; i++) {
      result += '\n' + summary[i][0] + '\t' + summary[i][1] + '\t' + summary[i][2];
    }
  }

  return result;
}

// 昨日の集計（グループ）
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
  result += makeResultList(records);
  // 計算式で集計された合計距離・走行時間と残り距離
  var summary = sheet.getRange(1,5,3,3).getDisplayValues();
  if(summary[1][1] == '0' && summary[1][2] == '0:00:00') {
    result += '記録はありません。';
  }
  else {
    for(i = 1; i < 3; i++) {
      result += '\n' + summary[i][0] + '\t' + summary[i][1] + '\t' + summary[i][2];
    }
  }

  return result;
}

// 集計結果リストを整形して返す。
// 同じランナーが２回以上走った場合は回数を（）表記して1行にする。
// 記録がない場合は、空文字列を返す。
function makeResultList(records) {
  var result = '';
  var runners = new Map();
  for(i = 1; i < records.length; i++) {
    if(runners.has(records[i][0])) {
      // 回数をカウントアップし記録を加算
      values = runners.get(records[i][0]);
      values.count++;
      var distance = Number(values.distance);
      // なぜか小数点以下がバグることがあるので合算する場合は小数点第二位にて切り詰め
      values.distance = Number(distance + Number(records[i][1])).toFixed(2);
      values.duration = timeMath.sum(values.duration, records[i][2]);
      runners.set(records[i][0], values);
    }
    else {
      // 初出はセットのみ
      // 名無しは抜き（記録がないまたは1件の場合、集計用固定セルの関係で空データが取得される）
      if(records[i][0] != '') {
        runners.set(records[i][0], { name: records[i][0], count: 1, distance: records[i][1], duration: records[i][2]});
      }
    }
  }
  // 一旦マップに集計した参加者毎の記録を結果として出力
  for (let [key, value] of runners) {
    if(value.count == 1) {
      result += `${key}\t${value.distance}\t${value.duration}\n`;
    }
    else {
      result += `${key}(${value.count})\t${value.distance}\t${value.duration}\n`;
    }
  }
  return result;
}

// 今月の集計（個人）
function getPersonalSummary(userId) {

  var ss = SpreadsheetApp.getActive()
  var sheet = ss.getSheetByName('Monthly Report');
  var date_from = Utilities.formatDate(getLastMonthPeriod(), "JST", "yyyy-MM-dd HH:mm:ss");
  var date_to = Utilities.formatDate(getNextPeriod(), "JST", "yyyy-MM-dd HH:mm:ss");
  var name = getListedUserName(userId);
  var result = `${name}さんの今月の集計です。\n`;
  
  // queryの条件（抽出対象期間）を更新
  sheet.getRange(1, 1).setValue(`=QUERY('Analyze Log'!A:K,"SELECT C, E, SUM(F), COUNT(E) WHERE A > datetime '${date_from}' AND A <= datetime '${date_to}' AND D = '${userId}' AND (F is not null OR G is not null) AND K is null group by C, E order by C desc", -1)`);

  // 計算式で集計された合計距離・走行時間と残り距離が0なら「記録なし」を表示
  // TODO: ここでタイミングによりさまざまメッセージが書けそう。

  var summary = sheet.getRange(1,6,3,3).getDisplayValues();
  if(summary[1][1] == '0.0' && summary[1][2] == '0') {
    result　= '今月はまだ記録がありません！';
  }
  else {
    result += `走った回数 ${summary[1][2]} 回\n`;
    result += `合計距離 ${summary[1][1]}　km`;

    // グループの集計・TOP3ランナーも表示
    // queryで転写された対象月の所属グループ毎ラン記録を取得
    var records = sheet.getRange(1,1,sheet.getLastRow(),4).getDisplayValues();
    // result += makeResultList(records);
    if(records[1][1] != '') {
      // グループチャットでの記録があれば、ひとまず最初のチームのみ。
      result += `\n\n`;
      result += getMonthlySummary(records[1][0]);
    }
  }
  
  return result;
}

// 今月の集計（グループ）
function getMonthlySummary(groupId) {

  var ss = SpreadsheetApp.getActive()
  var sheet = ss.getSheetByName('Monthly Report');
  var date_from = Utilities.formatDate(getLastMonthPeriod(), "JST", "yyyy-MM-dd HH:mm:ss");
  var date_to = Utilities.formatDate(getNextPeriod(), "JST", "yyyy-MM-dd HH:mm:ss");
  var result = `${getListedGroupName(groupId)} 今月の集計\n`;

  // queryの条件（抽出対象期間）を更新
  sheet.getRange(1, 1).setValue(`=QUERY('Analyze Log'!A:K,"SELECT D, E, SUM(F), COUNT(E) WHERE A > datetime '${date_from}' AND A <= datetime '${date_to}' AND C = '${groupId}' AND (F is not null OR G is not null) AND K is null group by D, E order by SUM(F) desc", -1)`);

  // 計算式で集計された合計距離・走行時間と残り距離が0なら「記録なし」を表示
  var summary = sheet.getRange(1,6,3,5).getDisplayValues();
  if(summary[1][1] == '0.0' && summary[1][2] == '0') {
    result　+= '今月はまだ記録がありません！';
  }
  else {
    result += `走ったメンバー ${summary[1][4]} 人\n`;
    result += `走った回数 ${summary[1][2]} 回\n`;
    result += `合計距離 ${summary[1][1]} km\n`;

    // queryで転写された対象月のラン記録ユーザ集計を取得しTOP3を表示
    result += `TOP3\n`;
    var records = sheet.getRange(1,1,sheet.getLastRow(),4).getDisplayValues();
    for(i = 1; i < records.length && i <= 3; i++) {
      //   runners.set(records[i][0], { name: records[i][0], count: 1, distance: records[i][1], duration: records[i][2]});
      result += `${i}) ${records[i][1]}(${records[i][3]}) ${records[i][2]} km\n`;
    }
  }

  return result;
}

// 先月の集計（個人）
function getLastMonthSummaryPersonal(userId) {

  var ss = SpreadsheetApp.getActive()
  var sheet = ss.getSheetByName('Monthly Report');
  var date_from = Utilities.formatDate(getLastMonthStart(), "JST", "yyyy-MM-dd HH:mm:ss");
  var date_to = Utilities.formatDate(getLastMonthPeriod(), "JST", "yyyy-MM-dd HH:mm:ss");
  var name = getListedUserName(userId);
  var result = `${name}さんの先月の集計です。\n`;
  
  // queryの条件（抽出対象期間）を更新
  sheet.getRange(1, 1).setValue(`=QUERY('Analyze Log'!A:K,"SELECT C, E, SUM(F), COUNT(E) WHERE A > datetime '${date_from}' AND A <= datetime '${date_to}' AND D = '${userId}' AND (F is not null OR G is not null) AND K is null group by C, E order by C desc", -1)`);

  // 計算式で集計された合計距離・走行時間と残り距離が0なら「記録なし」を表示
  // TODO: ここでタイミングによりさまざまメッセージが書けそう。

  var summary = sheet.getRange(1,6,3,3).getDisplayValues();
  if(summary[1][1] == '0.0' && summary[1][2] == '0') {
    result = '先月は記録がありません！';
  }
  else {
    result += `走った回数 ${summary[1][2]} 回\n`;
    result += `合計距離 ${summary[1][1]} km`;

    // グループの集計・TOP3ランナーも表示
    // queryで転写された対象月の所属グループ毎ラン記録を取得
    var records = sheet.getRange(1,1,sheet.getLastRow(),4).getDisplayValues();
    // result += makeResultList(records);
    if(records[1][1] != '') {
      // グループチャットでの記録があれば、ひとまず最初のチームのみ。
      result += `\n\n`;
      result += getLastMonthSummaryGroup(records[1][0]);
    }
  }
  
  return result;
}

// 先月の集計（グループ）
function getLastMonthSummaryGroup(groupId) {

  var ss = SpreadsheetApp.getActive()
  var sheet = ss.getSheetByName('Monthly Report');
  var date_from = Utilities.formatDate(getLastMonthStart(), "JST", "yyyy-MM-dd HH:mm:ss");
  var date_to = Utilities.formatDate(getLastMonthPeriod(), "JST", "yyyy-MM-dd HH:mm:ss");
  var result = `${getListedGroupName(groupId)} 先月の集計\n`;

  // queryの条件（抽出対象期間）を更新
  sheet.getRange(1, 1).setValue(`=QUERY('Analyze Log'!A:K,"SELECT D, E, SUM(F), COUNT(E) WHERE A > datetime '${date_from}' AND A <= datetime '${date_to}' AND C = '${groupId}' AND (F is not null OR G is not null) AND K is null group by D, E order by SUM(F) desc", -1)`);

  // 計算式で集計された合計距離・走行時間と残り距離が0なら「記録なし」を表示
  var summary = sheet.getRange(1,6,3,5).getDisplayValues();
  if(summary[1][1] == '0.0' && summary[1][2] == '0') {
    result += '先月は記録がありません！';
  }
  else {
    result += `走ったメンバー ${summary[1][4]} 人\n`;
    result += `走った回数 ${summary[1][2]} 回\n`;
    result += `合計距離 ${summary[1][1]} km\n`;

    // queryで転写された対象月のラン記録ユーザ集計を取得しTOP3を表示
    result += `TOP3\n`;
    var records = sheet.getRange(1,1,sheet.getLastRow(),4).getDisplayValues();
    for(i = 1; i < records.length && i <= 3; i++) {
      //   runners.set(records[i][0], { name: records[i][0], count: 1, distance: records[i][1], duration: records[i][2]});
      result += `${i}) ${records[i][1]}(${records[i][3]}) ${records[i][2]} km\n`;
    }
  }

  return result;
}

// 「修正」でリストを表示し選択させる場合の返信を作成する。
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
