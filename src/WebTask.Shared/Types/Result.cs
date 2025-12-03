

public class Result<T> where T : class
{
    private Result()
    {
        
    }

    public T? Data {get;set;}

    public string? Error {get;set;}

    public static Result<T> Success(T data)
    {
        return new Result<T>
        {
            Data = data
        };
    }

    public static Result<T> Failure(string error)
    {
        return new Result<T>
        {
            Error = error
        };
    }
}