(function () {
    var renderer = new PIXI.CanvasRenderer(1240, 1754);
    document.getElementById('poster').appendChild(renderer.view);

    var v = function (v) {
        return document.getElementById('poster-' + v).value;
    };
    var render = function () {
        var stage = new PIXI.Stage(0xFFFFFF);
        var poster_type = $('input[name="poster-type"]:checked').val();
        var poster_out = poster_type === 'out';
        (function () {
            mid = new PIXI.Sprite(PIXI.Texture.fromImage('d/images/poster-back-'+poster_type+'.png?'));
            mid.position.x = 0;
            mid.position.y = 0;
            stage.addChild(mid);
        })();
        var t = function (t, size, color, position, center) {
            var richText = new PIXI.Text(t, {
                font: 'normal ' + size + 'px gothic',
                fill: color,
                align: center === true ? 'center' : 'left'
            });
            richText.position.x = position[0];
            richText.position.y = position[1];
            if (center === true) {
                richText.anchor.x = 0.5;
            }
            stage.addChild(richText);
        };
        var img = function (src, position) {
            img = new PIXI.Sprite(PIXI.Texture.fromImage(src));
            img.position.x = position[0];
            img.position.y = position[1];
            stage.addChild(img);
        };

        t(v('day'), 80, '#b5b5b5', [60, 50]);
        t(v('when'), 140, '#ff6c00', [50, 120]);
        t(v('when-time'), 90, poster_out ? '#000000' : '#656565', [60, 250]);
        t(v('which'), 150, '#ff6c00', [620, 980], true);
        t(v('where'), 170, '#ff6c00', [620, 1150], true);
        t(v('submit'), 35, poster_out ? '#000000' : '#ffffff', [60, 1560]);
        t(v('submit-web'), 55, poster_out ? '#000000' : '#ffffff', [60, 1600]);
        t(v('submit-mob'), 55, poster_out ? '#000000' : '#ffffff', [60, 1660]);
        img(v('organize'), [960, 130]);

        renderer.render(stage);
    };
    setTimeout(function () {
        render();
    }, 1000);
    $('#app form').submit(function () {
        render();
        return false;
    });

})();
