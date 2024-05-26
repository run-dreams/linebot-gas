// https://github.com/run-dreams/linebot-gas

var CHANNEL_ACCESS_TOKEN = PropertiesService.getScriptProperties().getProperty("CHANNEL_ACCESS_TOKEN");
var GOOGLE_API_KEY = PropertiesService.getScriptProperties().getProperty("GOOGLE_API_KEY");
var HEALTH_CHECK_URL = PropertiesService.getScriptProperties().getProperty("HEALTH_CHECK_URL");

function getUsername(userId) {
  var url = 'https://api.line.me/v2/bot/profile/' + userId;
  var response;
  try {
    response = UrlFetchApp.fetch(url, {
      'headers': {
        'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN
      },
      "muteHttpExceptions" : true,
      "validateHttpsCertificates" : false,
      "followRedirects" : false
    });
    Logger.log('getUsername(' + userId + ') : ' + response);
    return JSON.parse(response.getContentText()).displayName;
  } catch(e) {
    // 例外エラー処理
    Logger.log('Error:')
    Logger.log(e)
    return 'Error（ユーザ不明）';
  }
}

function getGroupname(groupId) {
  var url = 'https://api.line.me/v2/bot/group/' + groupId + '/summary';
  var response;
  try {
    response = UrlFetchApp.fetch(url, {
      'headers': {
        'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN
      },
      "muteHttpExceptions" : true,
      "validateHttpsCertificates" : false,
      "followRedirects" : false
    });
    Logger.log('getGroupname(' + groupId + ') : ' + response);
    return JSON.parse(response.getContentText()).groupName;
  } catch(e) {
    // 例外エラー処理
    Logger.log('Error:')
    Logger.log(e)
    return 'Error（グループ不明）';
  }
}

function getContent(messageId) {
  var url = 'https://api-data.line.me/v2/bot/message/' + messageId + '/content';
  var response;
  try {
    response = UrlFetchApp.fetch(url, {
      'headers': {
        'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN
      },
      "muteHttpExceptions" : true,
      "validateHttpsCertificates" : false,
      "followRedirects" : false
    });
    Logger.log('getContent(' + messageId + ') : ' + response.getResponseCode());
    return Utilities.base64Encode(response.getBlob().getBytes());
  } catch(e) {
    // 例外エラー処理
    Logger.log('Error:')
    Logger.log(e)
    return null;
  }
}

