# 修復生態学研究室運用マニュアル

## お知らせの更新方法
1. [ウェブサイト運営用のスプレッドシート](https://docs.google.com/spreadsheets/d/1tS9IKv0vphga9-MnUEzLFCuB2I32s1yiG2e2XE4pjQk/edit#gid=1104182054)にアクセスし、「お知らせ」タブを開く。
2. ニュース一覧の一番上に行を追加し、日付、ニュースを記載する
3. 「News」タブを開き、英語の記事も同様に更新する
4. ウェブサイトを開き、リロードしてニュースが更新されていることを確認する。

## 研究室紹介、研究内容、研究プロジェクト、リンクの更新方法
1. 以下クリックし、編集したいファイルを開く。
【日本語】
- [研究室紹介](https://github.com/reika0717/toda_labo/blob/master/intro.md)
- [研究内容](https://github.com/reika0717/toda_labo/blob/master/study.md)
- [研究内容-水圏生態系の研究](https://github.com/reika0717/toda_labo/blob/master/studies/study-ocean.md)
- [研究内容-人間活動による環境負荷軽減に向けての研究](https://github.com/reika0717/toda_labo/blob/master/studies/study-waste.md)
- [研究内容-循環型社会形成に関する基盤研究](https://github.com/reika0717/toda_labo/blob/master/studies/study-recycle.md)
- [現在のプロジェクト](https://github.com/reika0717/toda_labo/blob/master/project.md) 
- [現在のプロジェクト-水草バイオマスの持続可能な収穫と利活用による湖沼生態系保全技術の確立](https://github.com/reika0717/toda_labo/blob/master/project-biwa.md)
- [現在のプロジェクト-長崎県新上五島町における磯焼け対策実証実験](https://github.com/reika0717/toda_labo/blob/master/project-goto.md)
- [過去のプロジェクト](https://github.com/reika0717/toda_labo/blob/master/pastprojects.md) 
- [リンク](https://github.com/reika0717/toda_labo/blob/master/links.md)

【英語】
- [研究室紹介](https://github.com/reika0717/toda_labo/blob/master/en/intro.md)
- [研究内容](https://github.com/reika0717/toda_labo/blob/master/en/study.md)
- [研究内容-水圏生態系の研究](https://github.com/reika0717/toda_labo/blob/master/en/studies/study-ocean.md)
- [研究内容-人間活動による環境負荷軽減に向けての研究](https://github.com/reika0717/toda_labo/blob/master/en/studies/study-waste.md)
- [研究内容-循環型社会形成に関する基盤研究](https://github.com/reika0717/toda_labo/blob/master/en/studies/study-recycle.md)
- [現在のプロジェクト](https://github.com/reika0717/toda_labo/blob/master/en/project.md) 
- [現在のプロジェクト-水草バイオマスの持続可能な収穫と利活用による湖沼生態系保全技術の確立](https://github.com/reika0717/toda_labo/blob/master/en/project-biwa.md)
- [現在のプロジェクト-長崎県新上五島町における磯焼け対策実証実験](https://github.com/reika0717/toda_labo/blob/master/en/project-goto.md)
- [過去のプロジェクト](https://github.com/reika0717/toda_labo/blob/master/en/pastprojects.md) 
- [リンク](https://github.com/reika0717/toda_labo/blob/master/en/links.md)

2. 右上のpenのアイコンをクリックし、マークダウン記法で編集する。

**画像を挿入する場合**
- (こちら)[https://github.com/reika0717/toda_labo/tree/master/assets/images]にアクセス後、Upload fileボタンをクリックし挿入したい画像をアップロードする。
- 挿入したいところに次のコードを記載する。 
```{% include image.html url="assets/images/image_name.jpg"%}``` 
<br>（ `image_name` の部分をアップロードした画像の名前に変える)

**キャプション付き画像を挿入する場合**

画像アップロード後、次のコードを記載する。 ```{% include image.html url="./assets/images/image_name.jpg" description="画像キャプション" %}```
<br>（ `image_name` の部分をアップロードした画像の名前に、 `画像キャプション` をキャプション名に変える)

**幅指定の画像を挿入する場合**

```{% include image.html url="./assets/images/image_name.jpg" style="width: 300px;"%}```
<br>（ `image_name` の部分をアップロードした画像の名前に、 `300` の部分を指定したい横幅に変える)

**複数の画像を横並びで挿入する場合**

```
<div class="multiple_figure_wrapper">
{% include image.html url="./assets/images/image_1.jpg" %}
{% include image.html url="./assets/images/image_2.jpg" %}
</div>
```
（ `image_1`、`image_2` の部分をアップロードした画像の名前に変える)

**例) 300px、キャプション付き画像を横並びで表示する**

```
<div class="multiple_figure_wrapper">
{% include image.html url="./assets/images/image_1.jpg" description="画像キャプション１" wrapper_style="width: 200px;" %}
{% include image.html url="./assets/images/image_2.jpg" description="画像キャプション2" wrapper_style="width: 200px;" %}
</div>
```
（ `image_1`、`image_2` の部分をアップロードした画像の名前に、 `画像キャプション` をキャプション名に、 `200` の部分を指定したい横幅に変える)

## 研究業績更新方法
1. [ウェブサイト運営用のスプレッドシート](https://docs.google.com/spreadsheets/d/1tS9IKv0vphga9-MnUEzLFCuB2I32s1yiG2e2XE4pjQk/edit#gid=0)にアクセスし、「学術論文」、「国際会議」、「国内学会」タブを編集する
2. ウェブサイトを開き、リロードして更新されていることを確認する。

## 研究室メンバー、卒業生の更新方法
1. [ウェブサイト運営用のスプレッドシート](https://docs.google.com/spreadsheets/d/1tS9IKv0vphga9-MnUEzLFCuB2I32s1yiG2e2XE4pjQk/edit#gid=1945290017)にアクセスし、「研究室メンバー」、「OB・OG」タブを編集する。
2. [メンバー画像アップロード用ページ](https://github.com/reika0717/toda_labo/tree/master/assets/images/members)にアクセスし、1でスプレッドシートの画像タイトルカラムに追加した名前と同じファイル名の画像データをアップロードする。
4. ウェブサイトを開き、リロードして更新されていることを確認する。

## 研究室メンバースプレッドシートのカラム名を変えたい場合
1. [ウェブサイト運営用のスプレッドシート](https://docs.google.com/spreadsheets/d/1tS9IKv0vphga9-MnUEzLFCuB2I32s1yiG2e2XE4pjQk/edit#gid=1945290017)にアクセスし、カラムタイトルを変更する。
2. [javascriptのファイル](https://github.com/reika0717/toda_labo/blob/master/assets/js/main.js)を開き、右上のpenのアイコンをクリックし、4行目〜10行目にあるタイトル名を変更する。

## スプレッドシート編集時の注意点
- データがない場合は「-」(半角ハイフン)を入力する。（空白のままだと表示がずれてしまいます）
