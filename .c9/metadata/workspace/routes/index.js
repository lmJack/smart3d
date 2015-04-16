{"filter":false,"title":"index.js","tooltip":"/routes/index.js","undoManager":{"mark":100,"position":100,"stack":[[{"group":"doc","deltas":[{"start":{"row":64,"column":0},"end":{"row":65,"column":0},"action":"insert","lines":["",""]}]}],[{"group":"doc","deltas":[{"start":{"row":65,"column":0},"end":{"row":76,"column":3},"action":"insert","lines":["router.get('/materials', function(req, res, next) {","    Material.find({}, function(err, mtrls) {","        if (err) {","            console.log(err);","            res.end();","        } else {","            if (mtrls) {","                res.render('materials', {mtrls: mtrls}); ","            }","        }","    });","});"]}]}],[{"group":"doc","deltas":[{"start":{"row":65,"column":13},"end":{"row":65,"column":21},"action":"remove","lines":["material"]},{"start":{"row":65,"column":13},"end":{"row":65,"column":14},"action":"insert","lines":["p"]}]}],[{"group":"doc","deltas":[{"start":{"row":65,"column":14},"end":{"row":65,"column":15},"action":"insert","lines":["r"]}]}],[{"group":"doc","deltas":[{"start":{"row":65,"column":15},"end":{"row":65,"column":16},"action":"insert","lines":["i"]}]}],[{"group":"doc","deltas":[{"start":{"row":65,"column":16},"end":{"row":65,"column":17},"action":"insert","lines":["n"]}]}],[{"group":"doc","deltas":[{"start":{"row":65,"column":17},"end":{"row":65,"column":18},"action":"insert","lines":["t"]}]}],[{"group":"doc","deltas":[{"start":{"row":65,"column":18},"end":{"row":65,"column":19},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":65,"column":19},"end":{"row":65,"column":20},"action":"insert","lines":["r"]}]}],[{"group":"doc","deltas":[{"start":{"row":66,"column":4},"end":{"row":66,"column":12},"action":"remove","lines":["Material"]},{"start":{"row":66,"column":4},"end":{"row":66,"column":5},"action":"insert","lines":["P"]}]}],[{"group":"doc","deltas":[{"start":{"row":66,"column":5},"end":{"row":66,"column":6},"action":"insert","lines":["r"]}]}],[{"group":"doc","deltas":[{"start":{"row":66,"column":6},"end":{"row":66,"column":7},"action":"insert","lines":["i"]}]}],[{"group":"doc","deltas":[{"start":{"row":66,"column":4},"end":{"row":66,"column":7},"action":"remove","lines":["Pri"]},{"start":{"row":66,"column":4},"end":{"row":66,"column":11},"action":"insert","lines":["Printer"]}]}],[{"group":"doc","deltas":[{"start":{"row":66,"column":35},"end":{"row":66,"column":39},"action":"remove","lines":["mtrl"]},{"start":{"row":66,"column":35},"end":{"row":66,"column":36},"action":"insert","lines":["p"]}]}],[{"group":"doc","deltas":[{"start":{"row":66,"column":36},"end":{"row":66,"column":37},"action":"insert","lines":["r"]}]}],[{"group":"doc","deltas":[{"start":{"row":66,"column":37},"end":{"row":66,"column":38},"action":"insert","lines":["n"]}]}],[{"group":"doc","deltas":[{"start":{"row":66,"column":38},"end":{"row":66,"column":39},"action":"insert","lines":["t"]}]}],[{"group":"doc","deltas":[{"start":{"row":66,"column":39},"end":{"row":66,"column":40},"action":"insert","lines":["r"]}]}],[{"group":"doc","deltas":[{"start":{"row":72,"column":48},"end":{"row":72,"column":52},"action":"remove","lines":["mtrl"]},{"start":{"row":72,"column":48},"end":{"row":72,"column":49},"action":"insert","lines":["p"]}]}],[{"group":"doc","deltas":[{"start":{"row":72,"column":49},"end":{"row":72,"column":50},"action":"insert","lines":["r"]}]}],[{"group":"doc","deltas":[{"start":{"row":72,"column":50},"end":{"row":72,"column":51},"action":"insert","lines":["n"]}]}],[{"group":"doc","deltas":[{"start":{"row":72,"column":51},"end":{"row":72,"column":52},"action":"insert","lines":["t"]}]}],[{"group":"doc","deltas":[{"start":{"row":72,"column":52},"end":{"row":72,"column":53},"action":"insert","lines":["r"]}]}],[{"group":"doc","deltas":[{"start":{"row":71,"column":16},"end":{"row":71,"column":20},"action":"remove","lines":["mtrl"]},{"start":{"row":71,"column":16},"end":{"row":71,"column":17},"action":"insert","lines":["p"]}]}],[{"group":"doc","deltas":[{"start":{"row":71,"column":17},"end":{"row":71,"column":18},"action":"insert","lines":["r"]}]}],[{"group":"doc","deltas":[{"start":{"row":71,"column":18},"end":{"row":71,"column":19},"action":"insert","lines":["n"]}]}],[{"group":"doc","deltas":[{"start":{"row":71,"column":19},"end":{"row":71,"column":20},"action":"insert","lines":["t"]}]}],[{"group":"doc","deltas":[{"start":{"row":71,"column":20},"end":{"row":71,"column":21},"action":"insert","lines":["r"]}]}],[{"group":"doc","deltas":[{"start":{"row":72,"column":28},"end":{"row":72,"column":36},"action":"remove","lines":["material"]},{"start":{"row":72,"column":28},"end":{"row":72,"column":29},"action":"insert","lines":["p"]}]}],[{"group":"doc","deltas":[{"start":{"row":72,"column":29},"end":{"row":72,"column":30},"action":"insert","lines":["r"]}]}],[{"group":"doc","deltas":[{"start":{"row":72,"column":30},"end":{"row":72,"column":31},"action":"insert","lines":["i"]}]}],[{"group":"doc","deltas":[{"start":{"row":72,"column":31},"end":{"row":72,"column":32},"action":"insert","lines":["n"]}]}],[{"group":"doc","deltas":[{"start":{"row":72,"column":32},"end":{"row":72,"column":33},"action":"insert","lines":["t"]}]}],[{"group":"doc","deltas":[{"start":{"row":72,"column":33},"end":{"row":72,"column":34},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":72,"column":34},"end":{"row":72,"column":35},"action":"insert","lines":["r"]}]}],[{"group":"doc","deltas":[{"start":{"row":72,"column":28},"end":{"row":72,"column":29},"action":"insert","lines":["3"]}]}],[{"group":"doc","deltas":[{"start":{"row":72,"column":29},"end":{"row":72,"column":30},"action":"insert","lines":["d"]}]}],[{"group":"doc","deltas":[{"start":{"row":65,"column":13},"end":{"row":65,"column":14},"action":"insert","lines":["3"]}]}],[{"group":"doc","deltas":[{"start":{"row":65,"column":14},"end":{"row":65,"column":15},"action":"insert","lines":["d"]}]}],[{"group":"doc","deltas":[{"start":{"row":78,"column":13},"end":{"row":78,"column":14},"action":"insert","lines":["3"]}]}],[{"group":"doc","deltas":[{"start":{"row":78,"column":14},"end":{"row":78,"column":15},"action":"insert","lines":["d"]}]}],[{"group":"doc","deltas":[{"start":{"row":72,"column":42},"end":{"row":72,"column":46},"action":"remove","lines":["mtrl"]},{"start":{"row":72,"column":42},"end":{"row":72,"column":43},"action":"insert","lines":["p"]}]}],[{"group":"doc","deltas":[{"start":{"row":72,"column":43},"end":{"row":72,"column":44},"action":"insert","lines":["r"]}]}],[{"group":"doc","deltas":[{"start":{"row":72,"column":44},"end":{"row":72,"column":45},"action":"insert","lines":["n"]}]}],[{"group":"doc","deltas":[{"start":{"row":72,"column":45},"end":{"row":72,"column":46},"action":"insert","lines":["t"]}]}],[{"group":"doc","deltas":[{"start":{"row":72,"column":46},"end":{"row":72,"column":47},"action":"insert","lines":["r"]}]}],[{"group":"doc","deltas":[{"start":{"row":89,"column":28},"end":{"row":90,"column":0},"action":"insert","lines":["",""]},{"start":{"row":90,"column":0},"end":{"row":90,"column":24},"action":"insert","lines":["                        "]}]}],[{"group":"doc","deltas":[{"start":{"row":90,"column":24},"end":{"row":90,"column":36},"action":"insert","lines":["if (prntr) {"]}]}],[{"group":"doc","deltas":[{"start":{"row":91,"column":24},"end":{"row":91,"column":28},"action":"insert","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":90,"column":28},"end":{"row":90,"column":33},"action":"remove","lines":["prntr"]},{"start":{"row":90,"column":28},"end":{"row":90,"column":29},"action":"insert","lines":["ь"]}]}],[{"group":"doc","deltas":[{"start":{"row":90,"column":29},"end":{"row":90,"column":30},"action":"insert","lines":["е"]}]}],[{"group":"doc","deltas":[{"start":{"row":90,"column":30},"end":{"row":90,"column":31},"action":"insert","lines":["к"]}]}],[{"group":"doc","deltas":[{"start":{"row":90,"column":31},"end":{"row":90,"column":32},"action":"insert","lines":["д"]}]}],[{"group":"doc","deltas":[{"start":{"row":90,"column":32},"end":{"row":90,"column":33},"action":"insert","lines":["ы"]}]}],[{"group":"doc","deltas":[{"start":{"row":90,"column":28},"end":{"row":90,"column":33},"action":"remove","lines":["ьекды"]}]}],[{"group":"doc","deltas":[{"start":{"row":90,"column":28},"end":{"row":90,"column":29},"action":"insert","lines":["m"]}]}],[{"group":"doc","deltas":[{"start":{"row":90,"column":29},"end":{"row":90,"column":30},"action":"insert","lines":["t"]}]}],[{"group":"doc","deltas":[{"start":{"row":90,"column":30},"end":{"row":90,"column":31},"action":"insert","lines":["r"]}]}],[{"group":"doc","deltas":[{"start":{"row":90,"column":31},"end":{"row":90,"column":32},"action":"insert","lines":["l"]}]}],[{"group":"doc","deltas":[{"start":{"row":90,"column":32},"end":{"row":90,"column":33},"action":"insert","lines":["s"]}]}],[{"group":"doc","deltas":[{"start":{"row":91,"column":83},"end":{"row":91,"column":86},"action":"remove","lines":["   "]},{"start":{"row":91,"column":83},"end":{"row":92,"column":0},"action":"insert","lines":["",""]},{"start":{"row":92,"column":0},"end":{"row":92,"column":28},"action":"insert","lines":["                            "]}]}],[{"group":"doc","deltas":[{"start":{"row":92,"column":24},"end":{"row":92,"column":28},"action":"remove","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":92,"column":24},"end":{"row":92,"column":25},"action":"insert","lines":["}"]}]}],[{"group":"doc","deltas":[{"start":{"row":92,"column":25},"end":{"row":93,"column":0},"action":"insert","lines":["",""]},{"start":{"row":93,"column":0},"end":{"row":93,"column":24},"action":"insert","lines":["                        "]}]}],[{"group":"doc","deltas":[{"start":{"row":93,"column":24},"end":{"row":93,"column":25},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":93,"column":25},"end":{"row":93,"column":26},"action":"insert","lines":["l"]}]}],[{"group":"doc","deltas":[{"start":{"row":93,"column":26},"end":{"row":93,"column":27},"action":"insert","lines":["s"]}]}],[{"group":"doc","deltas":[{"start":{"row":93,"column":27},"end":{"row":93,"column":28},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":93,"column":28},"end":{"row":93,"column":29},"action":"insert","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":93,"column":29},"end":{"row":93,"column":30},"action":"insert","lines":["{"]}]}],[{"group":"doc","deltas":[{"start":{"row":93,"column":30},"end":{"row":93,"column":31},"action":"insert","lines":["}"]}]}],[{"group":"doc","deltas":[{"start":{"row":93,"column":30},"end":{"row":95,"column":24},"action":"insert","lines":["","                            ","                        "]}]}],[{"group":"doc","deltas":[{"start":{"row":94,"column":28},"end":{"row":94,"column":29},"action":"insert","lines":["c"]}]}],[{"group":"doc","deltas":[{"start":{"row":94,"column":29},"end":{"row":94,"column":30},"action":"insert","lines":["o"]}]}],[{"group":"doc","deltas":[{"start":{"row":94,"column":30},"end":{"row":94,"column":31},"action":"insert","lines":["n"]}]}],[{"group":"doc","deltas":[{"start":{"row":93,"column":24},"end":{"row":95,"column":25},"action":"remove","lines":["else {","                            con","                        }"]}]}],[{"group":"doc","deltas":[{"start":{"row":93,"column":20},"end":{"row":93,"column":24},"action":"remove","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":89,"column":28},"end":{"row":90,"column":36},"action":"remove","lines":["","                        if (mtrls) {"]}]}],[{"group":"doc","deltas":[{"start":{"row":90,"column":83},"end":{"row":91,"column":25},"action":"remove","lines":["","                        }"]}]}],[{"group":"doc","deltas":[{"start":{"row":90,"column":83},"end":{"row":91,"column":20},"action":"remove","lines":["","                    "]}]}],[{"group":"doc","deltas":[{"start":{"row":90,"column":82},"end":{"row":90,"column":83},"action":"remove","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":89,"column":28},"end":{"row":90,"column":0},"action":"insert","lines":["",""]},{"start":{"row":90,"column":0},"end":{"row":90,"column":24},"action":"insert","lines":["                        "]}]}],[{"group":"doc","deltas":[{"start":{"row":91,"column":24},"end":{"row":91,"column":28},"action":"remove","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":90,"column":24},"end":{"row":90,"column":25},"action":"insert","lines":["c"]}]}],[{"group":"doc","deltas":[{"start":{"row":90,"column":25},"end":{"row":90,"column":26},"action":"insert","lines":["o"]}]}],[{"group":"doc","deltas":[{"start":{"row":90,"column":26},"end":{"row":90,"column":27},"action":"insert","lines":["n"]}]}],[{"group":"doc","deltas":[{"start":{"row":90,"column":27},"end":{"row":90,"column":28},"action":"insert","lines":["s"]}]}],[{"group":"doc","deltas":[{"start":{"row":90,"column":28},"end":{"row":90,"column":29},"action":"insert","lines":["o"]}]}],[{"group":"doc","deltas":[{"start":{"row":90,"column":29},"end":{"row":90,"column":30},"action":"insert","lines":["l"]}]}],[{"group":"doc","deltas":[{"start":{"row":90,"column":30},"end":{"row":90,"column":31},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":90,"column":31},"end":{"row":90,"column":32},"action":"insert","lines":["."]}]}],[{"group":"doc","deltas":[{"start":{"row":90,"column":32},"end":{"row":90,"column":33},"action":"insert","lines":["l"]}]}],[{"group":"doc","deltas":[{"start":{"row":90,"column":33},"end":{"row":90,"column":34},"action":"insert","lines":["o"]}]}],[{"group":"doc","deltas":[{"start":{"row":90,"column":34},"end":{"row":90,"column":35},"action":"insert","lines":["g"]}]}],[{"group":"doc","deltas":[{"start":{"row":90,"column":35},"end":{"row":90,"column":37},"action":"insert","lines":["()"]}]}],[{"group":"doc","deltas":[{"start":{"row":90,"column":37},"end":{"row":90,"column":38},"action":"insert","lines":[";"]}]}],[{"group":"doc","deltas":[{"start":{"row":90,"column":36},"end":{"row":90,"column":37},"action":"insert","lines":["m"]}]}],[{"group":"doc","deltas":[{"start":{"row":90,"column":37},"end":{"row":90,"column":38},"action":"insert","lines":["t"]}]}],[{"group":"doc","deltas":[{"start":{"row":90,"column":38},"end":{"row":90,"column":39},"action":"insert","lines":["r"]}]}],[{"group":"doc","deltas":[{"start":{"row":90,"column":39},"end":{"row":90,"column":40},"action":"insert","lines":["l"]}]}],[{"group":"doc","deltas":[{"start":{"row":90,"column":40},"end":{"row":90,"column":41},"action":"insert","lines":["s"]}]}]]},"ace":{"folds":[],"scrolltop":840,"scrollleft":0,"selection":{"start":{"row":90,"column":41},"end":{"row":90,"column":41},"isBackwards":true},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":{"row":450,"mode":"ace/mode/javascript"}},"timestamp":1429192707684,"hash":"a24c935c82a0092abecc7c5a19fb35d5307dee56"}