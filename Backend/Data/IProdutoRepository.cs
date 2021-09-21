using System.Threading.Tasks;
using Backend.Model;


namespace Backend.Data
{
    public interface IProdutoRepository
    {
        //Geral
        void Add<T>(T entity) where T : class;
        void Update<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;

        Task<bool> SaveChangesAsync();

        //Eventos
        Task<Produto[]> GetAllProdutosAsyncByNome(string nome);
        Task<Produto[]> GetAllProdutosAsync();
        Task<Produto> GetProdutosAsyncById(int id);
    }
}