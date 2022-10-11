# **CRUD para genrenciamento de produtos e categorias**

Nesta aplicação foi desenvolvida uma Restful API local em `nodeJS`, utilizando-se a biblioteca [express]('https://www.npmjs.com/package/express'), bem como um banco de dados `PostgreSQL` e, por fim, também configurado um ambiente de desenvolvimento com `Docker`.

Todas as rotas da API são publicas, assim não se fazendo necessário a utilização de autenticação através de tokens e hasheamento de senhas.

## **Contato com a aplicação**

1.  Para iniciar o contato com a aplicação, primeiramente instale as dependencias necessárias, que foram utilizadas no projeto através de um dos comandos abaixo:

```js
npm install

// ou

yarn install
```

2.  Acesse o arquivo `src/database/index.js` e insira suas credenciais no campo de testes de forma fixa, ou crie um arquivo `.env` na raiz do projeto no mesmo modelo presente em `.env.example` para inserir as variáveis de ambiente. NOTE: Caso você opte pela execução dos testes utilizando as variáveis de ambiente, deixe o campo `NODE_ENV` vazio.

___
## **Execução dos testes**

Após configurar corretamente o database, rode o seguinte comando para iniciar os testes:

```js
yarn run test
```

O comando setado no script do `package.json` sera executado e os testes presentes em `tests/integrations.spec.js` serão executados. É esperado que todos os testes retornem uma mensagem de sucesso.

### **A aplicação contém um total de 20 testes, separados em 3 seções:**

```
ROTA /categories
√ Criacao de categoria;
√ Listagem de todas as categorias;
√ Listagem de uma categoria;
√ Atualizacao de uma categoria especifica;

ROTA /products
√ Criacao de produto;
√ Listagem de todas os produtos;
√ Listagem de um produto;
√ Atualizacao de um produto especifico;
√ Listagem de produtos por id da categoria;
√ Delecao de um produto;
√ Delecao de uma categoria;

CASOS DE ERROS NAS ROTAS /categories & /products
√ Nao permite criacao de duas categorias com nomes iguais;
√ Nao permite a criacao de um produto sem o nome;
√ Nao permite a criacao de um produto sem o preco;
√ Nao permite listar uma categoria inexistente;
√ Nao permite atualizar uma categoria inexistente;
√ Nao permite listar um produto inexistente;
√ Nao permite atualizar um produto inexistente;
√ Nao permite deletar uma categoria inexistente;
√ Nao permite deletar um produto inexistente;
```
___
## **Testes da aplicação através do insomnia**

Para fazer o teste através do insomnia, inclua no campo de endereço `http://localhost:3000` como *URL* base.

Existem ao todo 11 rotas e 2 endpoints (categories e products), todas publicas (sem a necessidade de um header de autenticação), desenvolvidas 100% respeitando as regras e bons constumes de Restfuls API's. As rotas são:
___
##  CATEGORIES

-   **`POST /categories`**: Responsável pela criação de novas categorias

**Corpo de requisição**
~~~json
{
    "name": "Categoria 1",
}
~~~

**Corpo de resposta**
```json
{
	"message": "Category created",
	"category": {
		"name": "Categoria 1",
		"id": "1"
	}
}
```
___
-   **`GET /categories`**: Responsável pela listagem das categorias

**Corpo de resposta**
```json
[
	{
		"id": "1",
		"name": "categoria 1"
	},
	{
		"id": "2",
		"name": "categoria 2"
	},
	{
		"id": "3",
		"name": "categoria 3"
	},
	{
		"id": "4",
		"name": "categoria 4"
	},
	{
		"id": "5",
		"name": "categoria 5"
	}
]
```
___
- **`GET categories/:id`**: Responsável pela listagem de uma categoria específica, conforme o *id* que for passado no endpoint.

**Corpo de resposta**
~~~json
{
	"id": "1",
	"name": "Categoria 1"
}
~~~

