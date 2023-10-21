// ローカル開発テスト用ーリポジトリに入れない。
function testResultSummary() {
  console.log(getPreviousSummary('Ce1f3f0b579b17bf4258adad2e204a377'));
  console.log(getSummary('Ce1f3f0b579b17bf4258adad2e204a377'));
}

var regx1 = `376ae70:修正
氏名	小池和明
距離	6.06
タイム	0:53:07`;

var regx2 = `376ae70:修正
氏名        小池和明
距離	6.06
タイム  0:53：07`;

var regx2_ = `376ae70:修正
氏名        小池和明
距離	6.06
タイム	0:53:07`;

var regx3 = `47a4c2e:修正
氏名	瀬崎雅史
距離	11.019
タイム	0:51：02`;


function testRegx(messageText) {
  a = messageText.match(/^([0-9a-f]{7}):修正\n氏名[\s ]*(.*)\n距離[\s ]*([0-9]+\.[0-9]+)\nタイム[\s ]*([0-9]+[:：][0-5][0-9][:：][0-5][0-9])/);
  if(a != null){
    console.log(`${a[1]}, ${a[2]}, ${a[3]}, ${a[4].replaceAll('：',':')}`)
  }
  else {
    console.log(`parse failed: \n${messageText}`);
  }
}

function testDetection() {
  testRegx(regx1);
  testRegx(regx2);
  testRegx(regx2_);
  testRegx(regx3);
}