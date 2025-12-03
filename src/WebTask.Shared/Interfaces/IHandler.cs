

namespace WebTask.Shared.Interfaces;

public interface IHandler<T, TInput> where T : class
{
    Task<Result<T>> HandleAsync(TInput input);
}