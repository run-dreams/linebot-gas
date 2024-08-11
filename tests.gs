var sample1 = `7:34 1
CAND
E1649
36:08
タイム
県道179号
4:43
ペース (分/km)
IC
清瀬市
マップ
大街道
7月16日 @ 06:12. ラン
デバイス
463
関越自動車道
新座市 ラン
遅く
7.67
距離(km)
254
志木街道
24
総上昇量 (m)
街道
C
全ランアクティビティを表示
新座市
通り
速く
三
422
カロリー
通り
254
朝霞市
24°
2
>
25-`;

var sample2 = `PELAR
サマリー
開始時間
O
△
9:14
O
00:55:29.3
8.05km
MH30
△`;

var sample3 = `2:21
4:36
TA
0:00
promotion
8:37
タイム
0:51:45
Running
2022/7/5 (X) 7:01
最速ペース
平均ペース
5:30/km 6:00/km
17:14
距離
8.62km
25:51
34:28 51:45
`;

var sample4 = `一乗院卍
吕公園
16
土豆
埼玉医大
総合医療センター
川越運動公園
川越聖地霊園
6:46
神社 豆
BOWLA
254
8
川越古谷局 SG
8
/km
5'00"
Microsoft Bing
6'40"
8'20"
10'00"
11'40"
2022/07/06 7 5:31 - 6:26
workout 1562
南古谷
0
天候
善仲寺 卍
ペース
文
東邦音大
8.260 km
5'56"
江法皇绿地
/km
•古谷保育園
10'01" /km
8°0.000 km
①0:00'00"
2
ピッチ
00
113
入間川
177
ラン
spm
巩
西楽園・
西大宮ゴルフガーデン
上
4
総合公園
61 5
橋ゴルフ練習場
川越グリーンクロス
指扇療養病院
+
大宮国際CC
3
cm
気温
大宮
秋葉神社
A
西遊馬公園 泰
文
© 2022 Zenrin 9 2022 Microsoft Corporation Terms
M
0:49'01" LAP
6
ストライド 心拍数
93
129
蔵野高
4
指扇
bpm
9
www
西区役所(
216
西
標高
下戸
大宮プ
-
8 km
56`;

var sample5 = `
ぷ
ランニング
水時刻 18:10
165
山形新幹線
中浦和 JR
Google RX
10
km 5.24
平均 bpm 165
商城瀚
別所
調(つき)神社 F
ペース 7'11"
ゾーンタイム (分)`;

var sample6 = `島
ll SoftBank 3G
東川口
Google
武南高林公
ラップ
ネ
ペース
5:20/km
心拍数
130
グロスタイム
0:56:37
練習履歴
2022/07/23(±) 06:54
県民健康福祉村
ときめき元気館 START
8:02
P
大会
県民健康
福祉村
FINISH
データ
タイム
0:39:03
歩数
6660
消費カロリー
406kcal
5.
スタート
グラフ
イベント
...
距離
7.32km
獲得標高 (↑)
21m
獲得標高(↓)
23m
チーム/友だち`;

var sample7 = `0
4:33
7:39
0:00
1:11
Running
2022/7/25 (A) 17:50
タイム
距離
0:07:10 1.40km
最速ペース
2:22
4:53/km5:06/km
平均ペース
3:33
4:44
7:10`;

var sample8 = `llau 4G
FINISH
Google
・田市
Lap
ŕ
2022/07/26 (Tue) 20:27
Pace
7:16/km
Activities
Time Gross
0:56:24
d
21:24
Races
447
Ukima Park
浮間公園
Data
Duration
0:56:00
Steps
8390
Calories
535 kcal
Å
Start
:
START
Graph
Shinjuku L
Distance
7.70km
ELE. gain
26m
ELE. loss
10m
122
Event Team/Friend`;

var sample9 = `3:18
6:37
0:00
Running
2022/7/29 () 8:40
26:14
タイム
距離
2:37:25 6.03km
最速ペース
平均ペース
6:46/km 26:06/km
pany pront
mont M Mw
52:28
1:18:42 1:44:56 2:37:25`

