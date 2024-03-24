var OPENAI_API_KEY = PropertiesService.getScriptProperties().getProperty("OPENAI_API_KEY");

var prompt = `以下は、画像からGoogle Cloud Visionで抽出されたテキストで、スマホアプリのスクリーンショットやランニングウォッチの表示をスマホで撮影したものになります。
このテキストの中から、走った距離と時間を抽出してください。
json形式で、distanceとdurationという値を返してください。
距離は数値を文字列で返してください。kmは不要です。
距離がマイルで検出された場合はkmに換算してください。
タイムは、日本語であっても０：００：００形式にしてください。分秒で時がない場合もです。
スマホのスクリーンショットはOSの時計表示が先頭に入ることもあり、注意が必要です。
距離やタイムに関連するラベルが近くに配置されていることも目印になります。
タイムの時分秒のうち、時が上付数字（¹）で認識される分とつながって見えるケースがあります。

`;

// ChatGPTにプロンプトとOCRされたテキストを与えて距離とタイムを取得
function detectTimeAndDistanceByGPT(text) {
  //ChatGPTのAPIのエンドポイントを設定
  const apiUrl = 'https://api.openai.com/v1/chat/completions';
  //ChatGPTに投げるメッセージを定義(ユーザーロールの投稿文のみ)
  const messages = [{'role': 'user', 'content': prompt + text}];
  //OpenAIのAPIリクエストに必要なヘッダー情報を設定
  const headers = {
    'Authorization':'Bearer '+ OPENAI_API_KEY,
    'Content-type': 'application/json',
    'X-Slack-No-Retry': 1
  };
  //ChatGPTモデルやトークン上限、プロンプトをオプションに設定
  const options = {
    'muteHttpExceptions' : true,
    'headers': headers, 
    'method': 'POST',
    'payload': JSON.stringify({
      //'model': 'gpt-3.5-turbo',
      'model': 'gpt-4',
      'max_tokens' : 1024,
      'temperature' : 0.9,
      'messages': messages})
  };
  //OpenAIのChatGPTにAPIリクエストを送り、結果を変数に格納
  const response = JSON.parse(UrlFetchApp.fetch(apiUrl, options).getContentText());
  //ChatGPTのAPIレスポンスをログ出力(for debug)
  // console.log(response);
  // console.log(response.choices[0].message);
  // console.log(response.choices[0].message.content);
  return response.choices[0].message.content;
}

function newTestGpt() {
  var result = '';
  result += detectTestGpt('sample1', sample1, '0:36:08', '7.67');  
  // result += detectTestGpt('sample14', sample14, null, null); // Tシャツにプリントされたデジタルの日時
  result += detectTestGpt('sample32', sample32, '00:58:31', '11.009'); // LE → 37
 
  console.log(`results: ${result}`);
}

