(function (PLUGIN_ID) {
  kintone.events.on(['mobile.app.record.detail.show'], function(event) {

    const record = event.record;
    const config = kintone.plugin.app.getConfig(PLUGIN_ID);
    const subTableFieldCode = config.subtable_code; // サブテーブルのフィールドコードを指定
    let headerSpace = kintone.mobile.app.getHeaderSpaceElement();

    // 既存のボタンをチェックして重複を避ける
    const existingButton = document.getElementById('myCustomButton');
    if (existingButton) {
        return event;
    };

    // 新しいボタンを作成
    let button = document.createElement('button');
    button.id = 'myCustomButton';
    button.innerText = '3件ランダム抽出';
    button.className = 'kintoneplugin-button-normal'; // Kintoneのデフォルトボタンスタイルを適用
    button.style.marginLeft = '20px'; // 右に隙間を作る
    button.style.marginRight = '20px'; // 右に隙間を作る

    button.onclick = function() {
      // サブテーブルレコード数検査
      let subtableRecords = record[subTableFieldCode].value;
      if (subtableRecords.length < 3) {
        swal({
          title: 'レコードがありません。',
          text: '対象のサブテーブルにレコードが存在しないので、何も処理をしません。',
          icon: 'info',
          button: 'OK'
        });
        return event;

      } else {
        swal({
          title: 'ランダム抽出しますか？',
          text: config.subtable_code + 'の一覧からランダムに3名選択し、' + config.subtable_field_code + 'を取得します。',
          icon: 'info',
          buttons: {
            cancel: "いいえ",
              catch: {
                text: "はい",
                value: "execute",
              }
          },
        })
        .then((value) => {
          switch (value) {
            case "execute":
              // 3件ランダム抽出処理
              shuffleAndPickThree(record[subTableFieldCode].value, config.subtable_field_code, config.target_field_code1, config.target_field_code2, config.target_field_code3);
              break;
            default:
              console.log('キャンセルされました。');
          }
        });
      }
    };

    // ヘッダースペースにコンテナを追加
    headerSpace.appendChild(button);
    return event;
  });

  function shuffleAndPickThree(subTableRecords, getcode, code1, code2, code3) {
      // サブテーブルのレコードをシャッフル
      let shuffledRecords = subTableRecords.sort(function() {
          return 0.5 - Math.random();
      });

      // 最初の3件を取得
      let selectedRecords = shuffledRecords.slice(0, 3);

      // 選択されたレコードをフィールドに保存
      console.log('選択されたレコード:', selectedRecords);
      const targetFieldCode1 = code1; // 更新するフィールドのコード
      const targetFieldCode2 = code2; // 更新するフィールドのコード
      const targetFieldCode3 = code3; // 更新するフィールドのコード
      let count = 0;

      selectedRecords.forEach(function(record) {
          console.log('レコードID:', record.id, '値:', record.value);
          count += 1;

          // 更新用のパラメータを設定
          var updateParams = {
              app: kintone.mobile.app.getId(),
              id: kintone.mobile.app.record.getId(),
              record: {}
          };

          switch (count) {
              case 1:
                  updateParams.record[targetFieldCode1] = {
                      value: record.value[getcode].value
                  };
                  break;
              case 2:
                  updateParams.record[targetFieldCode2] = {
                      value: record.value[getcode].value
                  };
                  break;
              case 3:
                  updateParams.record[targetFieldCode3] = {
                      value: record.value[getcode].value
                  };
                  break;
          };

          // レコードの更新
          kintone.api(kintone.api.url('/k/v1/record', true), 'PUT', updateParams, function(updateResp) {
              console.log('Record updated:', updateResp);

          }, function(updateError) {
              console.error('Update error:', updateError);
              swal({
                  title: 'エラーが発生しました。',
                  text: record.value[getcode].value + 'さんの更新に失敗しました。',
                  icon: 'error',
                  button: 'OK'
              });
              return;
          });
      });

      swal({
          title: '更新しました。',
          text: 'リロードして当番を確認してください。',
          icon: 'success',
          button: 'OK'
      }).then(() => {
          // ダイアログクローズ後の処理
          location.reload(true);
      });
  };

})(kintone.$PLUGIN_ID);