var sample10 = `6:12 1
稲荷神社 甘
氷川神社
UNICUS BOWL
/km
5'00"
6'40"
高階第二保育園
Microsoft Bing
8'20"
2022/08/02
workout 1584
10'00"
11'40"
16
13'20"
0
254
ペース
川越古谷局 S
6'45"
7.381km
善仲寺 卍
南古谷
/km
◎
文
東邦音大
江島緑地
10'13"/km
0.000km
◎ 0:00'00"
2
4:54 - 5:49
ピッチ
168
ラン
●古谷保育園
文
城北埼玉高
spm
113
5
16
mm
上
上江橋ゴルフ練習場
4
川越グリーンクロス
西遊馬公園
2
4
0:49'52"
56
cm
大宮国際CC
3
川越東高
© 2022. Zenrin, ⓒ2022 Microsoft Corporation Terms
指扇
大宮武蔵野高
文
LAP
ストライド 心拍数
86
122
塚本
56
bpm
8
6
km
心拍計測について
標高`;

var sample11 = `7:12
14:25
TA
б
0:00
Running
2022/8/12 () 18:22
タイム
0:48:16
最速ペース
12:20 km
Мими матратив
impl
8:02
24:06
16:04
ЛЕБ
3.70km
平均ペース
13:01/km
32:08 48:16`
// 最速ペースが距離になってしまった。

var sample12 = `H
■社
OWL
254
7:04
育園
川越古谷局 〒
南古谷
み野市役所 ◎
/km
5'00"
Microsoft Bing
5'50"
6'40"
2022/08/13 · 5:14 - 6:41
workout 1594
[存
7'30"
8'20"
文
東邦音大
ペース
江緑地
S
13
天候
滝保育所
12.085km
6'12"
113
文
城北埼玉高
LAP: 1
/km
1 2 3 4 5
8'52"/km
ピッチ
177
254
16
ラン
spm
上
上江橋ゴルフ練習場
⑤
川越グリーンクロス
21
ふじみ野市
56
3
川 城東高
4
指扇
大宮武蔵野高
文
西遊馬公園奉
ō 1:14'58" LAP
6
塚本 7
cm
気温
56
2022 Zenrin, 2022 Microsoft Corporation Terms
6 7 8 9 10 11 12 13 14
ストライド 心拍数
88
125
bpm
下戸緑
〒
大宮プラ
14
56
昭和
運動公園
標高`

var sample13 = `■丁目
Runkeeper™
武蔵野線
P
0.44
km
上
03:33
タイム
7丁目
グレープストーン
8:06
ペース`

var sample14 = `3:88:88887`

var sample15 = `• Y!mobile 4G
☆ 江東区 ラン
3.02
キロメートル
★ 江東区 ラン
3.01
キロメートル
S 江東区 ラン
2.97
キロメートル
マイデイ
チャレンジ
23:47
時間
ペース
総上昇量
平均心拍
時間
ペース
総上昇量
平均心拍
時間
ペース
総上昇量
平均心拍
10 68%
折りたたむ
18:34
6:09/km
147 bpm
19:04
6:20/km
144 bpm
17:23
5:51/km
148bpm
31
カレンダー ニュースフィード
○○○
詳細`

var sample16 = `DISP./ HR
LIGHT
H
#9/6
6:47 - 7:39 -
8.0 17km
00:49'46"
6' 12/km
P
START/STOP
EPSON
LAP`

var sample17 = `DISP/HR
LIGHT
S
2
9/11
6:54-7:54 -
10.009km
01:00′ 15"-
Ⓒ6'01"/km
EPSON
START/STOP
dowe
LAP`;

var sample18 = `白河
谷
35
6:55
336)
113
東中
東邦音大
文
栄華
今泉局 〒
254
/km
5'00"
Microsoft Bing
2022/09/14 K 5:48 - 6:39
workout 1615
6'40"
10'00"
11'40"
8
ペース
天候
S
6'37"
南
●
JA
14'45"/km
0.000km
8'20" ◎ 0:00'00"
-川越線
254
7.372km
元
/km
6
文
南古谷中
2
ピッチ
172
113
ラン
spm
W+V
5
パワ
4
川越グリーンクロス
0:48'52" LAP
古尾谷
2八幡神社
4
cm
気温
ml 4G
© 2022 Zenrin, © 2022 Microsoft Corporation Terms
www.
ストライド 心拍数
86
122
古谷本郷
3
F
bpm
越東高
momanuar
9
標高
km`;