function myTestGpt() {
  var result = '';
  result += detectTestGpt('sample1', sample1, '0:36:08', '7.67');  
  result += detectTestGpt('sample2', sample2, '00:55:29.3', '8.05');  
  result += detectTestGpt('sample3', sample3, '0:51:45', '8.62');  
  result += detectTestGpt('sample4', sample4, '0:49:01', '8.260');  
  result += detectTestGpt('sample5', sample5, null, '5.24');  
  result += detectTestGpt('sample6', sample6, '0:39:03', '7.32');  // TATTA グロスタイムとタイムあり
  result += detectTestGpt('sample7', sample7, '0:07:10', '1.40');  // TATTA Share画像でタイムと距離が同一行で検出、距離の先頭１文字がタイムの末尾に切り出されてしまった
  result += detectTestGpt('sample8', sample8, '0:56:00', '7.70');  // TATTA グロスタイムとタイムあり（英語表示）
  result += detectTestGpt('sample9', sample9, '2:37:25', '6.03');  // TATTA Share コンパクト表示
  result += detectTestGpt('sample10', sample10, '0:49:52', '7.381'); //  
  result += detectTestGpt('sample11', sample11, '0:48:16', '3.70'); // 2022/8/13 
  result += detectTestGpt('sample12', sample12, '1:14:58', '12.085'); // タイムが取れず。 2022/8/13 ō 1:14'58" LAP
  result += detectTestGpt('sample13', sample13, '0:03:33', '0.44'); // Run Keeper 日本語表示
  result += detectTestGpt('sample14', sample14, null, null); // Tシャツにプリントされたデジタルの日時
  result += detectTestGpt('sample15', sample15, '0:23:47', '3.02'); // 3ラン同時
  result += detectTestGpt('sample16', sample16, '00:49:46', '8.017'); // EPSON 01が0.1になる問題
  result += detectTestGpt('sample17', sample17, '01:00:15', '10.009'); // EPSON 01が0.1になる問題　タイムでも発生
  result += detectTestGpt('sample18', sample18, '0:48:52', '7.372'); // LAP表示で複数マッチする問題
  result += detectTestGpt('sample19', sample19, '0:30:30', '3.79'); // Garmin Connect
  result += detectTestGpt('sample20', sample20, '0:26:12', '2.02'); // iOS標準アプリ：フィットネス
  result += detectTestGpt('sample21', sample21, '00:58:44', '10.008'); // EPSON
  result += detectTestGpt('sample22', sample22, '00:21:43', '4.023'); // EPSON
  result += detectTestGpt('sample23', sample23, '01:07:31', '12.013'); // EPSON
  result += detectTestGpt('sample24', sample24, '0:5:59.6', '0.78'); // GARMIN
  result += detectTestGpt('sample25', sample25, '00:52:23', '10.012'); // EPSON
  result += detectTestGpt('sample26', sample26, '00:59:06', '11.013'); // EPSON タイムが180°回転して検出
  result += detectTestGpt('sample27', sample27, '01:08:11', '13.009'); // EPSON タイムが180°回転して検出
  result += detectTestGpt('sample28', sample28, '1:10:32', '5.48'); // シンプルなGARMIN
  result += detectTestGpt('sample29', sample29, '2:11:25', '19.7'); // 秒の後ろに記号なし
  result += detectTestGpt('sample30', sample30, '00:24:39', '5.04'); // km毎時ってのが認識された
  result += detectTestGpt('sample31', sample31, '2:28:19', '12.21'); // 上付き２でなくて２になってた。
  result += detectTestGpt('sample32', sample32, '00:58:31', '11.009'); // LE → 37
  result += detectTestGpt('sample33', sample33, '01:01:31', '12.026'); // LO → 01
  result += detectTestGpt('sample34', sample34, '1:17:00', '9.978'); // マイル、時分
  result += detectTestGpt('sample35', sample35, '2:19:00', '19.956'); // マイル、時分
  result += detectTestGpt('sample36', sample36, '0:18:48', '4.01');　// 改行して「時間」ラベル
  result += detectTestGpt('sample37', sample37, '0:41:05', '7.03'); 
  result += detectTestGpt('sample38', sample38, '00:34:59', '6.019'); // h → 4
  result += detectTestGpt('sample39', sample39, '0:45:45', '7.54');　// 改行して「合計タイム」ラベル
  result += detectTestGpt('sample40', sample40, '1:12:17', '11.37'); // 距離km以下がカンマ区切り
  result += detectTestGpt('sample41', sample41, '0:21:59', '5.01'); // ↑の追加パターン
  result += detectTestGpt('sample42', sample42, '0:10:43', '1.02'); // TATTA English

  console.log(`results: ${result}`);
}

function detectTestGpt(name, result, duration, distance) {
  analized = detectTimeAndDistanceByGPT(result);
  try{
    td = JSON.parse(analized);
    dt = td.duration;
    dd = td.distance;
    console.log(name + ': ' + dd + ', ' + dt + ' result: ' + (dd == distance && dt == duration ? 'OK' : 'NG'));
    return (dd == distance && dt == duration ? 'o' : 'x');
  }
  catch{
    console.log(name + ': ' + analized + ' result: NG');
    return ('x');
  }
}

