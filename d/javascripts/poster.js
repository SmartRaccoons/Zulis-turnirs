(function () {
    var renderer = new PIXI.CanvasRenderer(1240, 1754);
    document.getElementById('poster').appendChild(renderer.view);

    var v = function (v) {
        return document.getElementById('poster-' + v).value;
    };
    var _random = Math.random();
    var render = function () {
        var stage = new PIXI.Stage(0xFFFFFF);
        var poster_type = $('input[name="poster-type"]:checked').val();
        var poster_out = poster_type === 'out';
        var t = function (t, size, color, position, align, font) {
            var richText = new PIXI.Text(t, {
                font: 'normal ' + size + 'px ' + (!font ? 'gothic' : font),
                fill: color,
                align: align ? align : 'left'
            });
            richText.position.x = position[0];
            richText.position.y = position[1];
            if (align === 'center') {
                richText.anchor.x = 0.5;
            } else if (align === 'right') {
              richText.anchor.x = 1
            }
            stage.addChild(richText);
        };
        var img = function (src, position) {
            i = new PIXI.Sprite(PIXI.Texture.fromImage(src));
            i.position.x = position[0];
            i.position.y = position[1];
            stage.addChild(i);
        };

        img('d/images/back-'+poster_type+'.jpg?' + _random, [0, 0])

        t(v('day'), 80, '#b5b5b5', [60, 50]);
        t(v('when'), 140, '#ff6c00', [50, 120]);
        t(v('when-time'), 90, poster_out ? '#000000' : '#656565', [60, 250]);
        t(v('organize-text'), 60, poster_out ? '#000000' : '#656565', [1200, 50], 'right', 'hero');
        t(v('what'), 450, poster_out ? '#000000' : '#d3d3d3', [620, 400], 'center', 'hero');
        t(v('what2'), 200, poster_out ? '#000000' : '#d3d3d3', [620, 800], 'center', 'hero');
        t(v('which'), 100, '#ff6c00', [620, 980], 'center');
        t(v('where'), 180, '#ff6c00', [620, 1080], 'center');
        t(v('where2'), 70, '#ff6c00', [620, 1280], 'center');
        t(v('info'), 50, '#ff6c00', [620, 1400], 'center');
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
