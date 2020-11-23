using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IdentityServer4.Models;
using IdentityServer4.Stores;
namespace kitchen_idserver.Storage
{
    public class RepositoryResourceStore : IResourceStore
    {
        protected IRepository _repository;

        public RepositoryResourceStore(IRepository repository)
            => _repository = repository;

        private IEnumerable<ApiResource> GetAllApiResources()
            => _repository.All<ApiResource>();

        private IEnumerable<IdentityResource> GetAllIdentityResources()
            => _repository.All<IdentityResource>();

        private IEnumerable<ApiScope> GetAllAPIScopes()
            => _repository.All<ApiScope>();
        public Task<ApiResource> FindApiResourceAsync(string name)
            => Task.FromResult(_repository.Single<ApiResource>(a => a.Name == name));

        public Task<IEnumerable<ApiResource>> FindApiResourcesByNameAsync(IEnumerable<string> apiResourceNames)
        {
            var names = apiResourceNames.ToArray();
            var apis = _repository.All<ApiResource>().ToList();
            var list = apis.Where<ApiResource>(s => names.Contains(s.Name)).AsEnumerable();
            return Task.FromResult(list);
        }

        public Task<IEnumerable<IdentityResource>> FindIdentityResourcesByScopeNameAsync(IEnumerable<string> scopeNames)
        => Task.FromResult(_repository.Where<IdentityResource>(e => scopeNames.Contains(e.Name)).AsEnumerable());
        public Task<IEnumerable<ApiResource>> FindApiResourcesByScopeNameAsync(IEnumerable<string> scopeNames)
        {
            var apis = _repository.All<ApiResource>().ToList();
            var list = apis.Where<ApiResource>(a => a.Scopes.Any(s => scopeNames.Contains(s))).AsEnumerable();
            return Task.FromResult(list);
        }
        public Task<IEnumerable<ApiScope>> FindApiScopesByNameAsync(IEnumerable<string> scopeNames)
        {
            var apis = _repository.All<ApiScope>().ToList();
            var list = apis.Where<ApiScope>(s => scopeNames.Contains(s.Name)).AsEnumerable();
            return Task.FromResult(list);
        }
        public Task<IEnumerable<IdentityResource>> FindIdentityResourcesByScopeAsync(IEnumerable<string> scopeNames)
            => Task.FromResult(_repository.Where<IdentityResource>(e => scopeNames.Contains(e.Name)).AsEnumerable());

        public Task<Resources> GetAllResourcesAsync()
            => Task.FromResult(new Resources(GetAllIdentityResources(), GetAllApiResources(), GetAllAPIScopes()));

        private Func<IdentityResource, bool> BuildPredicate(Func<IdentityResource, bool> predicate)
            => predicate;
    }
}