___
- **`PATCH categories/:id`**: Responsável pela listagem de uma categoria específica, conforme o *id* que for passado no endpoint.

**Corpo de requisição**
~~~json
{
	"name": "Categoria 1 atualizada"
}
~~~

___
**Corpo de resposta**
~~~json
{
	"message": "Category updated",
	"category": {
		"id": "1",
		"name": "Categoria 1 atualizada"
	}
}
~~~

___

-   **`DELETE categories/:id`**: Responsável pela deleção de uma categoria. Não recebe um corpo de requisição e retorna um *204 (No content)*

___
##  PRODUCTS

-   **`POST /products`**: Responsável pela criação de novos produtos

**Corpo de requisição**
~~~json
{
	"name": "Produto 1",
	"price": 10.00,
	"category_id": 1
}
~~~

**Corpo de resposta**
```json
{
	"message": "Product created",
	"product": {
		"name": "Produto 1",
		"id": "9bfc1e7b-2f51-4c3b-a577-2bb76d1b9e17"
	}
}
```
___
-   **`GET /products`**: Responsável pela listagem de todos os produtos

**Corpo de resposta**
```json
[
	{
		"id": "32ea75db-2942-4705-846b-efa9710ef52a",
		"name": "Produto 1",
		"price": "10.00",
		"category": "Categoria 1"
	},
	{
		"id": "fad3b329-4ccd-4b11-b659-8a3e34acbde6",
		"name": "Produto 2",
		"price": "10.00",
		"category": "Categoria 2"
	},
	{
		"id": "b1e0443d-e546-49b8-b333-7439fd125d65",
		"name": "Produto 3",
		"price": "10.00",
		"category": "Categoria 1"
	},
	{
		"id": "367b7026-cc04-4500-98e0-af166235bce6",
		"name": "Produto 4",
		"price": "10.00",
		"category": "Categoria 4"
	},
	{
		"id": "dd9a0310-6271-4dd4-82e8-c7bf90704e2f",
		"name": "Produto 5",
		"price": "10.00",
		"category": "Categoria 2"
	},
  [...]
]
```
___
- **`GET products/:id`**: Responsável pela listagem de uma categoria específica, conforme o *id* que for passado no endpoint.

**Corpo de resposta**
~~~json
{
	"id": "fad3b329-4ccd-4b11-b659-8a3e34acbde6",
	"name": "Produto 1",
	"price": "10.00",
	"category": "Categoria 1"
}
~~~

___
- **`GET products/category/:id`**: Responsável pela listagem dos produtos presentes dentro de uma categoria especifica, conforme o *id* da categoria passado no final do endpoint.

**Corpo de resposta**
~~~json
[
	{
		"id": "32ea75db-2942-4705-846b-efa9710ef52a",
		"name": "Produto 1",
		"price": "10.00",
		"category": "Categoria 1"
	},
    {
		"id": "b1e0443d-e546-49b8-b333-7439fd125d65",
		"name": "Produto 3",
		"price": "10.00",
		"category": "Categoria 1"
	}
]
~~~

___
- **`PATCH products/:id`**: Responsável pela atualização de um produto específico, conforme o *id* que for passado no endpoint.

**Corpo de requisição**
~~~json
{
	"name": "Produto 1 atualizado",
	"price": 12.00
}
~~~

___
**Corpo de resposta**
~~~json
{
	"message": "Product updated",
	"product": {
		"name": "Produto 1",
		"id": "32ea75db-2942-4705-846b-efa9710ef52a"
	}
}
~~~

___

-   **`DELETE products/:id`**: Responsável pela deleção de um produto específico, conforme o *id* que for passado no final do endpoint. Não recebe um corpo de requisição e retorna um *204 (No content)*

___
#####   *Idéia do projeto desenvolvida 100% pela equipe de ensino e conteúdo da Kenzie Academy Brasil*
