function GettaskModel(){
	 //este será o contrutor e irá retornar uma lista fixa de strings
	 //this.items = ['item 1','item 2','item 3','item 3'];

	 //aqui irá retornar uma lista fixa de objetos
	 //somente para testes, pois os itens serão incluidos pelo usuario
	 /*this.items = [{nome:'item 1',Finalizada:false},
	               {nome:'item 2',Finalizada:false},
	               {nome:'item 3',Finalizada:false},
	               {nome:'item 4',Finalizada:false},
	               {nome:'item 5',Finalizada:false},
	               {nome:'item 6',Finalizada:false}];
	              //cada objeto tem duas propriedades: nome (string) e Finalizada (boolean)*/
		
		//cria o objeto que receberá os itens da lista
		this.items = [];

		//metodo para carregar a lista salva localmente
		//também usa o localStorage
		var lista = localStorage.getItem("tasklist");
		//se a lista não estiver vazia (null), carrega a lista
		if(lista !== null)
			//angular.fromJson(lista) converte a lista de string para objeto novamente
			this.items = angular.fromJson(lista);

		//método para salvar (via localStorage do html5)
		this.save = function(){
			//Jason converte um objeto javascript em string
			//atribuindo valores string para cada propriedade do obj
			var lista = angular.toJson(this.items);

			//grava os dados localmente, passando a var tasklist e o conteudo está em lista
			localStorage.setItem("tasklist",lista);

		}	              

	  //função para remover 1 item da lista
	  //pos recebe a posição do item a ser excluído
	  //splice remove 1 a partir da posição passada splice(pos,1)
	  //esse meotdo será invocado pelo controller
	  /*this.remove = function(item){

			//não está conseguindo pegar a posição 
	  		var pos = this.items.indexof(item);
	  		this.items.splice(pos, 1);

	  }*/

	  this.remove = function(index_item){

	  		//não está conseguindo pegar a posição,
	  		//então passei o index como parametro
	  		this.items.splice(index_item, 1);

	  }

	  this.add = function(item){

	  	//adiciona um item à lista
	  	this.items.push(item);

	  }



}