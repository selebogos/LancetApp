using AutoMapper;
using LancetApp.Common.Config;
using LancetApp.Common.DTOs;
using LancetApp.Core.Abstraction;
using LancetApp.DAL.DBContext;
using LancetApp.DAL.Entities;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LancetApp.Core.Service
{
    public class NormalRangeService : INormalRangeService
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IMapper _mapper;

        public NormalRangeService(IMapper mapper,
            ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }
        public async Task<NormalRangeDto> Get(int id)
        {
            try
            {
                var result = await _dbContext.NormalRanges.FirstAsync(p => p.Id == id);
                var resultDto = _mapper.Map<NormalRangeDto>(result);
                return resultDto;
            }
            catch (Exception e)
            {

                return null;
            }
        }
        public async Task<string> GetAll(DatatableParametersDto dataItems)
        {
            string output = "";
            string error = "";
            DataTableData<NormalRangeDto> dataTableData = new DataTableData<NormalRangeDto>();
            try
            {
                var query = (from range in _dbContext.NormalRanges
                             select new NormalRangeDto
                             {
                                 Description = range.Description,
                                 Id = range.Id
                             });

                var totalCount = query.Count();
                int sortColumn = -1;
                string sortDirection = "asc";

                if (dataItems.Length <= 0)
                {
                    dataItems.Length = totalCount;
                }
                if (dataItems.Draw <= 0)
                {
                    dataItems.Draw = 10;
                }
                if (dataItems.Start <= -1)
                {
                    dataItems.Start = 0;
                }

                dataTableData.draw = dataItems.Draw;
                dataTableData.recordsTotal = totalCount;
                // Paging
                if (dataItems.Length != totalCount)
                    query = query.Skip(dataItems.Start).Take(dataItems.Length);
                //Search
                // Apply filters
                if (totalCount > 0 && (!string.IsNullOrEmpty(dataItems.Search) || !string.IsNullOrWhiteSpace(dataItems.Search)))
                {
                    var value = dataItems.Search.Trim();
                    query = query.Where(p => p.Description.Contains(value));
                }
                var data = await query.ToListAsync();
                dataTableData.recordsFiltered = totalCount;
                dataTableData.data = data;
                output = JsonConvert.SerializeObject(dataTableData, Formatting.Indented);
            }
            catch (Exception ex)
            {
                error = ex.Message;

            }
            return output;
        }
        public async Task<int> AddNormalRange(NormalRangeDto NormalRangeData)
        {
            try
            {
                var NormalRange = _mapper.Map<NormalRange>(NormalRangeData);
                _dbContext.NormalRanges.Add(NormalRange);
                await _dbContext.SaveChangesAsync();
                return NormalRange.Id;
            }
            catch (Exception)
            {
                return -1;
            }
        }
        public async Task<IEnumerable<NormalRangeDto>> GetAll()
        {
            try
            {
                List<NormalRangeDto> list = await _dbContext.NormalRanges.Select(x => new NormalRangeDto
                {
                    Description = x.Description,
                    Id = x.Id
                }).ToListAsync();
                return list;
            }
            catch (Exception e)
            {

                return null;
            }
        }
        public async Task<bool> RemoveNormalRange(int id)
        {
            try
            {
                var NormalRange = _dbContext.NormalRanges.AsNoTracking().FirstOrDefault(p => p.Id == id);
                if (NormalRange == null)
                {
                    return false;
                }
                var NormalRangeToRemove = _mapper.Map<NormalRange>(NormalRange);
                _dbContext.Entry(NormalRangeToRemove).State = EntityState.Deleted;
                await _dbContext.SaveChangesAsync();
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }
        public async Task<int> UpdateNormalRange(NormalRangeDto NormalRangeData)
        {
            try
            {
                var savedNormalRange = _dbContext.NormalRanges.AsNoTracking().FirstOrDefault(p => p.Id == NormalRangeData.Id);
                if (savedNormalRange == null)
                {
                    return -1;
                }
                _dbContext.Entry(_mapper.Map<NormalRange>(NormalRangeData)).State = EntityState.Modified;
                await _dbContext.SaveChangesAsync();
                return savedNormalRange.Id;
            }
            catch (Exception e)
            {
                return -1;
            }
        }
    }
}