var sample19 = `17:38
☆ 中央区 ラン
3.79
キロメートル
心拍
⑥
マイデイ
Body Battery
ストレスレベル
16
チャレンジ
時間
ペース
総上昇量
平均心拍
安静時
高
チャージ
+5
休息
低
31
カレンダー
折りたたむ
30:30
8:02/km
5m
125 bpm
56bpm
141bpm
消費
-24
引
1h 44分
14分
ニュースフィード
引
引
訓
〇〇〇
詳細`;

var sample20 = `■ll au
<概要
16:56
9月19日 (月)
屋外ウォーキング
2.02KM
15:56-16:23
距離
2.02KM
概要
さいたま市南区
ワークアウトの詳細 さらに表示
ワークアウト時間
0:26:12
アクティブキロカロリー
101KCAL
合計キロカロリー
130KCAL
S
82%
共有`;

var sample21 = `ON/OFF
ACT./PWR.
DISP.
רופאי
EPSON
88
☎ 10/13
8:58 - 10:00
10.008 km
00:58'44″
5'52"/km
MODE
START/STOP
WORKOUT
LAP/MENU
MENU CONN`;

var sample22 = `ON/OFF
LIGHT
EPSON
89
10/17
9:25 - 9:47
4.023km
00:2143"-
5'23"/km
START/STOP
MODE
AP/MENU
MENU`;

var sample23 = `THRE
EPSON
8
!!
10/16
4:49-6:01 -
12.0 13km
01:073 1"-
537/km
START/STOP
MODE
WORKOUT
LAP/MENU
MENU CON`;

var sample24 = `0.78
5:59.6
7:40/km
GARMIN
00000000
BACK`;

var sample25 = `DISP
EPSON
START/STOP
MODE
11/ 2
13:43 - 14:39
9 10.0 12km
00:52'23"
5′13″/km
WORKOUT
LAP/MENU
MENU C`;

var sample26 = `DISP
THALT
EPSON
START/STO
MODE
10/22
13:35-14:38 -
9 11.0 13km
..90.65:00 (
522/km
WORKOUT
LAP/MENU
MENU CON`;

var sample27 = `ACT./PWR.
DISP.
410/NO
LIGH
masled
EPSON
10/12
MODE
START/STOP
60:SL - ES EL
13.009km
.LL.80:10
5′14″/km
WORKOUT
LAP/MENU
MENU/CONN`;

var sample28 = `距離
5.48
版
¹10:32
GARMIN
1118
orgar
沙
J`;

var sample29 = `2:11'25
19.7
1 Lap
SUUNTO
LIGHT LOCK`;

var sample30 = `22:34
← 現在
さいたま
music
さいたま市役所 【
サ
別所沼公園
裏門通り
1
志木街道
Google
ランニング
LINE
マンガ
5.04
距離 (km)
40
中山道
平均ペース
平均速度
※
17
埼玉県庁
00:24:39
時間
うらわ美術館
20
ランキングで自分の順位を確認
191
坂下通り
16
311
カロリー
89%
埼玉会館
463
さいたま地方裁判所
旧中山道
04:53 min/km
12.3km毎時`;

var sample31 = `距離
12.21
外
228:19
GARMIN`;

var sample32 = `DISP
LIGHT
EPSON
START/STOP
MODE
11/24
13:40-14:45
8 11.009km
..LE.85:00 ✪
5'19"/km
WORKOUT
LAP/MENU
MENU CONN`;

var sample33 = `THENT
EPSON
11/25
9:12-10:21
START/STO
MODE
12.026km
..LE.LOLO →
5'06"/km
WORKOUT
LAP/MENU
MENU CO
****`;

