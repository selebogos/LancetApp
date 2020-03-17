using LancetApp.Common.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace LancetApp.Core.Abstraction
{
    public interface INormalRangeService
    {
        Task<int> AddNormalRange(NormalRangeDto NormalRangeData);
        Task<IEnumerable<NormalRangeDto>> GetAll();
        Task<string> GetAll(DatatableParametersDto dataItems);
        Task<NormalRangeDto> Get(int id);
        Task<bool> RemoveNormalRange(int id);
        Task<int> UpdateNormalRange(NormalRangeDto NormalRangeData);
    }
}
