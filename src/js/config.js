(function (PLUGIN_ID) {
  const formEl = document.querySelector('.js-submit-settings');
  const cancelButtonEl = document.querySelector('.js-cancel-button');
  if (!(formEl && cancelButtonEl)) {
    throw new Error('Required elements do not exist.');
  }
  const config = kintone.plugin.app.getConfig(PLUGIN_ID);
  let appId = kintone.app.getId();

  //Selectエレメント作成
  let selectMenu_subtable = document.createElement('select');
  selectMenu_subtable.id = 'field-selection_subtable';
  selectMenu_subtable.className = 'field-selection_subtable';

  let selectMenu_getfield = document.createElement('select');
  selectMenu_getfield.id = 'field-selection_getfield';
  selectMenu_getfield.className = 'field-selection_getfield';

  let selectMenu_targetfield1 = document.createElement('select');
  selectMenu_targetfield1.id = 'field-selection_targetfield1';
  selectMenu_targetfield1.className = 'field-selection_targetfield1';

  let selectMenu_targetfield2 = document.createElement('select');
  selectMenu_targetfield2.id = 'field-selection_targetfield2';
  selectMenu_targetfield2.className = 'field-selection_targetfield2';

  let selectMenu_targetfield3 = document.createElement('select');
  selectMenu_targetfield3.id = 'field-selection_targetfield3';
  selectMenu_targetfield3.className = 'field-selection_targetfield3';

  //APIで設計情報を取得
  kintone.api('/k/v1/form', 'GET', {app: appId}, function(resp) {

    for (let key in resp.properties) {
      let field = resp.properties[key];

      //field-selection_subtableへの格納
      if (field.type === 'SUBTABLE') {
        let option = document.createElement('option'); // 新しい<option>エレメントを作成
        option.value = field.code;  // <option>のvalueを設定
        option.textContent = field.label;  // <option>のテキストを設定

        if (field.code === config.subtable_code) {
          option.selected = true;  // <option>を選択済みにする

          // 対象フィールドが選択されている場合、デフォルト表示を行う
          if (config.subtable_field_code) {
            for (let key2 in field.fields){
              let field2 = field.fields[key2];

              if(field2.type === "SINGLE_LINE_TEXT") {
                let option2 = document.createElement('option'); // 新しい<option>エレメントを作成
                option2.value = field2.code;  // <option>のvalueを設定
                option2.textContent = field2.label;  // <option>のテキストを設定

                if (field2.code === config.subtable_field_code) {
                  option2.selected = true;  // <option>を選択済みにする
                }
                console.log(option2);
                selectMenu_getfield.appendChild(option2);  // <select>メニューに<option>を追加    
              }
            }
          }
        }
        selectMenu_subtable.appendChild(option);  // <select>メニューに<option>を追加
      };

      //field-selection_targetfield1への格納
      if (field.type === 'SINGLE_LINE_TEXT') {
        let option = document.createElement('option'); // 新しい<option>エレメントを作成
        option.value = field.code;  // <option>のvalueを設定
        option.textContent = field.label;  // <option>のテキストを設定

        if (field.code === config.target_field_code1) {
          option.selected = true;  // <option>を選択済みにする
        }
        selectMenu_targetfield1.appendChild(option);  // <select>メニューに<option>を追加
      }

      //field-selection_targetfield2への格納
      if (field.type === 'SINGLE_LINE_TEXT') {
        let option = document.createElement('option'); // 新しい<option>エレメントを作成
        option.value = field.code;  // <option>のvalueを設定
        option.textContent = field.label;  // <option>のテキストを設定

        if (field.code === config.target_field_code2) {
          option.selected = true;  // <option>を選択済みにする
        }
        selectMenu_targetfield2.appendChild(option);  // <select>メニューに<option>を追加
      }

      //field-selection_targetfield3への格納
      if (field.type === 'SINGLE_LINE_TEXT') {
        let option = document.createElement('option'); // 新しい<option>エレメントを作成
        option.value = field.code;  // <option>のvalueを設定
        option.textContent = field.label;  // <option>のテキストを設定

        if (field.code === config.target_field_code3) {
          option.selected = true;  // <option>を選択済みにする
        }
        selectMenu_targetfield3.appendChild(option);  // <select>メニューに<option>を追加
      }
    }

    // <select>メニューをconfig画面の適切な場所に追加
    formEl.querySelector('.field-selection-area_subtable').appendChild(selectMenu_subtable);
    formEl.querySelector('.field-selection-area_getfield').appendChild(selectMenu_getfield);
    formEl.querySelector('.field-selection-area_targetfield1').appendChild(selectMenu_targetfield1);
    formEl.querySelector('.field-selection-area_targetfield2').appendChild(selectMenu_targetfield2);
    formEl.querySelector('.field-selection-area_targetfield3').appendChild(selectMenu_targetfield3);

  }, function(error) {
      console.error('フォーム情報の取得に失敗しました。:', error);
  }); 


  // field-selection_subtableのselect要素が変更されたときの処理
  formEl.addEventListener('change', (e) => {

    console.log(e.target);

    // イベントが発生した要素が<select>でない場合は処理を終了
    if (!e.target.matches('select#field-selection_subtable.field-selection_subtable')) {
      return;
    } else {

      // 既存のselectを削除（もし存在する場合）
      let existingSelect = document.getElementById('field-selection_getfield');
      if (existingSelect) {
        existingSelect.remove();
      }

      let selectMenu_getfield = document.createElement('select');
      selectMenu_getfield.id = 'field-selection_getfield';
      selectMenu_getfield.className = 'field-selection_getfield';    

      //対象のサブテーブル要素取得
      let appId = kintone.app.getId();
      let subtable_code = selectMenu_subtable.value;

      //APIで設計情報を取得
      kintone.api('/k/v1/form', 'GET', {app: appId}, function(resp) {

        const participantProperty = resp.properties.find(property => property.code === subtable_code);
        if (participantProperty) {
          participantProperty.fields.forEach(field => {
              if (field.type === 'SINGLE_LINE_TEXT') {
                  let option = document.createElement('option'); // 新しい<option>エレメントを作成
                  option.value = field.code;  // <option>のvalueを設定
                  option.textContent = field.label;  // <option>のテキストを設定

                  if (field.code === config.subtable_field_code) {
                      option.selected = true;  // <option>を選択済みにする
                  }
                  selectMenu_getfield.appendChild(option);  // <select>メニューに<option>を追加
              }
          });
          formEl.querySelector('.field-selection-area_getfield').appendChild(selectMenu_getfield);

        } else {
            console.log("「参加者」コードのプロパティが見つかりませんでした。");
        }
      });
    };
  });

  formEl.addEventListener('submit', (e) => {
    e.preventDefault();
    let selectedValue_subtable = formEl.querySelector('.field-selection_subtable').value;
    let selectedValue_getfield = formEl.querySelector('.field-selection_getfield').value;
    let selectedValue_targetfield1 = formEl.querySelector('.field-selection_targetfield1').value;
    let selectedValue_targetfield2 = formEl.querySelector('.field-selection_targetfield2').value;
    let selectedValue_targetfield3 = formEl.querySelector('.field-selection_targetfield3').value;
    kintone.plugin.app.setConfig({ subtable_code: selectedValue_subtable, subtable_field_code: selectedValue_getfield, target_field_code1: selectedValue_targetfield1, target_field_code2: selectedValue_targetfield2, target_field_code3: selectedValue_targetfield3 }, () => {      
      swal({
        title: '更新しました。',
        text: '変更した設定を反映するには、「アプリの設定」画面に戻り 「アプリの更新」ボタンをクリックします。',
        icon: 'success',
        button: 'OK'
      }).then(() => {
        // ダイアログクローズ後の処理
        window.location.href = '../../flow?app=' + kintone.app.getId();
      });
    });
  });

  cancelButtonEl.addEventListener('click', () => {
    window.location.href = '../../' + kintone.app.getId() + '/plugin/';
  });
})(kintone.$PLUGIN_ID);