var sample34 = `irk
STRAVA
No.298 Line
YAGUCHI
TOGASAKI
ランニ
a
Tokyogaikan Expwy
Mizumotn Park
6.2 マイル
SHINWA
Misato
Kendou No.5 Line
SHINMATSUDO
KOGASAKI
Eighty One GC
SAKAECHO
山
OYAGE
ⓘ
ΚΟΥΑ
ベース
"AGEム
NEMOTO
12:24 / マイル 1時間17分
朝の LSD。 10㌔走り
ました。`;

var sample35 = `O
STRAVA
ACHIJO
O
DONIWA
HIKONARI
NAKAZONE
Yashio
OZE
GAKE
Tokyogaikan Expwy
TOGASAKI
DOJO
Joban Expwy
Misato
KI
Nagareyama
City Sports Park
OYAGUCHI
^*
ランニング
ペース
Mizumoto
12.4 マイア Doto Park 11:11 マイル
KODE
21-seikinomori
Square
Motoudo
ASAH
タイム
2時間 19分
GC
MAT`;

var sample36 = `10:46
←
荒川
4:41
ペース (分/km)
18:48
時間
Google
浦和区 ラン
デバイス
10
L!!!
S5
「
4.01
距離(km)
遅い
全ランアクティビティを表示
さいた。市
○
G
22
総上昇量 (m)
※4 77%
速い
246
fenix 7X Sapphire DUAL POWER
10.46
カロリー
M
6°
4
000`;

var sample37 = `DISP./ HR
元
LIGHT
肉 7/3
6:40 - 7:31.
START/STOP
EPSON
7.03 1kTY
00:4 105"
5'50”/k/
V
-
LAP`;

var sample38 = `DISP./ HR
LIGHT
US
6/5
7:03 - 7:43
START/STOP
6.0 19 km
..65.hE:00
Ⓒ5'48"/km
EPSON
C
LAP`;

var sample39 = `百谷
6:25
概要
南古谷 JR
ナルド
Google
統計
16
川越市 ラン
7.54km
距離
131 bpm
平均心拍
45:45
合計タイム
10月20日 @ 05:29
いかがでしたか?
遅い
B
川越グリ
クロス 【PGM]
ラン
ラップ数
一番最初に「いいね!｣しましょう
グラフ
16
速い
埼京線
ta
6:04/km
平均ペース
461
合計カロリー
• 4G 88
rf
15°
...
H
ギア
155
メモの追加`;

var sample40 = `レク
-ack
14:13
<
概要
BU
Google
距離
統計
147 bpm
平均心拍
いかがでしたか?
1:12:17
合計タイム
11,37km
ORANJEZICHT
自己評価
トレイルラン
ラップ数
ディア・フェンス
テール・ドレイル
India Venster Trail
遅い
X 12月30日 @ 07:44
□
Table mountain trail and tar run
B
一番最初に「いいね!」しましょう
グラフ
●
速い
6:22/km
平均ペース
874
合計カロリー
凸
□
24°
ギア
メモの追加
ヘルプ`;

var sample41 = `18:53
<
概要
M6
GoogleOINT
SEA
5,01
距離
統計
M61
168bpm
平均心拍
x 1月4日 @ 18:08
21:59
合計タイム
いかがでしたか?
V&A ウォーターフロント
V&A Waterfront
MOUILLE POINT
km
ラン
遅い
ラップ数
Cape Town promenade Run
●●
AI
グラフ
一番最初に「いいね!｣しましょう
20
速い
4:24/km
平均ペース
339
合計カロリー
ml 5G 58
ロ
ギア
1 Cabo E
32°
メモの追加
9`;

var sample42 = `18:54 1
<
cistown CSTART e of
TechniFINISH nd...
Google
Lap
>>.
2024/03/03(Sun) 18:41
Jula Road
Avg. Speed
5.70km/h
Time Gross
Activities
0:10:45
P
Races
Data
Duration
0:10:43
Steps
1270
Calories
70 kcal
HOME
Dr
Event
100
Graph
Kazu
Distance
1.02km
ELE. gain
Om
ELE. loss
2m
Team/Friend
`

var sample43 = `ランニング
56'30.2
8.01 km
07'03/km
SUUNTO`;

