(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{358:function(t,e,o){"use strict";o.r(e);var l={mounted(){const t=document.getElementById("circle-of-life").getContext("2d");t.imageSmoothingEnabled=!0,t.shadowBlur=2,t.shadowOffsetX=0,t.shadowOffsetY=0;let e=new Map;e.set("Здоровье",5),e.set("Работа",8),e.set("Личное пространство",5),e.set("Отношения",7),e.set("Секс",3),e.set("Репутация",3),e.set("Отношения с собой",3);const o=l(360/e.size);function l(t){return t*Math.PI/180}function n(){return"rgba("+Math.round(255*Math.random())+", "+Math.round(255*Math.random())+","+Math.round(255*Math.random())+")"}!function(){for(let l=0;l<e.size;l++)t.fillStyle=n(),t.shadowColor=t.fillStyle,t.beginPath(),t.moveTo(180,180),t.arc(180,180,20*[...e.values()][l],l*o,(l+1)*o),t.lineTo(180,180),t.closePath(),t.fill()}();const s=document.getElementById("circle-of-life-good").getContext("2d");s.imageSmoothingEnabled=!0,s.shadowBlur=2,s.shadowOffsetX=0,s.shadowOffsetY=0;let i=new Map;i.set("Здоровье",8),i.set("Работа",8),i.set("Личное пространство",8),i.set("Отношения",8),i.set("Секс",8),i.set("Репутация",8),i.set("Отношения с собой",8);const a=l(360/i.size);!function(){for(let t=0;t<i.size;t++)s.fillStyle=n(),s.shadowColor=s.fillStyle,s.beginPath(),s.moveTo(180,180),s.arc(180,180,20*[...i.values()][t],t*a,(t+1)*a),s.lineTo(180,180),s.closePath(),s.fill()}()}},n=o(6),s=Object(n.a)(l,(function(){var t=this,e=t._self._c;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("p",[t._v("Мозг довольно ленивый орган, и если его не мотивировать и не стимулировать, он быстро деградирует, как и мышцы. Но если его постоянно кормить задачами, которые ему по зубам, выделяется гормон азарта допамин, что делает процесс более увлекательным.")]),t._v(" "),e("p",[t._v('Задача самоанализа - самая простая и не требует дополнительных телодвижений, к тому же, любой виток в развитии целесообразно начать с анализа текущей ситуации.\nДаже зная точно где находится "точка Б", без точки А маршрут не построить.\nМой любимый инструмент для этого - круг жизни.')]),t._v(" "),e("p",[t._v("Техника простая:")]),t._v(" "),e("ul",[e("li",[t._v("выделить сферы жизни - это можно делать от простого к сложному, выписывая всё, чем вы занимаетесь в течение дня и всё, что занимает ваши мысли и потом обобщать и категоризировать, либо, что проще, воспользоваться типичными категориями, которые есть у всех - здоровье, отношения, работа и тд")]),t._v(" "),e("li",[t._v("нарисовать круг, разделить его на столько частей сколько сфер получилось")]),t._v(" "),e("li",[t._v("заштриховать сектора в соответствии с чувством наполненности или отдалённости от совершенства")]),t._v(" "),e("li",[t._v("заметить, что некоторые сектора заштрихованы в равной степени, значит между ними может быть связь, а некоторые заштрихованы больше других, значит им, может быть стоит уделять меньше внимания и заняться теми сферами, в которых чувствуется недостаток")])]),t._v(" "),e("p",[t._v("Поскольку я веб-разработчик, без красивой визуализации не могу обойтись 😃")]),t._v(" "),e("p",[e("canvas",{attrs:{id:"circle-of-life",width:"360",height:"360"}})]),t._v(" "),e("p",[t._v('Если ваше "Колесо жизни" выглядит примерно так, оно никуда не поедет, желательно перераспределить энергию чтобы запустить "спиральную динамику" развития.')]),t._v(" "),e("p",[t._v("Рука руку моет, границы между сферами условны, они плавно перетекают друг в друга и дополняют остальные. В моём колесе большие сегменты занимают работа и отношения, в последний год я работал над этими темами очень сильно, но совершенно забросил очень важные аспекты своей жизни и намерен сбалансировать их со временем. Чтобы было вот так:")]),t._v(" "),e("canvas",{attrs:{id:"circle-of-life-good",width:"360",height:"360"}})])}),[],!1,null,null,null);e.default=s.exports}}]);