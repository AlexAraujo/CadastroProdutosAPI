using System.Linq;
using System.Threading.Tasks;
using Backend.Model;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data
{
    public class  ProdutoRepository: IProdutoRepository
    {
        private readonly ProdutoContext _context;

        public ProdutoRepository(ProdutoContext context)
        {
            _context = context;
            _context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }

        //Gerais

        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }
        public void Update<T>(T entity) where T : class
        {
            _context.Update(entity);
        }
        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<bool> SaveChangesAsync()
        {
            return (await _context.SaveChangesAsync()) > 0;
        }

        //Evento
        public async Task<Produto[]> GetAllProdutosAsync()
        {
            IQueryable<Produto> query = _context.Produtos;

            query = query.AsNoTracking();

            return await query.ToArrayAsync();
        }

        public async Task<Produto[]> GetAllProdutosAsyncByNome(string nome)
        {
            IQueryable<Produto> query = _context.Produtos;

            query = query.AsNoTracking()
                        .Where(c => c.Nome.ToLower().Contains(nome.ToLower()));

            return await query.ToArrayAsync();
        }

        public async Task<Produto> GetProdutosAsyncById(int id)
        {
            IQueryable<Produto> query = _context.Produtos;

            query = query.AsNoTracking()
                        .Where(c => c.Id == id);

            return await query.FirstOrDefaultAsync();
        }
    }
}