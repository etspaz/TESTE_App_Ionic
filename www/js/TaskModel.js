function GettaskModel(){
	 //este será o contrutor e irá retornar uma lista fixa de strings
	 //this.items = ['item 1','item 2','item 3','item 3'];

	 //aqui irá retornar uma lista fixa de objetos
	 this.items = [{nome:'item 1',Finalizada:false},
	               {nome:'item 2',Finalizada:false},
	               {nome:'item 3',Finalizada:false},
	               {nome:'item 3',Finalizada:false}];
	              //cada objeto tem duas propriedades: nome (string) e Finalizada (boolean)

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