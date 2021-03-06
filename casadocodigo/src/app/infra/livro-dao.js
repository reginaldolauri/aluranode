class LivroDao{

    constructor(db){
        this._db = db;
    }

    adiciona(livro) {
        return new Promise((resolve, reject) => {
            this._db.run(`
                INSERT INTO livros (
                    titulo,
                    preco,
                    descricao
                ) values (?,?,?)
            `,
                [
                    livro.titulo,
                    livro.preco,
                    livro.descricao
                ],
                erro => {
                    if (erro) {
                        console.log(erro);
                        return reject('Não foi possível adicionar o livro!');
                    }
                    resolve();
                });
        });
    }

    lista() {
        return new Promise((resolve, reject) => {
            this._db.all(
                'SELECT * FROM livros',
                (erro, resultados) => {
                    if (erro) return reject('Não foi possível listar os livros.')

                    return resolve(resultados);
                });
        });
    }

    buscaPorId(id){
        return new Promise((resolve, reject) => {
            this._db.get(
                `SELECT * FROM livros where id = ?`,
                [id],
                (erro, livro) =>{
                    if (erro) 
                        return reject(`Não foi possível encontrar o livro de id: ${id}`);
                    
                    return resolve(livro);
                });
        });
    }

    atualiza(livro){
        return new Promise((resolve, reject) => {
            this._db.run(`UPDATE livros SET
                            titulo = ?,
                            preco = ?,
                            descricao = ?
                            where id = ?`,
            [
                livro.titulo,
                livro.preco,
                livro.descricao,
                livro.id
            ],
            erro => {
                if(erro){
                    console.log(erro);
                    
                    return reject(`Não foi possível atualizar o livro: ${livro.id}`);
                }
                return resolve();
            });
        });
    }

    remove(id){
        console.log(`Entrou em remove livro-dao id ${id}`);
        
        return new Promise((resolve, reject) => {
            this._db.get(`DELETE FROM livros WHERE id = ?`,
            [id],
            (erro) => {
                if(erro) {
                    return reject(`Não foi possível remover o livro: ${id}`);
                }
                return  resolve();
            });
        });
    }
}

module.exports = LivroDao;