function newTest() {
  var result = '';
  result += detectTest('sample43', sample43, '0:56:30.2', '8.01'); // SUUNTO
  result += detectTest('sample2', sample2, '00:55:29.3', '8.05');  
 
  console.log(`results: ${result}`);
}

function myTest() {
  var result = '';
  result += detectTest('sample1', sample1, '0:36:08', '7.67');  
  result += detectTest('sample2', sample2, '00:55:29.3', '8.05');  
  result += detectTest('sample3', sample3, '0:51:45', '8.62');  
  result += detectTest('sample4', sample4, '0:49:01', '8.260');  
  result += detectTest('sample5', sample5, null, '5.24');  
  result += detectTest('sample6', sample6, '0:39:03', '7.32');  // TATTA グロスタイムとタイムあり
  result += detectTest('sample7', sample7, '0:07:10', '1.40');  // TATTA Share画像でタイムと距離が同一行で検出、距離の先頭１文字がタイムの末尾に切り出されてしまった
  result += detectTest('sample8', sample8, '0:56:00', '7.70');  // TATTA グロスタイムとタイムあり（英語表示）
  result += detectTest('sample9', sample9, '2:37:25', '6.03');  // TATTA Share コンパクト表示
  result += detectTest('sample10', sample10, '0:49:52', '7.381'); //  
  result += detectTest('sample11', sample11, '0:48:16', '3.70'); // 2022/8/13 
  result += detectTest('sample12', sample12, '1:14:58', '12.085'); // タイムが取れず。 2022/8/13 ō 1:14'58" LAP
  result += detectTest('sample13', sample13, '0:03:33', '0.44'); // Run Keeper 日本語表示
  result += detectTest('sample14', sample14, null, null); // Tシャツにプリントされたデジタルの日時
  result += detectTest('sample15', sample15, '0:23:47', '3.02'); // 3ラン同時
  result += detectTest('sample16', sample16, '00:49:46', '8.017'); // EPSON 01が0.1になる問題
  result += detectTest('sample17', sample17, '01:00:15', '10.009'); // EPSON 01が0.1になる問題　タイムでも発生
  result += detectTest('sample18', sample18, '0:48:52', '7.372'); // LAP表示で複数マッチする問題
  result += detectTest('sample19', sample19, '0:30:30', '3.79'); // Garmin Connect
  result += detectTest('sample20', sample20, '0:26:12', '2.02'); // iOS標準アプリ：フィットネス
  result += detectTest('sample21', sample21, '00:58:44', '10.008'); // EPSON
  result += detectTest('sample22', sample22, '00:21:43', '4.023'); // EPSON
  result += detectTest('sample23', sample23, '01:07:31', '12.013'); // EPSON
  result += detectTest('sample24', sample24, '0:5:59.6', '0.78'); // GARMIN
  result += detectTest('sample25', sample25, '00:52:23', '10.012'); // EPSON
  result += detectTest('sample26', sample26, '00:59:06', '11.013'); // EPSON タイムが180°回転して検出
  result += detectTest('sample27', sample27, '01:08:11', '13.009'); // EPSON タイムが180°回転して検出
  result += detectTest('sample28', sample28, '1:10:32', '5.48'); // シンプルなGARMIN
  result += detectTest('sample29', sample29, '2:11:25', '19.7'); // 秒の後ろに記号なし
  result += detectTest('sample30', sample30, '00:24:39', '5.04'); // km毎時ってのが認識された
  result += detectTest('sample31', sample31, '2:28:19', '12.21'); // 上付き２でなくて２になってた。
  result += detectTest('sample32', sample32, '00:58:31', '11.009'); // LE → 37
  result += detectTest('sample33', sample33, '01:01:31', '12.026'); // LO → 01
  result += detectTest('sample34', sample34, '1:17:00', '9.978'); // マイル、時分
  result += detectTest('sample35', sample35, '2:19:00', '19.956'); // マイル、時分
  result += detectTest('sample36', sample36, '0:18:48', '4.01'); // 改行して「時間」ラベル
  result += detectTest('sample37', sample37, '0:41:05', '7.03'); 
  result += detectTest('sample38', sample38, '00:34:59', '6.019'); // h → 4
  result += detectTest('sample39', sample39, '0:45:45', '7.54'); // 改行して「合計タイム」ラベル
  result += detectTest('sample40', sample40, '1:12:17', '11.37'); // 距離km以下がカンマ区切り
  result += detectTest('sample41', sample41, '0:21:59', '5.01'); // ↑の追加パターン
  result += detectTest('sample42', sample42, '0:10:43', '1.02'); // TATTA English
  result += detectTest('sample43', sample43, '0:56:30.2', '8.01'); // SUUNTO

  console.log(`results: ${result}`);
}

