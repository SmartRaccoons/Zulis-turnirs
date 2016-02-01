(function () {
    var renderer = new PIXI.CanvasRenderer(1240, 1754);
    document.getElementById('poster').appendChild(renderer.view);

    var v = function (v) {
        return document.getElementById('poster-' + v).value;
    };
    var render = function () {
        var stage = new PIXI.Stage(0xFFFFFF);
        (function () {
            mid = new PIXI.Sprite(PIXI.Texture.fromImage('d/images/poster-back-'+$('input[name="poster-type"]:checked').val()+'.png'));
            mid.position.x = 0;
            mid.position.y = 0;
            stage.addChild(mid);
        })();
        var t = function (t, size, color, position, center) {
            var richText = new PIXI.Text(t, {
                font: 'normal ' + size + 'px hero',
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

        t(v('day'), 80, '#b5b5b5', [60, 50]);
        t(v('when'), 140, '#ff6c00', [60, 120]);
        t(v('which'), 150, '#ff6c00', [620, 980], true);
        t(v('where'), 170, '#ff6c00', [620, 1150], true);

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