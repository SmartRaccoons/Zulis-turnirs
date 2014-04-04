var _l = function(key, subparams){
    var res = App.lang.strings[App.lang.active][key];
    if(subparams){
        res = res.replace(/\\?\{([^{}]+)\}/g, function(match, name){
            if (match.charAt(0) == '\\'){
                return match.slice(1);
            }
            return (subparams[name] != null) ? subparams[name] : '';
        });
    }
    return res;
};

var App = {
    'lang': {
        'active': 'lv',
        'strings': {
            'lv': {}
        }
    }
};