// Обновление свойства
function setRule(selector, c, bg){ 
  var styleSheets = document.styleSheets;
console.log('Найдено таблиц стилей ' + styleSheets.length);
// Нахождение нужной таблицы стилей (например, первой таблицы)
for (var k=0;k<styleSheets.length;k++){
var styleSheet = styleSheets[k];

// Check if the stylesheet is cross-origin
if (styleSheet.href && styleSheet.href.startsWith('http') && !styleSheet.href.startsWith(window.location.origin)) {
  // Skip the cross-origin stylesheet
  continue;
}

// Нахождение правила CSS для данного класса
var rule = null;
for (var i = 0; i < styleSheet.cssRules.length; i++) {
//console.log('Проверяю '+styleSheet.cssRules[i].selectorText );
if (styleSheet.cssRules[i].selectorText === selector) {
  //console.log('Найдено!');
  
  rule = styleSheet.cssRules[i];
  break;
  
  
}
}
// Изменение свойств стиля для найденного правила
if (rule) {
  try {
//console.log('Прим!');
rule.style.backgroundColor = bg;
rule.style.color = c;
  } catch (err) {
    console.log(err);
  };
};

};
}

  // Функция для установки куки
  function saveCookie(prop, val, expDays) {
    const d = new Date();
    d.setTime(d.getTime() + (expDays * 24 * 60 * 60 * 1000));
    const expires = "expires="+ d.toUTCString();
    document.cookie = prop + "=" + val + ";" + expires + ";path=/";
  }
  
  // Функция для чтения куки
  function readCookie(prop) {
    const name = prop + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

// Описание цветовой схемы сайт

const defaultColorScheme = [

 // цвет категории
{ selector : '.list-group-item', c: '#ff0000',  bg : '#E1F5FE', input: 'listGroupItem', 'label' : 'цвет категории'},
 // цвет категории при наведении
{ selector : '.list-group-item:hover', c: '#ff0000', bg: '#673AB7', input: 'listGroupItemH', 'label': 'цвет категории при наведении'},
 // цвет переключателя страниц
{ selector : '.page-link', c: '#ffffff', bg: '#1ABC9C', input: 'pageLink', label : 'цвет переключателя страниц'},
 // цвет переключателя страниц при наведении
 { selector : '.page-link:hover', c: '#ffffff', bg: '#0000ff', input: 'pageLinkH', label: 'цвет переключателя страниц при наведении'},
 // цвет активной страницы
 { selector : '.page-link.active, .active > .page-link', c: '#ffffff', bg: '#0000ff', input : 'activePageLink', label: 'цвет активной страницы' },
 // цвета в описании товара
 { selector : 'div#content > div.row > div.col-sm:nth-child(2)', c: '#000000', bg : '#ffffff', input: 'contentColSm2', label: 'цвета в описании товара'},
 // изменение описания товара при наведении курсора
 { selector : 'div#content > div.row > div.col-sm:nth-child(2):hover', c : '#000000', bg : '#ffffff', input : 'contentColSm2H', label : 'изменение описания товара при наведении курсора'},
 // Контент
 { selector : 'div.styled_content', c: '#ff0000', bg: '#E8F5E9', input : 'styledContent', 'label' : 'Контент' },
 // Контент при наведении
 { selector : 'div.styled_content:hover', c : '#F1F8E9', bg : '#ffffff', input: 'styledContentH', label : 'Контент при наведении' },
  // Ссылки
  {'selector' : 'a.in_header_link',  c : '#4C75A3', bg : '#ffffff', input : 'inHeaderLink', label: 'Ссылки' },
  // Сcылки вверху
  { selector: 'a.in_header_link:hover', c: '#ff0000', bg: '#ffffff', input: 'inHeaderLinkH', label: 'Сcылки вверху' },
  // Крошки
  {selector: 'li.breadcrumb-item a', c: '#000000', bg: '#8bc34a',  input: 'breadcrumbItemA', label: 'Крошки'},
  // Крошки при наведении
  {selector: 'li.breadcrumb-item a:hover', c: '#ff0000', bg: '#0000ee', input: 'breadcrumbItemAH', label: 'Крошки при наведении' },
  // Цвета ссылок у товаров
  {selector: 'h4 a', c: '#2eac1c', bg: '#ffffff', input: 'h4aColors', label: 'Цвета ссылок у товаров'},
  // Цвета ссылок у товаров при наведении
  {selector: ' h4 a:hover', c: '#ff0000', bg: '#ffffff', input: 'h4aColorsH', label: 'Цвета ссылок у товаров при наведении' }
];

// Считывает полностью цветовую схему по форме
function readSchemeFromForm(){
    var scheme = defaultColorScheme;
    for (var i=0;i<scheme.length; i++){
      console.log('Считываю из интерфейса' +scheme[i].label)
      var cElem = document.getElementById('c'+scheme[i].input);
      var bgElem = document.getElementById('bg'+scheme[i].input);
      if (cElem) {
      scheme[i].c = cElem.value;
      } else {
        console.log("cant set value cElem");
      };
      if (bgElem){
        scheme[i].bg = bgElem.value;
      }
      else {console.log('cant not set value bgElem');}
    };
    return scheme;
}


// Назначает элементам управления значения по цветовой схеме
function setToDynColorForm(scheme){
   
    for (var i=0;i<scheme.length; i++){

      let cElem = document.getElementById('c'+scheme[i].input);
      let bgElem = document.getElementById('bg'+scheme[i].input);
      if (cElem) {
        cElem.value = scheme[i].c ;
      } else {
        console.log('Не найден cElem');
      };
      if (bgElem){
        bgElem.value = scheme[i].bg ;
      }
      else {
        console.log('Не найден bgElem');
      };
    };
    return scheme;
}

// Считывает из куки цветовую схему
function readSchemeFromCookies(){
  var scheme = defaultColorScheme;
  for (var i=0;i<scheme.length; i++){
    var c = readCookie('c'+scheme[i].input)
    scheme[i].c = c ? c : defaultColorScheme[i].c; 
    var bg = readCookie('bg'+scheme[i].input);  
    scheme[i].bg = bg ? bg : defaultColorScheme[i].bg;
  };
  return scheme;
}

// Записывает в куки файлы цветовую схему
function saveSchemeToCookies(scheme){
  var scheme = defaultColorScheme;
  for (var i=0;i<scheme.length; i++){
    saveCookie('c'+scheme[i].input, scheme[i].c, 1);
    saveCookie('bg'+scheme[i].input, scheme[i].bg, 1);
  };
  return scheme;
}

// Создает элементы управления для выбора цвета и метку
function createLabeledInput(description, inputId ){
  var newLabel = document.createElement("label");
newLabel.setAttribute("for", inputId);
newLabel.innerHTML = description;
var inputC = document.createElement("input");
inputC.type = "color";
inputC.name = 'c'+inputId;
inputC.id = 'c'+inputId;
var inputBg = document.createElement("input");
inputBg.type = "color";
inputBg.name = 'bg'+inputId;
inputBg.id = 'bg'+inputId;
return { label: newLabel, inputC: inputC, inputBg : inputBg };
}

// Добавляет в динамическую форму элементы управления и метку
function addChoosers(x){
  document.getElementById("colorScheme").appendChild(x.label);
  document.getElementById("colorScheme").appendChild(x.inputC);
  document.getElementById("colorScheme").appendChild(x.inputBg);
  document.getElementById("colorScheme").appendChild(x.inputBg);
  var lineBreak = document.createElement("br");
  document.getElementById("colorScheme").appendChild(lineBreak);
}
// Динамически создает форму для выбора цветов по цветовой схеме по умолчанию
function generateFormByDefaultColorScheme(){
  var scheme = defaultColorScheme;
  for (let i = 0; i < scheme.length; i++) {
      addChoosers( createLabeledInput(scheme[i].label, scheme[i].input) );
  };
  // Назначаем свойства 
  setToDynColorForm(scheme);
}

function updateStylesWithScheme(scheme){
  for (let i = 0; i < scheme.length; i++) {
    setRule(scheme[i].selector, scheme[i].c, scheme[i].bg);
  };
}

function uiColorSchemeApply(){
  var scheme = readSchemeFromForm();

  console.log('Применяю схему');
  console.log(scheme);
  updateStylesWithScheme(scheme);
}

function uiColorSchemeSave(){
  var scheme = readSchemeFromForm();
  console.log('Сохраняю схему');
  console.log(scheme);
  saveSchemeToCookies(scheme);
}

function uiColorSchemeLoad(){
  var scheme = readSchemeFromCookies();
  console.log('Считал схему из куки');
  console.log(scheme);
  setToDynColorForm(scheme);
  updateStylesWithScheme(scheme);
}

function uiColorRestDef(){
  console.log('Восстановил тему по умолчанию');
  var scheme = defaultColorScheme;
  saveSchemeToCookies(scheme);
  setToDynColorForm(scheme);
  updateStylesWithScheme(scheme);
}

function colorSwitcherTheme(){

let  ColorSchemeT = setTimeout( function(){
  
  if (document.getElementById('colorScheme')) {

  generateFormByDefaultColorScheme();

  var scheme = readSchemeFromCookies();
 
  let btnApplyColorScheme = document.getElementById('btnApplyColorScheme');
  btnApplyColorScheme.addEventListener("click", uiColorSchemeApply);


  
  let btnSaveColorScheme = document.getElementById('btnSaveColorScheme');
  btnSaveColorScheme.addEventListener("click", uiColorSchemeSave);
  

  let btnLoadColorScheme = document.getElementById('btnLoadColorScheme');
  btnLoadColorScheme.addEventListener("click", uiColorSchemeLoad);
  

  let btnRestoreDefColorScheme = document.getElementById('btnRestoreDefColorScheme');
  btnRestoreDefColorScheme.addEventListener("click", uiColorRestDef);
  
  

   
  };

}, 4000);
}
 
