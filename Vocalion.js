/*
 *  機動歌姫ヴォーカリオン
 *  2014/01/23
 *  @auther minimo  
 *  This Program is MIT license.
 */

//アセット登録
var ASSETS = {
    //images
    //自機系
    "gunship1":     "assets/gunship1.png",
    "bit1":         "assets/bit1.png",
    "shot1":        "assets/shot1.png",
    "shot2":        "assets/shot2.png",
    "shotburn":     "assets/shotburn.png",
}

//namespace Vocalion
pb3 = {
    core: null,
};

pb3.Vocalion = tm.createClass({
    superClass: tm.app.CanvasApp,
    score: 0,
    highScore: 0,       //ハイスコア
    highScoreStage: 0,  //ハイスコア時ステージ
    difficulty: 0,      //難易度(0-3)
    mainScene: null,
    init: function(id) {
        this.superInit(id);

        pb3.core = this;
        this.resize(SCREEN_WIDTH, SCREEN_HEIGHT).fitWindow();
        this.fps = 60;
        this.background = "rgba(0, 0, 0, 0)";

        //DSL関数をロード
        BulletML.dsl(); 

        this.keyboard = tm.input.Keyboard(window);

        //ローディングシーンを投入
        this.replaceScene(tm.app.LoadingScene({
            assets:ASSETS,
            nextScene: function() {
                this._onLoadAssets();
                return pb3.TitleScene();    //次シーンはタイトル
            }.bind(this),
        }));
    },
    _onLoadAssets: function() {
    },
    exitApp: function() {
        this.stop();
        tm.social.Nineleap.postRanking(this.highScore, "");
    }
});