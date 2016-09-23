// Ionic Starter App

//com a aplicação concluída, é necessário dar o build,
//primeiro deve definir a plataforma (andorid ou ios)
//no prompt, após acessar a pasta do projeto, digitar
//ionic plataform add android; para defniri a plataforma que ira rodar
//depois pode digitar os comandos para o build
//ionic build android
//pra funcionar o build deve ter instalado na maquina o
//java e sdk android ou android suite



// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic']);

//inicializa o modulo angular
app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

//o modulo angular permite criar o padrão MVC
//model ; view e controler
//aqui será criado um controler
//adicionado o $ionicPopup para criar popups no app
//$ionicListDelegate oferece métodos do list
app.controller('mainController', function($scope, $ionicPopup, $ionicListDelegate){

  /*
//o parametro $scope será fará a comunicação entre a view e controllere
//td que for alterado aqui, será refletido na index, que está associada
//a esse modulo angular
$scope.mensagem = 'bla bla bla';

//cria um array simples
$scope.lista =['A','B','C','D','E'];


//cria uma função que altera o conteudo da mensagem inicializa
$scope.newMessage = function(newMSG){

  $scope.mensagem = newMSG;

}
*/
//instancia um objeto TaskModel = camada Model do MVC
  var tasks = new GettaskModel();

  //conjunto de atributos criados no controller
  //passa a lista do taskmodel para uma propriedade de lista criada no controller
  $scope.lista = tasks.items;

  //essa propriewdade será alterada quando o checkbox for marcado na view
  $scope.ShowMarked = false;

  $scope.RemoveStatus = false;

  //função que permite exibir popup
  //não precisa estar associada ao scope ($scope.geItem) pq não será chamada na view
  //será chamada somente aqui no controller
  //o método geItem serve tanto para editar quanto para add novo
  //por isso foi criado o parametro novo
  function getItem(item, novo){
    //cria uma propriedade data que permitirá ao input (caixa de texto) acessar
    //ler o seu conteúdo...
    //por isso deve ser propriedade do $scope
    $scope.data ={};
    //passa o nome do item
    //se for novov item passará em branco
    $scope.data.newTask = item.nome;

    //permite passar como parametros propriedades para titulo, botoes etc
    //{title: Nova Tarefa} = parametro para titulo do popup
    //buttons: [{text: "Ok"},{text: "Cancel"}] = insere dois botões no popup 
    $ionicPopup.show({title: "Nova Tarefa",
      scope: $scope,//cria uma propriedade que recebe o $scope, 
      //para poder alterar a propriedade name com ng-model= 'data.newTask


      //ng-model= 'data.newTask' permite alterar o conteúdo da 
      //propriedade data.newtask do $scope
      template: "<input type = 'text' placeholder = 'Tarefa' autofocus = 'true' ng-model= 'data.newTask'>",
      buttons: [{text: "Ok",
      //função onTap será executada qdo o ok do popup for apertado
      //altera a propriedade nome com o conteúdo da prop newTask
      onTap: function(e){
        item.nome = $scope.data.newTask;
        //somente executa o método add do model se o botão OK do popup for pressionado
        // tasks.add(item) = executa o metodo de add do model, 
        //passando o item com o texto digitado pelo user       
        //se o prametro novo estiver true adiciona
        //se estiver false não adiciona
        if(novo){
          tasks.add(item);
          //salva o item via localstorage
          
        }
        //salva a lista qdo add ou edita
        tasks.save();
      }
    },{text: "Cancel"}]});

    //método closeOptionButtons fecha os botões abertos 
    //com optionsButoos (exibidos ao arrastar o item da lista)
    //assim ao terminar de editar o botão será fechado
    $ionicListDelegate.closeOptionButtons();
  };
 

//cria uma função que recebe o objeto item como parametro
  //e inverte a propriedade Finalizada -- se true vira false e vice versa
  $scope.onMarkTask = function(item){
    
    //retorna o valor para debugar no browser pela ferramenta de desenvolvedor
    //console.log("passei");

    item.Finalizada = !item.Finalizada;
    tasks.save();
  };



  //metodo que permitirá esconder ou exibir os itens finalizados
  //se o item estiver marcado como finalizado e o check(exibir) estiver false irá esconder 
  //todos os itens marcados como finalizados 
  $scope.onHideItem = function(item){
    //altera a propriedade para true (exibe todas tarefas finalizadas na view) ou false(não exibe tarefas finalizadas)
    return item.Finalizada && !$scope.ShowMarked;
  };

  
  //função de recebe um index como parametro e chama o método remove do model
  //para excluir um item da lista, conforme o índice passado
  $scope.onItemRemove = function(index_it){

    tasks.remove(index_it);
    tasks.save();

  };

  $scope.onClickRemove = function(){

    $scope.RemoveStatus = !$scope.RemoveStatus;
  };

  $scope.onItemAdd = function(){

    //passa o item vazio, pois o item será criado pelo getitem
    //que pegara o conteudo digitado no popup e add na lista
    var item = {nome: "", Finalizada: false};
    //passa o nome em branco pq é novo item

    getItem(item,true);
    //no método add deixa o parametro novo com o valor: true
    

  }

  //método para editar o conteudo de um item
  $scope.onEditItem = function(item){
    //chama o método getitem que recebe o item para alterar seu conteudo
    //irá receber um item da lista, qdo for clicado o botão editar da item
    getItem(item,false);
    //no método edit deixa o parametro novo com o valor: fasle


  }


})
