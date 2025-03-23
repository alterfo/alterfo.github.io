(window.webpackJsonp=window.webpackJsonp||[]).push([[50],{389:function(v,_,e){"use strict";e.r(_);var a=e(4),i=Object(a.a)({},(function(){var v=this,_=v._self._c;return _("ContentSlotsDistributor",{attrs:{"slot-key":v.$parent.slotKey}},[_("p",[v._v('Это вторая статья в цикле "Выбор стека технологий".')]),v._v(" "),_("p",[_("a",{attrs:{href:"/stack-1"}},[v._v("1. Выбор стека технологий (введение и кейсы)")])]),v._v(" "),_("p",[v._v("В первой статье мы определили содержание стека технологий. Это:")]),v._v(" "),_("ul",[_("li",[v._v("хранилище данных")]),v._v(" "),_("li",[v._v("бэкенд-фреймворк")]),v._v(" "),_("li",[v._v("фронтенд-фреймворк")]),v._v(" "),_("li",[v._v("системы виртуализации/контейнеризации")]),v._v(" "),_("li",[v._v("DevOps (IaC, мониторинг, логгирование), например, ELK (Elasticsearch, Logstash, Kibana)")])]),v._v(" "),_("hr"),v._v(" "),_("h2",{attrs:{id:"доступность-reliability"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#доступность-reliability"}},[v._v("#")]),v._v(" Доступность (reliability)")]),v._v(" "),_("p",[v._v("Доступность измеряется отношением общества количества запросов к количеству неответов.")]),v._v(" "),_("p",[v._v("Вернемся к кейсам и ранжируем их по требованиям к надежности:")]),v._v(" "),_("p",[v._v("EdTech - SLA 99.999% прописано в контракте (5 минут в год на обслуживание)")]),v._v(" "),_("p",[v._v("HR-Tech - business-critical, SLA 99.99%")]),v._v(" "),_("p",[v._v("PropTech - 2 часа offline в неделю, при том, что это PWA вполне допустимо.")]),v._v(" "),_("p",[v._v("FinTech - консоль SaaS будет использоваться раз в месяц, даже если пролежит неделю - не критично")]),v._v(" "),_("p",[v._v("Blog - мой блог лежал полгода и переезжал с домена на домен, самый менее критичный продукт с требованием к персистентности больше чем к доступности")]),v._v(" "),_("p",[v._v("По стеку что выбрано в результате и на ходу:")]),v._v(" "),_("p",[v._v("EdTech - Postgres, Java 17 Spring Boot, Low-Code, Next.js (SSG+Nginx), Tailwind, отдельный человек-SRE (Docker, minio, Yandex Cloud Kubernetes) - с появлением Java 19, пророчу Java долгую, но сложную жизнь")]),v._v(" "),_("p",[v._v("HR-Tech - Postgres, Java microservices, Angular 1X, Kafka, Shared SRE (0.3 FTE)")]),v._v(" "),_("p",[v._v("PropTech - MongoDB, Redis, Nest.js, React, no devops - MongoDB падает на 200 пользователях, переписать на Postgres - полгода работы пары человек минимум")]),v._v(" "),_("p",[v._v("FinTech - .Net Core (потому что Azure AD), Angular")]),v._v(" "),_("p",[v._v("Blog - GitHub Pages, VuePress, Markdown")]),v._v(" "),_("p",[v._v("По факту, как ни смешно, самым надежным оказался блог на GitHub Pages. Простота = надежность.")]),v._v(" "),_("p",[v._v("На других проектах DevOps-практика подкачала, деплои были большей частью ручные, а релизы - нестабильные.")]),v._v(" "),_("p",[v._v("Вывод - доступность приложения целиком и полностью зависит от Ops и инфраструктуры. Это база, которая закладывается на старте проекта.")]),v._v(" "),_("p",[v._v("Поэтому если доступность одно из требований, уже при инициализации проекта должны быть настроены бэкапы и восстановление, мониторинг, система оповещений об инцидентах, пайплайн поставок, тестовые стенды и простейшие автотесты.")]),v._v(" "),_("p",[v._v("Здесь мой выбор пал на GitLab, Jenkins и AWS. Ввиду отсутствия альтернатив. В случае российских проектов, Yandex Cloud достаточно production-ready с отзывчивой поддержкой.")]),v._v(" "),_("h2",{attrs:{id:"поддерживаемость"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#поддерживаемость"}},[v._v("#")]),v._v(" Поддерживаемость")]),v._v(" "),_("p",[v._v("По стандарту ISO/IEC 25010 поддерживаемость - набор атрибутов, содержащих необходимые усилия для внесения изменений.")]),v._v(" "),_("p",[v._v("Чтобы что-то изменить, это нужно - проанализировать, изменить, отладить и протестировать.")]),v._v(" "),_("p",[_("img",{attrs:{src:"/img.png",alt:"img.png"}})]),v._v(" "),_("p",[v._v("Как человек, проведший огромное количество времени за реверс-инженерией legacy-кода, я ставлю этот атрибут вторым параметром в уравнение поиска идеального стека.")]),v._v(" "),_("p",[v._v("Java 19 догнал в развитии Elixir/Erlang спустя 30 лет этой гонки.")]),v._v(" "),_("p",[v._v("Тем не менее, поддерживаемым код паралельных процессов и всего остального на Java назвать сложно.")]),v._v(" "),_("p",[v._v("Недаром в последнем опросе пользовательских предпочтений StackOverflow, Elixir на втором месте.")]),v._v(" "),_("p",[v._v("Если бы проекты можно было писать без оглядки на рынок, я бы взял для бэкенда Elixir. Ибо любой разработчик поймет код который на нем написан. И сможет писать на нем уже через пару недель. А вот с Java не так.")]),v._v(" "),_("p",[v._v("Elixir это не только синтаксис, сколько среда выполнения, обратите внимание на табличку ниже из книги Elixir in Action:\n"),_("img",{attrs:{src:"/img_1.png",alt:"img_1.png"}})]),v._v(" "),_("p",[v._v("Несмотря на то, что Elixir медленнее компилируемых языков, в плане реализации высокодоступных систем ему нет равных.")]),v._v(" "),_("p",[v._v("Поэтому если бы я выбирал стек технологий снова, он был бы таким:")]),v._v(" "),_("p",[v._v("EdTech - Postgres, Phoenix LiveView, Tailwind")]),v._v(" "),_("p",[v._v("HR-Tech - Postgres, Phoenix LiveView, Kafka")]),v._v(" "),_("p",[v._v("PropTech - просто убрал бы пересчет аналитики в транзакции, JS-стек стартапу подошел хорошо")]),v._v(" "),_("p",[v._v("FinTech - .Net Core (потому что Azure AD), Angular - по-другому никак")]),v._v(" "),_("p",[v._v("Blog - GitHub Pages, VuePress, Markdown - идеально")])])}),[],!1,null,null,null);_.default=i.exports}}]);