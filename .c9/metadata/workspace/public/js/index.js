{"filter":false,"title":"index.js","tooltip":"/public/js/index.js","undoManager":{"mark":87,"position":87,"stack":[[{"group":"doc","deltas":[{"start":{"row":75,"column":25},"end":{"row":102,"column":7},"action":"remove","lines":["","\t\t/*var file = this.file, positions = this.positions, headers = {","        \"Accept\": \"application/json\",","        \"Cache-Control\": \"no-cache\",","        \"X-Requested-With\": \"XMLHttpRequest\"","      \t},","\t\tdata = new FormData(), xhr = new XMLHttpRequest();","\t\tdata.append('file', file);","\t\tdata.append('positions', JSON.stringify(positions));","\t\tdata.append('name', $('#name').val());","\t\tdata.append('contact', $('#contact').val());","\t\txhr.open(\"POST\",\"/order\",true);","\t\tfor (var headerName in headers) {","        \tvar headerValue = headers[headerName];","        \txhr.setRequestHeader(headerName, headerValue);","      \t}","\t\txhr.send(data);","\t\t/*$.ajax({","\t\t\turl: '/order',","\t\t\ttype: 'POST',","\t\t\tcache: false,","        \tcontentType: false,","        \tprocessData: false,","\t\t\tdata: data,","\t\t\tsuccess: function(resp) {","\t\t\t\t$('#order').append('<span class=\"label label-success\">Заказ отправлен</span>');","\t\t\t}","\t\t});*/"]}]}],[{"group":"doc","deltas":[{"start":{"row":343,"column":7},"end":{"row":344,"column":0},"action":"insert","lines":["",""]},{"start":{"row":344,"column":0},"end":{"row":344,"column":4},"action":"insert","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":344,"column":4},"end":{"row":345,"column":0},"action":"insert","lines":["",""]},{"start":{"row":345,"column":0},"end":{"row":345,"column":4},"action":"insert","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":345,"column":4},"end":{"row":353,"column":7},"action":"insert","lines":["$(function() {","        $('.page-scroll').bind('click', function(event) {","            var $anchor = $(this);","            $('html, body').stop().animate({","                scrollTop: $($anchor.attr('href')).offset().top","            }, 1500, 'easeInOutExpo');","            event.preventDefault();","        });","    });"]}]}],[{"group":"doc","deltas":[{"start":{"row":353,"column":7},"end":{"row":354,"column":0},"action":"insert","lines":["",""]},{"start":{"row":354,"column":0},"end":{"row":354,"column":4},"action":"insert","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":354,"column":4},"end":{"row":355,"column":0},"action":"insert","lines":["",""]},{"start":{"row":355,"column":0},"end":{"row":355,"column":4},"action":"insert","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":355,"column":4},"end":{"row":355,"column":5},"action":"insert","lines":["$"]}]}],[{"group":"doc","deltas":[{"start":{"row":355,"column":5},"end":{"row":355,"column":7},"action":"insert","lines":["()"]}]}],[{"group":"doc","deltas":[{"start":{"row":355,"column":6},"end":{"row":355,"column":7},"action":"insert","lines":["#"]}]}],[{"group":"doc","deltas":[{"start":{"row":355,"column":7},"end":{"row":355,"column":8},"action":"insert","lines":["c"]}]}],[{"group":"doc","deltas":[{"start":{"row":355,"column":8},"end":{"row":355,"column":9},"action":"insert","lines":["a"]}]}],[{"group":"doc","deltas":[{"start":{"row":355,"column":9},"end":{"row":355,"column":10},"action":"insert","lines":["l"]}]}],[{"group":"doc","deltas":[{"start":{"row":355,"column":10},"end":{"row":355,"column":11},"action":"insert","lines":["c"]}]}],[{"group":"doc","deltas":[{"start":{"row":355,"column":6},"end":{"row":355,"column":7},"action":"insert","lines":["'"]}]}],[{"group":"doc","deltas":[{"start":{"row":355,"column":12},"end":{"row":355,"column":13},"action":"insert","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":355,"column":13},"end":{"row":355,"column":14},"action":"insert","lines":["."]}]}],[{"group":"doc","deltas":[{"start":{"row":355,"column":14},"end":{"row":355,"column":15},"action":"insert","lines":["r"]}]}],[{"group":"doc","deltas":[{"start":{"row":355,"column":15},"end":{"row":355,"column":16},"action":"insert","lines":["o"]}]}],[{"group":"doc","deltas":[{"start":{"row":355,"column":16},"end":{"row":355,"column":17},"action":"insert","lines":["w"]}]}],[{"group":"doc","deltas":[{"start":{"row":355,"column":17},"end":{"row":355,"column":18},"action":"insert","lines":["/"]}]}],[{"group":"doc","deltas":[{"start":{"row":355,"column":17},"end":{"row":355,"column":18},"action":"remove","lines":["/"]}]}],[{"group":"doc","deltas":[{"start":{"row":355,"column":17},"end":{"row":355,"column":18},"action":"insert","lines":["'"]}]}],[{"group":"doc","deltas":[{"start":{"row":355,"column":19},"end":{"row":355,"column":20},"action":"insert","lines":["."]}]}],[{"group":"doc","deltas":[{"start":{"row":355,"column":20},"end":{"row":355,"column":21},"action":"insert","lines":["c"]}]}],[{"group":"doc","deltas":[{"start":{"row":355,"column":21},"end":{"row":355,"column":22},"action":"insert","lines":["s"]}]}],[{"group":"doc","deltas":[{"start":{"row":355,"column":22},"end":{"row":355,"column":23},"action":"insert","lines":["s"]}]}],[{"group":"doc","deltas":[{"start":{"row":355,"column":23},"end":{"row":355,"column":25},"action":"insert","lines":["()"]}]}],[{"group":"doc","deltas":[{"start":{"row":355,"column":25},"end":{"row":355,"column":26},"action":"insert","lines":[";"]}]}],[{"group":"doc","deltas":[{"start":{"row":355,"column":24},"end":{"row":355,"column":25},"action":"insert","lines":["m"]}]}],[{"group":"doc","deltas":[{"start":{"row":355,"column":25},"end":{"row":355,"column":26},"action":"insert","lines":["a"]}]}],[{"group":"doc","deltas":[{"start":{"row":355,"column":26},"end":{"row":355,"column":27},"action":"insert","lines":["r"]}]}],[{"group":"doc","deltas":[{"start":{"row":355,"column":27},"end":{"row":355,"column":28},"action":"insert","lines":["g"]}]}],[{"group":"doc","deltas":[{"start":{"row":355,"column":28},"end":{"row":355,"column":29},"action":"insert","lines":["i"]}]}],[{"group":"doc","deltas":[{"start":{"row":355,"column":29},"end":{"row":355,"column":30},"action":"insert","lines":["n"]}]}],[{"group":"doc","deltas":[{"start":{"row":355,"column":24},"end":{"row":355,"column":25},"action":"insert","lines":["'"]}]}],[{"group":"doc","deltas":[{"start":{"row":355,"column":31},"end":{"row":355,"column":32},"action":"insert","lines":["-"]}]}],[{"group":"doc","deltas":[{"start":{"row":355,"column":32},"end":{"row":355,"column":33},"action":"insert","lines":["t"]}]}],[{"group":"doc","deltas":[{"start":{"row":355,"column":33},"end":{"row":355,"column":34},"action":"insert","lines":["o"]}]}],[{"group":"doc","deltas":[{"start":{"row":355,"column":34},"end":{"row":355,"column":35},"action":"insert","lines":["p"]}]}],[{"group":"doc","deltas":[{"start":{"row":355,"column":35},"end":{"row":355,"column":36},"action":"insert","lines":["/"]}]}],[{"group":"doc","deltas":[{"start":{"row":355,"column":35},"end":{"row":355,"column":36},"action":"remove","lines":["/"]}]}],[{"group":"doc","deltas":[{"start":{"row":355,"column":35},"end":{"row":355,"column":36},"action":"insert","lines":["."]}]}],[{"group":"doc","deltas":[{"start":{"row":355,"column":35},"end":{"row":355,"column":36},"action":"remove","lines":["."]}]}],[{"group":"doc","deltas":[{"start":{"row":355,"column":35},"end":{"row":355,"column":36},"action":"insert","lines":["'"]}]}],[{"group":"doc","deltas":[{"start":{"row":355,"column":36},"end":{"row":355,"column":37},"action":"insert","lines":[","]}]}],[{"group":"doc","deltas":[{"start":{"row":355,"column":37},"end":{"row":355,"column":38},"action":"insert","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":355,"column":38},"end":{"row":355,"column":53},"action":"insert","lines":["$('#calc .row')"]}]}],[{"group":"doc","deltas":[{"start":{"row":355,"column":53},"end":{"row":355,"column":54},"action":"insert","lines":["."]}]}],[{"group":"doc","deltas":[{"start":{"row":355,"column":54},"end":{"row":355,"column":55},"action":"insert","lines":["h"]}]}],[{"group":"doc","deltas":[{"start":{"row":355,"column":55},"end":{"row":355,"column":56},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":355,"column":56},"end":{"row":355,"column":57},"action":"insert","lines":["i"]}]}],[{"group":"doc","deltas":[{"start":{"row":355,"column":57},"end":{"row":355,"column":58},"action":"insert","lines":["g"]}]}],[{"group":"doc","deltas":[{"start":{"row":355,"column":58},"end":{"row":355,"column":59},"action":"insert","lines":["h"]}]}],[{"group":"doc","deltas":[{"start":{"row":355,"column":59},"end":{"row":355,"column":60},"action":"insert","lines":["t"]}]}],[{"group":"doc","deltas":[{"start":{"row":355,"column":60},"end":{"row":355,"column":62},"action":"insert","lines":["()"]}]}],[{"group":"doc","deltas":[{"start":{"row":355,"column":38},"end":{"row":355,"column":39},"action":"insert","lines":["$"]}]}],[{"group":"doc","deltas":[{"start":{"row":355,"column":39},"end":{"row":355,"column":40},"action":"insert","lines":["("]}]}],[{"group":"doc","deltas":[{"start":{"row":355,"column":40},"end":{"row":355,"column":41},"action":"insert","lines":[")"]}]}],[{"group":"doc","deltas":[{"start":{"row":355,"column":40},"end":{"row":355,"column":42},"action":"insert","lines":["''"]}]}],[{"group":"doc","deltas":[{"start":{"row":355,"column":41},"end":{"row":355,"column":42},"action":"insert","lines":["#"]}]}],[{"group":"doc","deltas":[{"start":{"row":355,"column":42},"end":{"row":355,"column":43},"action":"insert","lines":["c"]}]}],[{"group":"doc","deltas":[{"start":{"row":355,"column":43},"end":{"row":355,"column":44},"action":"insert","lines":["a"]}]}],[{"group":"doc","deltas":[{"start":{"row":355,"column":44},"end":{"row":355,"column":45},"action":"insert","lines":["l"]}]}],[{"group":"doc","deltas":[{"start":{"row":355,"column":45},"end":{"row":355,"column":46},"action":"insert","lines":["c"]}]}],[{"group":"doc","deltas":[{"start":{"row":355,"column":48},"end":{"row":355,"column":49},"action":"insert","lines":["."]}]}],[{"group":"doc","deltas":[{"start":{"row":355,"column":49},"end":{"row":355,"column":50},"action":"insert","lines":["h"]}]}],[{"group":"doc","deltas":[{"start":{"row":355,"column":50},"end":{"row":355,"column":51},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":355,"column":51},"end":{"row":355,"column":52},"action":"insert","lines":["i"]}]}],[{"group":"doc","deltas":[{"start":{"row":355,"column":52},"end":{"row":355,"column":53},"action":"insert","lines":["g"]}]}],[{"group":"doc","deltas":[{"start":{"row":355,"column":53},"end":{"row":355,"column":54},"action":"insert","lines":["h"]}]}],[{"group":"doc","deltas":[{"start":{"row":355,"column":54},"end":{"row":355,"column":55},"action":"insert","lines":["t"]}]}],[{"group":"doc","deltas":[{"start":{"row":355,"column":55},"end":{"row":355,"column":56},"action":"insert","lines":["("]}]}],[{"group":"doc","deltas":[{"start":{"row":355,"column":56},"end":{"row":355,"column":57},"action":"insert","lines":[")"]}]}],[{"group":"doc","deltas":[{"start":{"row":355,"column":57},"end":{"row":355,"column":58},"action":"insert","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":355,"column":58},"end":{"row":355,"column":59},"action":"insert","lines":["-"]}]}],[{"group":"doc","deltas":[{"start":{"row":355,"column":59},"end":{"row":355,"column":60},"action":"insert","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":355,"column":38},"end":{"row":355,"column":39},"action":"insert","lines":["("]}]}],[{"group":"doc","deltas":[{"start":{"row":355,"column":85},"end":{"row":355,"column":86},"action":"insert","lines":[")"]}]}],[{"group":"doc","deltas":[{"start":{"row":355,"column":86},"end":{"row":355,"column":87},"action":"insert","lines":["/"]}]}],[{"group":"doc","deltas":[{"start":{"row":355,"column":87},"end":{"row":355,"column":88},"action":"insert","lines":["2"]}]}],[{"group":"doc","deltas":[{"start":{"row":355,"column":88},"end":{"row":355,"column":89},"action":"insert","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":218,"column":0},"end":{"row":218,"column":1},"action":"insert","lines":["/"]}]}],[{"group":"doc","deltas":[{"start":{"row":218,"column":1},"end":{"row":218,"column":2},"action":"insert","lines":["*"]}]}],[{"group":"doc","deltas":[{"start":{"row":324,"column":2},"end":{"row":324,"column":3},"action":"insert","lines":["*"]}]}],[{"group":"doc","deltas":[{"start":{"row":324,"column":3},"end":{"row":324,"column":4},"action":"insert","lines":["/"]}]}],[{"group":"doc","deltas":[{"start":{"row":218,"column":2},"end":{"row":218,"column":3},"action":"insert","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":167,"column":35},"end":{"row":167,"column":36},"action":"insert","lines":[";"]}]}],[{"group":"doc","deltas":[{"start":{"row":324,"column":4},"end":{"row":325,"column":0},"action":"insert","lines":["",""]}]}]]},"ace":{"folds":[],"scrolltop":4560,"scrollleft":0,"selection":{"start":{"row":325,"column":0},"end":{"row":325,"column":0},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":{"row":63,"state":"start","mode":"ace/mode/javascript"}},"timestamp":1428592086000,"hash":"8cb4dae5399c999fef1453af5426233efac76d86"}