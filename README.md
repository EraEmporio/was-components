# was-components
Biblioteca de componentes compartilhada baseada em RadixUI e Tailwind 

# install dependencies
npm install

# build the library, available under dist
npm run build

## Develop and test locally

~~A melhor maneira de desenvolver e testar um componente é criando demonstrações na pasta docs/components/demo, conforme mostrado pelos exemplos de componentes.~~

Para testar a biblioteca em seu aplicativo Vue3 localmente:

Na pasta raiz desta biblioteca, execute `npm link`. Isso criará um link simbólico para a biblioteca.
Na pasta raiz do seu aplicativo cliente, execute `npm link my-lib`. Isso adicionará o link simbólico à pasta node_modules do seu aplicativo cliente.
Agora você pode importar my-lib no seu aplicativo cliente.
Nesse caso, não é necessário adicionar my-lib como dependência do seu aplicativo cliente.

Se houve alterações na biblioteca, será necessário rebuildar a biblioeca. O aplicativo Vue3 que a estiver rodando deverá recarregar automaticamente quando a construção da biblioteca for concluída.