function detectTest(name, result, duration, distance) {
  dt = detectTime(result);
  dd = detectDistance(result);
  console.log(name + ': ' + dd + ', ' + dt + ' result: ' + (dd == distance && dt == duration ? 'OK' : 'NG'));

  return (dd == distance && dt == duration ? 'o' : 'x');
}

// getLastMonthPeriod() のテスト
function testLastMonthPeriod() {
  console.log(getLastMonthPeriod(null));
  var dt = new Date();
  dt.setHours(6);
  console.log(getLastMonthPeriod(dt));
  dt.setDate(1);
  dt.setHours(6);
  console.log(getLastMonthPeriod(dt));
}

// getLastMonthStart() のテスト
function testLastMonthStart() {
  console.log(`${getLastMonthStart(null)}`);
  console.log('月ナカ夕方');
  let dt = new Date();
  dt.setMonth(3);
  dt.setDate(10);
  dt.setHours(17);
  console.log(dt);
  console.log(getLastMonthStart(dt));
  console.log('月初日の早い時間');
  dt = new Date();
  dt.setMonth(3);
  dt.setDate(1);
  dt.setHours(6);
  console.log(dt);
  console.log(getLastMonthStart(dt));
}

// getPersonalSummary() のテスト
function testPersonalSummary() {
  console.log(getPersonalSummary("user-Id-in-the-sheet-for-development"));
}

// getLastMonthSummaryPersonal() のテスト
function testLastMonthlySummaryPersonal() {
  console.log(getLastMonthSummaryPersonal("user-Id-in-the-sheet-for-development"));
}
// getLastMonthSummaryGroup() のテスト
function testLastMonthlySummaryGroup() {
  console.log(getLastMonthSummaryGroup("group-Id-in-the-sheet-for-development"));
}

// getMonthlySummary() のテスト
function testMonthlySummary() {
  console.log(getMonthlySummary("group-Id-in-the-sheet-for-development", "user-Id-in-the-sheet-for-development"));
}

// getSummary() のテスト
function testGetSummary() {
  console.log(getSummary('group-Id-in-the-sheet-for-development'));
}

// getPreviousSummary() のテスト
function testGetPreviousSummary() {
  console.log(getPreviousSummary('group-Id-in-the-sheet-for-development'));
}

// getCurrentPeriod() のテスト
function testGetCurrentPeriod() {
  var today = new Date();
  console.log(`today, just now: ${today}`);
  console.log(getCurrentPeriod('group-Id-in-the-sheet-for-development', today));

  today.setHours(6);
  console.log(`today, early time: ${today}`);
  console.log(getCurrentPeriod('group-Id-in-the-sheet-for-development', today));

  var yesterday = new Date();
  yesterday.setDate(today.getDate()-1);
  console.log(`yesterday: ${yesterday}`);
  console.log(getCurrentPeriod('group-Id-in-the-sheet-for-development', yesterday));
}

// getNextPeriod() のテスト
function testGetNextPeriod() {
  var today = new Date();
  console.log(today);
  console.log(getNextPeriod('group-Id-in-the-sheet-for-development', today));
  var yesterday = new Date();
  yesterday.setDate(today.getDate()-1);
  console.log(yesterday);
  console.log(getNextPeriod('group-Id-in-the-sheet-for-development', yesterday));
}

// getOuterSummary() のテスト
function testGetOuterSummary() {
  var today = new Date();
  console.log(getOuterSummary('group-Id-in-the-sheet-for-development', today));
  var yesterday = new Date();
  yesterday.setDate(today.getDate()-1);
  console.log(yesterday);
  console.log(getOuterSummary('group-Id-in-the-sheet-for-development', yesterday));
}

