using System.Threading.Tasks;
using Backend.Data;
using Backend.Model;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProdutosController : ControllerBase
    {
        private readonly IProdutoRepository _repo;
        public ProdutosController (IProdutoRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var results = await _repo.GetAllProdutosAsync();
                return Ok(results);
            }
            catch (System.Exception)
            {
                return this.StatusCode(500, "Erro No Banco de Dados");
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                var results = await _repo.GetProdutosAsyncById(id);
                return Ok(results);
            }
            catch (System.Exception)
            {
                return this.StatusCode(500, "Erro No Banco de Dados");
            }
        }

        [HttpGet("getByNome/{nome}")]
        public async Task<IActionResult> Get(string nome)
        {
            try
            {
                var results = await _repo.GetAllProdutosAsyncByNome(nome);
                return Ok(results);
            }
            catch (System.Exception)
            {
                return this.StatusCode(500, "Erro No Banco de Dados");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(Produto model)
        {
            try
            {
                _repo.Add(model);

                if (await _repo.SaveChangesAsync())
                {
                    return Created($"api/evento/{model.Id}", model);
                }
            }
            catch (System.Exception)
            {
                return this.StatusCode(500, "Erro No Banco de Dados");
            }

            return BadRequest();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, Produto model)
        {
            try
            {
                var produto = await _repo.GetProdutosAsyncById(id);
                if (produto == null) return NotFound();

                _repo.Update(model);

                if (await _repo.SaveChangesAsync())
                {
                    return Created($"api/evento/{model.Id}", model);
                }
            }
            catch (System.Exception)
            {
                return this.StatusCode(500, "Erro No Banco de Dados");
            }

            return BadRequest();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var produto = await _repo.GetProdutosAsyncById(id);
                if (produto == null) return NotFound();

                _repo.Delete(produto);

                if (await _repo.SaveChangesAsync())
                {
                    return Ok();
                }
            }
            catch (System.Exception)
            {
                return this.StatusCode(500, "Erro No Banco de Dados");
            }

            return BadRequest();
        }
    }
}