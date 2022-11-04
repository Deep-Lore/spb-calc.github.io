var juiceNum, juiceRad, sugarNum, sugarRad, sugarPerGradus, sugarNeedAdd=0, gradusNeed, gradusRad=0, gradusRadAdd, gradusNum, gradusRealRad;

butt.onclick = function() {

  document.getElementById('reagents').value = ''
  console.clear()
  
  juiceNum = document.getElementById('juicePrew').value
  sugarRad = document.getElementById('sugarPrew').value/100
  gradusNeed = document.getElementById('gradusPrew').value

  sugarNum = juiceNum*sugarRad; //Колличество сахара в граммах
  
  if(juiceNum>0&&sugarRad>0&&sugarRad<1&&gradusNeed>0&&sugarNum - juiceNum/100/0.6 > 0){
      
    juiceNum = document.getElementById('juicePrew').value
    sugarRad = document.getElementById('sugarPrew').value/100
    gradusNeed = document.getElementById('gradusPrew').value

    sugarNeedAdd = 0
    gradusRadAdd = 0
    gradusRad = 0

    do{
      gradusNum=juiceNum/100 // кол-во спирта в мг в 1 градусе
      sugarPerGradus = juiceNum/100/0.6//Колличество сахара для повышения на 1 гр.
      gradusRealRad = gradusNum/(juiceNum - juiceNum/100/0.6)*100 //реальный градус после брожения
      gradusRad += gradusRealRad //счетчик градуса
      sugarNum -= sugarPerGradus//Колличество сахара после повышения на 1 гр.
      juiceNum = juiceNum - sugarPerGradus + gradusNum //Колличество сока после повышения на 1 градус
    }while(sugarNum>sugarPerGradus)

    gradusNum=juiceNum/100 // кол-во спирта в мг в 1 градусе
    sugarPerGradus = juiceNum/100/0.6//Колличество сахара для повышения на 1 гр.
    gradusRealRad = gradusNum/(juiceNum - juiceNum/100/0.6)*100 //реальный градус после брожения
    gradusRad += gradusRealRad*(sugarNum/sugarPerGradus) //счетчик градуса
    juiceNum = juiceNum - sugarNum + gradusNum*(sugarNum/sugarPerGradus) //Колличество сока после повышения на дробный сахар
    sugarNum = 0
    gradusRadAdd = gradusRad
    
    while(gradusNeed>gradusRadAdd){
      if(gradusNeed-gradusRadAdd>1){
        gradusNum=juiceNum/100 // кол-во спирта в мг в 1 градусе
        sugarPerGradus = juiceNum/100/0.6//Колличество сахара для повышения на 1 гр.
        gradusRealRad = gradusNum/(juiceNum - juiceNum/100/0.6)*100 //реальный градус после брожения
        gradusRadAdd += gradusRealRad
        sugarNeedAdd += sugarPerGradus//Счетчик необходимого градуса
        juiceNum = juiceNum - sugarPerGradus + gradusNum //Колличество сока после повышения на 1 градус
      }
      else{
        gradusNum=juiceNum/100 // кол-во спирта в мг в 1 градусе
        sugarPerGradus = juiceNum/100/0.6//Колличество сахара для повышения на 1 гр.
        gradusRealRad = gradusNum/(juiceNum - juiceNum/100/0.6)*100//реальный градус после брожения
        sugarPerGradus=gradusRealRad/sugarPerGradus
        sugarNeedAdd += (gradusNeed-gradusRadAdd)*sugarPerGradus//Добавление дробного сахера
        gradusRadAdd=gradusNeed
        juiceNum = juiceNum - sugarPerGradus*(gradusNeed-gradusRadAdd) + gradusNum*(gradusNeed-gradusRadAdd) //Колличество сока после повышения на дробный градсу
        document.getElementById('reagents').value = "Для достижения " + gradusNeed + " градуса(ов) в напитке необходимо еще " + sugarNeedAdd.toFixed(1) + " грамм сахара"
      }
    }

    document.getElementById('juice').value = juiceNum.toFixed(2)
    document.getElementById('sugar').value = (sugarNum/juiceNum*100).toFixed(2)
    document.getElementById('gradus').value = gradusRad.toFixed(2)
  }else{
    document.getElementById('valakas').classList.toggle('img-val_active')
    setTimeout(function() {document.getElementById('valakas').classList.toggle('img-val_active')}, 3000);
    var audio = new Audio();
    audio.src = 'audio/ban.mp3';
    audio.autoplay = true;
  }
}

//valakas
var audio = new Audio()
audio.src = 'audio/rap.mp3'
buttMusic.onclick = function() {
  audio.paused ? audio.play() : audio.pause();
}