function doPost(e) {

  Logger.log('webhook received: ' + e.postData.contents);
  recordRequest(e);

  var requestObj = JSON.parse(e.postData.contents);
  if(requestObj.events.length == 0) {
    return JSON.stringify({});
  }

  for(i=0; i < requestObj.events.length; i++) {
    var event = requestObj.events[i];
    var userId = event.source.userId;
    var type = event.source.type;
    var sourcename = '';
    var groupId = '';
    var replyTo = '';
    var username = getUsername(userId);
    if(type == 'group') {
      groupId = event.source.groupId;
      replyTo = groupId;
      sourcename = getGroupname(groupId);
    }
    else {
      replyTo = userId;
      sourcename = username;
    }
    var messageText = '';
    var replyToken = '';
    var eventType = event.type;
    switch(eventType) {
      case 'postback':
        data = event.postback.data;
        replyToken = event.replyToken;
        a = data.match(/^([0-9a-f]{7}):取り消し/);
        if(a != null){
          replyLine(sourcename, replyToken, ignoreResult(a[1]));
          break;
        }
        a = data.match(/^([0-9a-f]{7}):修正/);
        if(a != null){
          replyLine(sourcename, replyToken, '修正箇所を編集して、そのまま送信して下さい。');
          break;
        }
        a = data.match(/^([0-9a-f]{7}):追加/);
        if(a != null){
          replyLine(sourcename, replyToken, '追加する記録を編集して、そのまま送信して下さい。');
        }
        break;
      case 'message':
        var msgType = event.message.type;
        switch(msgType) {
          case 'text':
            messageText = event.message.text;
            replyToken = event.replyToken;
            if(messageText.trim().match(/^集計[\!]*/)) {
              if(type == 'group') {
                // グループチャット
                replyLine(sourcename, replyToken, getSummary(replyTo));
              }
              else {
                // 個人チャット
                replyLine(sourcename, replyToken, getPersonalSummary(replyTo));
              }
              break;
            }
            if(messageText.trim().match(/^ヘルプ/)) {
              replyLine(sourcename, replyToken, `https://www.run-dreams.com/linebothelp`);
              break;
            }
            replyToken = event.replyToken;
            if(messageText.trim().match(/^昨日の集計[\!]*/)) {
              replyLine(sourcename, replyToken, getPreviousSummary(replyTo));
              break;
            }
            if(messageText.trim().match(/^修正[\!]*/)) {
              replyUpdateResultInstruction(sourcename, replyToken, replyTo);
              break;
            }
            a = messageText.match(/^([0-9a-f]{7}):名前設定\n.*\n氏名[\s ]*(.*)/);
            if(a != null){
              // 名前設定
              replyLine(sourcename, replyToken, updateResultName(a[1], a[2]));
              break;
            }
            a = messageText.match(/^([0-9a-f]{7}):修正\n氏名[\s ]*(.*)\n距離[\s ]*([0-9]+\.[0-9]+)\nタイム[\s ]*([0-9]+[:：][0-5][0-9][:：][0-5][0-9])/);
            if(a != null){
              // 修正
              replyLine(sourcename, replyToken, updateResult(a[1], a[2], a[3], a[4].replaceAll('：',':')));
              break;
            }
            if(messageText.trim().match(/^追加[\!]*/)) {
              replyAddResultInstruction(sourcename, replyToken);
              break;
            }
            a = messageText.match(/^([0-9a-f]{7}):追加\n氏名[\s ]*(.*)\n距離[\s ]*([0-9]+\.[0-9]+)\nタイム[\s ]*([0-9]+[:：][0-5][0-9][:：][0-5][0-9])/);
            if(a != null){
              // 追加
              replyLine(sourcename, replyToken, addResult(a[1], a[2], groupId, a[3], a[4].replaceAll('：',':')),userId);
              break;
            }
            if(messageText.trim().match(/^取り消し|取消し|取消|削除|とりけし[\!]*/)) {
              replyIgnoreResultInstruction(sourcename, replyToken, replyTo);
              break;
            }
            break;
          case 'image':
            var messageId = event.message.id;
            replyToken = event.replyToken;
            // コンテンツをGETして解析、ラン画像なら返信。
            var image = getContent(messageId);
            var obj = analyzeImage(image);
            var result = obj.responses[0].textAnnotations[0].description;
            var duration = detectTime(result);
            var distance = detectDistance(result);
            var name = getListedUserName(userId);
            Logger.log('image analyzed: ' + result + String.fromCharCode(10) + 'distance: ' + distance + ', duration: ' + duration);
            recordResult(event, result, JSON.stringify(obj), distance, duration);
            if(duration != null || distance != null) {
              messageText = name + 'さん、ナイスラン！' + String.fromCharCode(10);
              messageText += '距離' + String.fromCharCode(9) + (distance != null ? distance : '??') + String.fromCharCode(10);
              messageText += 'タイム' + String.fromCharCode(9) + (duration != null ? duration : '??');
              if(duration != null && distance != null && name != 'unknown') {
                // 正常。修正の確認は不要。
                replyLine(sourcename, replyToken, messageText);
              } else　if(name == 'unknown') {
                // 名前が未設定
                replyLineSetname(sourcename, replyToken, messageText, name);
              } else {
                replyLineCorrect(sourcename, replyToken, messageText, name, duration, distance);
              }
            }
            break;
          default:
            break;
        }
      case 'join':
        replyToken = event.replyToken;
        let groupName = getListedGroupName(groupId);
        if(groupName == 'unknown') {
          recordGroup(groupId, sourcename);
        }
        let joinMessage = `Run Dreams公式アカウントを追加していただきありがとうございます！\n
このアカウントは、グループチャットに投稿されたラン画像を認識して記録を集計するお手伝いをします。\n
「ヘルプ」と入力していただくと、詳しい説明ページをご案内します。`;
        replyLine(sourcename, replyToken, joinMessage);
        Logger.log(`join to ${sourcename}(${groupId})`);
        break;
      default:
        break;
    }
  }

  return JSON.stringify({});

}

// HealthCheck用ダミーGETメソッド
function doGet() {
  return ContentService.createTextOutput(JSON.stringify({"success":true})).setMimeType(ContentService.MimeType.JSON);
}

// HealthCheck invoke by scheduled trigger
function checkSelf() {
  var url = HEALTH_CHECK_URL;
  var response;
  try {
    response = UrlFetchApp.fetch(url, {
      "muteHttpExceptions" : true,
      "validateHttpsCertificates" : false,
      "followRedirects" : true
    });
    Logger.log('checkSelf() : ' + response.getResponseCode());
    if (response.getResponseCode() != 200) {
      // お知らせ
      // sendLine(ADMIN_LINE_ID, '寝たかも。 status:' + response.getResponseCode());
    }
    return 'OK';
  } catch(e) {
    // 例外エラー処理
    Logger.log('Error:')
    Logger.log(e)
    return null;
  }
}