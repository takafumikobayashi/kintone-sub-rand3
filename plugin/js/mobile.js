/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/mobile.js":
/*!**************************!*\
  !*** ./src/js/mobile.js ***!
  \**************************/
/***/ (() => {

eval("(function (PLUGIN_ID) {\n  kintone.events.on(['mobile.app.record.detail.show'], function(event) {\n\n    const record = event.record;\n    const config = kintone.plugin.app.getConfig(PLUGIN_ID);\n    const subTableFieldCode = config.subtable_code; // サブテーブルのフィールドコードを指定\n    let headerSpace = kintone.mobile.app.getHeaderSpaceElement();\n\n    // 既存のボタンをチェックして重複を避ける\n    const existingButton = document.getElementById('myCustomButton');\n    if (existingButton) {\n        return event;\n    };\n\n    // 新しいボタンを作成\n    let button = document.createElement('button');\n    button.id = 'myCustomButton';\n    button.innerText = '3件ランダム抽出';\n    button.className = 'kintoneplugin-button-normal'; // Kintoneのデフォルトボタンスタイルを適用\n    button.style.marginLeft = '20px'; // 右に隙間を作る\n    button.style.marginRight = '20px'; // 右に隙間を作る\n\n    button.onclick = function() {\n      // サブテーブルレコード数検査\n      let subtableRecords = record[subTableFieldCode].value;\n      if (subtableRecords.length < 3) {\n        swal({\n          title: 'レコードがありません。',\n          text: '対象のサブテーブルにレコードが存在しないので、何も処理をしません。',\n          icon: 'info',\n          button: 'OK'\n        });\n        return event;\n\n      } else {\n        swal({\n          title: 'ランダム抽出しますか？',\n          text: config.subtable_code + 'の一覧からランダムに3名選択し、' + config.subtable_field_code + 'を取得します。',\n          icon: 'info',\n          buttons: {\n            cancel: \"いいえ\",\n              catch: {\n                text: \"はい\",\n                value: \"execute\",\n              }\n          },\n        })\n        .then((value) => {\n          switch (value) {\n            case \"execute\":\n              // 3件ランダム抽出処理\n              shuffleAndPickThree(record[subTableFieldCode].value, config.subtable_field_code, config.target_field_code1, config.target_field_code2, config.target_field_code3);\n              break;\n            default:\n              console.log('キャンセルされました。');\n          }\n        });\n      }\n    };\n\n    // ヘッダースペースにコンテナを追加\n    headerSpace.appendChild(button);\n    return event;\n  });\n\n  function shuffleAndPickThree(subTableRecords, getcode, code1, code2, code3) {\n      // サブテーブルのレコードをシャッフル\n      let shuffledRecords = subTableRecords.sort(function() {\n          return 0.5 - Math.random();\n      });\n\n      // 最初の3件を取得\n      let selectedRecords = shuffledRecords.slice(0, 3);\n\n      // 選択されたレコードをフィールドに保存\n      console.log('選択されたレコード:', selectedRecords);\n      const targetFieldCode1 = code1; // 更新するフィールドのコード\n      const targetFieldCode2 = code2; // 更新するフィールドのコード\n      const targetFieldCode3 = code3; // 更新するフィールドのコード\n      let count = 0;\n\n      selectedRecords.forEach(function(record) {\n          console.log('レコードID:', record.id, '値:', record.value);\n          count += 1;\n\n          // 更新用のパラメータを設定\n          var updateParams = {\n              app: kintone.mobile.app.getId(),\n              id: kintone.mobile.app.record.getId(),\n              record: {}\n          };\n\n          switch (count) {\n              case 1:\n                  updateParams.record[targetFieldCode1] = {\n                      value: record.value[getcode].value\n                  };\n                  break;\n              case 2:\n                  updateParams.record[targetFieldCode2] = {\n                      value: record.value[getcode].value\n                  };\n                  break;\n              case 3:\n                  updateParams.record[targetFieldCode3] = {\n                      value: record.value[getcode].value\n                  };\n                  break;\n          };\n\n          // レコードの更新\n          kintone.api(kintone.api.url('/k/v1/record', true), 'PUT', updateParams, function(updateResp) {\n              console.log('Record updated:', updateResp);\n\n          }, function(updateError) {\n              console.error('Update error:', updateError);\n              swal({\n                  title: 'エラーが発生しました。',\n                  text: record.value[getcode].value + 'さんの更新に失敗しました。',\n                  icon: 'error',\n                  button: 'OK'\n              });\n              return;\n          });\n      });\n\n      swal({\n          title: '更新しました。',\n          text: 'リロードして当番を確認してください。',\n          icon: 'success',\n          button: 'OK'\n      }).then(() => {\n          // ダイアログクローズ後の処理\n          location.reload(true);\n      });\n  };\n\n})(kintone.$PLUGIN_ID);\n\n\n//# sourceURL=webpack://kintone-sub-rand3/./src/js/mobile.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/mobile.js"]();
/******/ 	
/******/ })()
;