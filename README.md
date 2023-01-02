# linebot-gas
Run Recorder Bot for LINE

![Run Dreams 公式アカウント：LINEグループでラン＆ウォーク](https://user-images.githubusercontent.com/16116126/203074517-ca6aa100-d7d1-427c-a695-ea272f55f16a.png)

ラン画像をLINEグループに投稿すると、距離とタイムを検出してスプレッドシートに記録するLINE公式アカウントです。
Google SpreadsheetのGASプロジェクトで、画像認識は Google Cloud Vision AIを使っています。

## 必要なもの
 - LINE Developer Account
 - Google Cloud Project
 - Google Account

## セットアップ

本リポジトリのスクリプトを含むテンプレートとなるSpreadsheetを用意しています。

> https://docs.google.com/spreadsheets/d/1yY4HBKDfqjXx_NxjVTRgzWYHXwuKS1cWMq8VIXeAHcI/edit?usp=share_link

こちらをコピーして利用ください。

1. LINE Developerアカウントを使って、チャンネルと公式アカウントを作成したら、アプリケーションキーを取得する。
2. Google Cloud Projectを作成し、キーを用意する。
3. spreadsheetの拡張機能＞Apps Scriptを開き、Webアプリとしてデプロイする。
4. 発行されたUrlを、1.のWebhookに設定する。
5. 1.の公式アカウントにラン画像を送信し、動作を確認する。



