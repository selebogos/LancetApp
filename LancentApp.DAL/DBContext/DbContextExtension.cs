using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace LancetApp.DAL.DBContext
{
    public static class DbContextExtension
    {
        
        public static void AddOrUpdate<T>(this DbContext ctx, object entity)
        where T : DomainEntity
        {
            var entry = ctx.Entry(entity);
            switch (entry.State)
            {
                case EntityState.Detached:
                    ctx.Add(entity);
                    break;
                case EntityState.Modified:
                    ctx.Update(entity);
                    break;
                case EntityState.Added:
                    ctx.Add(entity);
                    break;
                case EntityState.Unchanged:
                    //item already in db no need to do anything  
                    break;

                default:
                    throw new ArgumentOutOfRangeException();
            }
        }
        public static void AddOrUpdate<T>(this DbSet<T> dbSet, IEnumerable<T> records)
        where T : DomainEntity
        {
            foreach (var data in records)
            {
                var exists = dbSet.AsNoTracking().Any(x => x.Id == data.Id);
                if (exists)
                {
                    dbSet.Update(data);
                    continue;
                }
                dbSet.Add(data);
            }
        }
        
    }
}