// addResult() のテスト
function testAddResult() {
  console.log(addResult("tag", "浦和うなこ", "group-Id-in-the-sheet-for-development", "10.02", "1:23:45", "", "",  "user-Id-in-the-sheet-for-development"));
  console.log(addResult("tag", "浦和うなこ", "group-Id-in-the-sheet-for-development", "10.02", "", "6", "別所沼公園",  "user-Id-in-the-sheet-for-development"));
}

// 記録表の写メか判定する。
const sheetSample1 = `周回 あと
ラップ
Run Dreams 第1233日目2O24年7月6日(土)天気
トータル
備考
距離
1
46
5 分32秒
時間 5分32秒
651.0`;

const sheetSample2 = `Run Dreams 第/Z32日目2024年7月5日(金)天气孔
気温 18℃ 湿度 73%
代表: 渋沢昭德
周回
あと
ラップ
1
46
5分/秒`;

function testDetectSheet() {
  console.log(detectSheet(sample1));
  console.log(detectSheet(sheetSample1));
  // 付加情報が読み取れなかった場合
  console.log(detectSheet(sheetSample2));
}

function testSubmitParticipants() {
  // テスト用のparticipantsリストを生成
  var participants = [
    {name: "山田 太郎", laps: 5},
    {name: "浦和うなこ", laps: 1},
    {name: "田中 花子", laps: 3},
    {name: "鈴木 一郎", laps: 7}
  ];

  // submitParticipants関数を呼び出してテスト
  var result = submitParticipants("group-Id-in-the-sheet-for-development", participants);
  console.log(result);
}

// 記録フォームに表示する参加者候補リストを作成
function testGetParticipantsFromSheet() {
  console.log(getParticipantsFromSheet('group-Id-in-the-sheet-for-development'));
}

// リレーの集計
function testgetRelaySummary() {
  var today = new Date();
  console.log(getRelaySummary('group-Id-in-the-sheet-for-development', today));
  var yesterday = new Date();
  yesterday.setDate(today.getDate()-1);
  console.log(yesterday);
  console.log(getRelaySummary('group-Id-in-the-sheet-for-development', yesterday));
}

// 指定の日時のリレー記録を取り消す
function testCancelRelayRecordWithinPeriod() {
  var targetDate = new Date("2024/07/23 12:34:56");
  cancelRelayRecordWithinPeriod('group-Id-in-the-sheet-for-development', targetDate);
}

// 開催中のイベントを取得する
function testGetLatestEventInfo() {
  var targetDate = new Date("2024/08/04 12:34:56");
  console.log(getLatestEventInfo('group-Id-in-the-sheet-for-development', targetDate));
}

// 特定イベントの情報を取得する
function testGetEventInfo() {
  console.log(getEventInfo('group-Id-in-the-sheet-for-development', 'event-Id-in-the-sheet-for-development'));
}

// 特定イベントの参加状況を取得する
function testGetEventAttendInfo() {
  console.log(getEventAttendInfo('event-Id-in-the-sheet-for-development', 'user-Id-in-the-sheet-for-development'));
}

// 開催中のイベント参加状況を取得する
function testGetEventSummaryPersonal() {
  var targetDate = new Date("2024/08/04 12:34:56");
  console.log(getEventSummaryPersonal('group-Id-in-the-sheet-for-development', 'user-Id-in-the-sheet-for-development', targetDate));
}

// 特定イベントの参加者を取得する
function testGetEventAttendies() {
  console.log(getEventAttendies('event-Id-in-the-sheet-for-development'));
}

// 特定イベントの集計を取得する
function testGetEventSummary() {
  console.log(getEventSummary('group-Id-in-the-sheet-for-development', 'event-Id-in-the-sheet-for-development'));
}

// 特定イベントの集計を取得する（参加者リスト付き）
function testGetEventDetail() {
  console.log(getEventSummary('group-Id-in-the-sheet-for-development', 'event-Id-in-the-sheet-for-development', true));
}

// 「イベント」
function testGetEvent() {
  console.log(getEvent('group-Id-in-the-sheet-for-development'));
}
